//package com.vladislavgoncharov.lacasadelhabano.configuration;
//
//import com.vladislavgoncharov.lacasadelhabano.dto.FeedbackDTO;
//import com.vladislavgoncharov.lacasadelhabano.dto.RegistrationOfWholesaleCustomerDTO;
//import com.vladislavgoncharov.lacasadelhabano.dto.ReserveDTO;
//import com.vladislavgoncharov.lacasadelhabano.entity.Item;
//import com.vladislavgoncharov.lacasadelhabano.entity.News;
//import com.vladislavgoncharov.lacasadelhabano.entity.PhonesAndLink;
//import com.vladislavgoncharov.lacasadelhabano.entity.enums.TypeItem;
//import com.vladislavgoncharov.lacasadelhabano.repository.ItemRepository;
//import com.vladislavgoncharov.lacasadelhabano.repository.NewsRepository;
//import com.vladislavgoncharov.lacasadelhabano.repository.PhonesAndLinkRepository;
//import com.vladislavgoncharov.lacasadelhabano.repository.TelegramRepository;
//import com.vladislavgoncharov.lacasadelhabano.service.ReserveAndFeedbackAndRegistrationService;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.time.LocalDate;
//import java.util.*;
//
//@Configuration
//public class UpdateDataToDB {
//
//    @Bean
//    public CommandLineRunner lineRunner(ItemRepository itemRepository, NewsRepository newsRepository, TelegramRepository telegramRepository,
//                                        PhonesAndLinkRepository phonesAndLinkRepository,
//                                        ReserveAndFeedbackAndRegistrationService reserveAndFeedbackAndRegistrationService) {
//        return (args) -> {
//
//            Item itemCigarOne;
//            Item itemCigarTwo;
//            Item itemCigarilloOne;
//            Item itemCigarilloTwo;
//            Item itemCoffeeOne;
//            Item itemCoffeeTwo;
//            Item itemAccessoryOne;
//            Item itemAccessoryTwo;
//
//            phonesAndLinkRepository.save(PhonesAndLink.builder()
//                    .kuznechnyTelephonyHouse("+7 (812) 572 32 90")
//                    .kuznechnyTelephonyMobile("+7 (981) 893 90 53")
//                    .petrogradskoyTelephonyHouse("+7 (812) 332 45 97")
//                    .petrogradskoyTelephonyMobile("+7 (981) 045 99 45")
//                    .linkFB("https://www.facebook.com/groups/cigarsplace.ru/")
//                    .linkTLG("https://t.me/LaCasadelHabanoSpb")
//                    .linkINST("https://www.instagram.com/lacasadelhabano.spb/")
//                    .linkVK("https://vk.com/cigarsplace")
//                    .linkMail("LCDH@CIGARPLACE.RU")
//                    .linkDevelopers("https://www.duo-creative.ru")
//                    .linkCubaRestaurant("https://www.cuba-restaurant.ru")
//                    .linkCubaDay("https://www.cuba-day.ru")
//                    .build());
//
//            itemCigarOne = Item.builder()
//                    .name("La Habana 20 Aniversary")
//                    .brand("San Cristobal de la Habana")
//                    .series("La Casa Del Habano")
//                    .enLangName("San Cristobal De La Habana 20 Aniversary")
//                    .enLangBrand("San Cristobal de la Habana")
//                    .enLangSeries("La Casa Del Habano")
//                    .price(8900)
//                    .fortress(2)
//                    .size(166)
//                    .ringGauge(52)
//                    .country("Куба")
//                    .enLangCountry("Cuba")
//                    .description("San Cristobal de la Habana – молодой сигарный бренд, появившийся в 1999 году, когда Гавана отмечала свое 480-летие. Появление нового бренда приурочили к юбилею столицы Кубы, которая первоначально значилась на картах мира, как San Cristobal de la Habana. Первая часть названия San Cristobal переводится, как Святой Христофер в честь ее первооткрывателя Колумба, вторая – La Habana означает индийское поселение, некогда расположенное на месте Гаваны .Со временем название было сокращено до короткого - Гавана. Кубинские сигары San Cristobal представлены четырьмя форматами, которые носят названия фортов некогда защищавших город Гавана – это El Morro, El Principe, La Fuerza и La Punta. Все сигары San Cristobal скручиваются исключительно вручную из длиннолистового табака. Для изготовления сигар используются высококачественный табак, выращенный в известном регионе Вуэльта Абахо . Степень крепости: средняя. Кубинские сигары San Cristobal - это сигары высокого класса, которые, несомненно, придутся по душе любителям не крепких сигар высокого качества.")
//                    .enLangDescription("San Cristobal de la Habana is a young cigar brand that appeared in 1999, when Havana celebrated its 480th anniversary. The appearance of the new brand was timed to coincide with the anniversary of the capital of Cuba, which was originally listed on world maps as San Cristobal de la Habana. The first part of the name San Cristobal translates as St. Christopher in honor of its discoverer Columbus, the second – La Habana means an Indian settlement, once located on the site of Havana.Over time, the name was shortened to a short one - Havana. San Cristobal Cuban cigars are represented by four formats that bear the names of the forts that once defended the city of Havana – these are El Morro, El Principe, La Fuerza and La Punta. All San Cristobal cigars are rolled exclusively by hand from long-leaf tobacco. High-quality tobacco grown in the famous Vuelta Abajo region is used to make cigars. Degree of strength: medium. San Cristobal Cuban cigars are high-end cigars that will undoubtedly appeal to fans of low-strength, high-quality cigars.")
//                    .articleNumber("3444")
//                    .typeOfAccessory("")
//                    .enLangTypeOfAccessory("")
//                    .type(TypeItem.CIGAR)
//                    .build();
//            itemCigarTwo = Item.builder()
//                    .name("La Trova")
//                    .brand("Trinidad")
//                    .series("La Casa Del Habano")
//                    .enLangName("Trinidad La Trova")
//                    .enLangBrand("Trinidad")
//                    .enLangSeries("La Casa Del Habano")
//                    .price(8970)
//                    .fortress(3)
//                    .size(166)
//                    .ringGauge(52)
//                    .country("Куба")
//                    .enLangCountry("Cuba")
//                    .description("Бренд Trinidad появился в конце 60-х годов прошлого века и был назван в честь кубинского города Тринидад, основанного в 1514 году конкистадором Диего Веласкесом. Это город-музей со множеством домов и церквей, построенных на рубеже XVIII и XIX веков. В 1988 году Тринидад был включен в список Всемирного наследия ЮНЕСКО. Изображение кубинского города Тринидад можно увидеть на каждой коробке сигар Тринидад. В течении многих лет эти сигары были доступны только в качестве подарков иностранным дипломатам. И только в 1998 году были выпущены для общей продажи. Создателем уникального бренда стал Авелино Лара, который в то время был директором табачной фабрики El Laguito. Сигары Trinidad считаются верхом сигарного искусства и не смотря на высокую стоимость, пользуются огромным спросом среди ценителей. О высоком классе сигар Trinidad свидетельствует буквально все: оригинальная элегантная упаковка, в которой сигары стянуты золотой ленточкой, качество скрутки сигар, великолепный цвет покровного листа и аромат. Весь секрет в табаке. Это особый табак, выращенный на лучших плантациях Кубы. Все витолы сделаны полностью вручную с начинкой из цельных табачных листьев. Степень крепости: средняя.")
//                    .enLangDescription("The Trinidad brand appeared in the late 60s of the last century and was named after the Cuban city of Trinidad, founded in 1514 by conquistador Diego Velazquez. It is a museum city with many houses and churches built at the turn of the XVIII and XIX centuries. In 1988, Trinidad was included in the UNESCO World Heritage List. The image of the Cuban city of Trinidad can be seen on every box of Trinidad cigars. For many years, these cigars were only available as gifts to foreign diplomats. And only in 1998 were they released for general sale. The creator of the unique brand was Avelino Lara, who at that time was the director of the El Laguito tobacco factory. Trinidad cigars are considered the pinnacle of cigar art and, despite their high cost, are in great demand among connoisseurs. Literally everything testifies to the high class of Trinidad cigars: the original elegant packaging in which the cigars are tied with a gold ribbon, the quality of the cigar twist, the magnificent color of the cover sheet and the aroma. The whole secret is in tobacco. This is a special tobacco grown on the best plantations in Cuba. All vitols are made entirely by hand with a filling of whole tobacco leaves. Degree of strength: medium.")
//                    .articleNumber("3624")
//                    .typeOfAccessory("")
//                    .enLangTypeOfAccessory("")
//                    .type(TypeItem.CIGAR)
//                    .build();
//            itemCigarilloOne = Item.builder()
//                    .name("Short")
//                    .brand("MONTECRISTO")
//                    .enLangName("Short")
//                    .enLangBrand("MONTECRISTO")
//                    .series("")
//                    .enLangSeries("")
//                    .price(2050)
//                    .fortress(0)
//                    .size(0)
//                    .ringGauge(0)
//                    .country("Куба")
//                    .enLangCountry("Cuba")
//                    .description("Бренд MONTECRISTO появился в конце 60-х годов прошлого века и был назван в честь кубинского города Тринидад, основанного в 1514 году конкистадором Диего Веласкесом. Это город-музей со множеством домов и церквей, построенных на рубеже XVIII и XIX веков. В 1988 году Тринидад был включен в список Всемирного наследия ЮНЕСКО. Изображение кубинского города Тринидад можно увидеть на каждой коробке сигар Тринидад. В течении многих лет эти сигары были доступны только в качестве подарков иностранным дипломатам. И только в 1998 году были выпущены для общей продажи. Создателем уникального бренда стал Авелино Лара, который в то время был директором табачной фабрики El Laguito. Сигары MONTECRISTO считаются верхом сигарного искусства и не смотря на высокую стоимость, пользуются огромным спросом среди ценителей. О высоком классе сигар MONTECRISTO свидетельствует буквально все: оригинальная элегантная упаковка, в которой сигары стянуты золотой ленточкой, качество скрутки сигар, великолепный цвет покровного листа и аромат. Весь секрет в табаке. Это особый табак, выращенный на лучших плантациях Кубы. Все витолы сделаны полностью вручную с начинкой из цельных табачных листьев. Степень крепости: средняя.")
//                    .enLangDescription("The MONTECRISTO brand appeared in the late 60s of the last century and was named after the Cuban city of MONTECRISTO, founded in 1514 by conquistador Diego Velazquez. It is a museum city with many houses and churches built at the turn of the XVIII and XIX centuries. In 1988, MONTECRISTO was included in the UNESCO World Heritage List. The image of the Cuban city of Trinidad can be seen on every box of Trinidad cigars. For many years, these cigars were only available as gifts to foreign diplomats. And only in 1998 were they released for general sale. The creator of the unique brand was Avelino Lara, who at that time was the director of the El Laguito tobacco factory. Trinidad cigars are considered the pinnacle of cigar art and, despite their high cost, are in great demand among connoisseurs. Literally everything testifies to the high class of Trinidad cigars: the original elegant packaging in which the cigars are tied with a gold ribbon, the quality of the cigar twist, the magnificent color of the cover sheet and the aroma. The whole secret is in tobacco. This is a special tobacco grown on the best plantations in Cuba. All vitols are made entirely by hand with a filling of whole tobacco leaves. Degree of strength: medium.")
//                    .articleNumber("7654")
//                    .typeOfAccessory("")
//                    .enLangTypeOfAccessory("")
//                    .type(TypeItem.CIGARILLO)
//                    .build();
//            itemCigarilloTwo = Item.builder()
//                    .name("Short LE")
//                    .brand("COHIBA")
//                    .enLangName("Short LE")
//                    .enLangBrand("COHIBA")
//                    .series("")
//                    .enLangSeries("")
//                    .price(1290)
//                    .fortress(0)
//                    .size(0)
//                    .ringGauge(0)
//                    .country("Куба")
//                    .enLangCountry("Cuba")
//                    .description("Бренд COHIBA появился в конце 60-х годов прошлого века и был назван в честь кубинского города Тринидад, основанного в 1514 году конкистадором Диего Веласкесом. Это город-музей со множеством домов и церквей, построенных на рубеже XVIII и XIX веков. В 1988 году Тринидад был включен в список Всемирного наследия ЮНЕСКО. Изображение кубинского города Тринидад можно увидеть на каждой коробке сигар Тринидад. В течении многих лет эти сигары были доступны только в качестве подарков иностранным дипломатам. И только в 1998 году были выпущены для общей продажи. Создателем уникального бренда стал Авелино Лара, который в то время был директором табачной фабрики El Laguito. Сигары COHIBA считаются верхом сигарного искусства и не смотря на высокую стоимость, пользуются огромным спросом среди ценителей. О высоком классе сигар COHIBA свидетельствует буквально все: оригинальная элегантная упаковка, в которой сигары стянуты золотой ленточкой, качество скрутки сигар, великолепный цвет покровного листа и аромат. Весь секрет в табаке. Это особый табак, выращенный на лучших плантациях Кубы. Все витолы сделаны полностью вручную с начинкой из цельных табачных листьев. Степень крепости: средняя.")
//                    .enLangDescription("The COHIBA brand appeared in the late 60s of the last century and was named after the Cuban city of COHIBA, founded in 1514 by conquistador Diego Velazquez. It is a museum city with many houses and churches built at the turn of the XVIII and XIX centuries. In 1988, COHIBA was included in the UNESCO World Heritage List. The image of the Cuban city of Trinidad can be seen on every box of Trinidad cigars. For many years, these cigars were only available as gifts to foreign diplomats. And only in 1998 were they released for general sale. The creator of the unique brand was Avelino Lara, who at that time was the director of the El Laguito tobacco factory. Trinidad cigars are considered the pinnacle of cigar art and, despite their high cost, are in great demand among connoisseurs. Literally everything testifies to the high class of Trinidad cigars: the original elegant packaging in which the cigars are tied with a gold ribbon, the quality of the cigar twist, the magnificent color of the cover sheet and the aroma. The whole secret is in tobacco. This is a special tobacco grown on the best plantations in Cuba. All vitols are made entirely by hand with a filling of whole tobacco leaves. Degree of strength: medium.")
//                    .articleNumber("3322")
//                    .typeOfAccessory("")
//                    .enLangTypeOfAccessory("")
//                    .type(TypeItem.CIGARILLO)
//                    .build();
//            itemCoffeeOne = Item.builder()
//                    .name("Кофе Кубита в зернах, 500 гр")
//                    .brand("Cubita")
//                    .enLangName("Qubit coffee beans, 500 g")
//                    .enLangBrand("Cubita")
//                    .series("")
//                    .enLangSeries("")
//                    .price(1075)
//                    .fortress(0)
//                    .size(0)
//                    .ringGauge(0)
//                    .country("Куба")
//                    .enLangCountry("Cuba")
//                    .description("Бренд Cubita появился в конце 60-х годов прошлого века и был назван в честь кубинского города Тринидад, основанного в 1514 году конкистадором Диего Веласкесом. Это город-музей со множеством домов и церквей, построенных на рубеже XVIII и XIX веков. В 1988 году Тринидад был включен в список Всемирного наследия ЮНЕСКО. Изображение кубинского города Тринидад можно увидеть на каждой коробке сигар Тринидад. В течении многих лет эти сигары были доступны только в качестве подарков иностранным дипломатам. И только в 1998 году были выпущены для общей продажи. Создателем уникального бренда стал Авелино Лара, который в то время был директором табачной фабрики El Laguito. Сигары Cubita считаются верхом сигарного искусства и не смотря на высокую стоимость, пользуются огромным спросом среди ценителей. О высоком классе сигар Cubita свидетельствует буквально все: оригинальная элегантная упаковка, в которой сигары стянуты золотой ленточкой, качество скрутки сигар, великолепный цвет покровного листа и аромат. Весь секрет в табаке. Это особый табак, выращенный на лучших плантациях Кубы. Все витолы сделаны полностью вручную с начинкой из цельных табачных листьев. Степень крепости: средняя.")
//                    .enLangDescription("The Cubita brand appeared in the late 60s of the last century and was named after the Cuban city of Cubita, founded in 1514 by conquistador Diego Velazquez. It is a museum city with many houses and churches built at the turn of the XVIII and XIX centuries. In 1988, Cubita was included in the UNESCO World Heritage List. The image of the Cuban city of Trinidad can be seen on every box of Trinidad cigars. For many years, these cigars were only available as gifts to foreign diplomats. And only in 1998 were they released for general sale. The creator of the unique brand was Avelino Lara, who at that time was the director of the El Laguito tobacco factory. Trinidad cigars are considered the pinnacle of cigar art and, despite their high cost, are in great demand among connoisseurs. Literally everything testifies to the high class of Trinidad cigars: the original elegant packaging in which the cigars are tied with a gold ribbon, the quality of the cigar twist, the magnificent color of the cover sheet and the aroma. The whole secret is in tobacco. This is a special tobacco grown on the best plantations in Cuba. All vitols are made entirely by hand with a filling of whole tobacco leaves. Degree of strength: medium.")
//                    .articleNumber("1434")
//                    .typeOfAccessory("")
//                    .enLangTypeOfAccessory("")
//                    .type(TypeItem.COFFEE)
//                    .build();
//            itemCoffeeTwo = Item.builder()
//                    .name("Кофе Кубита в зернах, 500 гр")
//                    .brand("Cubita")
//                    .enLangName("Qubit coffee beans, 500 g")
//                    .enLangBrand("Cubita")
//                    .series("")
//                    .enLangSeries("")
//                    .price(1075)
//                    .fortress(0)
//                    .size(0)
//                    .ringGauge(0)
//                    .country("Куба")
//                    .enLangCountry("Cuba")
//                    .description("Бренд Cubita появился в конце 60-х годов прошлого века и был назван в честь кубинского города Тринидад, основанного в 1514 году конкистадором Диего Веласкесом. Это город-музей со множеством домов и церквей, построенных на рубеже XVIII и XIX веков. В 1988 году Тринидад был включен в список Всемирного наследия ЮНЕСКО. Изображение кубинского города Тринидад можно увидеть на каждой коробке сигар Тринидад. В течении многих лет эти сигары были доступны только в качестве подарков иностранным дипломатам. И только в 1998 году были выпущены для общей продажи. Создателем уникального бренда стал Авелино Лара, который в то время был директором табачной фабрики El Laguito. Сигары Cubita считаются верхом сигарного искусства и не смотря на высокую стоимость, пользуются огромным спросом среди ценителей. О высоком классе сигар Cubita свидетельствует буквально все: оригинальная элегантная упаковка, в которой сигары стянуты золотой ленточкой, качество скрутки сигар, великолепный цвет покровного листа и аромат. Весь секрет в табаке. Это особый табак, выращенный на лучших плантациях Кубы. Все витолы сделаны полностью вручную с начинкой из цельных табачных листьев. Степень крепости: средняя.")
//                    .enLangDescription("The Cubita brand appeared in the late 60s of the last century and was named after the Cuban city of Cubita, founded in 1514 by conquistador Diego Velazquez. It is a museum city with many houses and churches built at the turn of the XVIII and XIX centuries. In 1988, Cubita was included in the UNESCO World Heritage List. The image of the Cuban city of Trinidad can be seen on every box of Trinidad cigars. For many years, these cigars were only available as gifts to foreign diplomats. And only in 1998 were they released for general sale. The creator of the unique brand was Avelino Lara, who at that time was the director of the El Laguito tobacco factory. Trinidad cigars are considered the pinnacle of cigar art and, despite their high cost, are in great demand among connoisseurs. Literally everything testifies to the high class of Trinidad cigars: the original elegant packaging in which the cigars are tied with a gold ribbon, the quality of the cigar twist, the magnificent color of the cover sheet and the aroma. The whole secret is in tobacco. This is a special tobacco grown on the best plantations in Cuba. All vitols are made entirely by hand with a filling of whole tobacco leaves. Degree of strength: medium.")
//                    .articleNumber("2344")
//                    .typeOfAccessory("")
//                    .enLangTypeOfAccessory("")
//                    .type(TypeItem.COFFEE)
//                    .build();
//            itemAccessoryOne = Item.builder()
//                    .name("Гильотина Aficionado Habano XV")
//                    .brand("")
//                    .enLangName("Guillotine Aficionado Habano XV")
//                    .enLangBrand("")
//                    .series("")
//                    .enLangSeries("")
//                    .price(15000)
//                    .fortress(0)
//                    .size(0)
//                    .ringGauge(0)
//                    .country("Куба")
//                    .enLangCountry("Cuba")
//                    .description("Гильоти́на — механизм для приведения в исполнение смертной казни путём отсечения головы. Казнь с использованием гильотины называется гильотинированием.")
//                    .enLangDescription("The guillotine is a mechanism for carrying out the death penalty by beheading. Execution using the guillotine is called guillotining.")
//                    .articleNumber("42342")
//                    .typeOfAccessory("Гильотины")
//                    .enLangTypeOfAccessory("Guillotines")
//                    .type(TypeItem.ACCESSORY)
//                    .build();
//            itemAccessoryTwo = Item.builder()
//                    .name("Увлажнитель Для Хьюмидора")
//                    .brand("")
//                    .enLangName("Humidifier For Humidor")
//                    .enLangBrand("")
//                    .series("")
//                    .enLangSeries("")
//                    .price(520)
//                    .fortress(0)
//                    .size(0)
//                    .ringGauge(0)
//                    .country("Куба")
//                    .enLangCountry("Cuba")
//                    .description("Хьюмидор – это специальная шкатулка, ящик, шкаф или даже комната для сигар. В ней соблюдается оптимальный режим влажности, обеспечивается герметичность и созданы условия для сохранения естественного аромата каждой сигары.")
//                    .enLangDescription("A humidor is a special box, drawer, cupboard or even a cigar room. It maintains an optimal humidity regime, ensures tightness and creates conditions for preserving the natural aroma of each cigar.")
//                    .articleNumber("2313")
//                    .typeOfAccessory("Увлажнитель Для Хьюмидора")
//                    .enLangTypeOfAccessory("Humidifier For Humidor")
//                    .type(TypeItem.ACCESSORY)
//                    .build();
//
//            itemCigarilloOne.setPhoto("https://res-console.cloudinary.com/dqtq98nnn/media_explorer_thumbnails/bde580f5f73776fafdbd7e73cc9fef80/detailed");
//            itemCigarilloOne.setPhotoSmall("https://res-console.cloudinary.com/dqtq98nnn/media_explorer_thumbnails/b53e86661759f1fe063c9a8b78eebfd6/detailed");
//
//            itemCigarOne.setPhoto("https://res-console.cloudinary.com/dqtq98nnn/media_explorer_thumbnails/64a786008cd4700eeafc77d148f30805/detailed");
//            itemCigarOne.setPhotoSmall("https://res-console.cloudinary.com/dqtq98nnn/media_explorer_thumbnails/eab066ed55956cadbc05645ff87c0d7b/detailed");
//
//            itemCoffeeOne.setPhoto("http://res.cloudinary.com/dqtq98nnn/image/upload/v1702843032/imgItem/character_big/t4pcaewhiynnefcoelka.jpg");
//            itemCoffeeOne.setPhotoSmall("http://res.cloudinary.com/dqtq98nnn/image/upload/v1702843034/imgItem/character_little/uxormpaq2hztlcdfumjo.jpg");
//
//            itemAccessoryOne.setPhoto("http://res.cloudinary.com/dqtq98nnn/image/upload/v1702842551/imgItem/character_big/cxatsawtuqpubwmaqwlh.jpg");
//            itemAccessoryOne.setPhotoSmall("http://res.cloudinary.com/dqtq98nnn/image/upload/v1702842552/imgItem/character_little/aauilxt2utpmzpz9ei2z.jpg");
//
//            itemCigarilloTwo.setPhoto("http://res.cloudinary.com/dqtq98nnn/image/upload/v1702843134/imgItem/character_big/l6wonopwomhfudwiwlgp.jpg");
//            itemCigarilloTwo.setPhotoSmall("http://res.cloudinary.com/dqtq98nnn/image/upload/v1702843135/imgItem/character_little/n1neh9ulymyln3me26nz.jpg");
//
//            itemCigarTwo.setPhoto("http://res.cloudinary.com/dqtq98nnn/image/upload/v1702843194/imgItem/character_big/darnk1vfszw4vtgi61ie.jpg");
//            itemCigarTwo.setPhotoSmall("http://res.cloudinary.com/dqtq98nnn/image/upload/v1702843195/imgItem/character_little/ocgaijenagwynw3ssa5b.jpg");
//
//            itemCoffeeTwo.setPhoto("https://res-console.cloudinary.com/dqtq98nnn/media_explorer_thumbnails/682fa63858401911d64900c5639973d4/detailed");
//            itemCoffeeTwo.setPhotoSmall("https://res-console.cloudinary.com/dqtq98nnn/media_explorer_thumbnails/4492f68299014bdb06ea63b125f763d4/detailed");
//
//            itemAccessoryTwo.setPhoto("http://res.cloudinary.com/dqtq98nnn/image/upload/v1702843086/imgItem/character_big/a17k8xsstmnbeu4lgddm.jpg");
//            itemAccessoryTwo.setPhotoSmall("http://res.cloudinary.com/dqtq98nnn/image/upload/v1702843088/imgItem/character_little/vn0oxb3msezbfbtt8pjv.jpg");
//
//            List<Item> items = new ArrayList<>();
//
//            items.add(itemCigarOne);
//            items.add(itemCigarTwo);
//            items.add(itemCigarilloOne);
//            items.add(itemCigarilloTwo);
//            items.add(itemCoffeeOne);
//            items.add(itemCoffeeTwo);
//            items.add(itemAccessoryOne);
//            items.add(itemAccessoryTwo);
//
//            // Выводим результат
//            for (Item curItem : items) {
//                Random random = new Random();
//
//                // Генерируем случайное число от 1 до 4
//                int randomNumber = random.nextInt(4) + 1;
//                switch (randomNumber) {
//                    case 1 -> {
//                        Map<String, Integer> option = new HashMap<>();
//                        option.put("25 штук", 25);
//                        curItem.setOption(option);
//
//                        Map<String, Integer> enLangOption = new HashMap<>();
//                        enLangOption.put("25 pieces", 25);
//                        curItem.setEnLangOption(enLangOption);
//                    }
//                    case 2 -> {
//
//                        Map<String, Integer> option = new HashMap<>();
//                        option.put("Поштучно", 1);
//                        option.put("30 штук", 30);
//
//                        curItem.setOption(option);
//
//                        Map<String, Integer> enLangOption = new HashMap<>();
//                        enLangOption.put("Piece by piece", 1);
//                        enLangOption.put("30 pieces", 30);
//                        curItem.setEnLangOption(enLangOption);
//                    }
//                    case 3 -> {
//
//                        Map<String, Integer> option = new HashMap<>();
//                        option.put("Поштучно", 1);
//                        option.put("10 штук", 10);
//                        option.put("25 штук", 25);
//
//                        curItem.setOption(option);
//
//                        Map<String, Integer> enLangOption = new HashMap<>();
//                        enLangOption.put("Piece by piece", 1);
//                        enLangOption.put("10 pieces", 10);
//                        enLangOption.put("25 pieces", 25);
//                        curItem.setEnLangOption(enLangOption);
//                    }
//                    default -> {
//
//                        Map<String, Integer> option = new HashMap<>();
//                        option.put("Поштучно", 1);
//                        option.put("10 штук", 10);
//                        option.put("20 штук", 20);
//
//                        curItem.setOption(option);
//
//                        Map<String, Integer> enLangOption = new HashMap<>();
//                        enLangOption.put("Piece by piece", 1);
//                        enLangOption.put("10 pieces", 10);
//                        enLangOption.put("20 pieces", 20);
//                        curItem.setEnLangOption(enLangOption);
//                    }
//                }
//            }
//
//
//            itemRepository.saveAll(items);
//
//
//            News twoNews = News.builder()
//                    .header("Приятная пятница, 15 декабря 2023")
//                    .tag("Дом Кубинских Сигар, Покурить кубинские сигары в центре СПб, Приятная пятница, Сигарный лаунж СПб")
//                    .mainText("Традиционная «Приятная пятница» 15 декабря 2023 года в наших сигарных магазинах всемирно известной франшизы в Санкт-Петербурге:\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Romeo y Julieta Cedros De Luxe.\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Сигара формата Gorditos (141 мм x 50 RG)\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>В пару к Romeo y Julieta Cedros de Luxe мы предлагаем вермут Carpano Antica Formula\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Для наших гостей за рулем мы предлагаем безалкогольную пару: сигара-сок/безалкогольное вино/безалкогольное пиво\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Стоимость пары всего — 2470 рублей!!!\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Только в этот день на сигару «Приятной пятницы» Romeo y Julieta Cedros de Luxe при покупке с собой специальная цена…\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Предложение действует в пятницу с 11:00 до последней сигары и до последней капли\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Можно предварительно забронировать столик нажав кнопку Резерв, мы вам обязательно перезвоним\n" +
//                            "                                    <br>\n" +
//                            "                                    <br> Акция «Приятная пятница» в La Casa del Habano Bolshoy P.Side действует только в формате специальной цены на сигару с собой!!!")
//                    .photo("http://res.cloudinary.com/dqtq98nnn/image/upload/v1702843238/imgItem/character_big/qpiys61angmh5bszlspx.jpg")
//                    .enLangHeader("Have a nice Friday, 15 december 2023")
//                    .enLangMainText("The traditional \"Pleasant Friday\" on December 15, 2023 in our cigar stores of the world-famous franchise in St. Petersburg:\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Romeo y Julieta Cedros De Luxe.\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Gorditos cigar format (141 мм x 50 RG)\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>In addition to Romeo at Julieta Cedros de Luxe, we offer Carpano Antica Formula vermouth\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>For our guests at the wheel, we offer a non-alcoholic pair: cigar juice/non-alcoholic wine/non-alcoholic beer\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>The cost of a pair is only 2,470 rubles!!!\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Only on this day, for a cigar \"Have a Nice Friday\" Romeo y Julieta Cedros de Luxe, when buying with you, a special price…\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>The offer is valid on Friday from 11:00 to the last cigar and to the last drop\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>You can pre-book a table by clicking the Reserve button, we will definitely call you back\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>The \"Pleasant Friday\" promotion at La Casa del Habano Bolshoy P.Side is valid only in the format of a special price for a cigar with you!!!")
//                    .enLangTag("La Casa del Habano Large, La Casa del Habano Blacksmith, House of Cuban Cigars, Cuban Cigars")
//                    .date(LocalDate.now())
//                    .build();
//            newsRepository.save(twoNews);
//            News oneNews = News.builder()
//                    .header("Приятная пятница, 15 декабря 2023")
//                    .tag("Дом Кубинских Сигар, Покурить кубинские сигары в центре СПб, Приятная пятница, Сигарный лаунж СПб")
//                    .mainText("Традиционная «Приятная пятница» 8 декабря 2023 года в наших сигарных магазинах всемирно известной франшизы в Санкт-Петербурге:\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>S.Cristobal De La Habana La Fuerza\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Сигара формата Gorditos (141 мм x 50 RG)\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>В пару к S.Cristobal De La Habana La Fuerza мы предлагаем кубинский ром Santisima Trinidad de Cuba 7 лет.\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Для наших гостей за рулем мы предлагаем безалкогольную пару: сигара-сок/безалкогольное вино/безалкогольное пиво\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Стоимость пары всего — 2730 рублей!!!\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Только в этот день на сигару «Приятной пятницы» Romeo y Julieta Cedros de Luxe при покупке с собой специальная цена…\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Предложение действует в пятницу с 11:00 до последней сигары и до последней капли\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Можно предварительно забронировать столик нажав кнопку Резерв, мы вам обязательно перезвоним\n" +
//                            "                                    <br>\n" +
//                            "                                    <br> Акция «Приятная пятница» в La Casa del Habano Bolshoy P.Side действует только в формате специальной цены на сигару с собой!!!")
//                    .photo("http://res.cloudinary.com/dqtq98nnn/image/upload/v1702843277/imgItem/character_big/gr6pdhw43rzriz46ehas.jpg")
//                    .enLangHeader("Have a nice Friday, 8 december 2023")
//                    .enLangMainText("The traditional \"Pleasant Friday\" on December 15, 2023 in our cigar stores of the world-famous franchise in St. Petersburg:\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>S.Cristobal De La Habana La Fuerza\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Gorditos cigar format (141 мм x 50 RG)\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Paired with S.Cristobal De La Habana La Fuerza we have been offering the Cuban rum Santisima Trinidad de Cuba for 7 years.\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>For our guests at the wheel, we offer a non-alcoholic pair: cigar juice/non-alcoholic wine/non-alcoholic beer\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>The cost of a pair is only 2,730 rubles!!!\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>Only on this day, for a cigar \"Have a Nice Friday\" Romeo y Julieta Cedros de Luxe, when buying with you, a special price…\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>The offer is valid on Friday from 11:00 to the last cigar and to the last drop\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>You can pre-book a table by clicking the Reserve button, we will definitely call you back\n" +
//                            "                                    <br>\n" +
//                            "                                    <br>The \"Pleasant Friday\" promotion at La Casa del Habano Bolshoy P.Side is valid only in the format of a special price for a cigar with you!!!")
//                    .enLangTag("La Casa del Habano Large, La Casa del Habano Blacksmith, House of Cuban Cigars, Cuban Cigars")
//                    .date(LocalDate.now())
//                    .build();
//            newsRepository.save(oneNews);
//
//            reserveAndFeedbackAndRegistrationService.addReserve(ReserveDTO.builder()
//                    .telOrEmail("+79895468597")
//                    .numberOfGuests(5)
//                    .datetime("13.12.2023")
//                    .message("В Питер приехали отдохнуть с друзьями, придем примерно в 16:00")
//                    .mug("kuznechny")
//                    .name("Олег Сарычев")
//                    .type("standard")
//                    .firstBasket("")
//
//                    .build());
//
//            String keyOne = "";
//            for (Map.Entry<String, Integer> o : items.get(4).getOption().entrySet()) {
//                keyOne = o.getKey();
//            }
//            String keyTwo = "";
//            for (Map.Entry<String, Integer> o : items.get(2).getOption().entrySet()) {
//                keyTwo = o.getKey();
//            }
//
//            reserveAndFeedbackAndRegistrationService.addReserve(ReserveDTO.builder()
//                    .telOrEmail("+78892458309")
//                    .numberOfGuests(3)
//                    .datetime("09.12.2023")
//                    .message("приду к 21:15 примерно")
//                    .mug("kuznechny")
//                    .name("Ильдар")
//                    .type("basket")
//                    .firstBasket("[{\"id\":" + items.get(4).getId() + ",\"option\":\"" + keyOne + "\"},{\"id\":" +  items.get(4).getId() + ",\"option\":\"" + keyOne + "\"},{\"id\":" + items.get(2).getId() + ",\"option\":\"" + keyTwo + "\"}]")
//
//                    .build());
//
//            reserveAndFeedbackAndRegistrationService.addReserve(ReserveDTO.builder()
//                    .telOrEmail("89992456854")
//                    .numberOfGuests(3)
//                    .datetime("10.12.2023")
//                    .message("Нас будет трое, прошу нас принять роскошно)))")
//                    .mug("kuznechny")
//                    .name("Илья Карпычев")
//                    .type("news")
//                    .newsName("Новость резерва Резерв по новости \"Приятная пятница 8 декабря 2023\"")
//                    .firstBasket("")
//
//                    .build());
//
//            reserveAndFeedbackAndRegistrationService.addFeedback(
//                    FeedbackDTO.builder()
//                            .telOrEmail("+79112365959")
//                            .name("Иван")
//                            .message("Скоро приду, жди меня")
//                            .build()
//            );
//            reserveAndFeedbackAndRegistrationService.addRegistrationOfWholesaleCustomer(
//                    RegistrationOfWholesaleCustomerDTO.builder()
//                            .telOrEmail("garmonia_rostov@gmail.com")
//                            .name("Питов Сегрей Михайлович")
//                            .message("Ознакомился с вашим прайсом, хотел бы с вами сотрудничать, прошу вас мне написать")
//                            .city("Ростов-на-дону")
//                            .subjectOfLetter("Хочу с вами сотрудничать")
//                            .nameOfOrganization("Ресторан 'Гармония отдыха'")
//                            .build()
//            );
//        };
//    }
//
//}
