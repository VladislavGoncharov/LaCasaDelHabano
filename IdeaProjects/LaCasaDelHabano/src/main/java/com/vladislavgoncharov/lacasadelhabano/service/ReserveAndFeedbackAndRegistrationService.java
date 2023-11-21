package com.vladislavgoncharov.lacasadelhabano.service;

import com.vladislavgoncharov.lacasadelhabano.dto.FeedbackDTO;
import com.vladislavgoncharov.lacasadelhabano.dto.RegistrationOfWholesaleCustomerDTO;
import com.vladislavgoncharov.lacasadelhabano.dto.ReserveDTO;

import java.util.List;

public interface ReserveAndFeedbackAndRegistrationService {

    boolean addFeedback(FeedbackDTO feedbackDTO);
    boolean addRegistrationOfWholesaleCustomer(RegistrationOfWholesaleCustomerDTO registrationOfWholesaleCustomerDTO);
    boolean addReserve(ReserveDTO reserveDTO);

    List<FeedbackDTO> findAllFeedbacks();

    List<ReserveDTO> findAllReserves();
}
