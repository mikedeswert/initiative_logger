package be.mikeds.repositories;

import be.mikeds.model.BoardTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * --------------------------------
 * Created by mikeds on 27/03/2015.
 * --------------------------------
 */
@Repository
public interface BoardTemplateRepository extends MongoRepository<BoardTemplate, String> {
}
