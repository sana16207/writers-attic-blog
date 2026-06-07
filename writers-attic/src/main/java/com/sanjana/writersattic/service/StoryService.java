package com.sanjana.writersattic.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sanjana.writersattic.dto.ApiResponse;
import com.sanjana.writersattic.dto.StoryRequest;
import com.sanjana.writersattic.dto.StoryResponse;
import com.sanjana.writersattic.exception.StoryNotFoundException;
import com.sanjana.writersattic.model.Story;
import com.sanjana.writersattic.repository.StoryRepository;

@Service
public class StoryService {

    private final StoryRepository storyRepository;

    public StoryService(StoryRepository storyRepository) {
        this.storyRepository = storyRepository;
    }

    public ApiResponse<StoryResponse> createStory(StoryRequest request) {

        Story story = Story.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .createdAt(LocalDateTime.now())
                .build();

        Story saved = storyRepository.save(story);

        StoryResponse response = mapToResponse(saved);

        return ApiResponse.success("Story created", response);
    }

    public ApiResponse<List<StoryResponse>> getAllStories() {

        List<StoryResponse> list = storyRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();

        return ApiResponse.success("All stories", list);
    }

    public ApiResponse<StoryResponse> getStoryById(Long id) {

        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new StoryNotFoundException("Story not found"));

        return ApiResponse.success("Story found", mapToResponse(story));
    }

    public ApiResponse<StoryResponse> updateStory(Long id, StoryRequest request) {

        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new StoryNotFoundException("Story not found"));

        story.setTitle(request.getTitle());
        story.setContent(request.getContent());

        Story updated = storyRepository.save(story);

        return ApiResponse.success("Story updated", mapToResponse(updated));
    }

    public ApiResponse<String> deleteStory(Long id) {

        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new StoryNotFoundException("Story not found"));

        storyRepository.delete(story);

        return ApiResponse.success("Story deleted");
    }

    private StoryResponse mapToResponse(Story story) {
        return StoryResponse.builder()
                .id(story.getId())
                .title(story.getTitle())
                .content(story.getContent())
                .createdAt(story.getCreatedAt())
                .build();
    }
}