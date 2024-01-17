package com.vladislavgoncharov.lacasadelhabano.entity;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

@Entity
@Table(name = "registration_of_wholesale_customer")
public class RegistrationOfWholesaleCustomer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;
    private String telOrEmail;
    private String nameOfOrganization;
    private String city;
    private String subjectOfLetter;
    @DateTimeFormat(pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime datetime;
    private String message;
}
