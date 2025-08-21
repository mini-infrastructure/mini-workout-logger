package com.mini.workout_logger_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class MessageService {

    @Autowired
    private MessageSource messageSource;

    /**
     * Retrieves a localized message based on the provided key and locale.
     *
     * @param key    the message key
     * @param locale the locale for which the message should be retrieved
     * @return the localized message
     */
    public String getMessage(String key, String locale) {
        return messageSource.getMessage(key, null, new Locale(locale));
    }

}
