package com.vladislavgoncharov.lacasadelhabano.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

@Entity
@Table(name = "links")
public class PhonesAndLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
