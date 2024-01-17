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

    List<RegistrationOfWholesaleCustomerDTO> findAllRegistrationOfWholesaleCustomer();

    Long getCountReserves();
    Long getCountFeedbacks();
    Long getCountRegistration();

    boolean deleteReserve(Long id);

    boolean deleteFeedback(Long id);

    boolean deleteRegistration(Long id);

    List<String> findAllTelegramId();
    void deleteTelegramId(String telegramId);
    void addTelegramId(String telegramId);

}
