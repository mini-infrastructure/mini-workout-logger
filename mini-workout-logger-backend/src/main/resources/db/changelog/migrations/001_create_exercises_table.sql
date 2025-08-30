CREATE TABLE exercises (

    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) CHECK (category IN ('ASSISTED_BODYWEIGHT',
                                              'NUMBER_OF_REPS',
                                              'DURATION',
                                              'BARBELL',
                                              'DUMBBELL',
                                              'CABLE',
                                              'MACHINE',
                                              'RESISTANCE_BAND',
                                              'KETTLEBELL')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL

);
