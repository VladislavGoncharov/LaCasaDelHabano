package com.vladislavgoncharov.lacasadelhabano.controller;

import com.vladislavgoncharov.lacasadelhabano.dto.ItemDTO;
import com.vladislavgoncharov.lacasadelhabano.service.ItemService;
import com.vladislavgoncharov.lacasadelhabano.service.NewsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.annotation.MultipartConfig;

@Controller
@MultipartConfig
public class MainController {

    private final ItemService itemService;
    private final NewsService newsService;

    public MainController(ItemService itemService, NewsService newsService) {
        this.itemService = itemService;
        this.newsService = newsService;
    }

    @RequestMapping("/")
    public String mainPage() {
        // Используйте атрибут "redirect" для перенаправления на /ru
        return "redirect:/ru";
    }

    @RequestMapping("/{lang}")
    public String mainPage(@PathVariable("lang") String lang) {
        if (lang.equalsIgnoreCase("ru")) return "ru-main-page";
        else return "en-main-page";
    }

    @RequestMapping("/{lang}/about-us")
    public String aboutUs(@PathVariable("lang") String lang, Model model) {
        model.addAttribute("lastNews", newsService.getLastNews(lang));

        if (lang.equalsIgnoreCase("ru")) return "ru-about-us";
        else return "en-about-us";
    }

    @RequestMapping("/{lang}/catalog")
    public String catalog(@PathVariable("lang") String lang, Model model) {
        model.addAttribute("mapSubsections", itemService.getAllMainSubsections(lang));

        if (lang.equalsIgnoreCase("ru")) return "ru-catalog";
        else return "en-catalog";
    }

    @RequestMapping("/{lang}/contact")
    public String contact(@PathVariable("lang") String lang) {
        if (lang.equalsIgnoreCase("ru")) return "ru-contact";
        else return "en-contact";
    }

    @RequestMapping("/{lang}/item/{itemId}")
    public String item(@PathVariable("lang") String lang, @PathVariable("itemId") Long itemId, Model model) {

        ItemDTO itemDTO = itemService.getItemById(lang, itemId);

        model.addAttribute("item", itemDTO);
        model.addAttribute("mapBreadCrumbs", itemService.getLinksToBreadCrumbs(lang, itemDTO));
        model.addAttribute("listSimilarProducts", itemService.getSimilarProducts(lang, itemDTO));
        if (lang.equalsIgnoreCase("ru")) return "ru-item";
        else return "en-item";
    }

    @RequestMapping("/{lang}/news")
    public String news(@PathVariable("lang") String lang) {
        if (lang.equalsIgnoreCase("ru")) return "ru-news";
        else return "en-news";
    }

    @RequestMapping("/{lang}/payment-and-delivery")
    public String paymentAndDelivery(@PathVariable("lang") String lang) {
        if (lang.equalsIgnoreCase("ru")) return "ru-payment-and-delivery";
        else return "en-payment-and-delivery";
    }

    @RequestMapping("/{lang}/to-wholesale-buyers")
    public String toWholesaleBuyers(@PathVariable("lang") String lang, Model model) {
        model.addAttribute("quantityItems", itemService.getQuantityItemsAsAnArrayChars());

        if (lang.equalsIgnoreCase("ru")) return "ru-to-wholesale-buyers";
        else return "en-to-wholesale-buyers";
    }

    @RequestMapping("/{lang}/privacy-policy")
    public String privacyPolicy(@PathVariable("lang") String lang) {
        if (lang.equalsIgnoreCase("ru")) return "ru-privacy-policy";
        else return "en-privacy-policy";
    }

}
