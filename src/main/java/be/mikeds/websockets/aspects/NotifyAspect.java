package be.mikeds.websockets.aspects;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.Date;

/**
 * --------------------------------
 * Created by mikeds on 16/11/2014.
 * --------------------------------
 */
@Aspect
public class NotifyAspect {
    @Autowired
    private SimpMessagingTemplate template;

    private static final String WEBSOCKET_TOPIC = "/topic/notify";

    @Pointcut("@annotation(be.mikeds.websockets.annotations.NotifyClients)")
    public void notifyPointcut() {}

    @Pointcut("execution(* be.mikeds.rest..*(..))")
    public void methodPointcut() {}

    @After("methodPointcut() && notifyPointcut()")
    public void notifyClients() throws Throwable {
        template.convertAndSend(WEBSOCKET_TOPIC, new Date());
    }
}
