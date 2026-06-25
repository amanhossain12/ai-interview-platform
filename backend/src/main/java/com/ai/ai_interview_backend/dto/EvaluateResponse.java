package com.ai.ai_interview_backend.dto;

public class EvaluateResponse {

    private String feedback;

    public EvaluateResponse() {
    }

    public EvaluateResponse(String feedback) {
        this.feedback = feedback;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}