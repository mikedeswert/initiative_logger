package be.mikeds.services.impl;

import be.mikeds.services.Service;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * --------------------------------
 * Created by mikeds on 27/03/2015.
 * --------------------------------
 */
public abstract class ServiceImpl<T> implements Service<T> {

    @Override
    public T get(String id) {
        return getRepository().findOne(id);
    }

    @Override
    public List<T> getAll() {
        return getRepository().findAll();
    }

    @Override
    public void save(T t) {
        getRepository().save(t);
    }

    @Override
    public void delete(String id) {
        getRepository().delete(id);
    }

    @Override
    public void deleteAll() {
        getRepository().deleteAll();
    }

    abstract MongoRepository<T, String> getRepository();
}
