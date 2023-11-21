package com.vladislavgoncharov.lacasadelhabano.service.impl;

import com.vladislavgoncharov.lacasadelhabano.dto.ItemDTO;
import com.vladislavgoncharov.lacasadelhabano.entity.Item;
import com.vladislavgoncharov.lacasadelhabano.mapper.ItemMapper;
import com.vladislavgoncharov.lacasadelhabano.repository.ItemRepository;
import com.vladislavgoncharov.lacasadelhabano.service.ItemService;
import com.vladislavgoncharov.lacasadelhabano.utilities.LinksToBreadCrumbs;
import com.vladislavgoncharov.lacasadelhabano.utilities.MainSubsectionsOfTypesOfItems;
import com.vladislavgoncharov.lacasadelhabano.utilities.SearchQuery;
import com.vladislavgoncharov.lacasadelhabano.utilities.SimilarProduct;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    private List<ItemDTO> currentItemsDTORuLang = new ArrayList<>();
    private List<ItemDTO> currentItemsDTOEnLang = new ArrayList<>();


    private final ItemMapper MAPPER = ItemMapper.MAPPER;

    private final ItemRepository itemRepository;

    private final LinksToBreadCrumbs linksToBreadCrumbs;
    private final MainSubsectionsOfTypesOfItems subsections;
    private final SimilarProduct similarProduct;

    public ItemServiceImpl(ItemRepository itemRepository, LinksToBreadCrumbs linksToBreadCrumbs, MainSubsectionsOfTypesOfItems mainSubsectionsOfTypesOfItems, SimilarProduct similarProduct) {
        this.itemRepository = itemRepository;
        this.linksToBreadCrumbs = linksToBreadCrumbs;
        this.subsections = mainSubsectionsOfTypesOfItems;
        this.similarProduct = similarProduct;
    }

    @Override
    public List<ItemDTO> findAllItem(String lang) {
        return getCurrentArrayIsFull(lang);
    }

    @Override
    public List<ItemDTO> findAllItemBriefData(String lang) {
        return MAPPER.fromItemBriefDataList(lang, getCurrentArrayIsFull(lang));
    }

    @Override
    public ItemDTO getItemById(String lang, Long id) {
        if (lang.equalsIgnoreCase("ru"))
            return MAPPER.fromItemRu(itemRepository.getById(id));
        else return MAPPER.fromItemEn(itemRepository.getById(id));

    }

    @Override
    public boolean addItem(ItemDTO itemDTO) {
        try {
            itemRepository.save(MAPPER.toItem(itemDTO));
            updateCurrentArrays();
        } catch (RuntimeException exception) {
            return false;
        }
        return true;
    }

    @Override
    public boolean updateItem(ItemDTO itemDTO) {
        try {
            itemRepository.save(MAPPER.toItem(itemDTO));
            updateCurrentArrays();
        } catch (RuntimeException exception) {
            System.out.println(exception.getMessage());
            return false;
        }
        return true;
    }

    @Override
    public boolean deleteItem(Long id) {
        try {
            itemRepository.deleteById(id);
            updateCurrentArrays();
        } catch (RuntimeException exception) {
            System.out.println(exception.getMessage());
            return false;
        }
        return true;
    }

    @Override
    public Map<String, Set<String>> getAllMainSubsections(String lang) {
        if (lang.equalsIgnoreCase("ru")) {
            if (itemRepository.count() == subsections.getMapSubsectionsOfTypesRu().size())
                return subsections.getMapSubsectionsOfTypesRu();
        } else {
            if (itemRepository.count() == subsections.getMapSubsectionsOfTypesEn().size())
                return subsections.getMapSubsectionsOfTypesEn();
        }
        return subsections.updateAndGetAllMainSubsections(lang, getCurrentArrayIsFull(lang));
    }

    @Override
    public Map<String, String> getLinksToBreadCrumbs(String lang, ItemDTO itemDTO) {
        return linksToBreadCrumbs.getLinks(lang, itemDTO);
    }

    @Override
    public List<ItemDTO> getSimilarProducts(String lang, ItemDTO itemDTO) {
        return similarProduct.getSimilarProduct(getCurrentArrayIsFull(lang), itemDTO);
    }

    @Override
    public List<SearchQuery> getResultSearchQuery(String lang, String searchQuery) {
        List<ItemDTO> currentListItemDTO = getCurrentArrayIsFull(lang);

        List<SearchQuery> searchQueries = new ArrayList<>();

        currentListItemDTO.forEach(itemDTO -> {

            if (StringUtils.containsIgnoreCase(itemDTO.getName(), searchQuery)
                    || StringUtils.containsIgnoreCase(itemDTO.getBrand(), searchQuery)) {
                searchQueries.add(SearchQuery.builder()
                        .name(itemDTO.getName() + ", " + itemDTO.getBrand())
                        .link("/item/" + itemDTO.getId())
                        .linkPhoto(itemDTO.getPhoto())
                        .build());
            }
        });

        return searchQueries;
    }

    @Override
    public Map<String, Integer> getAmountItemsByCategory(String lang) {
        List<ItemDTO> currentListItemDTO = getCurrentArrayIsFull(lang);

        Map<String, Integer> amountItemsByCategory = new HashMap<>();
        amountItemsByCategory.put("cigarAmount", (int) currentListItemDTO.stream()
                .filter(itemDTO ->
                        itemDTO.getType().getTypeItem().equalsIgnoreCase("cigar")).count());
        amountItemsByCategory.put("cigarilloAmount", (int) currentListItemDTO.stream()
                .filter(itemDTO ->
                        itemDTO.getType().getTypeItem().equalsIgnoreCase("cigarillo")).count());

        amountItemsByCategory.put("coffeeAmount", (int) currentListItemDTO.stream()
                .filter(itemDTO ->
                        itemDTO.getType().getTypeItem().equalsIgnoreCase("coffee")).count());
        amountItemsByCategory.put("accessoryAmount", (int) currentListItemDTO.stream()
                .filter(itemDTO ->
                        itemDTO.getType().getTypeItem().equalsIgnoreCase("accessory")).count());
        return amountItemsByCategory;
    }

    @Override
    public List<Character> getQuantityItemsAsAnArrayChars() {
        String quantity = String.valueOf(itemRepository.count());
        char[] characters = quantity.toCharArray();

        List<Character> charactersList = new ArrayList<>();

        for (char c: characters) {
            charactersList.add(c);
        }

        return charactersList;
    }

    private List<ItemDTO> getCurrentArrayIsFull(String lang) {

        if (lang.equalsIgnoreCase("ru")) {
            if (currentItemsDTORuLang.size() != itemRepository.count()) {
                List<Item> items = itemRepository.findAll();
                Collections.reverse(items);
                currentItemsDTORuLang = MAPPER.fromItemList("ru", items);
            }
            return currentItemsDTORuLang;

        }
        if (currentItemsDTOEnLang.size() != itemRepository.count()) {
            List<Item> items = itemRepository.findAll();
            Collections.reverse(items);
            currentItemsDTOEnLang = MAPPER.fromItemList("en", items);
        }
        return currentItemsDTOEnLang;
    }

    private void updateCurrentArrays() {
        List<Item> items = itemRepository.findAll();
        Collections.reverse(items);
        currentItemsDTORuLang = MAPPER.fromItemList("ru", items);
        currentItemsDTOEnLang = MAPPER.fromItemList("en", items);

    }

}
