import type { SetCategory, SetType } from '../../models/Set';

export interface SetReadDTO {
    id: number;
    position: number;
    category: SetCategory;
    type: SetType;
    planned_repetitions: number;
    planned_weight: number;
    planned_duration_seconds: number;
}
