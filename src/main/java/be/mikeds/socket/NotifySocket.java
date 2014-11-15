package be.mikeds.socket;

import be.mikeds.services.CreatureService;
import be.mikeds.util.Observable;
import be.mikeds.util.Observer;
import com.google.inject.Inject;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@ServerEndpoint("notify")
public class NotifySocket implements Observer {

    private CreatureService creatureService;

    private Set<Session> observers = Collections.synchronizedSet(new HashSet<Session>());

    @Inject
    public NotifySocket(CreatureService creatureService) {
        this.creatureService = creatureService;
        creatureService.subscribe(this);
    }

    private void notifyObservers() {
        for (Session observer : observers) {
            notifyObserver(observer);
        }
    }

    private void notifyObserver(Session observer) {
        try {
            observer.getBasicRemote().sendText("update");
        } catch (IOException e) {
            // TODO add logging
        }
    }

    @OnOpen
    public void openConnection(Session session) {
        observers.add(session);
    }

    @OnClose
    public void closedConnection(Session session) {
        observers.remove(session);
    }

    @OnError
    public void error(Session session, Throwable t) {
        observers.remove(session);
    }

    @Override
    public void update(Observable observable, Object args) {
        notify();
    }
}
