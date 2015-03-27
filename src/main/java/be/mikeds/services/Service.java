package be.mikeds.services;

import java.util.List;

/**
 * --------------------------------
 * Created by mikeds on 27/03/2015.
 * --------------------------------
 */
public interface Service<T> {
    T get(String id);
    List<T> getAll();
    void save(T t);
    void delete(String id);
    void deleteAll();
}
