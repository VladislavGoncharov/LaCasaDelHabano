package com.vladislavgoncharov.lacasadelhabano.dto;

import com.vladislavgoncharov.lacasadelhabano.entity.enums.TypeItem;
import lombok.*;


import java.util.HashMap;
import java.util.Map;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ItemDTO {

    private Long id;
    //common variables and ru language
    private TypeItem type;
    private String series;
    private String brand;
    private String name;
    private String typeOfAccessory;

    private int price;
    private int size;
    private int ringGauge;
    private int fortress;

    private String photo;
    private String photoSmall;
    private String country;
    private String description;
    private String articleNumber;

    private Map<String,Integer> option = new HashMap<>();
    private int optionSize;
    //only en language variables
    private String enLangSeries;
    private String enLangBrand;
    private String enLangName;
    private String enLangTypeOfAccessory;

    private String enLangCountry;
    private String enLangDescription;

    private Map<String,Integer> enLangOption = new HashMap<>();

    public String getClassCssForListSimilarProductsOnPageItem(int numberItemInList) {

        return switch (numberItemInList) {
            case 3 -> "col-lg-3 col-4 d-none d-sm-block catalog__card";
            case 4 -> "col-lg-3 col-4 d-none d-lg-block catalog__card";
            default -> "col-lg-3 col-sm-4 col-6 catalog__card";
        };
    }

}
