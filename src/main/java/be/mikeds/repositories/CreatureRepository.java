package be.mikeds.repositories;

import be.mikeds.model.Creature;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * --------------------------------
 * Created by mikeds on 18/11/2014.
 * --------------------------------
 */
@Repository
public interface CreatureRepository extends MongoRepository<Creature, String>{
}
