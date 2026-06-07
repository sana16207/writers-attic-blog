package com.sanjana.writersattic.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StoryResponse {

    private Long id;
    private String title;
    private String content;
    private String status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}