package com.vladislavgoncharov.lacasadelhabano.service.impl;

import com.vladislavgoncharov.lacasadelhabano.dto.NewsDTO;
import com.vladislavgoncharov.lacasadelhabano.entity.News;
import com.vladislavgoncharov.lacasadelhabano.mapper.NewsMapper;
import com.vladislavgoncharov.lacasadelhabano.repository.NewsRepository;
import com.vladislavgoncharov.lacasadelhabano.service.NewsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class NewsServiceImpl implements NewsService {

    private final NewsMapper MAPPER = NewsMapper.MAPPER;

    private final NewsRepository newsRepository;

    public NewsServiceImpl(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }


    @Override
    public List<NewsDTO> findAllItem(String lang) {
        List<News> newsList = newsRepository.findAll();
        Collections.reverse(newsList);

        return MAPPER.fromNewsList(lang, newsList);
    }

    @Override
    public NewsDTO getNewsById(String lang, Long id) {
        if (lang.equalsIgnoreCase("ru"))
            return MAPPER.fromNewsRu(newsRepository.getById(id));
        else
            return MAPPER.fromNewsEn(newsRepository.getById(id));
    }

    @Override
    public NewsDTO getLastNews(String lang) {
        if (lang.equalsIgnoreCase("ru"))
            return MAPPER.fromNewsRu(newsRepository.findTopByOrderByIdDesc());
        else
            return MAPPER.fromNewsEn(newsRepository.findTopByOrderByIdDesc());
    }

    @Override
    public boolean addNews(NewsDTO newsDTO) {
        try {
            newsRepository.save(MAPPER.toNews(newsDTO));
        } catch (RuntimeException exception) {
            System.out.println(exception.getMessage());
            return false;
        }
        return true;
    }

    @Override
    public boolean updateNews(NewsDTO newsDTO) {
        try {
            newsRepository.save(MAPPER.toNews(newsDTO));
        } catch (RuntimeException exception) {
            System.out.println(exception.getMessage());
            return false;
        }
        return true;
    }

    @Override
    public boolean deleteNews(Long id) {
        try {
            newsRepository.deleteById(id);
        } catch (RuntimeException exception) {
            System.out.println(exception.getMessage());
            return false;
        }
        return true;
    }
}
