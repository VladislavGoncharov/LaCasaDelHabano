package com.vladislavgoncharov.lacasadelhabano.dto;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Builder;

import java.util.Objects;

@Builder
public class BasketDTO {

    public BasketDTO() {
    }

    public BasketDTO(Long id, Long reserveId, Long itemId, String itemName, String itemOption, Integer itemPrice, String itemPhoto) {
        this.id = id;
        this.reserveId = reserveId;
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemOption = itemOption;
        this.itemPrice = itemPrice;
        this.itemPhoto = itemPhoto;
    }

    private Long id;

    private Long reserveId;
    private Long itemId;
    private String itemName;
    private String itemOption;
    private Integer itemPrice;
    private String itemPhoto;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getReserveId() {
        return reserveId;
    }

    public void setReserveId(Long reserveId) {
        this.reserveId = reserveId;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemOption() {
        return itemOption;
    }

    public void setItemOption(String itemOption) {
        this.itemOption = itemOption;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BasketDTO basketDTO = (BasketDTO) o;

        return itemId.equals(basketDTO.itemId) && itemOption.equals(basketDTO.itemOption);
    }

    @Override
    public int hashCode() {
        return Objects.hash(itemId, itemOption);
    }

    @Override
    @JsonValue
    public String toString() {
        return "BasketDTO{" +
                "id=" + id +
                ", reserveId=" + reserveId +
                ", itemId=" + itemId +
                ", itemName='" + itemName + '\'' +
                ", itemOption='" + itemOption + '\'' +
                ", itemPrice=" + itemPrice +
                ", itemPhoto='" + itemPhoto + '\'' +
                '}';
    }
}

