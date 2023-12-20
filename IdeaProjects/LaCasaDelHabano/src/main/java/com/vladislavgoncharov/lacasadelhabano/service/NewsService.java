package com.vladislavgoncharov.lacasadelhabano.service;

import com.vladislavgoncharov.lacasadelhabano.dto.NewsDTO;

import java.io.IOException;
import java.util.List;

public interface NewsService {

    List<NewsDTO> findAllItem(String lang);
    NewsDTO getNewsById(Long id);
    NewsDTO getLastNews(String lang);

    void addNews(NewsDTO newsDTO) throws RuntimeException, IOException;
    void updateNews(NewsDTO newsDTO) throws RuntimeException, IOException;
    boolean deleteNews(Long id);

    List<NewsDTO> findAllItemForAdmin();
    Long getCount();
}
