package com.ai.ai_interview_backend.service;

import com.ai.ai_interview_backend.dto.ResumeAnalysisResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class ResumeGeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final WebClient webClient =
            WebClient.builder().build();

    private final ObjectMapper mapper =
            new ObjectMapper();

    public ResumeAnalysisResponse analyzeResume(String resumeText) {

        try {

            String prompt = """
                    You are an ATS Resume Analyzer.

                    Analyze the following resume.

                    Return ONLY valid JSON.

                    {
                      "atsScore": 0,
                      "skills": [],
                      "missingSkills": [],
                      "questions": [],
                      "feedback": ""
                    }

                    Rules:
                    1. ATS Score should be between 0-100.
                    2. Extract technical skills.
                    3. Mention missing skills.
                    4. Generate exactly 10 interview questions based on the resume.
                    5. Give detailed feedback.

                    Resume:

                    %s
                    """.formatted(resumeText);

            String requestBody = """
                    {
                      "contents": [
                        {
                          "parts": [
                            {
                              "text": "%s"
                            }
                          ]
                        }
                      ]
                    }
                    """.formatted(prompt.replace("\"", "\\\""));

            String response = webClient.post()
                    .uri(
                            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
                                    + apiKey
                    )
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .onStatus(
                            status -> status.isError(),
                            clientResponse -> clientResponse
                                    .bodyToMono(String.class)
                                    .map(body -> new RuntimeException(body))
                    )
                    .bodyToMono(String.class)
                    .block();

            System.out.println("============= GEMINI RESPONSE =============");
            System.out.println(response);
            System.out.println("===========================================");

            JsonNode root = mapper.readTree(response);

            String json = root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            json = json
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            ResumeAnalysisResponse analysis =
                    mapper.readValue(
                            json,
                            ResumeAnalysisResponse.class
                    );

            return analysis;

        } catch (Exception e) {

            e.printStackTrace();

            ResumeAnalysisResponse error =
                    new ResumeAnalysisResponse();

            error.setAtsScore(0);

            error.setSkills(List.of());

            error.setMissingSkills(List.of());

            error.setQuestions(List.of());

            error.setFeedback(
                    "Failed to analyze resume : "
                            + e.getMessage()
            );

            return error;
        }
    }
}