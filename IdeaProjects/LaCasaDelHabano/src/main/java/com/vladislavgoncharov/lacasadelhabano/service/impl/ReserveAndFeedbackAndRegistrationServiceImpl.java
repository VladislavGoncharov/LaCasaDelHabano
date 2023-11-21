package com.vladislavgoncharov.lacasadelhabano.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vladislavgoncharov.lacasadelhabano.dto.FeedbackDTO;
import com.vladislavgoncharov.lacasadelhabano.dto.RegistrationOfWholesaleCustomerDTO;
import com.vladislavgoncharov.lacasadelhabano.dto.ReserveDTO;
import com.vladislavgoncharov.lacasadelhabano.entity.Basket;
import com.vladislavgoncharov.lacasadelhabano.entity.Item;
import com.vladislavgoncharov.lacasadelhabano.entity.Reserve;
import com.vladislavgoncharov.lacasadelhabano.mapper.FeedbackMapper;
import com.vladislavgoncharov.lacasadelhabano.mapper.RegistrationOfWholesaleCustomerMapper;
import com.vladislavgoncharov.lacasadelhabano.mapper.ReserveMapper;
import com.vladislavgoncharov.lacasadelhabano.repository.FeedbackRepository;
import com.vladislavgoncharov.lacasadelhabano.repository.ItemRepository;
import com.vladislavgoncharov.lacasadelhabano.repository.RegistrationOfWholesaleCustomerRepository;
import com.vladislavgoncharov.lacasadelhabano.repository.ReserveRepository;
import com.vladislavgoncharov.lacasadelhabano.service.ReserveAndFeedbackAndRegistrationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ReserveAndFeedbackAndRegistrationServiceImpl implements ReserveAndFeedbackAndRegistrationService {

    private final ReserveMapper MAPPER_RESERVE = ReserveMapper.MAPPER;
    private final FeedbackMapper MAPPER_FEEDBACK = FeedbackMapper.MAPPER;
    private final RegistrationOfWholesaleCustomerMapper MAPPER_REGISTRATION = RegistrationOfWholesaleCustomerMapper.MAPPER;

    private final ReserveRepository reserveRepository;
    private final FeedbackRepository feedbackRepository;
    private final RegistrationOfWholesaleCustomerRepository registrationOfWholesaleCustomerRepository;
    private final ItemRepository itemRepository;

    public ReserveAndFeedbackAndRegistrationServiceImpl(ReserveRepository reserveRepository, FeedbackRepository feedbackRepository, RegistrationOfWholesaleCustomerRepository registrationOfWholesaleCustomerRepository, ItemRepository itemRepository) {
        this.reserveRepository = reserveRepository;
        this.feedbackRepository = feedbackRepository;
        this.registrationOfWholesaleCustomerRepository = registrationOfWholesaleCustomerRepository;
        this.itemRepository = itemRepository;
    }

    @Override
    public boolean addFeedback(FeedbackDTO feedbackDTO) {
        try {
            feedbackRepository.save(MAPPER_FEEDBACK.toFeedback(feedbackDTO));
            return true;
        } catch (RuntimeException exception) {
            exception.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean addRegistrationOfWholesaleCustomer(RegistrationOfWholesaleCustomerDTO registrationOfWholesaleCustomerDTO) {
        try {
            registrationOfWholesaleCustomerRepository.save(MAPPER_REGISTRATION.toRegistrationOfWholesaleCustomer(registrationOfWholesaleCustomerDTO));
            return true;
        } catch (RuntimeException exception) {
            exception.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean addReserve(ReserveDTO reserveDTO) {
        try {
            List<Basket> baskets = new ArrayList<>();
            if (!reserveDTO.getFirstBasket().isEmpty()){
                ObjectMapper objectMapper = new ObjectMapper();

                baskets = objectMapper.readValue(reserveDTO.getFirstBasket(), new TypeReference<>() {});

                baskets.forEach(basket -> {
                    Item item = itemRepository.getById(basket.getItemIdentifier());
                    basket.setItemName(item.getName());
                    basket.setItemPrice(item.getPrice());
                    basket.setItemPhoto(item.getPhoto());
                });
            }

            Reserve reserve = reserveRepository.save(MAPPER_RESERVE.toFirstReserve(reserveDTO, baskets));
            reserve.getBasket().forEach(basket -> {
                basket.setReserve(reserve);
            });
            return true;
        } catch (RuntimeException | JsonProcessingException exception) {
            exception.printStackTrace();
            return false;
        }
    }

    @Override
    public List<FeedbackDTO> findAllFeedbacks() {
        return MAPPER_FEEDBACK.fromFeedbackList(feedbackRepository.findAll());
    }

    @Override
    public List<ReserveDTO> findAllReserves() {
        return MAPPER_RESERVE.fromReserveList(reserveRepository.findAll());
    }
}
