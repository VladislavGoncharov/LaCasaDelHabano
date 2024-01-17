package com.vladislavgoncharov.lacasadelhabano.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vladislavgoncharov.lacasadelhabano.dto.ItemDTO;
import com.vladislavgoncharov.lacasadelhabano.entity.Item;
import com.vladislavgoncharov.lacasadelhabano.mapper.ItemMapper;
import com.vladislavgoncharov.lacasadelhabano.repository.ItemRepository;
import com.vladislavgoncharov.lacasadelhabano.service.ItemService;
import com.vladislavgoncharov.lacasadelhabano.utilities.LinksToBreadCrumbs;
import com.vladislavgoncharov.lacasadelhabano.utilities.MainSubsectionsOfTypesOfItems;
import com.vladislavgoncharov.lacasadelhabano.utilities.SearchQuery;
import com.vladislavgoncharov.lacasadelhabano.utilities.SimilarProduct;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
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
    private final Cloudinary cloudinary;

    public ItemServiceImpl(ItemRepository itemRepository, LinksToBreadCrumbs linksToBreadCrumbs, MainSubsectionsOfTypesOfItems mainSubsectionsOfTypesOfItems, SimilarProduct similarProduct, Cloudinary cloudinary) {
        this.itemRepository = itemRepository;
        this.linksToBreadCrumbs = linksToBreadCrumbs;
        this.subsections = mainSubsectionsOfTypesOfItems;
        this.similarProduct = similarProduct;
        this.cloudinary = cloudinary;
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
        if (lang.equalsIgnoreCase("ru")) return MAPPER.fromItemRu(itemRepository.getById(id));
        else if (lang.equalsIgnoreCase("en")) return MAPPER.fromItemEn(itemRepository.getById(id));
        else return MAPPER.fromItemAllLang(itemRepository.getById(id));
    }

    @Override
    public void addItem(ItemDTO itemDTO) throws JsonProcessingException, RuntimeException {

        ObjectMapper objectMapper = new ObjectMapper();

        itemDTO.setOption(objectMapper.readValue(itemDTO.getOptionJSON(), new TypeReference<>() {
        }));
        itemDTO.setEnLangOption(objectMapper.readValue(itemDTO.getEnLangOptionJSON(), new TypeReference<>() {
        }));

        try {
            itemDTO.setPhoto(getPhotoByCloudinaryByBig(itemDTO.getPhotoMultipartFile()));
            itemDTO.setPhotoSmall(getPhotoByCloudinaryByLittle(itemDTO.getPhotoMultipartFile()));
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Проблема с отправкой картинки на cloudinary");

        }

        itemDTO.setVisible(true);
        itemRepository.save(MAPPER.toItem(itemDTO));

        updateCurrentArrays();
    }

    private String getPhotoByCloudinaryByBig(MultipartFile photoMultipartFile) throws IOException {

        File bigImg = new File("big_" + photoMultipartFile.getOriginalFilename());
        try (InputStream inputStreamReader = photoMultipartFile.getInputStream();
             OutputStream outputStream = new FileOutputStream(bigImg)) {
            IOUtils.copy(inputStreamReader, outputStream);
        }


        Map uploadResultBig = cloudinary.uploader()
                .upload(bigImg, ObjectUtils.asMap("folder", "imgItem/character_big"));

        bigImg.delete();

        return (String) uploadResultBig.get("url");
    }

    private String getPhotoByCloudinaryByLittle(MultipartFile photoMultipartFile) throws IOException {
        try (InputStream input = photoMultipartFile.getInputStream()) {
            // Указываем размеры и соотношение сторон
            Thumbnails.Builder<?> thumbnailBuilder = Thumbnails.of(input)
                    .size(300, 400) // 3:4
                    .outputQuality(1.0); // 1.0 - максимальное качество

            // Создаем временный файл
            Path tempFilePath = Files.createTempFile("resized_image_" + photoMultipartFile.getOriginalFilename(), ".jpg");

            // Сохраняем измененные данные во временный файл
            try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
                thumbnailBuilder.toOutputStream(baos);
                Files.copy(new ByteArrayInputStream(baos.toByteArray()), tempFilePath, StandardCopyOption.REPLACE_EXISTING);
            }

            File littleImg = tempFilePath.toFile();

            Map uploadResultLittle = cloudinary.uploader()
                    .upload(littleImg, ObjectUtils.asMap("folder", "imgItem/character_little"));

            littleImg.delete();

            return (String) uploadResultLittle.get("url");
        }
    }

    @Override
    public void updateItem(ItemDTO itemDTO) throws JsonProcessingException, RuntimeException {

        Item item = itemRepository.getById(itemDTO.getId());

        item.setName(itemDTO.getName());
        item.setBrand(itemDTO.getBrand());
        item.setSeries(itemDTO.getSeries());
        item.setFactoryName(itemDTO.getFactoryName());
        item.setCountry(itemDTO.getCountry());
        item.setDescription(itemDTO.getDescription());
        item.setArticleNumber(itemDTO.getArticleNumber());
        item.setSize(itemDTO.getSize());
        item.setRingGauge(itemDTO.getRingGauge());
        item.setFortress(itemDTO.getFortress());
        item.setPrice(itemDTO.getPrice());
        item.setTypeOfAccessory(itemDTO.getTypeOfAccessory());
        item.setEnLangName(itemDTO.getEnLangName());
        item.setEnLangBrand(itemDTO.getEnLangBrand());
        item.setEnLangSeries(itemDTO.getEnLangSeries());
        item.setEnLangCountry(itemDTO.getEnLangCountry());
        item.setEnLangDescription(itemDTO.getEnLangDescription());
        item.setEnLangTypeOfAccessory(itemDTO.getEnLangTypeOfAccessory());

        ObjectMapper objectMapper = new ObjectMapper();

        item.setOption(objectMapper.readValue(itemDTO.getOptionJSON(), new TypeReference<>() {
        }));
        item.setEnLangOption(objectMapper.readValue(itemDTO.getEnLangOptionJSON(), new TypeReference<>() {
        }));

        if (!(itemDTO.getPhotoMultipartFile() == null)) {
            try {
                item.setPhoto(getPhotoByCloudinaryByBig(itemDTO.getPhotoMultipartFile()));
                item.setPhotoSmall(getPhotoByCloudinaryByLittle(itemDTO.getPhotoMultipartFile()));
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println("Проблема с отправкой картинки на cloudinary");
            }
        }

        itemRepository.save(item);

        updateCurrentArrays();
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
                    || StringUtils.containsIgnoreCase(itemDTO.getBrand(), searchQuery)
                    || StringUtils.containsIgnoreCase(itemDTO.getFactoryName(), searchQuery)) {
                searchQueries.add(SearchQuery.builder()
                        .name(itemDTO.getName() + ", " + itemDTO.getBrand())
                        .link("/" + lang + "/item/" + itemDTO.getId())
                        .linkPhoto(itemDTO.getPhotoSmall())
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

        for (char c : characters) {
            charactersList.add(c);
        }

        return charactersList;
    }

    @Override
    public List<ItemDTO> findAllItemForAdmin() {
        List<Item> items = itemRepository.findAll();
        Collections.reverse(items);

        return MAPPER.fromItemList("allLang", items);
    }

    @Override
    public Long getCount() {
        return itemRepository.count();
    }

    @Override
    public boolean setVisibleItem(Long id) {
        Item item = itemRepository.getById(id);
        item.setVisible(!item.isVisible());
        itemRepository.save(item);

        updateCurrentArrays();
        return true;
    }

    private List<ItemDTO> getCurrentArrayIsFull(String lang) {
        List<Item> items = new ArrayList<>(itemRepository.findAll().stream().filter(Item::isVisible).toList());
        if (!(items.isEmpty()))
            Collections.reverse(items);

        if (lang.equalsIgnoreCase("ru")) {
            if (currentItemsDTORuLang.size() != itemRepository.count()) {
                currentItemsDTORuLang = MAPPER.fromItemList("ru", items);
            }
            return currentItemsDTORuLang;
        }
        if (currentItemsDTOEnLang.size() != itemRepository.count()) {
            currentItemsDTOEnLang = MAPPER.fromItemList("en", items);
        }
        return currentItemsDTOEnLang;
    }

    private void updateCurrentArrays() {
        List<Item> items = new ArrayList<>(itemRepository.findAll().stream().filter(Item::isVisible).toList());
        if (!(items.isEmpty()))
            Collections.reverse(items);
        currentItemsDTORuLang = MAPPER.fromItemList("ru", items);
        currentItemsDTOEnLang = MAPPER.fromItemList("en", items);

    }

}
