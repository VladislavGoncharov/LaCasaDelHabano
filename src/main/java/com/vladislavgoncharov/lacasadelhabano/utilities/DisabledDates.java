package com.vladislavgoncharov.lacasadelhabano.utilities;


import lombok.*;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.TreeSet;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Component
public class DisabledDates {

    private TreeSet<LocalDate> disabledDates = new TreeSet<>(Collections.singleton(LocalDate.now().plusDays(1)));

    public void updateDate() {

        TreeSet<LocalDate> updateDates = new TreeSet<>();

        for (LocalDate date: disabledDates) {
            if (date.isAfter(LocalDate.now().minusDays(1))) {
                updateDates.add(date);
            }
        }

        disabledDates = new TreeSet<>(updateDates);
    }

    public void addDisableDate(String stringDate) {
        LocalDate date = LocalDate.parse(stringDate, DateTimeFormatter.ofPattern("dd.MM.yyyy"));
        disabledDates.add(date);
        updateDate();
    }
    public void deleteDisableDate(String stringDate) {
        LocalDate date = LocalDate.parse(stringDate);
        disabledDates.remove(date);
        updateDate();
    }
}
