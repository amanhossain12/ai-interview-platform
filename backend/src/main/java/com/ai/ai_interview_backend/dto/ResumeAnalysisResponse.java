package com.ai.ai_interview_backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class ResumeAnalysisResponse {

    private int atsScore;

    private List<String> skills;

    private List<String> missingSkills;

    private List<String> questions;

    private String feedback;

}