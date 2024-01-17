package com.vladislavgoncharov.lacasadelhabano.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    private Long id;

    private String username;
    private String password;
    private String matchingPassword;
    private String role;

}
