package be.mikeds.services.impl;

import be.mikeds.model.BoardTemplate;
import be.mikeds.repositories.BoardRepository;
import be.mikeds.repositories.BoardTemplateRepository;
import be.mikeds.services.BoardTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * --------------------------------
 * Created by mikeds on 27/03/2015.
 * --------------------------------
 */
@Service
public class BoardTemplateServiceImpl extends ServiceImpl<BoardTemplate> implements BoardTemplateService {

    @Autowired
    private BoardTemplateRepository boardTemplateRepository;

    @Override
    MongoRepository<BoardTemplate, String> getRepository() {
        return boardTemplateRepository;
    }
}
