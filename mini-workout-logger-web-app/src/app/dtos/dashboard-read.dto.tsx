import type { WidgetReadDTO } from './widget-read.dto.tsx';

export type DashboardReadDTO = {
    id: number;
    name: string;
    columns: number;
    widgets: WidgetReadDTO[];
};
