package com.mini.workout_logger_backend.controller;

import com.mini.java_core.entity.Text;
import com.mini.workout_logger_backend.entity.Muscle;
import com.mini.workout_logger_backend.repository.MuscleRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest
@AutoConfigureMockMvc
public class MuscleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MuscleRepository muscleRepository;

    @Test
    void create() throws Exception {
        // Create test entity.
        final Muscle muscle = new Muscle();
        muscle.setName(muscle.getTextCode("Chest"));

        // Perform POST request to create the muscle.
        mockMvc.perform(post("/muscles")

        );
    }

}
