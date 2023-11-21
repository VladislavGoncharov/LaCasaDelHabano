package com.vladislavgoncharov.lacasadelhabano.dto;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class FeedbackDTO {

    private Long id;

    private String name;
    private String telOrEmail;
    private String datetime;
    private String message;
}
