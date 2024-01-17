package com.vladislavgoncharov.lacasadelhabano.repository;

import com.vladislavgoncharov.lacasadelhabano.entity.PhonesAndLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhonesAndLinkRepository extends JpaRepository<PhonesAndLink, Long> {
}
