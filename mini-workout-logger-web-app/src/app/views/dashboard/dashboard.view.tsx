import { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import Layout from '../../components/layout/layout.component.tsx';
import OnlyIconButton from '../../components/button/only-icon-button.component.tsx';
import WidgetGrid from '../../components/grid/widget-grid/widget-grid.component.tsx';
import type { WidgetItem } from '../../components/grid/widget-grid/widget-grid.component.tsx';
import Widget from '../../components/widget/widget.component.tsx';
import WorkoutShortcutWidget from '../../components/widget/templates/workout-shortcut.widget.tsx';
import dashboardService from '../../services/dashboard.service.tsx';
import type { DashboardReadDTO } from '../../dtos/dashboard-read.dto.tsx';
import {FaCheck} from "react-icons/fa";

const DASHBOARD_ID = 1;

const DashboardView = () => {
    const [editMode, setEditMode] = useState(false);
    const [dashboard, setDashboard] = useState<DashboardReadDTO | null>(null);
    const [workoutCount, setWorkoutCount] = useState(0);

    useEffect(() => {
        dashboardService.getById(DASHBOARD_ID).then(setDashboard).catch(console.error);
        dashboardService.getWorkoutCount().then(setWorkoutCount).catch(console.error);
    }, []);

    const widgets: WidgetItem[] = (dashboard?.widgets ?? []).map((w) => ({
        id: w.id,
        x: w.x,
        y: w.y,
        colSpan: w.col_span,
        rowSpan: w.row_span,
        background: w.background,
        backgroundColor: w.background_color,
    }));

    const widgetTypeMap = Object.fromEntries(
        (dashboard?.widgets ?? []).map((w) => [w.id, w.widget_type])
    );

    const renderWidget = (item: WidgetItem) => {
        const widgetType = widgetTypeMap[item.id];
        return (
            <Widget
                editMode={editMode}
                background={item.background}
                backgroundColor={item.backgroundColor}
                onClick={editMode ? () => console.log(`Edit widget ${item.id}`) : undefined}
            >
                {widgetType === 'WORKOUT_SHORTCUT'
                    ? <WorkoutShortcutWidget count={workoutCount} />
                    : <div />
                }
            </Widget>
        );
    };

    return (
        <Layout navbarContent={
            <OnlyIconButton
                icon={<MdEdit />}
                selectedIcon={<FaCheck />}
                iconColor="--color-gray"
                selectedIconColor="--color-blue"
                selected={editMode}
                onToggle={() => setEditMode((prev) => !prev)}
                legend="Edit dashboard"
                selectedLegend="Exit edit mode"
            />
        }>
            <WidgetGrid
                columns={dashboard?.columns ?? 6}
                editMode={editMode}
                widgets={widgets}
                renderWidget={renderWidget}
                customCss={{ flex: 1 }}
            />
        </Layout>
    );
};

export default DashboardView;
