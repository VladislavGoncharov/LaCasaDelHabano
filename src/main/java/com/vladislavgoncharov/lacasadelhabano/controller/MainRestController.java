package com.vladislavgoncharov.lacasadelhabano.controller;

import com.vladislavgoncharov.lacasadelhabano.dto.*;
import com.vladislavgoncharov.lacasadelhabano.service.ItemService;
import com.vladislavgoncharov.lacasadelhabano.service.NewsService;
import com.vladislavgoncharov.lacasadelhabano.service.ReserveAndFeedbackAndRegistrationService;
import com.vladislavgoncharov.lacasadelhabano.utilities.DisabledDates;
import com.vladislavgoncharov.lacasadelhabano.utilities.SearchQuery;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpSession;
import java.time.LocalDate;
import java.util.List;
import java.util.TreeSet;

@RestController
@MultipartConfig
@RequestMapping("/api")
public class MainRestController {

    private final ItemService itemService;
    private final NewsService newsService;
    private final ReserveAndFeedbackAndRegistrationService reserveAndFeedbackAndRegistrationService;
    private final DisabledDates disabledDates;


    public MainRestController(ItemService itemService, NewsService newsService, ReserveAndFeedbackAndRegistrationService reserveAndFeedbackAndRegistrationService, DisabledDates disabledDates) {
        this.itemService = itemService;
        this.newsService = newsService;
        this.reserveAndFeedbackAndRegistrationService = reserveAndFeedbackAndRegistrationService;
        this.disabledDates = disabledDates;
    }

    @GetMapping("/getItemsRu")
    public List<ItemDTO> getAllItemsRu() {
        return itemService.findAllItemBriefData("ru");
    }

    @GetMapping("/getItemsEn")
    public List<ItemDTO> getAllItemsEn() {
        return itemService.findAllItemBriefData("en");
    }

    @GetMapping("/getNewsRu")
    public List<NewsDTO> getAllNewsRu() {
        return newsService.findAllItem("ru");
    }

    @GetMapping("/getNewsEn")
    public List<NewsDTO> getAllNewsEn() {
        return newsService.findAllItem("en");
    }

    @GetMapping("/getSearch")
    public List<SearchQuery> getSearchResult(String lang, String searchQuery) {
        return itemService.getResultSearchQuery(lang, searchQuery);
    }
    @GetMapping("/getDisabledDates")
    public TreeSet<LocalDate> getDisabledDates() {
        try {
            disabledDates.updateDate();
            return disabledDates.getDisabledDates();
        } catch (RuntimeException e) {
            return new TreeSet<>();
        }
    }

    @GetMapping("/session")
    public String getSessionIsNew(HttpSession session) {
        return session.getId();
    }
    @PostMapping("/send-feedback")
    public ResponseEntity<Boolean> sendFeedback(@ModelAttribute FeedbackDTO feedbackDTO) {
        if (reserveAndFeedbackAndRegistrationService.addFeedback(feedbackDTO)) {
            return ResponseEntity.ok(true);
        } else
            return ResponseEntity.badRequest().body(false);
    }

    @PostMapping("/send-reserve")
    public ResponseEntity<Boolean> sendReserve(@ModelAttribute ReserveDTO reserveDTO) {
        if (reserveAndFeedbackAndRegistrationService.addReserve(reserveDTO)) {
            return ResponseEntity.ok(true);
        } else
            return ResponseEntity.badRequest().body(false);
    }

    @PostMapping("/send-registration-of-wholesale-customer")
    public ResponseEntity<Boolean> sendRegistrationOfWholesaleCustomer(@ModelAttribute RegistrationOfWholesaleCustomerDTO registrationOfWholesaleCustomerDTO) {
        if (reserveAndFeedbackAndRegistrationService.addRegistrationOfWholesaleCustomer(registrationOfWholesaleCustomerDTO)) {
            return ResponseEntity.ok(true);
        } else
            return ResponseEntity.badRequest().body(false);
    }


}
