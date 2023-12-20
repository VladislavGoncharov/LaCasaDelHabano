package com.vladislavgoncharov.lacasadelhabano.controller;

import com.vladislavgoncharov.lacasadelhabano.service.ItemService;
import com.vladislavgoncharov.lacasadelhabano.service.PhonesAndLinkService;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@ControllerAdvice
public class GlobalControllerAdvice {

    private final PhonesAndLinkService phonesAndLinkService;
    private final ItemService itemService;

    public GlobalControllerAdvice(PhonesAndLinkService phonesAndLinkService, ItemService itemService) {
        this.phonesAndLinkService = phonesAndLinkService;
        this.itemService = itemService;
    }

    @ModelAttribute
    public void addCommonAttributes(Model model, HttpServletRequest request) {
        // Здесь вы можете добавить общие атрибуты для всех контроллеров
        model.addAttribute("phonesAndLink", phonesAndLinkService.getPhonesAndLink());

        Map<String, Integer> amountItemsByCategory;
        if (request.getRequestURL().toString().contains("/ru"))
            amountItemsByCategory = itemService.getAmountItemsByCategory("ru");
        else amountItemsByCategory = itemService.getAmountItemsByCategory("en");

        model.addAttribute("cigarAmount", amountItemsByCategory.get("cigarAmount"));
        model.addAttribute("cigarilloAmount", amountItemsByCategory.get("cigarilloAmount"));
        model.addAttribute("coffeeAmount", amountItemsByCategory.get("coffeeAmount"));
        model.addAttribute("accessoryAmount", amountItemsByCategory.get("accessoryAmount"));


    }

    // Обработка всех ошибок
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleException(HttpServletRequest request, Exception e, Model model) {
        System.out.println("error");
        System.out.println(request.getRequestURL().toString());
        e.printStackTrace();
        addCommonAttributes(model, request);
        if (request.getRequestURL().toString().contains("/ru"))
            return "ru-handler-error";
        else
            return "en-handler-error";
    }
}
