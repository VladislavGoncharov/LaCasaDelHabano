package com.vladislavgoncharov.lacasadelhabano.repository;

import com.vladislavgoncharov.lacasadelhabano.entity.TelegramId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TelegramRepository extends JpaRepository<TelegramId, Long> {
}
