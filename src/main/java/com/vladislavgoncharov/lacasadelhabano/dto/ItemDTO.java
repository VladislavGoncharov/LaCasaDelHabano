package com.vladislavgoncharov.lacasadelhabano.dto;

import com.vladislavgoncharov.lacasadelhabano.entity.enums.TypeItem;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemDTO {

    private Long id;
    //common variables and ru language
    private TypeItem type;
    private String series;
    private String brand;
    private String name;
    private String typeOfAccessory;
    private String factoryName;

    private int price;
    private int size;
    private int ringGauge;
    private int fortress;

    private String photo;
    private String photoSmall;
    private MultipartFile photoMultipartFile;

    private String country;
    private String description;
    private String articleNumber;

    private Map<String,Integer> option = new HashMap<>();
    private String optionJSON;
    private int optionSize;
    //only en language variables
    private String enLangSeries;
    private String enLangBrand;
    private String enLangName;
    private String enLangTypeOfAccessory;

    private String enLangCountry;
    private String enLangDescription;

    private Map<String,Integer> enLangOption = new HashMap<>();
    private String enLangOptionJSON;
    private boolean visible;




    public String getClassCssForListSimilarProductsOnPageItem(int numberItemInList) {

        return switch (numberItemInList) {
            case 3 -> "col-lg-3 col-4 d-none d-sm-block catalog__card";
            case 4 -> "col-lg-3 col-4 d-none d-lg-block catalog__card";
            default -> "col-lg-3 col-sm-4 col-6 catalog__card";
        };
    }

    @Override
    public String toString() {
        return "ItemDTO{" +
                "id=" + id +
                ",\n type=" + type +
                ",\n series='" + series + '\'' +
                ",\n brand='" + brand + '\'' +
                ",\n name='" + name + '\'' +
                ",\n typeOfAccessory='" + typeOfAccessory + '\'' +
                ",\n price=" + price +
                ",\n size=" + size +
                ",\n ringGauge=" + ringGauge +
                ",\n fortress=" + fortress +
                ",\n photo='" + photo + '\'' +
                ",\n photoSmall='" + photoSmall + '\'' +
                ",\n photoMultipartFile=" + photoMultipartFile +
                ",\n country='" + country + '\'' +
                ",\n description='" + description + '\'' +
                ",\n articleNumber='" + articleNumber + '\'' +
                ",\n option=" + option +
                ",\n optionJSON='" + optionJSON + '\'' +
                ",\n optionSize=" + optionSize +
                ",\n enLangSeries='" + enLangSeries + '\'' +
                ",\n enLangBrand='" + enLangBrand + '\'' +
                ",\n enLangName='" + enLangName + '\'' +
                ",\n enLangTypeOfAccessory='" + enLangTypeOfAccessory + '\'' +
                ",\n enLangCountry='" + enLangCountry + '\'' +
                ",\n enLangDescription='" + enLangDescription + '\'' +
                ",\n enLangOption=" + enLangOption +
                ",\n enLangOptionJSON='" + enLangOptionJSON + '\'' +
                '}';
    }
}
