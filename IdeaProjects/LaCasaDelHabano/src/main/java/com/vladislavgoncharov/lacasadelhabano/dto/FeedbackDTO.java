package com.vladislavgoncharov.lacasadelhabano.dto;

import lombok.*;

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
