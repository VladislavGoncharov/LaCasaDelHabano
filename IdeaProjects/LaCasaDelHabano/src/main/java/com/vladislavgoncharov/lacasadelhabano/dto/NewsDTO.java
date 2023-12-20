package com.vladislavgoncharov.lacasadelhabano.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class NewsDTO {

    private Long id;

    private LocalDate date;
    private String photo;
    private MultipartFile photoMultipartFile;

    //common variables and ru language
    private String header;
    private String mainText;
    private String tag;
    //only en language variables
    private String enLangHeader;
    private String enLangMainText;
    private String enLangTag;
}
