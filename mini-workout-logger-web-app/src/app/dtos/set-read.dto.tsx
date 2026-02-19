import type {SetCategory, SetType} from "../models/set.model.tsx";

export interface SetReadDTO {
    id: number;
    position: number;
    category: SetCategory;
    type: SetType;
    weight: number;
    duration_seconds: number;
}