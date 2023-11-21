package com.vladislavgoncharov.lacasadelhabano;

import com.vladislavgoncharov.lacasadelhabano.entity.Item;
import com.vladislavgoncharov.lacasadelhabano.entity.News;
import com.vladislavgoncharov.lacasadelhabano.entity.enums.TypeItem;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.util.*;

@SpringBootApplication
public class LaCasaDelHabanoApplication {

    public static List<Item> cigars = new ArrayList<>();
    public static List<News> news = new ArrayList<>();

    public static void main(String[] args) {
        SpringApplication.run(LaCasaDelHabanoApplication.class, args);

//        List<String> names = new ArrayList<>() {{
//            add("Винтажные");
//            add("Винтажные");
//            add("Винтажные");
//            add("Лимитированные");
//            add("Лимитированные");
//            add("Лимитированные");
//            add("Региональные");
//            add("Региональные");
//            add("Региональные");
//            add("Серия Reserva");
//            add("Серия Reserva");
//            add("Серия Reserva");
//            add("Серия La Casa Del Habano");
//            add("Серия La Casa Del Habano");
//            add("Серия La Casa Del Habano");
//            add("Серия Art Nouveau");
//            add("Серия Art Nouveau");
//            add("Серия Art Nouveau");
//            add("Серия Combinaciones");
//            add("Серия Combinaciones");
//            add("Серия Combinaciones");
//        }};
//        List<String> brands = new ArrayList<>() {{
//            add("Bolivar");
//            add("Cohiba");
//            add("El Rey Del Mundo");
//            add("Cuaba");
//            add("Partagas");
//            add("El Rey Del Mundo");
//            add("Montecristo");
//            add("Bolivar");
//            add("Partagas");
//            add("Cuaba");
//            add("Fonseca");
//            add("El Rey Del Mundo");
//            add("Cohiba");
//            add("Fonseca");
//            add("Cuaba");
//            add("Partagas");
//            add("Bolivar");
//            add("Montecristo");
//            add("Fonseca");
//            add("Partagas");
//            add("Cohiba");
//        }};
//        for (int j = 0; j < 2; j++) {
//
//            for (int i = 0; i < 21; i++) {
//                Item cigar = Item.builder()
//                        .id(575L * i + j+1)
//                        .name(names.get(i) + " " + brands.get(i))
//                        .brand(brands.get(i))
//                        .series(names.get(i))
//                        .price(1500 + (654 * i))
//                        .fortress(i + 1)
//                        .size((i + 1) * 3)
//                        .ringGauge((i + 2) * 5)
//                        .build();
//
//                Random random = new Random();
//
//                // Генерируем случайное число от 1 до 4
//                int randomNumber = random.nextInt(4) + 1;
//
//                // Выводим результат
//                switch (randomNumber) {
//                    case 1 -> cigar.setType(TypeItem.CIGAR);
//                    case 2 -> cigar.setType(TypeItem.CIGARILLO);
//                    case 3 -> cigar.setType(TypeItem.ACCESSORY);
//                    default -> cigar.setType(TypeItem.COFFEE);
//                }
//                // Выводим результат
//                switch (randomNumber) {
//                    case 1 -> cigar.setTypeOfAccessory("CIGARS");
//                    case 2 -> cigar.setTypeOfAccessory("CIGARILLOS");
//                    case 3 -> cigar.setTypeOfAccessory("ACCESSORY");
//                    default -> cigar.setTypeOfAccessory("COFFEE");
//                }
//                // Выводим результат
//                switch (randomNumber) {
//                    case 1 -> {
//                        Map<String,Integer> option = new HashMap<>();
//                        option.put("25 штук", 25);
//                        cigar.setOption(option);
//                    }
//                    case 2 -> {
//
//                        Map<String,Integer> option = new HashMap<>();
//                        option.put("Поштучно", 1);
//                        option.put("30 штук", 30);
//
//                        cigar.setOption(option);
//                    }
//                    case 3 -> {
//
//                        Map<String,Integer> option = new HashMap<>();
//                        option.put("Поштучно", 1);
//                        option.put("10 штук", 10);
//                        option.put("25 штук", 25);
//
//                        cigar.setOption(option);
//                    }
//                    default -> {
//
//                        Map<String,Integer> option = new HashMap<>();
//                        option.put("Поштучно", 1);
//                        option.put("10 штук", 10);
//                        option.put("20 штук", 20);
//
//                        cigar.setOption(option);
//                    }
//                }
//                cigars.add(cigar);
//            }
//        }

//        for (int i = 0; i < 35; i++) {
//            News oneNew = News.builder()
//                    .header("Приятная пятница " + i)
//                    .mainText("Традиционная «Приятная пятница» 5 мая 2023 года в наших сигарных магазинах всемирно известной франшизы в Санкт-Петербурге.\n" +
//                            "                                    <br>\n" +
//                            "                                    <br> В этот день действует акцию на сигару Bolivar Royal Coronas формата Robustos (124 мм x 50 Rg). В пару к Bolivar Royal Coronas мы предлагаем ром Caney Anejo Centuria, выдержанный в старых дубовых бочках в течении 7 лет.\n" +
//                            "                                    <br>\n" +
//                            "                                    <br> Предложение действует в пятницу с 11:00 до последней сигары и до последней капли.\n" +
//                            "                                    <br>\n" +
//                            "                                    <br> Акция «Приятная пятница» в La Casa del Habano Bolshoy P.Side действует только в формате специальной цены на сигару с собой. ")
//                    .date(LocalDate.now())
//                    .tag("La Casa del Habano Большой, La Casa del Habano Кузнечный, Дом Кубинских Сигар, Кубинские сигары")
//                    .build();
//            news.add(oneNew);
//        }
    }

}
