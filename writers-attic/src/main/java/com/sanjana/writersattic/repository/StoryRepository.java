package com.sanjana.writersattic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sanjana.writersattic.model.Story;

public interface StoryRepository extends JpaRepository<Story, Long> {
}