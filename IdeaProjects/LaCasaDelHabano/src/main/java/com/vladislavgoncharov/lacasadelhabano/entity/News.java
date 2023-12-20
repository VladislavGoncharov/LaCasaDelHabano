package com.vladislavgoncharov.lacasadelhabano.entity;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

@Entity
@Table(name = "news")
public class News {
    private static final String SEQ_NAME = "seq_news";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQ_NAME)
    @SequenceGenerator(name = SEQ_NAME, sequenceName = SEQ_NAME, allocationSize = 1)
    private Long id;

    @DateTimeFormat(pattern = "dd/MM/yy")
    private LocalDate date;
    private String photo;
    //common variables and ru language
    private String header;
    @Lob
    @Column(name = "main_text", columnDefinition = "CLOB")
    private String mainText;
    private String tag;
    //only en language variables
    private String enLangHeader;
    @Lob
    @Column(name = "en_lang_main_text", columnDefinition = "CLOB")
    private String enLangMainText;
    private String enLangTag;
}
