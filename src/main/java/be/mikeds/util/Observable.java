package be.mikeds.util;


/**
 * --------------------------------
 * Created by mikeds on 15/11/2014.
 * --------------------------------
 */
public interface Observable {
    void subscribe(Observer observer);
    void notifyObservers();
}
