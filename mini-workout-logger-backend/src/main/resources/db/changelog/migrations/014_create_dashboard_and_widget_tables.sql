-- Dashboard table
CREATE TABLE dashboards (
    id         BIGSERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    columns    INT NOT NULL DEFAULT 6,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Widget table
CREATE TABLE widgets (
    id               BIGSERIAL PRIMARY KEY,
    dashboard_id     BIGINT NOT NULL REFERENCES dashboards(id) ON DELETE CASCADE,
    widget_type      VARCHAR(50) NOT NULL,
    x                INT NOT NULL DEFAULT 0,
    y                INT NOT NULL DEFAULT 0,
    col_span         INT NOT NULL DEFAULT 1,
    row_span         INT NOT NULL DEFAULT 1,
    background       VARCHAR(20) NOT NULL DEFAULT 'SOLID',
    background_color VARCHAR(20),
    config           TEXT,
    created_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed: default dashboard with one workout shortcut widget
INSERT INTO dashboards (name, columns) VALUES ('Main', 6);

INSERT INTO widgets (dashboard_id, widget_type, x, y, col_span, row_span, background)
VALUES (1, 'WORKOUT_SHORTCUT', 0, 0, 1, 1, 'GLASS');
