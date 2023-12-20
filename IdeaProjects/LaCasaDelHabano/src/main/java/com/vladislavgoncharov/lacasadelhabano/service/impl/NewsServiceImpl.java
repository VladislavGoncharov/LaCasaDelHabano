package com.vladislavgoncharov.lacasadelhabano.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.vladislavgoncharov.lacasadelhabano.dto.NewsDTO;
import com.vladislavgoncharov.lacasadelhabano.entity.News;
import com.vladislavgoncharov.lacasadelhabano.mapper.NewsMapper;
import com.vladislavgoncharov.lacasadelhabano.repository.NewsRepository;
import com.vladislavgoncharov.lacasadelhabano.service.NewsService;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class NewsServiceImpl implements NewsService {

    private final NewsMapper MAPPER = NewsMapper.MAPPER;

    private final NewsRepository newsRepository;
    private final Cloudinary cloudinary;

    public NewsServiceImpl(NewsRepository newsRepository, Cloudinary cloudinary) {
        this.newsRepository = newsRepository;
        this.cloudinary = cloudinary;
    }


    @Override
    public List<NewsDTO> findAllItem(String lang) {
        List<News> newsList = newsRepository.findAll();
        Collections.reverse(newsList);

        return MAPPER.fromNewsList(lang, newsList);
    }

    @Override
    public NewsDTO getNewsById(Long id) {
            return MAPPER.fromNewsAllLang(newsRepository.getById(id));

    }

    @Override
    public NewsDTO getLastNews(String lang) {
        if (lang.equalsIgnoreCase("ru"))
            return MAPPER.fromNewsRu(newsRepository.findTopByOrderByIdDesc());
        else
            return MAPPER.fromNewsEn(newsRepository.findTopByOrderByIdDesc());
    }

    @Override
    public void addNews(NewsDTO newsDTO) throws RuntimeException, IOException {
            newsDTO.setDate(LocalDate.now());
            newsDTO.setPhoto(getPhotoByCloudinary(newsDTO.getPhotoMultipartFile()));

            newsRepository.save(MAPPER.toNews(newsDTO));
    }

    private String getPhotoByCloudinary(MultipartFile photoMultipartFile) throws IOException {

        File newsImg = new File("big_" + photoMultipartFile.getOriginalFilename());
        try (InputStream inputStreamReader = photoMultipartFile.getInputStream();
             OutputStream outputStream = new FileOutputStream(newsImg)) {
            IOUtils.copy(inputStreamReader, outputStream);
        }


        Map uploadResultBig = cloudinary.uploader()
                .upload(newsImg, ObjectUtils.asMap("folder", "imgItem/character_big"));

        newsImg.delete();

        return (String) uploadResultBig.get("url");
    }

    @Override
    public void updateNews(NewsDTO newsDTO) throws RuntimeException, IOException {

        News oldNews = newsRepository.getById(newsDTO.getId());

        oldNews.setHeader(newsDTO.getHeader());
        oldNews.setMainText(newsDTO.getMainText());
        oldNews.setTag(newsDTO.getTag());
        oldNews.setEnLangHeader(newsDTO.getEnLangHeader());
        oldNews.setEnLangMainText(newsDTO.getEnLangMainText());
        oldNews.setEnLangTag(newsDTO.getEnLangTag());

        if (!(newsDTO.getPhotoMultipartFile() == null))
            oldNews.setPhoto(getPhotoByCloudinary(newsDTO.getPhotoMultipartFile()));

        newsRepository.save(oldNews);

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

    @Override
    public List<NewsDTO> findAllItemForAdmin() {
        List<News> newsList = newsRepository.findAll();
        Collections.reverse(newsList);

        return MAPPER.fromNewsList("allLang", newsList);
    }

    @Override
    public Long getCount() {
        return newsRepository.count();
    }
}
