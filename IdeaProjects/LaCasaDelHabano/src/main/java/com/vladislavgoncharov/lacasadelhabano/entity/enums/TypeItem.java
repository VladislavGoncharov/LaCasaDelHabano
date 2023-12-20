package com.vladislavgoncharov.lacasadelhabano.entity.enums;

public enum TypeItem {

    CIGAR("cigar"),
    CIGARILLO("cigarillo"),
    COFFEE("coffee"),
    ACCESSORY("accessory");

    private final String type;

    TypeItem(String type) {
        this.type = type;
    }

    public String getTypeItem() {
        return type;
    }

}
