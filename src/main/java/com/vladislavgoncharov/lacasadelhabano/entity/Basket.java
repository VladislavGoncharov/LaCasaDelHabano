package com.vladislavgoncharov.lacasadelhabano.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@AllArgsConstructor
@NoArgsConstructor
@Builder

@Entity
@Table(name = "basket")
public class Basket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reserve_id")
    private Reserve reserve;

    private Long itemIdentifier;
    private String itemOption;
    private String itemName;
    private Integer itemPrice;

    @JsonIgnore
    @JsonProperty("idBasket")
    public Long getId() {
        return id;
    }
    @JsonIgnore
    @JsonProperty("idBasket")
    public void setId(Long id) {
        this.id = id;
    }

    public Reserve getReserve() {
        return reserve;
    }

    public void setReserve(Reserve reserve) {
        this.reserve = reserve;
    }
    @JsonProperty("id")
    public Long getItemIdentifier() {
        return itemIdentifier;
    }
    @JsonProperty("id")
    public void setItemIdentifier(Long itemIdentifier) {
        this.itemIdentifier = itemIdentifier;
    }
    @JsonProperty("option")
    public String getItemOption() {
        return itemOption;
    }
    @JsonProperty("option")
    public void setItemOption(String itemOption) {
        this.itemOption = itemOption;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Integer getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(Integer itemPrice) {
        this.itemPrice = itemPrice;
    }

    public String getItemPhoto() {
        return itemPhoto;
    }

    public void setItemPhoto(String itemPhoto) {
        this.itemPhoto = itemPhoto;
    }

    private String itemPhoto;

}
