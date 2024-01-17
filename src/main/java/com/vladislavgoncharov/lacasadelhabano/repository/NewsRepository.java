package com.vladislavgoncharov.lacasadelhabano.repository;

import com.vladislavgoncharov.lacasadelhabano.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {

    News findTopByOrderByIdDesc();
}
