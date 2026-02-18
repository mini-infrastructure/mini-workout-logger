export interface MuscleReadDTO {
    id: number;
    name: string;
    muscle_groups: MuscleReadDTO[];
}