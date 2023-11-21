package com.vladislavgoncharov.lacasadelhabano.configuration;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.webjars.WebJarAssetLocator;


//@EnableAutoConfiguration
@Configuration
public class MainConfiguration {

    @Bean
    public WebJarAssetLocator webJarResourceLocator() {
        return new WebJarAssetLocator();
    }
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**").allowedOrigins("*");
//            }
//        };
//    }
//
//    @Bean
//    public TelegramBot telegramBot() {
//
//        try {
//            return new TelegramBot();
//        } catch (TelegramApiException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @Bean
//    public static Cloudinary cloudinary() {
//        return new Cloudinary(ObjectUtils.asMap(
//                "cloud_name", "developervlad",
//                "api_key", "186944654822819",
//                "api_secret", "6OvzVqdRBj-DZlcxhIH-wqP3zbE",
//                "secure", true));
//    }
}
