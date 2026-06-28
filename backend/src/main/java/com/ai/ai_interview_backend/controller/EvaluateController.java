package com.ai.ai_interview_backend.controller;

import com.ai.ai_interview_backend.dto.EvaluateRequest;
import com.ai.ai_interview_backend.dto.EvaluateResponse;
import com.ai.ai_interview_backend.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")

public class EvaluateController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/evaluate")
    public EvaluateResponse evaluate(
            @RequestBody EvaluateRequest request
    ) {

        String feedback =
                geminiService.evaluateAnswer(
                        request.getQuestion(),
                        request.getAnswer()
                );

        return new EvaluateResponse(feedback);
    }
}