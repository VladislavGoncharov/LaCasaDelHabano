package com.vladislavgoncharov.lacasadelhabano.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vladislavgoncharov.lacasadelhabano.dto.FeedbackDTO;
import com.vladislavgoncharov.lacasadelhabano.dto.RegistrationOfWholesaleCustomerDTO;
import com.vladislavgoncharov.lacasadelhabano.dto.ReserveDTO;
import com.vladislavgoncharov.lacasadelhabano.dto.TelegramIdDTO;
import com.vladislavgoncharov.lacasadelhabano.entity.*;
import com.vladislavgoncharov.lacasadelhabano.mapper.FeedbackMapper;
import com.vladislavgoncharov.lacasadelhabano.mapper.RegistrationOfWholesaleCustomerMapper;
import com.vladislavgoncharov.lacasadelhabano.mapper.ReserveMapper;
import com.vladislavgoncharov.lacasadelhabano.repository.*;
import com.vladislavgoncharov.lacasadelhabano.service.ReserveAndFeedbackAndRegistrationService;
import com.vladislavgoncharov.lacasadelhabano.telegramBot.TelegramBot;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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
    private final TelegramRepository telegramRepository;
    private final TelegramBot telegramBot;

    public ReserveAndFeedbackAndRegistrationServiceImpl(ReserveRepository reserveRepository, FeedbackRepository feedbackRepository, RegistrationOfWholesaleCustomerRepository registrationOfWholesaleCustomerRepository, ItemRepository itemRepository, TelegramRepository telegramRepository, TelegramBot telegramBot) {
        this.reserveRepository = reserveRepository;
        this.feedbackRepository = feedbackRepository;
        this.registrationOfWholesaleCustomerRepository = registrationOfWholesaleCustomerRepository;
        this.itemRepository = itemRepository;
        this.telegramRepository = telegramRepository;
        this.telegramBot = telegramBot;
    }

    @Override
    public boolean addFeedback(FeedbackDTO feedbackDTO) {
        try {
            feedbackRepository.save(MAPPER_FEEDBACK.toFeedback(feedbackDTO));

            telegramBot.submitNewFeedback(feedbackDTO, telegramRepository.findAll().stream().map(TelegramId::getTelegramId).collect(Collectors.toList()));
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
            telegramBot.submitNewRegistrationOfWholesaleCustomer(registrationOfWholesaleCustomerDTO, telegramRepository.findAll().stream().map(TelegramId::getTelegramId).collect(Collectors.toList()));

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
            if (!reserveDTO.getFirstBasket().isEmpty()) {
                ObjectMapper objectMapper = new ObjectMapper();

                baskets = objectMapper.readValue(reserveDTO.getFirstBasket(), new TypeReference<>() {
                });

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


            telegramBot.submitNewReserve(MAPPER_RESERVE.fromReserve(reserve), telegramRepository.findAll().stream().map(TelegramId::getTelegramId).collect(Collectors.toList()));
            return true;
        } catch (RuntimeException | JsonProcessingException exception) {
            exception.printStackTrace();
            return false;
        }
    }

    @Override
    public List<FeedbackDTO> findAllFeedbacks() {

        List<Feedback> feedbacks = feedbackRepository.findAll();
        Collections.reverse(feedbacks);

        return MAPPER_FEEDBACK.fromFeedbackList(feedbacks);
    }

    @Override
    public List<ReserveDTO> findAllReserves() {
        List<Reserve> reserves = reserveRepository.findAll();
        Collections.reverse(reserves);

        return MAPPER_RESERVE.fromReserveList(reserves);
    }

    @Override
    public List<RegistrationOfWholesaleCustomerDTO> findAllRegistrationOfWholesaleCustomer() {
        List<RegistrationOfWholesaleCustomer> registration = registrationOfWholesaleCustomerRepository.findAll();
        Collections.reverse(registration);

        return MAPPER_REGISTRATION.fromRegistrationOfWholesaleCustomerList(registration);
    }

    @Override
    public Long getCountReserves() {
        return reserveRepository.count();
    }

    @Override
    public Long getCountFeedbacks() {
        return feedbackRepository.count();
    }

    @Override
    public Long getCountRegistration() {
        return registrationOfWholesaleCustomerRepository.count();
    }

    @Override
    public boolean deleteReserve(Long id) {
        try {
            reserveRepository.deleteById(id);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public boolean deleteFeedback(Long id) {
        try {
            feedbackRepository.deleteById(id);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public boolean deleteRegistration(Long id) {
        try {
            registrationOfWholesaleCustomerRepository.deleteById(id);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public List<String> findAllTelegramId() {
        return telegramRepository.findAll().stream().map(TelegramId::getTelegramId).map(String::valueOf).collect(Collectors.toList());
    }

    @Override
    public void deleteTelegramId(String telegramId) {
        List<TelegramIdDTO> telegramIdDTOS = telegramRepository.findAll().stream().map(telegramIdOrig -> TelegramIdDTO.builder().telegramId(String.valueOf(telegramIdOrig.getTelegramId())).id(telegramIdOrig.getId()).build()).toList();

        Long idDelete = null;

        for (TelegramIdDTO telegramIdDTO : telegramIdDTOS) {
            if (telegramIdDTO.getTelegramId().equalsIgnoreCase(telegramId)) idDelete = telegramIdDTO.getId();
        }

        assert idDelete != null;
        telegramRepository.deleteById(idDelete);
    }

    @Override
    public void addTelegramId(String telegramId) {
        if (telegramId != null && telegramId.matches("\\d{9}")) {
            try {
                telegramBot.addNewUser(telegramId);
                telegramRepository.save(TelegramId.builder().telegramId(Long.valueOf(telegramId)).build());
            } catch (TelegramApiException e) {
                e.printStackTrace();
                throw new RuntimeException("Новый id не добавлен");
            }
        }
        else throw new RuntimeException("Валидация id прошла неуспешно");
    }
}
