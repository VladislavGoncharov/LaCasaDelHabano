package com.vladislavgoncharov.lacasadelhabano.entity;

import com.vladislavgoncharov.lacasadelhabano.dto.ItemDTO;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
//@ToString

@Entity
@Table(name = "reserve")
public class Reserve {

    private static final String SEQ_NAME = "seq_reserve";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQ_NAME)
    @SequenceGenerator(name = SEQ_NAME, sequenceName = SEQ_NAME, allocationSize = 1)
    private Long id;
    @DateTimeFormat(pattern = "dd-MMMM-yyyy hh:mm:ss")
    private LocalDateTime datetime;

    private String mug;
    private String name;
    private String telOrEmail;
    private Integer numberOfGuests;
    private String message;

    private String type;
    private String newsName;

    @OneToMany(mappedBy = "reserve", cascade = CascadeType.ALL)
    private List<Basket> basket;

}
