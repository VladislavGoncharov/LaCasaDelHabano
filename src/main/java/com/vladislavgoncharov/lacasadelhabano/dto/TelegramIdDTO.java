package com.vladislavgoncharov.lacasadelhabano.dto;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class TelegramIdDTO {

    private Long id;
    private String telegramId;
}