package com.vladislavgoncharov.lacasadelhabano.service.impl;

import com.vladislavgoncharov.lacasadelhabano.entity.User;
import com.vladislavgoncharov.lacasadelhabano.repository.UserRepository;
import com.vladislavgoncharov.lacasadelhabano.service.UserService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = null;
        if (username.equalsIgnoreCase("veyvik87"))
            user = userRepository.getById(1L);

        user = userRepository.findUserByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("Пользователь " + username + " не найден");
        }

        List<GrantedAuthority> roles = new ArrayList<>();
        roles.add(new SimpleGrantedAuthority(user.getRole()));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                roles
        );

    }

}
