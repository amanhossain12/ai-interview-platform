package com.ai.ai_interview_backend.controller;

import com.ai.ai_interview_backend.dto.ResumeAnalysisResponse;
import com.ai.ai_interview_backend.service.ResumeGeminiService;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(
        originPatterns = {
                "http://localhost:5173",
                "https://*.vercel.app"
        }
)

public class ResumeController {

    @Autowired
    private ResumeGeminiService resumeGeminiService;

    @PostMapping("/upload")
    public ResumeAnalysisResponse uploadResume(
            @RequestParam("file") MultipartFile file
    ) {

        try {

            PDDocument document =
                    Loader.loadPDF(file.getBytes());

            PDFTextStripper pdfStripper =
                    new PDFTextStripper();

            String resumeText =
                    pdfStripper.getText(document);

            document.close();

            return resumeGeminiService.analyzeResume(
                    resumeText
            );

        } catch (Exception e) {

            e.printStackTrace();

            ResumeAnalysisResponse error =
                    new ResumeAnalysisResponse();

            error.setAtsScore(0);
            error.setFeedback(
                    "Failed to analyze resume: " + e.getMessage()
            );

            return error;
        }
    }
}