package com.vladislavgoncharov.lacasadelhabano.mapper;

import com.vladislavgoncharov.lacasadelhabano.dto.NewsDTO;
import com.vladislavgoncharov.lacasadelhabano.entity.News;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper
public interface NewsMapper {

    NewsMapper MAPPER = Mappers.getMapper(NewsMapper.class);

    default NewsDTO fromNewsAllLang(News news) {
        return NewsDTO.builder()
                .id(news.getId())
                .date(news.getDate())
                .header(news.getHeader())
                .mainText(news.getMainText())
                .tag(news.getTag())
                .enLangHeader(news.getEnLangHeader())
                .enLangMainText(news.getEnLangMainText())
                .enLangTag(news.getEnLangTag())
                .photo(news.getPhoto())
                .build();
    }

    default NewsDTO fromNewsRu(News news) {
        return NewsDTO.builder()
                .id(news.getId())
                .date(news.getDate())
                .header(news.getHeader())
                .mainText(news.getMainText())
                .tag(news.getTag())
                .photo(news.getPhoto())
                .build();
    }

    default NewsDTO fromNewsEn(News news) {
        return NewsDTO.builder()
                .id(news.getId())
                .date(news.getDate())
                .header(news.getEnLangHeader())
                .mainText(news.getEnLangMainText())
                .tag(news.getEnLangTag())
                .photo(news.getPhoto())
                .build();
    }

    default List<NewsDTO> fromNewsList(String lang, List<News> newsList) {
        if (lang.equalsIgnoreCase("allLang"))
            return newsList.stream()
                    .map(this::fromNewsAllLang)
                    .collect(Collectors.toList());
        else if (lang.equalsIgnoreCase("ru"))
            return newsList.stream()
                    .map(this::fromNewsRu)
                    .collect(Collectors.toList());
        else
            return newsList.stream()
                    .map(this::fromNewsEn)
                    .collect(Collectors.toList());
    }

    default News toNews(NewsDTO newsDTO) {
        return News.builder()
                .id(newsDTO.getId())
                .date(newsDTO.getDate())
                .header(newsDTO.getHeader())
                .mainText(newsDTO.getMainText())
                .tag(newsDTO.getTag())
                .enLangHeader(newsDTO.getEnLangHeader())
                .enLangMainText(newsDTO.getEnLangMainText())
                .enLangTag(newsDTO.getEnLangTag())
                .photo(newsDTO.getPhoto())
                .build();
    }


}
