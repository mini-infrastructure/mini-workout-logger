import type {SetCategory, SetType} from '../models/set.model.tsx';

export interface SetWriteDTO {
    category: SetCategory;
    type: SetType;
    planned_repetitions: number | null;
    planned_weight: number | null;
    planned_duration_seconds: number | null;
}
