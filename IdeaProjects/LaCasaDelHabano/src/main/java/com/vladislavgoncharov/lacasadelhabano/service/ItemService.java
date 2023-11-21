package com.vladislavgoncharov.lacasadelhabano.service;

import com.vladislavgoncharov.lacasadelhabano.dto.ItemDTO;
import com.vladislavgoncharov.lacasadelhabano.utilities.SearchQuery;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface ItemService {

    List<ItemDTO> findAllItem(String lang);
    List<ItemDTO> findAllItemBriefData(String lang);
    ItemDTO getItemById(String lang, Long id);

    boolean addItem(ItemDTO itemDTO);
    boolean updateItem(ItemDTO itemDTO);
    boolean deleteItem(Long id);

    Map<String, Set<String>> getAllMainSubsections(String lang);
    Map<String,String> getLinksToBreadCrumbs(String lang, ItemDTO itemDTO);
    List<ItemDTO> getSimilarProducts(String lang, ItemDTO itemDTO);

    List<SearchQuery> getResultSearchQuery(String lang, String searchQuery);
    Map<String, Integer> getAmountItemsByCategory(String lang);

    List<Character> getQuantityItemsAsAnArrayChars();
}
