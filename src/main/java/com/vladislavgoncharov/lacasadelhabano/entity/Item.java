package com.vladislavgoncharov.lacasadelhabano.entity;

import com.vladislavgoncharov.lacasadelhabano.entity.enums.TypeItem;
import lombok.*;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

@Entity
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //common variables and ru language
    @Enumerated(EnumType.STRING)
    private TypeItem type;
    private String brand;
    private String name;
    private String series;
    private String typeOfAccessory;
    private String factoryName;

    private int price;
    private int size;
    private int ringGauge;
    private int fortress;

    private String photo;
    private String photoSmall;
    private String country;
    @Lob
    @Column(name = "description", columnDefinition = "LONGTEXT")
    private String description;
    private String articleNumber;

    @ElementCollection
    @CollectionTable(name = "item_option", joinColumns = @JoinColumn(name = "item_id"))
    @MapKeyColumn(name = "option_key")
    @Column(name = "option_value")
    private Map<String,Integer> option = new HashMap<>();

    //only en language variables
    private String enLangSeries;
    private String enLangBrand;
    private String enLangName;
    private String enLangTypeOfAccessory;

    private String enLangCountry;
    @Lob
    @Column(name = "en_lang_description", columnDefinition = "LONGTEXT")
    private String enLangDescription;


    @ElementCollection
    @CollectionTable(name = "item_option_en", joinColumns = @JoinColumn(name = "item_id"))
    @MapKeyColumn(name = "option_key_en")
    @Column(name = "option_value_en")
    private Map<String,Integer> enLangOption = new HashMap<>();

    private boolean visible;

}
