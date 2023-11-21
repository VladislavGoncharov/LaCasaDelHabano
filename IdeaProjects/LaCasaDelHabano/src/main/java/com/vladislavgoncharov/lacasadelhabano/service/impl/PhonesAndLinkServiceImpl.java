package com.vladislavgoncharov.lacasadelhabano.service.impl;

import com.vladislavgoncharov.lacasadelhabano.dto.PhonesAndLinkDTO;
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
}
