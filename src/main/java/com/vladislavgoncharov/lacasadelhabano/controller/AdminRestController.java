package com.vladislavgoncharov.lacasadelhabano.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.vladislavgoncharov.lacasadelhabano.dto.ItemDTO;
import com.vladislavgoncharov.lacasadelhabano.dto.NewsDTO;
import com.vladislavgoncharov.lacasadelhabano.dto.PhonesAndLinkDTO;
import com.vladislavgoncharov.lacasadelhabano.service.ItemService;
import com.vladislavgoncharov.lacasadelhabano.service.NewsService;
import com.vladislavgoncharov.lacasadelhabano.service.PhonesAndLinkService;
import com.vladislavgoncharov.lacasadelhabano.service.ReserveAndFeedbackAndRegistrationService;
import com.vladislavgoncharov.lacasadelhabano.utilities.DisabledDates;
import com.vladislavgoncharov.lacasadelhabano.utilities.TitleOnCatalogPage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

@RestController
@MultipartConfig
@RequestMapping("/api/admin")
public class AdminRestController {

    private final ItemService itemService;
    private final NewsService newsService;
    private final ReserveAndFeedbackAndRegistrationService reserveAndFeedbackAndRegistrationService;
    private final PhonesAndLinkService phonesAndLinkService;
    private final DisabledDates disabledDates;


    public AdminRestController(ItemService itemService, NewsService newsService, ReserveAndFeedbackAndRegistrationService reserveAndFeedbackAndRegistrationService, PhonesAndLinkService phonesAndLinkService, DisabledDates disabledDates) {
        this.itemService = itemService;
        this.newsService = newsService;
        this.reserveAndFeedbackAndRegistrationService = reserveAndFeedbackAndRegistrationService;
        this.phonesAndLinkService = phonesAndLinkService;
        this.disabledDates = disabledDates;
    }


    @GetMapping("/getAllDataForAdmin")
    public Map<String, List<?>> getAllDataForAdmin() {

        Map<String, List<?>> mapData = new HashMap<>();

        mapData.put("allItems", itemService.findAllItemForAdmin());
        mapData.put("allNews", newsService.findAllItemForAdmin());
        mapData.put("allReserves", reserveAndFeedbackAndRegistrationService.findAllReserves());
        mapData.put("allFeedbacks", reserveAndFeedbackAndRegistrationService.findAllFeedbacks());
        mapData.put("allRegistrationOfWholesaleCustomer", reserveAndFeedbackAndRegistrationService.findAllRegistrationOfWholesaleCustomer());

        return mapData;
    }

    @GetMapping("/getPhoneAndLink")
    public PhonesAndLinkDTO getPhoneAndLink() {
        return phonesAndLinkService.getPhonesAndLink();
    }

    @GetMapping("/getTitleOnCatalogPage")
    public TitleOnCatalogPage getTitleOnCatalogPage() {
        return new TitleOnCatalogPage();
    }

    @DeleteMapping("/deleteItem")
    public ResponseEntity<Boolean> deleteItem(@RequestBody String id) {
        if (itemService.deleteItem(Long.valueOf(id))) return ResponseEntity.ok(true);
        else return ResponseEntity.badRequest().body(false);
    }

    @DeleteMapping("/deleteNews")
    public ResponseEntity<Boolean> deleteNews(@RequestBody String id) {
        if (newsService.deleteNews(Long.valueOf(id))) return ResponseEntity.ok(true);
        else return ResponseEntity.badRequest().body(false);
    }

    @DeleteMapping("/deleteReserve")
    public ResponseEntity<Boolean> deleteReserve(@RequestBody String id) {
        if (reserveAndFeedbackAndRegistrationService.deleteReserve(Long.valueOf(id))) return ResponseEntity.ok(true);
        else return ResponseEntity.badRequest().body(false);
    }

    @DeleteMapping("/deleteFeedback")
    public ResponseEntity<Boolean> deleteFeedback(@RequestBody String id) {
        if (reserveAndFeedbackAndRegistrationService.deleteFeedback(Long.valueOf(id))) return ResponseEntity.ok(true);
        else return ResponseEntity.badRequest().body(false);
    }

