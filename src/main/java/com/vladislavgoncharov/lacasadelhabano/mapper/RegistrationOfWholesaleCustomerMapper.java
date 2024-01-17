package com.vladislavgoncharov.lacasadelhabano.mapper;

import com.vladislavgoncharov.lacasadelhabano.dto.RegistrationOfWholesaleCustomerDTO;
import com.vladislavgoncharov.lacasadelhabano.entity.RegistrationOfWholesaleCustomer;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Mapper
public interface RegistrationOfWholesaleCustomerMapper {

    RegistrationOfWholesaleCustomerMapper MAPPER = Mappers.getMapper(RegistrationOfWholesaleCustomerMapper.class);

    default RegistrationOfWholesaleCustomerDTO fromRegistrationOfWholesaleCustomer(RegistrationOfWholesaleCustomer registrationOfWholesaleCustomer) {
        return RegistrationOfWholesaleCustomerDTO.builder()
                .id(registrationOfWholesaleCustomer.getId())
                .datetime(registrationOfWholesaleCustomer.getDatetime().format(DateTimeFormatter.ofPattern("dd MMMM yyyy hh:mm:ss")))
                .name(registrationOfWholesaleCustomer.getName())
                .telOrEmail(registrationOfWholesaleCustomer.getTelOrEmail())
                .nameOfOrganization(registrationOfWholesaleCustomer.getNameOfOrganization())
                .subjectOfLetter(registrationOfWholesaleCustomer.getSubjectOfLetter())
                .city(registrationOfWholesaleCustomer.getCity())
                .message(registrationOfWholesaleCustomer.getMessage())
                .build();
    }

    default List<RegistrationOfWholesaleCustomerDTO> fromRegistrationOfWholesaleCustomerList(List<RegistrationOfWholesaleCustomer> registrationOfWholesaleCustomers) {
        return registrationOfWholesaleCustomers.stream()
                .map(this::fromRegistrationOfWholesaleCustomer)
                .collect(Collectors.toList());
    }

    default RegistrationOfWholesaleCustomer toRegistrationOfWholesaleCustomer(RegistrationOfWholesaleCustomerDTO registrationOfWholesaleCustomerDTO) {
        return RegistrationOfWholesaleCustomer.builder()
                .id(registrationOfWholesaleCustomerDTO.getId())
                .datetime(LocalDateTime.now())
                .name(registrationOfWholesaleCustomerDTO.getName())
                .telOrEmail(registrationOfWholesaleCustomerDTO.getTelOrEmail())
                .message(registrationOfWholesaleCustomerDTO.getMessage())
                .nameOfOrganization(registrationOfWholesaleCustomerDTO.getNameOfOrganization())
                .subjectOfLetter(registrationOfWholesaleCustomerDTO.getSubjectOfLetter())
                .city(registrationOfWholesaleCustomerDTO.getCity())
                .build();
    }

}
