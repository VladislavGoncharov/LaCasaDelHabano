package com.vladislavgoncharov.lacasadelhabano.repository;

import com.vladislavgoncharov.lacasadelhabano.entity.RegistrationOfWholesaleCustomer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistrationOfWholesaleCustomerRepository extends JpaRepository<RegistrationOfWholesaleCustomer, Long> {
}