    @DeleteMapping("/deleteRegistration")
    public ResponseEntity<Boolean> deleteRegistration(@RequestBody String id) {
        if (reserveAndFeedbackAndRegistrationService.deleteRegistration(Long.valueOf(id)))
            return ResponseEntity.ok(true);
        else return ResponseEntity.badRequest().body(false);
    }


    @PostMapping("/addItem")
    public ResponseEntity<Boolean> addItemDTO(@ModelAttribute ItemDTO itemDTO) {
        try {
            itemService.addItem(itemDTO);
            return ResponseEntity.ok(true);
        } catch (RuntimeException | JsonProcessingException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PostMapping("/addNews")
    public ResponseEntity<Boolean> addNewsDTO(@ModelAttribute NewsDTO newsDTO) {
        try {
            newsService.addNews(newsDTO);
            return ResponseEntity.ok(true);
        } catch (RuntimeException | IOException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().body(false);
        }
    }

    @GetMapping("/getNewsById/{id}")
    public NewsDTO getNewsDTOById(@PathVariable String id) {
        return newsService.getNewsById(Long.valueOf(id));
    }

    @GetMapping("/getItemById/{id}")
    public ItemDTO getItemDTOById(@PathVariable String id) {
        return itemService.getItemById("allLang", Long.valueOf(id));
    }

    @PutMapping("/updateNews")
    public ResponseEntity<Boolean> updateNewsDTO(@ModelAttribute NewsDTO newsDTO) {
        try {
            newsService.updateNews(newsDTO);
            return ResponseEntity.ok(true);
        } catch (RuntimeException | IOException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PutMapping("/updateItem")
    public ResponseEntity<Boolean> updateItemDTO(@ModelAttribute ItemDTO itemDTO) {
        try {
            itemService.updateItem(itemDTO);
            return ResponseEntity.ok(true);
        } catch (RuntimeException | IOException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PutMapping("/updatePhoneAndLink")
    public ResponseEntity<Boolean> updatePhoneAndLink(@RequestParam String phoneAndLink) {
        try {
            phonesAndLinkService.updatePhoneAndLink(phoneAndLink);
            return ResponseEntity.ok(true);
        } catch (RuntimeException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().body(false);
        }
    }

    @GetMapping("/getAllTelegramId")
    public List<String> getAllTelegramId() {
        return reserveAndFeedbackAndRegistrationService.findAllTelegramId();
    }

    @PostMapping("/addTelegramId/{telegramId}")
    public ResponseEntity<Boolean> addTelegramId(@PathVariable String telegramId) {
        try {
            reserveAndFeedbackAndRegistrationService.addTelegramId(telegramId);
            return ResponseEntity.ok(true);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(false);
        }
    }

    @DeleteMapping("/deleteTelegramId/{telegramId}")
    public ResponseEntity<Boolean> deleteTelegramId(@PathVariable String telegramId) {
        try {
            reserveAndFeedbackAndRegistrationService.deleteTelegramId(telegramId);
            return ResponseEntity.ok(true);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(false);
        }
    }


    @PutMapping("/updateTitleOnCatalogPage")
    public ResponseEntity<Boolean> updateTitleOnCatalogPage(@ModelAttribute TitleOnCatalogPage titleOnCatalogPage) {
        try {
            TitleOnCatalogPage.updateData(titleOnCatalogPage);
            return ResponseEntity.ok(true);
        } catch (RuntimeException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().body(false);
        }
    }
    @PutMapping("/updateVisible/{id}")
    public ResponseEntity<Boolean> updateVisibleItem(@PathVariable Long id) {
        try {
            itemService.setVisibleItem(id);
            return ResponseEntity.ok(true);
        } catch (RuntimeException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().body(false);
        }
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
    @PostMapping("/addDisabledDates/{date}")
    public void addDisabledDates(@PathVariable String date) {
        try {
            disabledDates.addDisableDate(date);
        } catch (RuntimeException e) {
            e.printStackTrace();
        }
    }
    @DeleteMapping("/deleteDisabledDates/{date}")
    public void deleteDisabledDates(@PathVariable String date) {
        try {
            disabledDates.deleteDisableDate(date);
        } catch (RuntimeException e) {
            e.printStackTrace();
        }
    }
}
