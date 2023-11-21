package com.vladislavgoncharov.lacasadelhabano.dto;

import lombok.*;

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

    //common variables and ru language
    private String header;
    private String mainText;
    private String tag;
    //only en language variables
    private String enLangHeader;
    private String enLangMainText;
    private String enLangTag;
}
