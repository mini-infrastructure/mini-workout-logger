export type ExerciseStatisticsDataPoint = {
    date: string;
    value: number;
};

export type ExerciseStatisticsSeries = {
    label: string;
    dataPoints: ExerciseStatisticsDataPoint[];
};

export type ExerciseStatisticsReadDTO = {
    exerciseId: number;
    exerciseName: string;
    mode: string;
    series: ExerciseStatisticsSeries[];
};
