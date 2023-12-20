package com.vladislavgoncharov.lacasadelhabano.configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.webjars.WebJarAssetLocator;


@Configuration
public class MainConfiguration implements WebMvcConfigurer {

    @Bean
    public WebJarAssetLocator webJarResourceLocator() {
        return new WebJarAssetLocator();
    }

    @Bean
    public static Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dqtq98nnn",
                "api_key", "295616761695818",
                "api_secret", "xMgR7GeGlw4cJoo7D9h9mKlNi98",
                "secure", true));
    }

}
