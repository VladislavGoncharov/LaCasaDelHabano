package com.vladislavgoncharov.lacasadelhabano.utilities;

import com.vladislavgoncharov.lacasadelhabano.dto.ItemDTO;
import com.vladislavgoncharov.lacasadelhabano.entity.enums.TypeItem;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.*;

@Data
@Component
public class MainSubsectionsOfTypesOfItems {
    private Map<String, Set<String>> mapSubsectionsOfTypesRu = new HashMap<>();
    private Map<String, Set<String>> mapSubsectionsOfTypesEn = new HashMap<>();

    public Map<String, Set<String>> updateAndGetAllMainSubsections(String lang, List<ItemDTO> itemDTOS) {
        if (lang.equalsIgnoreCase("ru")) {
            mapSubsectionsOfTypesRu.clear();
            return updateAndGetSubsections(mapSubsectionsOfTypesRu, itemDTOS);
        }
        else {
            mapSubsectionsOfTypesEn.clear();
            return updateAndGetSubsections(mapSubsectionsOfTypesEn, itemDTOS);
        }
    }

    public Map<String, Set<String>> updateAndGetSubsections(Map<String, Set<String>> mapSubsectionsOfTypes, List<ItemDTO> itemDTOS) {
        mapSubsectionsOfTypes.clear();

        itemDTOS.forEach(itemDTO -> {
            String keyMap;

            switch (itemDTO.getType()) {
                case CIGAR -> {
                    keyMap = TypeItem.CIGAR.getTypeItem() + "-series";
                    addTypeInMap(mapSubsectionsOfTypes, keyMap, itemDTO.getSeries());
                    keyMap = TypeItem.CIGAR.getTypeItem() + "-brands";
                    addTypeInMap(mapSubsectionsOfTypes, keyMap, itemDTO.getBrand());
                    keyMap = TypeItem.CIGAR.getTypeItem() + "-factory-name";
                    addTypeInMap(mapSubsectionsOfTypes, keyMap, itemDTO.getFactoryName());
                }
                case CIGARILLO -> {
                    keyMap = TypeItem.CIGARILLO.getTypeItem() + "-brands";
                    addTypeInMap(mapSubsectionsOfTypes, keyMap, itemDTO.getBrand());
                }
                case COFFEE -> {
                    keyMap = TypeItem.COFFEE.getTypeItem() + "-brands";
                    addTypeInMap(mapSubsectionsOfTypes, keyMap, itemDTO.getBrand());
                }
                case ACCESSORY -> {
                    keyMap = TypeItem.ACCESSORY.getTypeItem() + "-type-of-accessories";
                    addTypeInMap(mapSubsectionsOfTypes, keyMap, itemDTO.getTypeOfAccessory());
                }
            }
        });

        return mapSubsectionsOfTypes;
    }

    private void addTypeInMap(Map<String, Set<String>> mapSubsectionsOfTypes, String keyMap, String type) {
        type = type.toLowerCase(Locale.ROOT);

        if (mapSubsectionsOfTypes.containsKey(keyMap)) {
            Set<String> types = mapSubsectionsOfTypes.get(keyMap);
            types.add(type);
            mapSubsectionsOfTypes.put(keyMap,types);
        }
        else mapSubsectionsOfTypes.put(keyMap, new TreeSet<>(List.of(type)));
    }
}
