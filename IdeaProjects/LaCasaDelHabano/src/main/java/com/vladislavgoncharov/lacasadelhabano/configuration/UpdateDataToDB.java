package com.vladislavgoncharov.lacasadelhabano.configuration;

import com.vladislavgoncharov.lacasadelhabano.entity.Item;
import com.vladislavgoncharov.lacasadelhabano.entity.News;
import com.vladislavgoncharov.lacasadelhabano.entity.PhonesAndLink;
import com.vladislavgoncharov.lacasadelhabano.entity.enums.TypeItem;
import com.vladislavgoncharov.lacasadelhabano.repository.ItemRepository;
import com.vladislavgoncharov.lacasadelhabano.repository.NewsRepository;
import com.vladislavgoncharov.lacasadelhabano.repository.PhonesAndLinkRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.*;

@Configuration
public class UpdateDataToDB {

    @Bean
    public CommandLineRunner lineRunner(ItemRepository itemRepository, NewsRepository newsRepository,
                                        PhonesAndLinkRepository phonesAndLinkRepository) {
        return (args) -> {
            phonesAndLinkRepository.save(PhonesAndLink.builder()
                            .kuznechnyTelephonyHouse("+7 (812) 572 32 90")
                            .kuznechnyTelephonyMobile("+7 (981) 893 90 53")
                            .petrogradskoyTelephonyHouse("+7 (812) 332 45 97")
                            .petrogradskoyTelephonyMobile("+7 (981) 045 99 45")
                            .linkFB("qwe")
                            .linkTLG("qwe")
                            .linkINST("qwe")
                            .linkVK("qwe")
                            .linkMail("LCDH@CIGARPLACE.RU")
                            .linkDevelopers("https://www.duo-creative.ru")
                            .linkCubaRestaurant("https://www.cuba-restaurant.ru")
                            .linkCubaDay("https://www.cuba-day.ru")
                    .build());



            List<String> names = new ArrayList<>() {{
                add("Винтажные");
                add("Винтажные");
                add("Винтажные");
                add("Лимитированные");
                add("Лимитированные");
                add("Лимитированные");
                add("Региональные");
                add("Региональные");
                add("Региональные");
                add("Серия Reserva");
                add("Серия Reserva");
                add("Серия Reserva");
                add("Серия La Casa Del Habano");
                add("Серия La Casa Del Habano");
                add("Серия La Casa Del Habano");
                add("Серия Art Nouveau");
                add("Серия Art Nouveau");
                add("Серия Art Nouveau");
                add("Серия Combinaciones");
                add("Серия Combinaciones");
                add("Серия Combinaciones");
            }};
            List<String> namesEN = new ArrayList<>() {{
                add("Vintage");
                add("Vintage");
                add("Vintage");
                add("Limited");
                add("Limited");
                add("Limited");
                add("Regional");
                add("Regional");
                add("Regional");
                add("Series Reserva");
                add("Series Reserva");
                add("Series Reserva");
                add("Series La Casa Del Habano");
                add("Series La Casa Del Habano");
                add("Series La Casa Del Habano");
                add("Series Art Nouveau");
                add("Series Art Nouveau");
                add("Series Art Nouveau");
                add("Series Combinaciones");
                add("Series Combinaciones");
                add("Series Combinaciones");
            }};
            List<String> brands = new ArrayList<>() {{
                add("Bolivar");
                add("Cohiba");
                add("El Rey Del Mundo");
                add("Cuaba");
                add("Partagas");
                add("El Rey Del Mundo");
                add("Montecristo");
                add("Bolivar");
                add("Partagas");
                add("Cuaba");
                add("Fonseca");
                add("El Rey Del Mundo");
                add("Cohiba");
                add("Fonseca");
                add("Cuaba");
                add("Partagas");
                add("Bolivar");
                add("Montecristo");
                add("Fonseca");
                add("Partagas");
                add("Cohiba");
            }};
            for (int j = 0; j < 2; j++) {

                for (int i = 0; i < 21; i++) {
                    Random random = new Random();                // Генерируем случайное число от 1 до 4
                    int randomNumber = random.nextInt(4) + 1;


                    Item cigar = Item.builder()
                            .name(names.get(i) + " " + brands.get(i))
                            .brand(brands.get(i))
                            .series(names.get(i))
                            .enLangName(namesEN.get(i) + " " + brands.get(i))
                            .enLangBrand(brands.get(i))
                            .enLangSeries(namesEN.get(i))
                            .price(1500 + (654 * i))
                            .fortress(randomNumber)
                            .size((i + 1) * 3)
                            .ringGauge((i + 2) * 5)
                            .country("Куба")
                            .enLangCountry("Cuba")
                            .description("Сигара Hoyo de Monterrey Palmas Extra Vintage, формат Cremas, размер 140/16мм, 40 RG. Витола средней интенсивности, в древесно-пряных тонах. Вкус мощный, преимущественно острый, с небольшой горчинкой. Послевкусие продолжительное, пряно-древесное.")
                            .enLangDescription("Cigar Hoyo de Monterrey Palmas Extra Vintage, Cremas format, size 140/16 mm, 40 RG. Vitola of medium intensity, in woody-spicy tones. The taste is powerful, mostly sharp, with a slight bitterness. The aftertaste is long, spicy and woody.")
                            .articleNumber("354-5")
                            .build();


                    // Выводим результат
                    switch (randomNumber) {
                        case 1 -> {
                            cigar.setPhoto("cigar.jpg");
                            cigar.setType(TypeItem.CIGAR);
                        }
                        case 2 -> {
                            cigar.setPhoto("cigarillo.jpg");
                            cigar.setType(TypeItem.CIGARILLO);
                        }
                        case 3 -> {
                            cigar.setPhoto("accessory.jpg");
                            cigar.setType(TypeItem.ACCESSORY);
                        }
                        default -> {
                            cigar.setPhoto("coffee.jpg");
                            cigar.setType(TypeItem.COFFEE);
                        }
                    }
                    randomNumber = random.nextInt(4) + 1;
                    // Выводим результат
                    switch (randomNumber) {
                        case 1 -> {
                            cigar.setTypeOfAccessory("сигары");
                            cigar.setEnLangTypeOfAccessory("cigar");
                        }
                        case 2 -> {
                            cigar.setTypeOfAccessory("сигариллы");
                            cigar.setEnLangTypeOfAccessory("cigarillo");
                        }
                        case 3 -> {
                            cigar.setTypeOfAccessory("аксессуары");
                            cigar.setEnLangTypeOfAccessory("accessory");
                        }
                        default -> {
                            cigar.setTypeOfAccessory("кофе");
                            cigar.setEnLangTypeOfAccessory("coffee");
                        }
                    }
                    // Выводим результат
                    switch (randomNumber) {
                        case 1 -> {
                            Map<String,Integer> option = new HashMap<>();
                            option.put("25 штук", 25);
                            cigar.setOption(option);

                            Map<String,Integer> enLangOption = new HashMap<>();
                            enLangOption.put("25 pieces", 25);
                            cigar.setEnLangOption(enLangOption);
                        }
                        case 2 -> {

                            Map<String,Integer> option = new HashMap<>();
                            option.put("Поштучно", 1);
                            option.put("30 штук", 30);

                            cigar.setOption(option);

                            Map<String,Integer> enLangOption = new HashMap<>();
                            enLangOption.put("Piece by piece", 1);
                            enLangOption.put("30 pieces", 30);
                            cigar.setEnLangOption(enLangOption);
                        }
                        case 3 -> {

                            Map<String,Integer> option = new HashMap<>();
                            option.put("Поштучно", 1);
                            option.put("10 штук", 10);
                            option.put("25 штук", 25);

                            cigar.setOption(option);

                            Map<String,Integer> enLangOption = new HashMap<>();
                            enLangOption.put("Piece by piece", 1);
                            enLangOption.put("10 pieces", 10);
                            enLangOption.put("25 pieces", 25);
                            cigar.setEnLangOption(enLangOption);
                        }
                        default -> {

                            Map<String,Integer> option = new HashMap<>();
                            option.put("Поштучно", 1);
                            option.put("10 штук", 10);
                            option.put("20 штук", 20);

                            cigar.setOption(option);

                            Map<String,Integer> enLangOption = new HashMap<>();
                            enLangOption.put("Piece by piece", 1);
                            enLangOption.put("10 pieces", 10);
                            enLangOption.put("20 pieces", 20);
                            cigar.setEnLangOption(enLangOption);
                        }
                    }

                    itemRepository.save(cigar);
                }
            }

            for (int i = 0; i < 35; i++) {
                News oneNews = News.builder()
                        .header("Приятная пятница " + i)
                        .mainText("Традиционная «Приятная пятница» 5 мая 2023 года в наших сигарных магазинах всемирно известной франшизы в Санкт-Петербурге.\n" +
                                "                                    <br>\n" +
                                "                                    <br> В этот день действует акцию на сигару Bolivar Royal Coronas формата Robustos (124 мм x 50 Rg). В пару к Bolivar Royal Coronas мы предлагаем ром Caney Anejo Centuria, выдержанный в старых дубовых бочках в течении 7 лет.\n" +
                                "                                    <br>\n" +
                                "                                    <br> Предложение действует в пятницу с 11:00 до последней сигары и до последней капли.\n" +
                                "                                    <br>\n" +
                                "                                    <br> Акция «Приятная пятница» в La Casa del Habano Bolshoy P.Side действует только в формате специальной цены на сигару с собой. ")
                        .date(LocalDate.now())
                        .tag("La Casa del Habano Большой, La Casa del Habano Кузнечный, Дом Кубинских Сигар, Кубинские сигары")
                        .build();
                newsRepository.save(oneNews);
            }
        };
    }

}
