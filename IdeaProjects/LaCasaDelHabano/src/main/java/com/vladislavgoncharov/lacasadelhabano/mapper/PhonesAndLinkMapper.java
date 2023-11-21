package com.vladislavgoncharov.lacasadelhabano.mapper;

import com.vladislavgoncharov.lacasadelhabano.dto.PhonesAndLinkDTO;
import com.vladislavgoncharov.lacasadelhabano.entity.PhonesAndLink;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;


@Mapper
public interface PhonesAndLinkMapper {

    PhonesAndLinkMapper MAPPER = Mappers.getMapper(PhonesAndLinkMapper.class);

    default PhonesAndLinkDTO fromPhonesAndLink(PhonesAndLink phonesAndLink) {
        return PhonesAndLinkDTO.builder()
                .id(phonesAndLink.getId())
                .kuznechnyTelephonyHouse(phonesAndLink.getKuznechnyTelephonyHouse())
                .kuznechnyTelephonyMobile(phonesAndLink.getKuznechnyTelephonyMobile())
                .petrogradskoyTelephonyHouse(phonesAndLink.getPetrogradskoyTelephonyHouse())
                .petrogradskoyTelephonyMobile(phonesAndLink.getPetrogradskoyTelephonyMobile())
                .linkFB(phonesAndLink.getLinkFB())
                .linkTLG(phonesAndLink.getLinkTLG())
                .linkINST(phonesAndLink.getLinkINST())
                .linkVK(phonesAndLink.getLinkVK())
                .linkMail(phonesAndLink.getLinkMail())
                .linkDevelopers(phonesAndLink.getLinkDevelopers())
                .linkCubaRestaurant(phonesAndLink.getLinkCubaRestaurant())
                .linkCubaDay(phonesAndLink.getLinkCubaDay())
                .build();
    }

    default PhonesAndLink toPhonesAndLink(PhonesAndLinkDTO phonesAndLinkDTO) {
        return PhonesAndLink.builder()
                .id(phonesAndLinkDTO.getId())
                .kuznechnyTelephonyHouse(phonesAndLinkDTO.getKuznechnyTelephonyHouse())
                .kuznechnyTelephonyMobile(phonesAndLinkDTO.getKuznechnyTelephonyMobile())
                .petrogradskoyTelephonyHouse(phonesAndLinkDTO.getPetrogradskoyTelephonyHouse())
                .petrogradskoyTelephonyMobile(phonesAndLinkDTO.getPetrogradskoyTelephonyMobile())
                .linkFB(phonesAndLinkDTO.getLinkFB())
                .linkTLG(phonesAndLinkDTO.getLinkTLG())
                .linkINST(phonesAndLinkDTO.getLinkINST())
                .linkVK(phonesAndLinkDTO.getLinkVK())
                .linkMail(phonesAndLinkDTO.getLinkMail())
                .linkDevelopers(phonesAndLinkDTO.getLinkDevelopers())
                .linkCubaRestaurant(phonesAndLinkDTO.getLinkCubaRestaurant())
                .linkCubaDay(phonesAndLinkDTO.getLinkCubaDay())
                .build();
    }


}
