package com.vladislavgoncharov.lacasadelhabano.telegramBot;


import com.vladislavgoncharov.lacasadelhabano.dto.BasketDTO;
import com.vladislavgoncharov.lacasadelhabano.dto.FeedbackDTO;
import com.vladislavgoncharov.lacasadelhabano.dto.RegistrationOfWholesaleCustomerDTO;
import com.vladislavgoncharov.lacasadelhabano.dto.ReserveDTO;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Component
public class TelegramBot extends TelegramLongPollingBot {


    public TelegramBot() throws TelegramApiException {
        TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);

        try {
            botsApi.registerBot(this);

        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String getBotUsername() {
        return "@LaCasaDelHabanoSPB";
    }

    @Override
    public String getBotToken() {
        return "6729962469:AAFTI51aGIvGZOBVUWH-9VH4JtjmZ0rByWY";
    }
    @SneakyThrows
    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            long chatId = update.getMessage().getChatId();

//          Отправка ответа на полученное сообщение
            execute(SendMessage.builder()
                    .chatId(chatId)
                    .text("Я бот, который отправляет вам оповещения, обрабатывать команды я не могу")
                    .build());

        }
    }

    @SneakyThrows
    public void submitNewReserve(ReserveDTO reserveDTO, List<Long> listChatId) {

        listChatId.forEach(aLong -> {
            reserveDTO.setMug(reserveDTO.getMug()
                    .equalsIgnoreCase("kuznechny") ? "Кузнечный переулок д.14" : "Большой проспект п.с. д.37");

            sendReserve(reserveDTO, aLong);
        });
    }

    @SneakyThrows
    private void sendReserve(ReserveDTO reserveDTO, Long chatId) {
        switch (reserveDTO.getType()) {
            case "standard" -> {
                execute(SendMessage.builder()
                        .chatId(chatId)
                        .text("На сайте осуществили резерв Стандарт. \n"
                                + "Магазин: " + reserveDTO.getMug() + "\n"
                                + "Имя: " + reserveDTO.getName() + "\n"
                                + "Телефон/email: " + reserveDTO.getTelOrEmail() + "\n"
                                + "Дата: " + reserveDTO.getDatetime() + "\n"
                                + "Количество гостей: " + reserveDTO.getNumberOfGuests() + "\n"
                                + "Сообщение: " + reserveDTO.getMessage() + "\n"
                        )
                        .build());
            }
            case "news" -> {
                execute(SendMessage.builder()
                        .chatId(chatId)
                        .text("На сайте осуществили резерв по Новости. \n"
                                + "Название новости: " + reserveDTO.getNewsName() + "\n"
                                + "Магазин: " + reserveDTO.getMug() + "\n"
                                + "Имя: " + reserveDTO.getName() + "\n"
                                + "Телефон/email: " + reserveDTO.getTelOrEmail() + "\n"
                                + "Дата: " + reserveDTO.getDatetime() + "\n"
                                + "Количество гостей: " + reserveDTO.getNumberOfGuests() + "\n"
                                + "Сообщение: " + reserveDTO.getMessage() + "\n"
                        )
                        .build());
            }
            case "basket" -> {

                StringBuilder items = new StringBuilder();

                int i = 1;
                for (Map.Entry<BasketDTO, Integer> entry : reserveDTO.getBasketMap().entrySet()) {
                    items.append(i)
                            .append(". ")
                            .append(entry.getKey().getItemName())
                            .append(", по опции ")
                            .append(entry.getKey().getItemOption())
                            .append(", в колечестве ")
                            .append(entry.getValue())
                            .append(" ед.\n")
                            .append("Ссылка на товар\n")
                            .append("https://cigarsplace.ru/ru/item/")
                            .append(entry.getKey().getId())
                            .append("\n");
                    i++;
                }

                execute(SendMessage.builder()
                        .chatId(chatId)
                        .text("На сайте осуществили резерв товаров. \n"
                                + "Магазин: " + reserveDTO.getMug() + "\n"
                                + "Имя: " + reserveDTO.getName() + "\n"
                                + "Телефон/email: " + reserveDTO.getTelOrEmail() + "\n"
                                + "Желает прийти: " + reserveDTO.getDatetime() + "\n"
                                + "Количество гостей: " + reserveDTO.getNumberOfGuests() + "\n"
                                + "Сообщение: " + reserveDTO.getMessage() + "\n"
                                + "Товары: \n" + items
                                + "Итого: \nсумма: " + reserveDTO.getFullPrice() + " р.\n"
                                + "количество товаров: " + reserveDTO.getQuantityItems() + " ед.\n"
                        )
                        .build());
            }
        }
    }

    @SneakyThrows
    public void submitNewFeedback(FeedbackDTO feedbackDTO, List<Long> listChatId) {

        listChatId.forEach(aLong -> {
            try {
                execute(SendMessage.builder()
                        .chatId(aLong)
                        .text("На сайте отправили форму обратной связи \n"
                                + "Имя: " + feedbackDTO.getName() + "\n"
                                + "Телефон/email: " + feedbackDTO.getTelOrEmail() + "\n"
                                + "Дата и время: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd MMMM yyyy HH:mm:ss", Locale.forLanguageTag("ru"))) + "\n"
                                + "Сообщение: " + feedbackDTO.getMessage()
                        )
                        .build());
            } catch (TelegramApiException e) {
                e.printStackTrace();
            }
        });
    }
    @SneakyThrows
    public void submitNewRegistrationOfWholesaleCustomer(RegistrationOfWholesaleCustomerDTO feedbackDTO, List<Long> listChatId) {

        listChatId.forEach(aLong -> {
            try {
                execute(SendMessage.builder()
                        .chatId(aLong)
                        .text("На сайте отправили форму обратной связи для оптовых покупателей \n"
                                + "Имя: " + feedbackDTO.getName() + "\n"
                                + "Телефон/email: " + feedbackDTO.getTelOrEmail() + "\n"
                                + "Организация: " + feedbackDTO.getNameOfOrganization() + "\n"
                                + "Город: " + feedbackDTO.getCity() + "\n"
                                + "Дата и время: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd MMMM yyyy HH:mm:ss", Locale.forLanguageTag("ru"))) + "\n"
                                + "Заголовок: " + feedbackDTO.getSubjectOfLetter() + "\n"
                                + "Сообщение: " + feedbackDTO.getMessage()
                        )
                        .build());
            } catch (TelegramApiException e) {
                e.printStackTrace();
            }
        });
    }

    public void addNewUser(String telegramId) throws TelegramApiException {
        execute(SendMessage.builder()
                .chatId(telegramId)
                .text("В телеграм-бот добавлен новый пользователь с ID: " + telegramId)
                .build());
    }
}