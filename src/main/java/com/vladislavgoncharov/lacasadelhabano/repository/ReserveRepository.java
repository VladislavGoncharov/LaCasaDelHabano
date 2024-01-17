package com.vladislavgoncharov.lacasadelhabano.repository;

import com.vladislavgoncharov.lacasadelhabano.entity.Reserve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReserveRepository extends JpaRepository<Reserve, Long> {
}
