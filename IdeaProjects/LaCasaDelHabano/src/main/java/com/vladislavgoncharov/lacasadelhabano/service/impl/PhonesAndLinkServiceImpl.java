package com.vladislavgoncharov.lacasadelhabano.service.impl;

import com.vladislavgoncharov.lacasadelhabano.dto.PhonesAndLinkDTO;
import com.vladislavgoncharov.lacasadelhabano.entity.PhonesAndLink;
import com.vladislavgoncharov.lacasadelhabano.mapper.PhonesAndLinkMapper;
import com.vladislavgoncharov.lacasadelhabano.repository.PhonesAndLinkRepository;
import com.vladislavgoncharov.lacasadelhabano.service.PhonesAndLinkService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PhonesAndLinkServiceImpl implements PhonesAndLinkService {

    private final PhonesAndLinkMapper MAPPER = PhonesAndLinkMapper.MAPPER;

    private final PhonesAndLinkRepository phonesAndLinkRepository;

    public PhonesAndLinkServiceImpl(PhonesAndLinkRepository phonesAndLinkRepository) {
        this.phonesAndLinkRepository = phonesAndLinkRepository;
    }


    @Override
    public PhonesAndLinkDTO getPhonesAndLink() {
        return MAPPER.fromPhonesAndLink(phonesAndLinkRepository.getById(1L));
    }

    @Override
    public void updatePhoneAndLink(String phoneAndLink) {
        PhonesAndLink phonesAndLink = phonesAndLinkRepository.getById(1L);

        String[] phoneAndLinkArray = phoneAndLink.split("&%&");


        switch (phoneAndLinkArray[1]) {
            case "kuznechnyTelephonyHouse" -> phonesAndLink.setKuznechnyTelephonyHouse(phoneAndLinkArray[0]);
            case "kuznechnyTelephonyMobile" -> phonesAndLink.setKuznechnyTelephonyMobile(phoneAndLinkArray[0]);
            case "petrogradskoyTelephonyHouse" -> phonesAndLink.setPetrogradskoyTelephonyHouse(phoneAndLinkArray[0]);
            case "petrogradskoyTelephonyMobile" -> phonesAndLink.setPetrogradskoyTelephonyMobile(phoneAndLinkArray[0]);
            case "linkVK" -> phonesAndLink.setLinkVK(phoneAndLinkArray[0]);
            case "linkINST" -> phonesAndLink.setLinkINST(phoneAndLinkArray[0]);
            case "linkFB" -> phonesAndLink.setLinkFB(phoneAndLinkArray[0]);
            case "linkMail" -> phonesAndLink.setLinkMail(phoneAndLinkArray[0]);
            case "linkDevelopers" -> phonesAndLink.setLinkDevelopers(phoneAndLinkArray[0]);
            case "linkCubaRestaurant" -> phonesAndLink.setLinkCubaRestaurant(phoneAndLinkArray[0]);
            case "linkCubaDay" -> phonesAndLink.setLinkCubaDay(phoneAndLinkArray[0]);
        }

        phonesAndLinkRepository.save(phonesAndLink);
    }
}
