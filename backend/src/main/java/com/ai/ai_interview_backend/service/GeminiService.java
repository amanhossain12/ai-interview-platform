package com.ai.ai_interview_backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final WebClient webClient = WebClient.builder().build();

    public String evaluateAnswer(String question, String answer) {

        try {

            String prompt =
                    """
                    You are a professional technical interviewer.

                    Evaluate this answer.

                    Question:
                    %s

                    Answer:
                    %s

                    Give:
                    1. Score out of 100
                    2. Strengths
                    3. Weaknesses
                    4. Improvement Suggestions

                    Keep response clean and readable.
                    """.formatted(question, answer);

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

            String url =
                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="
                            + apiKey;

            String response =
                    webClient.post()
                            .uri(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .bodyValue(requestBody)
                            .retrieve()
                            .bodyToMono(String.class)
                            .block();

            ObjectMapper mapper = new ObjectMapper();

            JsonNode root =
                    mapper.readTree(response);

            return root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {

            e.printStackTrace();

            return "Failed to generate feedback";
        }
    }
}