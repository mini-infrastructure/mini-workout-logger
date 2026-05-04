import { useEffect, useState } from 'react';
// import { MdEdit } from 'react-icons/md';
// import { FaCheck } from 'react-icons/fa';
import Layout from '../../components/layout/layout.component.tsx';
// import OnlyIconButton from '../../components/button/only-icon-button.component.tsx';
import WidgetGrid from '../../components/grid/widget-grid/widget-grid.component.tsx';
import type { WidgetItem } from '../../components/grid/widget-grid/widget-grid.component.tsx';
import Widget from '../../components/widget/widget.component.tsx';
import WorkoutShortcutWidget from '../../components/widget/templates/workout-shortcut.widget.tsx';
import dashboardService from '../../services/dashboard.service.tsx';
// import widgetService from '../../services/widget.service.tsx';
import type { DashboardReadDTO } from '../../dtos/dashboard-read.dto.tsx';
// import { useAlert } from '../../context/alert.context.tsx';

const DASHBOARD_ID = 1;

const DashboardView = () => {
    // const pushAlert = useAlert();
    const [editMode] = useState(false);
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

    // const handleSave = async () => { ... };
    // const handleToggleEditMode = async (next: boolean) => { ... };

    const renderWidget = (item: WidgetItem) => {
        const widgetType = widgetTypeMap[item.id];
        return (
            <Widget
                editMode={editMode}
                background={item.background}
                backgroundColor={item.backgroundColor}
            >
                {widgetType === 'WORKOUT_SHORTCUT'
                    ? <WorkoutShortcutWidget count={workoutCount} editMode={editMode} />
                    : <div />
                }
            </Widget>
        );
    };

    return (
        <Layout>
            {/* navbarContent={
                <OnlyIconButton
                    icon={<MdEdit />}
                    selectedIcon={<FaCheck />}
                    iconColor="--color-gray"
                    selectedIconColor="--color-blue"
                    selected={editMode}
                    onToggle={handleToggleEditMode}
                    legend="Edit dashboard"
                    selectedLegend="Save dashboard"
                />
            } */}
            <WidgetGrid
                columns={10}
                editMode={editMode}
                widgets={widgets}
                onLayoutChange={() => {}}
                renderWidget={renderWidget}
                customCss={{ flex: 1 }}
            />
        </Layout>
    );
};

export default DashboardView;
