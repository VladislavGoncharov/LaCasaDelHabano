package com.vladislavgoncharov.lacasadelhabano.utilities;

import com.vladislavgoncharov.lacasadelhabano.dto.ItemDTO;
import com.vladislavgoncharov.lacasadelhabano.entity.enums.TypeItem;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class SimilarProduct {

    public List<ItemDTO> getSimilarProduct(List<ItemDTO> allItemsDTO, ItemDTO itemDTO) {
        allItemsDTO = allItemsDTO.stream().filter(item -> !Objects.equals(item.getId(), itemDTO.getId())).toList();

        List<ItemDTO> similarProduct;
        try {
            similarProduct = getFourItems(allItemsDTO, itemDTO);
        } catch (RuntimeException exception) {
            System.out.println(exception.getMessage());
            return randomFourItems(null, allItemsDTO, 4);
        }

        return similarProduct;
    }

    private List<ItemDTO> getFourItems(List<ItemDTO> allItemsDTO, ItemDTO itemDTO) {
        Map<Long, ItemDTO> similarProduct = new LinkedHashMap<>();
        switch (itemDTO.getType()) {
            case CIGAR -> {
                List<ItemDTO> similarProductByBrand = allItemsDTO.stream()
                        .filter(
                                item -> item.getType() == TypeItem.CIGAR
                        )
                        .filter(item -> !Objects.isNull(item.getBrand()))
                        .filter(item -> item.getBrand().equalsIgnoreCase(itemDTO.getBrand())).toList();
                for (ItemDTO item : similarProductByBrand) {
                    similarProduct.put(item.getId(), item);
                }
                if (similarProduct.size() < 4) {
                    List<ItemDTO> similarProductBySeries = allItemsDTO.stream()
                            .filter(
                                    item -> item.getType() == TypeItem.CIGAR && !similarProduct.containsKey(item.getId())
                            )
                            .filter(item -> !Objects.isNull(item.getSeries()))
                            .filter(item -> item.getSeries().equalsIgnoreCase(itemDTO.getSeries())).toList();

                    if ((similarProduct.size() + similarProductBySeries.size()) >= 4) {
                        return randomFourItems(similarProduct, similarProductBySeries,
                                4 - similarProduct.size());
                    }
                    else {
                        for (ItemDTO item : similarProductBySeries) {
                            similarProduct.put(item.getId(), item);
                        }

                        List<ItemDTO> similarProductByCigars = allItemsDTO.stream()
                                .filter(
                                        item -> item.getType() == TypeItem.CIGAR && !similarProduct.containsKey(item.getId())
                                ).toList();

                        if ((similarProduct.size() + similarProductByCigars.size()) >= 4) {
                            return randomFourItems(similarProduct, similarProductByCigars,
                                    4 - similarProduct.size());
                        } else {
                            return randomFourItems(similarProduct, allItemsDTO, 4 - similarProduct.size());
                        }

                    }
                } else return randomFourItems(null, similarProduct.values().stream().toList(), 4);
            }
            case CIGARILLO -> {
                List<ItemDTO> similarProductByBrand = allItemsDTO.stream()
                        .filter(
                                item -> item.getType() == TypeItem.CIGARILLO
                        )
                        .filter(item -> !Objects.isNull(item.getBrand()))
                        .filter(item -> item.getBrand().equalsIgnoreCase(itemDTO.getBrand())).toList();
                for (ItemDTO item : similarProductByBrand) {
                    similarProduct.put(item.getId(), item);
                }
                if (similarProduct.size() < 4) {

                    List<ItemDTO> similarProductByCigarillo = allItemsDTO.stream()
                            .filter(
                                    item -> item.getType() == TypeItem.CIGARILLO && !similarProduct.containsKey(item.getId())
                            ).toList();

                    if ((similarProduct.size() + similarProductByCigarillo.size()) >= 4) {
                        return randomFourItems(similarProduct, similarProductByCigarillo,
                                4 - similarProduct.size());
                    } else {
                        return randomFourItems(similarProduct, allItemsDTO, 4 - similarProduct.size());
                    }


                } else return randomFourItems(null, similarProduct.values().stream().toList(), 4);
            }
            case COFFEE -> {
                List<ItemDTO> similarProductByBrand = allItemsDTO.stream()
                        .filter(
                                item -> item.getType() == TypeItem.COFFEE
                        )
                        .filter(item -> !Objects.isNull(item.getBrand()))
                        .filter(item -> item.getBrand().equalsIgnoreCase(itemDTO.getBrand())).toList();
                for (ItemDTO item : similarProductByBrand) {
                    similarProduct.put(item.getId(), item);
                }
                if (similarProduct.size() < 4) {

                    List<ItemDTO> similarProductByCoffee = allItemsDTO.stream()
                            .filter(
                                    item -> item.getType() == TypeItem.COFFEE && !similarProduct.containsKey(item.getId())
                            ).toList();

                    if ((similarProduct.size() + similarProductByCoffee.size()) >= 4) {
                        return randomFourItems(similarProduct, similarProductByCoffee,
                                4 - similarProduct.size());
                    } else {
                        return randomFourItems(similarProduct, allItemsDTO, 4 - similarProduct.size());
                    }


                } else return randomFourItems(null, similarProduct.values().stream().toList(), 4);
            }
            case ACCESSORY -> {
                List<ItemDTO> similarProductByTypeOfAccessory = allItemsDTO.stream()
                        .filter(
                                item -> item.getType() == TypeItem.ACCESSORY
                        )
                        .filter(item -> !Objects.isNull(item.getTypeOfAccessory()))
                        .filter(item -> item.getTypeOfAccessory().equalsIgnoreCase(itemDTO.getTypeOfAccessory())).toList();
                for (ItemDTO item : similarProductByTypeOfAccessory) {
                    similarProduct.put(item.getId(), item);
                }
                if (similarProduct.size() < 4) {

                    List<ItemDTO> similarProductByAccessory = allItemsDTO.stream()
                            .filter(
                                    item -> item.getType() == TypeItem.ACCESSORY && !similarProduct.containsKey(item.getId())
                            ).toList();

                    if ((similarProduct.size() + similarProductByAccessory.size()) >= 4) {
                        return randomFourItems(similarProduct, similarProductByAccessory,
                                4 - similarProduct.size());
                    } else {
                        return randomFourItems(similarProduct, allItemsDTO, 4 - similarProduct.size());
                    }


                } else return randomFourItems(null, similarProduct.values().stream().toList(), 4);
            }
            default ->
                throw new RuntimeException("нет типа айтема");

        }
    }

    private List<ItemDTO> randomFourItems(Map<Long, ItemDTO> mainList, List<ItemDTO> listOfPossibleItems, int countReturnItems) {
        if (listOfPossibleItems.size() == 4 && mainList == null) {
            Collections.shuffle(listOfPossibleItems);
            return listOfPossibleItems;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        while (uniqueNumbers.size() < countReturnItems) {
            Random random = new Random();
            int randomNumber = random.nextInt(listOfPossibleItems.size());
            uniqueNumbers.add(randomNumber);
        }


        List<ItemDTO> randomItems = new ArrayList<>();
        if (mainList != null && mainList.size() < 4) randomItems = new ArrayList<>(mainList.values().stream().toList());
        for (int number : uniqueNumbers) {
            randomItems.add(listOfPossibleItems.get(number));
        }

        Collections.shuffle(randomItems);
        return randomItems;
    }
}
