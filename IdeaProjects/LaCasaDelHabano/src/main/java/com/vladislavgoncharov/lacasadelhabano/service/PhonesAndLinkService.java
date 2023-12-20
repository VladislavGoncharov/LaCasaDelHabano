package com.vladislavgoncharov.lacasadelhabano.service;

import com.vladislavgoncharov.lacasadelhabano.dto.PhonesAndLinkDTO;

public interface PhonesAndLinkService {

    PhonesAndLinkDTO getPhonesAndLink();

    void updatePhoneAndLink(String phoneAndLink);
}
