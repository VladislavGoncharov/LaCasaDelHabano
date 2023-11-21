package com.vladislavgoncharov.lacasadelhabano.service;

import com.vladislavgoncharov.lacasadelhabano.dto.NewsDTO;

import java.util.List;

public interface NewsService {

    List<NewsDTO> findAllItem(String lang);
    NewsDTO getNewsById(String lang, Long id);
    NewsDTO getLastNews(String lang);

    boolean addNews(NewsDTO newsDTO);
    boolean updateNews(NewsDTO newsDTO);
    boolean deleteNews(Long id);

}
