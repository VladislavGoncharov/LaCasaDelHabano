package com.vladislavgoncharov.lacasadelhabano.mapper;

import com.vladislavgoncharov.lacasadelhabano.dto.ItemDTO;
import com.vladislavgoncharov.lacasadelhabano.entity.Item;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper
public interface ItemMapper {

    ItemMapper MAPPER = Mappers.getMapper(ItemMapper.class);

    default ItemDTO fromItemAllLang(Item item) {
        return ItemDTO.builder()
                .id(item.getId())
                .type(item.getType())
                .brand(item.getBrand())
                .name(item.getName())
                .series(item.getSeries())
                .typeOfAccessory(item.getTypeOfAccessory())
                .price(item.getPrice())
                .size(item.getSize())
                .ringGauge(item.getRingGauge())
                .fortress(item.getFortress())
                .option(item.getOption())
                .photo(item.getPhoto())
                .photoSmall(item.getPhotoSmall())
                .country(item.getCountry())
                .description(item.getDescription())
                .articleNumber(item.getArticleNumber())
                .optionSize(item.getOption().size())
                .factoryName(item.getFactoryName())
                .visible(item.isVisible())

                .enLangBrand(item.getEnLangBrand())
                .enLangName(item.getEnLangName())
                .enLangSeries(item.getEnLangSeries())
                .enLangTypeOfAccessory(item.getEnLangTypeOfAccessory())
                .enLangOption(item.getEnLangOption())
                .enLangCountry(item.getEnLangCountry())
                .enLangDescription(item.getEnLangDescription())
                .build();
    }
    default ItemDTO fromItemRu(Item item) {
        return ItemDTO.builder()
                .id(item.getId())
                .type(item.getType())
                .brand(item.getBrand())
                .name(item.getName())
                .series(item.getSeries())
                .typeOfAccessory(item.getTypeOfAccessory())
                .price(item.getPrice())
                .size(item.getSize())
                .ringGauge(item.getRingGauge())
                .fortress(item.getFortress())
                .option(item.getOption())
                .photo(item.getPhoto())
                .photoSmall(item.getPhotoSmall())
                .country(item.getCountry())
                .description(item.getDescription())
                .articleNumber(item.getArticleNumber())
                .optionSize(item.getOption().size())
                .factoryName(item.getFactoryName())
                .visible(item.isVisible())
                .build();
    }

    default ItemDTO fromItemEn(Item item) {
        return ItemDTO.builder()
                .id(item.getId())
                .type(item.getType())
                .brand(item.getEnLangBrand())
                .name(item.getEnLangName())
                .series(item.getEnLangSeries())
                .typeOfAccessory(item.getEnLangTypeOfAccessory())
                .price(item.getPrice())
                .size(item.getSize())
                .ringGauge(item.getRingGauge())
                .fortress(item.getFortress())
                .option(item.getEnLangOption())
                .photo(item.getPhoto())
                .photoSmall(item.getPhotoSmall())
                .country(item.getEnLangCountry())
                .description(item.getEnLangDescription())
                .articleNumber(item.getArticleNumber())
                .optionSize(item.getEnLangOption().size())
                .visible(item.isVisible())
                .factoryName(item.getFactoryName())
                .build();
    }

    default List<ItemDTO> fromItemList(String lang, List<Item> items) {
        if (lang.equalsIgnoreCase("allLang"))
            return items.stream()
                    .map(this::fromItemAllLang)
                    .collect(Collectors.toList());
        else if (lang.equalsIgnoreCase("ru"))
            return items.stream()
                .map(this::fromItemRu)
                .collect(Collectors.toList());
        else return items.stream()
                .map(this::fromItemEn)
                .collect(Collectors.toList());
    }

    default ItemDTO fromItemBriefData(ItemDTO itemDTO) {
        return ItemDTO.builder()
                .id(itemDTO.getId())
                .type(itemDTO.getType())
                .brand(itemDTO.getBrand())
                .name(itemDTO.getName())
                .factoryName(itemDTO.getFactoryName())
                .series(itemDTO.getSeries())
                .typeOfAccessory(itemDTO.getTypeOfAccessory())
                .price(itemDTO.getPrice())
                .size(itemDTO.getSize())
                .ringGauge(itemDTO.getRingGauge())
                .fortress(itemDTO.getFortress())
                .option(itemDTO.getOption())
                .photo(itemDTO.getPhoto())
                .optionSize(itemDTO.getOption().size())
                .build();
    }

    default ItemDTO fromItemBriefEnData(ItemDTO itemDTO) {
        return ItemDTO.builder()
                .id(itemDTO.getId())
                .type(itemDTO.getType())
                .brand(itemDTO.getEnLangBrand())
                .name(itemDTO.getEnLangName())
                .series(itemDTO.getEnLangSeries())
                .typeOfAccessory(itemDTO.getEnLangTypeOfAccessory())
                .price(itemDTO.getPrice())
                .size(itemDTO.getSize())
                .ringGauge(itemDTO.getRingGauge())
                .fortress(itemDTO.getFortress())
                .option(itemDTO.getEnLangOption())
                .photo(itemDTO.getPhoto())
                .optionSize(itemDTO.getEnLangOption().size())
                .factoryName(itemDTO.getFactoryName())
                .visible(itemDTO.isVisible())
                .factoryName(itemDTO.getFactoryName())
                .build();
    }

    default List<ItemDTO> fromItemBriefDataList(String lang, List<ItemDTO> itemDTOS) {
            return itemDTOS.stream()
                    .map(this::fromItemBriefData)
                    .collect(Collectors.toList());
    }

    default Item toItem(ItemDTO itemDTO) {
        return Item.builder()
                .id(itemDTO.getId())
                .type(itemDTO.getType())
                .brand(itemDTO.getBrand())
                .name(itemDTO.getName())
                .series(itemDTO.getSeries())
                .typeOfAccessory(itemDTO.getTypeOfAccessory())
                .price(itemDTO.getPrice())
                .size(itemDTO.getSize())
                .ringGauge(itemDTO.getRingGauge())
                .fortress(itemDTO.getFortress())
                .option(itemDTO.getOption())
                .photo(itemDTO.getPhoto())
                .photoSmall(itemDTO.getPhotoSmall())
                .country(itemDTO.getCountry())
                .description(itemDTO.getDescription())
                .articleNumber(itemDTO.getArticleNumber())
                .factoryName(itemDTO.getFactoryName())
                .visible(itemDTO.isVisible())
                // en lang variables
                .enLangName(itemDTO.getEnLangName())
                .enLangBrand(itemDTO.getEnLangBrand())
                .enLangSeries(itemDTO.getEnLangSeries())
                .enLangTypeOfAccessory(itemDTO.getEnLangTypeOfAccessory())
                .enLangCountry(itemDTO.getEnLangCountry())
                .enLangDescription(itemDTO.getEnLangDescription())
                .enLangOption(itemDTO.getEnLangOption())
                .build();
    }

}
