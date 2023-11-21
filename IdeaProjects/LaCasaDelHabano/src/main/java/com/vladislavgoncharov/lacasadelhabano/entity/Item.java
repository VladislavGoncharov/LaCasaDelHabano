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

    private static final String SEQ_NAME = "seq_item";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQ_NAME)
    @SequenceGenerator(name = SEQ_NAME, sequenceName = SEQ_NAME, allocationSize = 1)
    private Long id;
    //common variables and ru language

    @Enumerated(EnumType.STRING)
    private TypeItem type;
    private String brand;
    private String name;
    private String series;
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
    private String enLangDescription;


    @ElementCollection
    @CollectionTable(name = "item_option_en", joinColumns = @JoinColumn(name = "item_id"))
    @MapKeyColumn(name = "option_key_en")
    @Column(name = "option_value_en")
    private Map<String,Integer> enLangOption = new HashMap<>();

}
