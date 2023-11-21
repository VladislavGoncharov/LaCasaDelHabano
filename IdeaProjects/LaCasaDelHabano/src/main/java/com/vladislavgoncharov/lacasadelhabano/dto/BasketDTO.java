package com.vladislavgoncharov.lacasadelhabano.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

public class BasketDTO {


    private Long id;

    private Long reserveId;
    private Long itemId;
    private String itemName;
    private String itemOption;
    private Integer itemPrice;
    private String itemPhoto;
}

