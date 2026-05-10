import {useCallback, useEffect, useState} from 'react';
import {MdBarChart, MdExpandMore} from 'react-icons/md';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import type {ExerciseStatisticsReadDTO} from '../../dtos/exercise-statistics-read.dto.tsx';
import statisticsService from '../../services/statistics.service.tsx';
import styles from './exercise-statistics-chart.component.style.tsx';

const SERIES_COLORS = [
    'var(--color-blue)',
    'var(--color-orange)',
    'var(--color-green)',
    'var(--color-purple)',
];

const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
};

export type ExerciseStatisticsChartProps = {
    exerciseId: number;
    workoutId?: number;
    /** When provided, shown as a label above the charts instead of the collapsible "Statistics" header */
    exerciseName?: string;
};

const ExerciseStatisticsChart = ({ exerciseId, workoutId, exerciseName }: ExerciseStatisticsChartProps) => {
    // When exerciseName is provided the parent controls visibility; this component is always expanded.
    const alwaysExpanded = exerciseName !== undefined;
    const [open, setOpen] = useState(alwaysExpanded);
    const [data, setData] = useState<ExerciseStatisticsReadDTO | null>(null);
    const [loading, setLoading] = useState(false);

    const load = useCallback(async () => {
        if (data) return;
        setLoading(true);
        try {
            const result = await statisticsService.getExerciseStatistics(exerciseId, workoutId);
            setData(result);
        } finally {
            setLoading(false);
        }
    }, [exerciseId, workoutId, data]);

    useEffect(() => {
        if (open) load();
    }, [open, load]);

    const hasSeries = data && data.series.length > 0;

    const charts = (
        <>
            {loading && <span css={styles.empty}>Loading…</span>}
            {!loading && !hasSeries && data && (
                <span css={styles.empty}>No execution data yet.</span>
            )}
            {!loading && hasSeries && data.series.map((series, i) => {
                const chartData = series.dataPoints.map((dp) => ({
                    date: dp.date,
                    value: dp.value,
                }));
                return (
                    <div key={series.label}>
                        <div css={styles.seriesLabel}>{series.label}</div>
                        <div css={styles.chartWrapper}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={formatDate}
                                        tick={{ fontSize: 10, fill: 'var(--color-gray)' }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 10, fill: 'var(--color-gray)' }}
                                        tickLine={false}
                                        axisLine={false}
                                        width={32}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--color-container2)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            color: 'var(--color-text)',
                                        }}
                                        labelFormatter={(label) => formatDate(label as string)}
                                        formatter={(val) => [val, series.label]}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke={SERIES_COLORS[i % SERIES_COLORS.length]}
                                        strokeWidth={2}
                                        dot={{ r: 3, fill: SERIES_COLORS[i % SERIES_COLORS.length] }}
                                        activeDot={{ r: 5 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                );
            })}
        </>
    );

    // Flat mode: used inside the history card where the parent handles the outer collapse.
    if (alwaysExpanded) {
        return (
            <div css={styles.container}>
                <span css={styles.exerciseLabel}>{exerciseName}</span>
                {charts}
            </div>
        );
    }

    // Collapsible mode: used in the exercise drawer.
    return (
        <div css={styles.container}>
            <div css={styles.header} onClick={() => setOpen((v) => !v)} role="button" aria-expanded={open}>
                <span css={styles.headerLeft}>
                    <MdBarChart />
                    Statistics
                </span>
                <MdExpandMore css={[styles.chevron, open && styles.chevronOpen]} />
            </div>

            <div css={[styles.body, open ? styles.bodyOpen : styles.bodyClosed]}>
                {charts}
            </div>
        </div>
    );
};

export default ExerciseStatisticsChart;
