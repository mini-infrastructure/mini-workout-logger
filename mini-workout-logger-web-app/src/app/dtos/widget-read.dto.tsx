export type WidgetBackground = 'SOLID' | 'GLASS';
export type WidgetType = 'WORKOUT_SHORTCUT' | 'WORKOUT_LOG' | 'CALENDAR_PREVIEW' | 'CUSTOM';

export type WidgetReadDTO = {
    id: number;
    dashboard_id: number;
    widget_type: WidgetType;
    x: number;
    y: number;
    col_span: number;
    row_span: number;
    background: WidgetBackground;
    background_color?: string;
    config?: string;
};
