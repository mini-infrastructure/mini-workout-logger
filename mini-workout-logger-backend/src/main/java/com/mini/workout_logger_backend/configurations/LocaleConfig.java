package com.mini.workout_logger_backend.configurations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.util.Locale;

@Configuration
public class LocaleConfig {

    @Value("${app.default-locale:pt_BR}")
    private String defaultLocale;

    /**
     * Sets the default locale for the application.
     * Can be overridden by ?lang=<language> parameter in the URL.
     *
     * @return the session locale resolver
     */
    @Bean
    public SessionLocaleResolver localeResolver() {
        SessionLocaleResolver localeResolver = new SessionLocaleResolver();
        Locale locale = Locale.forLanguageTag(this.defaultLocale.replace('_', '-'));
        localeResolver.setDefaultLocale(locale);
        return localeResolver;
    }

}
