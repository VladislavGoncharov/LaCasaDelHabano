package com.vladislavgoncharov.lacasadelhabano.dto;

import com.vladislavgoncharov.lacasadelhabano.entity.Item;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
//@ToString
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

    @Override
    public String toString() {
        return "ReserveDTO{" +
                "\nid=" + id +
                "\n, datetime='" + datetime + '\'' +
                "\n, mug='" + mug + '\'' +
                "\n, name='" + name + '\'' +
                "\n, telOrEmail='" + telOrEmail + '\'' +
                "\n, numberOfGuests=" + numberOfGuests +
                "\n, message='" + message + '\'' +
                "\n, type='" + type + '\'' +
                "\n, newsName='" + newsName + '\'' +
                "\n, firstBasket='" + firstBasket + '\'' +
                "\n, basket=" + basket +
                '}';
    }

}
