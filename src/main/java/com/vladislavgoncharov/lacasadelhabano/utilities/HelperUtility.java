package com.vladislavgoncharov.lacasadelhabano.utilities;

import java.util.Locale;

public interface HelperUtility {

    default String replaceSpacesWithUnderscores(String text) {
        text = text.replace(" ", "_");
        return text.toLowerCase(Locale.ROOT);
    }

}
