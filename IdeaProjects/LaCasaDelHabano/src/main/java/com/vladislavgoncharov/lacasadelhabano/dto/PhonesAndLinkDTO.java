package com.vladislavgoncharov.lacasadelhabano.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

public class PhonesAndLinkDTO {
    private Long id;

    private String kuznechnyTelephonyHouse;
    private String kuznechnyTelephonyMobile;
    private String petrogradskoyTelephonyHouse;
    private String petrogradskoyTelephonyMobile;
    private String linkTLG;
    private String linkVK;
    private String linkINST;
    private String linkFB;
    private String linkMail;
    private String linkDevelopers;
    private String linkCubaRestaurant;
    private String linkCubaDay;

}
