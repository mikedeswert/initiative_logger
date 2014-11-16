package be.mikeds.spring.config;

import be.mikeds.aspects.NotifyAspect;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.Controller;

/**
 * --------------------------------
 * Created by mikeds on 16/11/2014.
 * --------------------------------
 */
@Configuration
@ComponentScan(basePackages = { "be.mikeds" }, excludeFilters = { @ComponentScan.Filter(value = Controller.class, type = FilterType.ANNOTATION) })
@EnableAspectJAutoProxy
public class AppConfig {
    @Bean
    public NotifyAspect notifyAspect() {
        return new NotifyAspect();
    }
}
