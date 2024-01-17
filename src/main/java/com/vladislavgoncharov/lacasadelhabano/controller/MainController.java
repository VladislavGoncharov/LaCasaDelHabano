package com.vladislavgoncharov.lacasadelhabano.controller;

import com.vladislavgoncharov.lacasadelhabano.dto.ItemDTO;
import com.vladislavgoncharov.lacasadelhabano.service.ItemService;
import com.vladislavgoncharov.lacasadelhabano.service.NewsService;
import com.vladislavgoncharov.lacasadelhabano.utilities.TitleOnCatalogPage;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.annotation.MultipartConfig;
import java.time.LocalDateTime;

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
    public String mainPage(@PathVariable("lang") String lang, Model model) {

        if (lang.equalsIgnoreCase("ru")) {
            insertSeoDataInModal(model, "https://cigarsplace.ru/ru",
                    "Главная • La Casa Del Habano St-Petersburg",
                    "Купите кубинские сигары в Санкт-Петербурге в La Casa Del Habano. Широкий ассортимент, высокое качество и приятные цены. Доставка по всей России. Опыт настоящего вкуса с La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/ru",
                    "купить кубинские сигары в спб и Санкт-Петербурге. купить кубинские сигарилы в спб и Санкт-Петербурге. купить кубинский кофе в спб и Санкт-Петербурге. купить аксессуары для сигар в спб и Санкт-Петербурге. "
                    );
            return "ru-main-page";
        } else {
            insertSeoDataInModal(model, "https://cigarsplace.ru/en",
                    "Main • La Casa Del Habano St-Petersburg",
                    "Buy Cuban cigars in St. Petersburg at La Casa Del Habano. A wide range, high quality and reasonable prices. Delivery throughout Russia. Experience real taste with La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/en",
                    "buy Cuban cigars in SPB and St. Petersburg. buy Cuban cigarillos in SPB and St. Petersburg. buy Cuban coffee in SPB and St. Petersburg. buy cigar accessories in SPB and St. Petersburg."
            );
            return "en-main-page";
        }
    }

    @RequestMapping("/{lang}/about-us")
    public String aboutUs(@PathVariable("lang") String lang, Model model) {
        model.addAttribute("lastNews", newsService.getLastNews(lang));

        if (lang.equalsIgnoreCase("ru")) {
            insertSeoDataInModal(model, "https://cigarsplace.ru/ru/about-us",
                    "О нас • La Casa Del Habano St-Petersburg",
                    "О нас La Casa Del Habano про кубинские сигары в Санкт-Петербурге. Широкий ассортимент, высокое качество и приятные цены. Доставка по всей России. Опыт настоящего вкуса с La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/ru/about-us",
                    "О нас La Casa Del Habano про кубинские сигары в спб и Санкт-Петербурге. О нас La Casa Del Habano про кубинские сигарилы в спб и Санкт-Петербурге. О нас La Casa Del Habano про кубинский кофе в спб и Санкт-Петербурге. О нас La Casa Del Habano про аксессуары для сигар в спб и Санкт-Петербурге."
            );
            return "ru-about-us";
        } else {
            insertSeoDataInModal(model, "https://cigarsplace.ru/en/about-us",
                    "About-us • La Casa Del Habano St-Petersburg",
                    "About us La Casa Del Habano about Cuban cigars in St. Petersburg. A wide range, high quality and reasonable prices. Delivery throughout Russia. Experience real taste with La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/en/about-us",
                    "About us La Casa Del Habano about Cuban cigars in SPB and St. Petersburg. About us La Casa Del Habano about Cuban cigarillos in SPB and St. Petersburg. About us La Casa Del Habano about Cuban coffee in SPB and St. Petersburg. About us La Casa Del Habano about cigar accessories in SPB and St. Petersburg."
            );
            return "en-about-us";
        }
    }

    @RequestMapping("/{lang}/catalog")
    public String catalog(@PathVariable("lang") String lang, Model model) {
        model.addAttribute("mapSubsections", itemService.getAllMainSubsections(lang));
        model.addAttribute("titleOnCatalogPage", new TitleOnCatalogPage());

        if (lang.equalsIgnoreCase("ru")) {
            insertSeoDataInModal(model, "https://cigarsplace.ru/ru/catalog",
                    "Каталог • La Casa Del Habano St-Petersburg",
                    "Каталог La Casa Del Habano про кубинские сигары в Санкт-Петербурге. Широкий ассортимент, высокое качество и приятные цены. Доставка по всей России. Опыт настоящего вкуса с La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/ru/catalog",
                    "Каталог La Casa Del Habano кубинские сигары в спб и Санкт-Петербурге. Каталог La Casa Del Habano кубинские сигарилы в спб и Санкт-Петербурге. Каталог La Casa Del Habano кубинский кофе в спб и Санкт-Петербурге. Каталог La Casa Del Habano аксессуары для сигар в спб и Санкт-Петербурге."
            );
            return "ru-catalog";
        } else {
            insertSeoDataInModal(model, "https://cigarsplace.ru/en/catalog",
                    "Catalog • La Casa Del Habano St-Petersburg",
                    "La Casa Del Habano catalog about Cuban cigars in St. Petersburg. A wide range, high quality and reasonable prices. Delivery throughout Russia. Experience real taste with La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/en/catalog",
                    "La Casa Del Habano Cuban cigars catalog in SPB and St. Petersburg. Catalog of La Casa Del Habano Cuban cigarillos in SPB and St. Petersburg. La Casa Del Habano Cuban coffee catalog in SPB and St. Petersburg. La Casa Del Habano cigar accessories catalog in SPB and St. Petersburg."
            );
            return "en-catalog";
        }
    }

    @RequestMapping("/{lang}/contact")
    public String contact(@PathVariable("lang") String lang, Model model) {
        if (lang.equalsIgnoreCase("ru")) {
            insertSeoDataInModal(model, "https://cigarsplace.ru/ru/contact",
                    "Контакты • La Casa Del Habano St-Petersburg",
                    "Контакты La Casa Del Habano про кубинские сигары в Санкт-Петербурге. Широкий ассортимент, высокое качество и приятные цены. Доставка по всей России. Опыт настоящего вкуса с La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/ru/contact",
                    "Контакты La Casa Del Habano в спб и Санкт-Петербурге."
            );
            return "ru-contact";
        } else {
            insertSeoDataInModal(model, "https://cigarsplace.ru/en/contact",
                    "Contacts • La Casa Del Habano St-Petersburg",
                    "Contacts of La Casa Del Habano about Cuban cigars in St. Petersburg. A wide range, high quality and reasonable prices. Delivery throughout Russia. Experience real taste with La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/en/contact",
                    "Contacts of La Casa Del Habano in SPB and St. Petersburg."
            );
            return "en-contact";
        }
    }

    @RequestMapping("/{lang}/item/{itemId}")
    public String item(@PathVariable("lang") String lang, @PathVariable("itemId") Long itemId, Model model) {

        ItemDTO itemDTO = itemService.getItemById(lang, itemId);

        model.addAttribute("item", itemDTO);
        model.addAttribute("mapBreadCrumbs", itemService.getLinksToBreadCrumbs(lang, itemDTO));
        model.addAttribute("listSimilarProducts", itemService.getSimilarProducts(lang, itemDTO));
        model.addAttribute("breadcrumbName", itemDTO.getBrand() + ", " + itemDTO.getBrand());

        if (lang.equalsIgnoreCase("ru")) {
            insertSeoDataInModal(model, "https://cigarsplace.ru/ru/item/" + itemId,
                    itemDTO.getBrand() + ", " + itemDTO.getBrand() + " • La Casa Del Habano St-Petersburg",
                    "Каталог La Casa Del Habano про кубинские сигары в Санкт-Петербурге. Широкий ассортимент, высокое качество и приятные цены. Доставка по всей России. Опыт настоящего вкуса с La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/ru/item/" + itemId,
                    "Купить " + itemDTO.getBrand() + ", " + itemDTO.getBrand() + " в La Casa Del Habano в спб и Санкт-Петербурге за " + itemDTO.getPrice() + " р."
            );
            return "ru-item";
        } else {
            insertSeoDataInModal(model, "https://cigarsplace.ru/en/item/" + itemId,
                    itemDTO.getBrand() + ", " + itemDTO.getBrand() + " • La Casa Del Habano St-Petersburg",
                    "La Casa Del Habano catalog about Cuban cigars in St. Petersburg. A wide range, high quality and reasonable prices. Delivery throughout Russia. Experience real taste with La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/en/item/" + itemId,
                    "Buy " + itemDTO.getBrand() + ", " + itemDTO.getBrand() + " at La Casa Del Habano in SPB and St. Petersburg for " + itemDTO.getPrice() + " R."
            );
            return "en-item";
        }
    }

    @RequestMapping("/{lang}/news")
    public String news(@PathVariable("lang") String lang, Model model) {

        if (lang.equalsIgnoreCase("ru")) {
            insertSeoDataInModal(model, "https://cigarsplace.ru/ru/news",
                    "Новости • La Casa Del Habano St-Petersburg",
                    "Новости про кубинские сигары в Санкт-Петербурге в La Casa Del Habano. Широкий ассортимент, высокое качество и приятные цены. Доставка по всей России. Опыт настоящего вкуса с La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/ru/news",
                    "новости про кубинские сигары в спб и Санкт-Петербурге. новости про кубинские сигарилы в спб и Санкт-Петербурге. новости про кубинский кофе в спб и Санкт-Петербурге. новости про аксессуары для сигар в спб и Санкт-Петербурге."
            );
            return "ru-news";
        } else {
            insertSeoDataInModal(model, "https://cigarsplace.ru/en/news",
                    "News • La Casa Del Habano St-Petersburg",
                    "News about Cuban cigars in St. Petersburg at La Casa Del Habano. A wide range, high quality and reasonable prices. Delivery throughout Russia. Experience real taste with La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/en/news",
                    "news about Cuban cigars in SPB and St. Petersburg. news about Cuban cigarillos in SPB and St. Petersburg. news about Cuban coffee in SPB and St. Petersburg. news about cigar accessories in SPB and St. Petersburg."
            );
            return "en-news";
        }
    }

    @RequestMapping("/{lang}/payment-and-delivery")
    public String paymentAndDelivery(@PathVariable("lang") String lang, Model model) {

        if (lang.equalsIgnoreCase("ru")) {
            insertSeoDataInModal(model, "https://cigarsplace.ru/ru/payment-and-delivery",
                    "Оплата и доставка • La Casa Del Habano St-Petersburg",
                    "Оплата и доставка в La Casa Del Habano в Санкт-Петербурге. Широкий ассортимент, высокое качество и приятные цены. Доставка по всей России. Опыт настоящего вкуса с La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/ru/payment-and-delivery",
                    "Оплата и доставка в La Casa Del Habano в спб и Санкт-Петербурге."
            );
            return "ru-payment-and-delivery";
        } else {
            insertSeoDataInModal(model, "https://cigarsplace.ru/en/payment-and-delivery",
                    "Payment and delivery • La Casa Del Habano St-Petersburg",
                    "Payment and delivery at La Casa Del Habano in St. Petersburg. A wide range, high quality and reasonable prices. Delivery throughout Russia. Experience real taste with La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/en/payment-and-delivery",
                    "Payment and delivery in Apostille in SPB and St. Petersburg."
            );
            return "en-payment-and-delivery";
        }
    }

    @RequestMapping("/{lang}/to-wholesale-buyers")
    public String toWholesaleBuyers(@PathVariable("lang") String lang, Model model) {
        model.addAttribute("quantityItems", itemService.getQuantityItemsAsAnArrayChars());

        if (lang.equalsIgnoreCase("ru")) {
            insertSeoDataInModal(model, "https://cigarsplace.ru/ru/to-wholesale-buyers",
                    "Оптовым покупателям • La Casa Del Habano St-Petersburg",
                    "Оптовым покупателям в La Casa Del Habano в Санкт-Петербурге. Широкий ассортимент, высокое качество и приятные цены. Доставка по всей России. Опыт настоящего вкуса с La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/ru/to-wholesale-buyers",
                    "Оптовым покупателям в La Casa Del Habano в спб и Санкт-Петербурге."
            );
            return "ru-to-wholesale-buyers";
        } else {
            insertSeoDataInModal(model, "https://cigarsplace.ru/en/to-wholesale-buyers",
                    "For wholesale customers • La Casa Del Habano St-Petersburg",
                    "To wholesale customers at La Casa Del Habano in St. Petersburg. A wide range, high quality and reasonable prices. Delivery throughout Russia. Experience real taste with La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/en/to-wholesale-buyers",
                    "To wholesale customers at La Casa Del Habano in SPB and St. Petersburg."
            );
            return "en-to-wholesale-buyers";
        }
    }

    @RequestMapping("/{lang}/privacy-policy")
    public String privacyPolicy(@PathVariable("lang") String lang, Model model) {

        if (lang.equalsIgnoreCase("ru")) {
            insertSeoDataInModal(model, "https://cigarsplace.ru/ru/privacy-policy",
                    "Политика конфиденциальности • La Casa Del Habano St-Petersburg",
                    "Политика конфиденциальности в La Casa Del Habano в Санкт-Петербурге. Широкий ассортимент, высокое качество и приятные цены. Доставка по всей России. Опыт настоящего вкуса с La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/ru/privacy-policy",
                    "Политика конфиденциальности в La Casa Del Habano в спб и Санкт-Петербурге."
            );
            return "ru-privacy-policy";
        } else {
            insertSeoDataInModal(model, "https://cigarsplace.ru/en/privacy-policy",
                    "Privacy policy • La Casa Del Habano St-Petersburg",
                    "Privacy Policy at La Casa Del Habano in St. Petersburg. A wide range, high quality and reasonable prices. Delivery throughout Russia. Experience real taste with La Casa Del Habano St-Petersburg!",
                    "https://cigarsplace.ru/en/privacy-policy",
                    "Privacy Policy at La Casa Del Habano in SPB and St. Petersburg."
            );
            return "en-privacy-policy";
        }
    }

    @RequestMapping("/ru/admin")
    public String admin() {
        return "admin";
    }

    @RequestMapping("/ru/login")
    public String loginPage() {

        return "login";
    }


    private void insertSeoDataInModal(Model model, String pageUrl, String pageTitle, String pageDescription, String readActionTarget, String pageKeywords) {

        model.addAttribute("pageUrl", pageUrl);
        model.addAttribute("pageTitle", pageTitle);
        model.addAttribute("pageDescription", pageDescription);
        model.addAttribute("datePublished", "2023-12-20T06:45:02+00:00");
        model.addAttribute("dateModified", LocalDateTime.now());
        model.addAttribute("readActionTarget", readActionTarget);
        model.addAttribute("pageKeywords", pageKeywords);

    }
}
