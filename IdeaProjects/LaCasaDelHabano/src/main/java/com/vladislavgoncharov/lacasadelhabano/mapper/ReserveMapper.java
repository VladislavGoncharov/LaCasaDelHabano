package com.vladislavgoncharov.lacasadelhabano.mapper;

import com.vladislavgoncharov.lacasadelhabano.dto.BasketDTO;
import com.vladislavgoncharov.lacasadelhabano.dto.ReserveDTO;
import com.vladislavgoncharov.lacasadelhabano.entity.Basket;
import com.vladislavgoncharov.lacasadelhabano.entity.Reserve;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper
public interface ReserveMapper {

    ReserveMapper MAPPER = Mappers.getMapper(ReserveMapper.class);

    default ReserveDTO fromReserve(Reserve reserve) {
        return ReserveDTO.builder()
                .id(reserve.getId())
                .datetime(reserve.getDatetime().format(DateTimeFormatter.ofPattern("dd MMMM yyyy")))
                .name(reserve.getName())
                .mug(reserve.getMug())
                .telOrEmail(reserve.getTelOrEmail())
                .numberOfGuests(reserve.getNumberOfGuests())
                .message(reserve.getMessage())
                .type(reserve.getType())
                .newsName(reserve.getNewsName())
                .basketMap(fromBasketList(reserve.getBasket()))
                .fullPrice(getFullPrice(reserve.getBasket()))
                .quantityItems(reserve.getBasket().size())
                .build();
    }

    default String getFullPrice(List<Basket> baskets) {
        int fullPrice = baskets.stream()
                .map(Basket::getItemPrice)
                .reduce(0, Integer::sum
                );

        return new DecimalFormat("#,###").format(fullPrice);
    }

    default List<ReserveDTO> fromReserveList(List<Reserve> reserves) {
        return reserves.stream()
                .map(this::fromReserve)
                .collect(Collectors.toList());
    }

    default Reserve toFirstReserve(ReserveDTO reserveDTO, List<Basket> baskets) {
        return Reserve.builder()
                .datetime(LocalDate.parse(reserveDTO.getDatetime(), DateTimeFormatter.ofPattern("dd.MM.yyyy")))
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
                .datetime(LocalDate.now())
                .name(reserveDTO.getName())
                .mug(reserveDTO.getMug())
                .telOrEmail(reserveDTO.getTelOrEmail())
                .numberOfGuests(reserveDTO.getNumberOfGuests())
                .message(reserveDTO.getMessage())
//                .basket(reserveDTO.getBasket())
                .build();
    }

    // сделать перевод корзины из лист в мап по количеству и показывать в админке
    default Map<BasketDTO, Integer> fromBasketList(List<Basket> baskets) {

        Map<BasketDTO, Integer> map = new HashMap<>();

        baskets.forEach(basket -> {
            BasketDTO basketDTO = fromBasket(basket);

            if (map.containsKey(basketDTO)) {
                int value = map.get(basketDTO);
                value++;
                map.put(basketDTO, value);
            } else map.put(basketDTO, 1);

        });

        return map;
    }

    default BasketDTO fromBasket(Basket basket) {
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
