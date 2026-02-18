import type {SetCategory, SetType} from "../models/set.model.tsx";

export interface SetWriteDTO {
    category: SetCategory;
    type: SetType;
    repetitions: number;
    weight: number;
    duration_seconds: number;
}