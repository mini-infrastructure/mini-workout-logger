import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FaCheckSquare} from 'react-icons/fa';
import {IoBarbell} from 'react-icons/io5';
import Layout from '../../components/layout/layout.component.tsx';
import type {WidgetItem} from '../../components/grid/widget-grid/widget-grid.component.tsx';
import WidgetGrid from '../../components/grid/widget-grid/widget-grid.component.tsx';
import IconWidget from '../../components/widget/templates/icon-widget.component.tsx';
import dashboardService from '../../services/dashboard.service.tsx';

const WIDGETS: WidgetItem[] = [
    { id: 1, x: 0, y: 0, colSpan: 2, rowSpan: 1, background: 'SOLID' },
    { id: 2, x: 2, y: 0, colSpan: 2, rowSpan: 1, background: 'SOLID' },
];

const DashboardView = () => {
    const navigate = useNavigate();
    const [executionCount, setExecutionCount] = useState(0);
    const [workoutCount, setWorkoutCount] = useState(0);

    useEffect(() => {
        dashboardService.getExecutionCount().then(setExecutionCount).catch((e) => console.error('executionCount error', e));
        dashboardService.getWorkoutCount().then(setWorkoutCount).catch((e) => console.error('workoutCount error', e));
    }, []);

    const renderWidget = (item: WidgetItem) => {
        if (item.id === 1) {
            return (
                <IconWidget
                    icon={<FaCheckSquare />}
                    header="Executions"
                    subText="testando"
                    highlightedText={executionCount}
                    onClick={() => navigate('/log')}
                />
            );
        }
        if (item.id === 2) {
            return (
                <IconWidget
                    icon={<IoBarbell />}
                    header="Workouts"
                    highlightedText={workoutCount}
                    onClick={() => navigate('/workouts')}
                />
            );
        }
        return <div />;
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
                columns={12}
                editMode={false}
                widgets={WIDGETS}
                onLayoutChange={() => {}}
                renderWidget={renderWidget}
                customCss={{ flex: 1 }}
            />
        </Layout>
    );
};

export default DashboardView;
