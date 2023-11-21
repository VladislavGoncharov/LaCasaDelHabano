package com.vladislavgoncharov.lacasadelhabano.mapper;

import com.vladislavgoncharov.lacasadelhabano.dto.BasketDTO;
import com.vladislavgoncharov.lacasadelhabano.dto.ReserveDTO;
import com.vladislavgoncharov.lacasadelhabano.entity.Basket;
import com.vladislavgoncharov.lacasadelhabano.entity.Reserve;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Mapper
public interface ReserveMapper {

    ReserveMapper MAPPER = Mappers.getMapper(ReserveMapper.class);

    default ReserveDTO fromReserve(Reserve reserve) {
        return ReserveDTO.builder()
                .id(reserve.getId())
                .datetime(reserve.getDatetime().format(DateTimeFormatter.ofPattern("dd MMMM yyyy hh:mm:ss")))
                .name(reserve.getName())
                .mug(reserve.getMug())
                .telOrEmail(reserve.getTelOrEmail())
                .numberOfGuests(reserve.getNumberOfGuests())
                .message(reserve.getMessage())
                .type(reserve.getType())
                .newsName(reserve.getNewsName())
                .basket(fromBasketList(reserve.getBasket()))
                .build();
    }

    default List<ReserveDTO> fromReserveList(List<Reserve> reserves) {
        return reserves.stream()
                .map(this::fromReserve)
                .collect(Collectors.toList());
    }

    default Reserve toFirstReserve(ReserveDTO reserveDTO, List<Basket> baskets) {
        return Reserve.builder()
                .datetime(LocalDateTime.now())
                .name(reserveDTO.getName())
                .mug(reserveDTO.getMug())
                .telOrEmail(reserveDTO.getTelOrEmail())
                .numberOfGuests(reserveDTO.getNumberOfGuests())
                .message(reserveDTO.getMessage())
                .type(reserveDTO.getType())
                .newsName(reserveDTO.getNewsName())
                .basket(baskets)
                .build();
    }
    default Reserve toUpdateReserve(ReserveDTO reserveDTO) {
        return Reserve.builder()
                .id(reserveDTO.getId())
                .datetime(LocalDateTime.now())
                .name(reserveDTO.getName())
                .mug(reserveDTO.getMug())
                .telOrEmail(reserveDTO.getTelOrEmail())
                .numberOfGuests(reserveDTO.getNumberOfGuests())
                .message(reserveDTO.getMessage())
//                .basket(reserveDTO.getBasket())
                .build();
    }

    default List<BasketDTO> fromBasketList(List<Basket> baskets) {
        return baskets.stream()
                .map(this::fromBasket)
                .collect(Collectors.toList());
    }

    default BasketDTO fromBasket (Basket basket) {
        return BasketDTO.builder()
                .id(basket.getId())
                .itemId(basket.getItemIdentifier())
                .itemName(basket.getItemName())
                .itemOption(basket.getItemOption())
                .itemPhoto(basket.getItemPhoto())
                .itemPrice(basket.getItemPrice())
                .reserveId(basket.getReserve().getId())
                .build();
    }

}
