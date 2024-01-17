package com.vladislavgoncharov.lacasadelhabano.mapper;

import com.vladislavgoncharov.lacasadelhabano.dto.FeedbackDTO;
import com.vladislavgoncharov.lacasadelhabano.entity.Feedback;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Mapper
public interface FeedbackMapper {

    FeedbackMapper MAPPER = Mappers.getMapper(FeedbackMapper.class);

    default FeedbackDTO fromFeedback(Feedback feedback) {
        return FeedbackDTO.builder()
                .id(feedback.getId())
                .datetime(feedback.getDatetime().format(DateTimeFormatter.ofPattern("dd MMMM yyyy hh:mm:ss")))
                .name(feedback.getName())
                .telOrEmail(feedback.getTelOrEmail())
                .message(feedback.getMessage())
                .build();
    }

    default List<FeedbackDTO> fromFeedbackList(List<Feedback> feedbacks) {
        return feedbacks.stream()
                .map(this::fromFeedback)
                .collect(Collectors.toList());
    }

    default Feedback toFeedback(FeedbackDTO feedbackDTO) {
        return Feedback.builder()
                .id(feedbackDTO.getId())
                .datetime(LocalDateTime.now())
                .name(feedbackDTO.getName())
                .telOrEmail(feedbackDTO.getTelOrEmail())
                .message(feedbackDTO.getMessage())
                .build();
    }

}
