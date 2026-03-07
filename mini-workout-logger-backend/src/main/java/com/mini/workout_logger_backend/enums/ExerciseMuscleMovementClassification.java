package com.mini.workout_logger_backend.enums;

/**
 * Source: @see <a href="https://exrx.net/Kinesiology/Glossary#MuscleMovementClassification">ExRx.net - Muscle Movement Classification</a>
 */
public enum ExerciseMuscleMovementClassification {

    /**
     * A muscle that causes motion.
     */
    AGONIST,

    /**
     * A muscle that can move the joint opposite to the movement produced by the agonist.
     */
    ANTAGONIST,

    /**
     * The primary muscle intended for exercise.
     */
    TARGET,

    /**
     * A muscle that assists another muscle to accomplish a movement.
     */
    SYNERGIST,

    /**
     * A muscle that contracts with no significant movement to maintain a posture or fixate a joint.
     */
    STABILIZER,

    /**
     * A muscle that stabilizes a joint during movement by shortening at one joint while lengthening at another.
     */
    DYNAMIC_STABILIZER,

    /**
     * A muscle that contracts to stabilize a joint by opposing forces created by a biarticular agonist.
     */
    ANTAGONIST_STABILIZER,
    ;

}
