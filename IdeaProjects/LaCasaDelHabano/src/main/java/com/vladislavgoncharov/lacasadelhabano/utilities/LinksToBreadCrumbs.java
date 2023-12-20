package com.vladislavgoncharov.lacasadelhabano.utilities;

import com.vladislavgoncharov.lacasadelhabano.dto.ItemDTO;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.Map;

@Component
public class LinksToBreadCrumbs implements HelperUtility {

    public Map<String,String> getLinks(String lang, ItemDTO itemDTO) {
        String[] arrayText;
        if (lang.equalsIgnoreCase("ru")) arrayText = new String[]{"категории","сигары","сигариллы","кофе","аксессуары"};
        else arrayText = new String[]{"categories","cigars","cigarillos","coffee","accessories"};

        Map<String,String> links = new LinkedHashMap<>();
        links.put(arrayText[0], "/" + lang + "/catalog");
        String textForLink;
        switch (itemDTO.getType()) {
            case CIGAR ->
                    {
                        links.put(arrayText[1], "/" + lang + "/catalog#product?text=type=cigar");
                        if (itemDTO.getSeries() != null) {
                            textForLink = replaceSpacesWithUnderscores(itemDTO.getSeries());
                            links.put(
                                    itemDTO.getSeries()
                                    , "/" + lang + "/catalog#product?text=type=cigar&" + textForLink + "?text=series=" + textForLink
                            );
                        }
                        if (itemDTO.getBrand() != null) {
                            textForLink = replaceSpacesWithUnderscores(itemDTO.getBrand());
                            links.put(
                                    itemDTO.getBrand()
                                    , "/" + lang + "/catalog#product?text=type=cigar&" + textForLink + "?text=brand=" + textForLink
                            );
                        }
                        links.put(itemDTO.getName(), "#");
                    }
            case CIGARILLO ->
                    {
                        links.put(arrayText[2], "/" + lang + "/catalog#product?text=type=cigarillo");
                        if (itemDTO.getBrand() != null) {
                            textForLink = replaceSpacesWithUnderscores(itemDTO.getBrand());
                            links.put(
                                    itemDTO.getBrand()
                                    , "/" + lang + "/catalog#product?text=type=cigarillo&" + textForLink + "?text=brand=" + textForLink
                            );
                        }
                        links.put(itemDTO.getName(), "#");
                    }
            case COFFEE ->
                    {
                        links.put(arrayText[3], "/" + lang + "/catalog#product?text=type=coffee");
                        if (itemDTO.getBrand() != null) {
                            textForLink = replaceSpacesWithUnderscores(itemDTO.getBrand());
                            links.put(
                                    itemDTO.getBrand()
                                    , "/" + lang + "/catalog#product?text=type=coffee&" + textForLink + "?text=brand=" + textForLink
                            );
                        }
                        links.put(itemDTO.getName(), "#");
                    }
            case ACCESSORY ->
                    {
                        links.put(arrayText[4], "/" + lang + "/catalog#product?text=type=accessory");
                        if (itemDTO.getTypeOfAccessory() != null) {
                            textForLink = replaceSpacesWithUnderscores(itemDTO.getTypeOfAccessory());
                            links.put(
                                    itemDTO.getTypeOfAccessory()
                                    ,
                                    "/" + lang + "/catalog#product?text=type=accessory&" + textForLink
                                            + "?text=typeofaccessory=" + textForLink
                            );
                        }
                        links.put(itemDTO.getName(), "#");
                    }
        }

        return links;
    }

}

