package com.vladislavgoncharov.lacasadelhabano.dto;

import lombok.*;

import java.util.List;
import java.util.Map;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReserveDTO {


    private Long id;
    private String datetime;


    private String mug;
    private String name;
    private String telOrEmail;
    private Integer numberOfGuests;
    private String message;

    private String type;
    private String newsName;

    private String firstBasket;
    private List<BasketDTO> basket;

    private Map<BasketDTO, Integer> basketMap;

    private String fullPrice;
    private Integer quantityItems;

    @Override
    public String toString() {
        return "ReserveDTO{" +
                "id=" + id +
                ", datetime='" + datetime + '\'' +
                ", mug='" + mug + '\'' +
                ", name='" + name + '\'' +
                ", telOrEmail='" + telOrEmail + '\'' +
                ", numberOfGuests=" + numberOfGuests +
                ", message='" + message + '\'' +
                ", type='" + type + '\'' +
                ", newsName='" + newsName + '\'' +
                ", firstBasket='" + firstBasket + '\'' +
                ", basket=" + basket +
                ", basketMap=" + basketMap +
                ", fullPrice='" + fullPrice + '\'' +
                ", quantityItems=" + quantityItems +
                '}';
    }
}




