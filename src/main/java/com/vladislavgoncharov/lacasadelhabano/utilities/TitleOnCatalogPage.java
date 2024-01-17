package com.vladislavgoncharov.lacasadelhabano.utilities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TitleOnCatalogPage {

    public static boolean switcherStatic = true;
    public static String textRuStatic = "Сайт временно на актуализации каталога, цены и наличие уточняйте по телефону";
    public static String textEnStatic = "The site is temporarily updating the catalog, please check prices and availability by phone";
    public static String colorTextStatic = "#0f0e0d";
    public static String colorBackgroundStatic = "#e1694e";

    private boolean switcher;
    private String textRu;
    private String textEn;
    private String colorText;
    private String colorBackground;

    public TitleOnCatalogPage(){
        this.switcher = TitleOnCatalogPage.switcherStatic;
        this.textRu = TitleOnCatalogPage.textRuStatic;
        this.textEn = TitleOnCatalogPage.textEnStatic;
        this.colorText = TitleOnCatalogPage.colorTextStatic;
        this.colorBackground = TitleOnCatalogPage.colorBackgroundStatic;
    }

    public static void updateData(TitleOnCatalogPage titleOnCatalogPage) {
        TitleOnCatalogPage.switcherStatic = titleOnCatalogPage.isSwitcher();
        TitleOnCatalogPage.textRuStatic = titleOnCatalogPage.getTextRu();
        TitleOnCatalogPage.textEnStatic = titleOnCatalogPage.getTextEn();
        TitleOnCatalogPage.colorTextStatic = titleOnCatalogPage.getColorText();
        TitleOnCatalogPage.colorBackgroundStatic = titleOnCatalogPage.getColorBackground();
    }

}
