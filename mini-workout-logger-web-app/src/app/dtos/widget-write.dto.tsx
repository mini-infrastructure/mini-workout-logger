export type WidgetWriteDTO = {
    x: number;
    y: number;
    col_span: number;
    row_span: number;
    background?: 'SOLID' | 'GLASS';
    background_color?: string;
};
