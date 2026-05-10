import {useCallback, useEffect, useRef, useState} from 'react';
import {MdAdd, MdCheckBox, MdCheckBoxOutlineBlank} from 'react-icons/md';
import {TbSelect} from 'react-icons/tb';
import PrimaryButton from '../../components/button/button.primary.component.tsx';
import Layout from '../../components/layout/layout.component.tsx';
import Search from '../../components/search/search.component.tsx';
import Pagination from '../../components/pagination/pagination.component.tsx';
import Badge from '../../components/badge/badge.component.tsx';
import OnlyIconButton from '../../components/button/only-icon-button.component.tsx';
import WorkoutExecutionService from '../../services/workout-execution.service.tsx';
import activityLogService from '../../services/activity-log.service.tsx';
import type {WorkoutExecutionLogReadDTO} from '../../dtos/workout-execution-log-read.dto.tsx';
import type {ActivityLogReadDTO} from '../../dtos/activity-log-read.dto.tsx';
import AddLogModal from './add-log.modal.component.tsx';
import styles from './log.view.style.tsx';

type LogEntry = {
    id: number;
    type: 'workout' | 'activity';
    activity_name: string;
    start_time: string | null;
    duration_seconds: number | null;
    completed: boolean;
};

const PAGE_SIZE = 10;

const toEntry = {
    workout: (w: WorkoutExecutionLogReadDTO): LogEntry => ({
        id:               w.id,
        type:             'workout',
        activity_name:    w.workout_name,
        start_time:       w.start_time ?? null,
        duration_seconds: w.duration_seconds,
        completed:        w.completed,
    }),
    activity: (a: ActivityLogReadDTO): LogEntry => ({
        id:               a.id,
        type:             'activity',
        activity_name:    a.exercise_name,
        start_time:       a.start_time ?? null,
        duration_seconds: a.duration_seconds,
        completed:        a.completed,
    }),
};

const useLog = (search: string, refreshKey: number) => {
    const [allEntries, setAllEntries] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const params = { size: 1000, search: search || undefined };
                const [workoutResult, activityResult] = await Promise.all([
                    WorkoutExecutionService.getLog(params),
                    activityLogService.getAll(params),
                ]);
                const merged: LogEntry[] = [
                    ...workoutResult.data.map(toEntry.workout),
                    ...activityResult.data.map(toEntry.activity),
                ].sort((a, b) => {
                    if (!a.start_time) return 1;
                    if (!b.start_time) return -1;
                    return new Date(b.start_time).getTime() - new Date(a.start_time).getTime();
                });
                setAllEntries(merged);
            } finally {
                setLoading(false);
            }
        }, 300);
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [search, refreshKey]);

    return { allEntries, loading };
};

const formatDate = (iso: string | null): string => {
    if (!iso) return '—';
    const d = new Date(iso);
    const dd   = String(d.getDate()).padStart(2, '0');
    const mm   = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
};

const formatDuration = (seconds: number | null): string => {
    if (seconds === null || seconds <= 0) return '—';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}min`;
    if (m > 0) return `${m}min`;
    return `${s}s`;
};

const LogView = () => {
    const [search, setSearch]       = useState('');
    const [page, setPage]           = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    const { allEntries, loading } = useLog(search, refreshKey);

    // Reset to page 0 when search changes
    useEffect(() => { setPage(0); }, [search]);

    const totalPages = Math.max(1, Math.ceil(allEntries.length / PAGE_SIZE));
    const entries    = allEntries.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    const allSelected = entries.length > 0 && entries.every((e) => selectedIds.has(e.id));

    const toggleRow = useCallback((id: number) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }, []);

    const toggleAll = useCallback(() => {
        if (allSelected) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(entries.map((e) => e.id)));
        }
    }, [allSelected, entries]);

    const handleCreated = useCallback(() => {
        setRefreshKey((k) => k + 1);
    }, []);

    return (
        <Layout>
            <div css={styles.pageWrapper}>
                <div css={styles.toolbar}>
                    <Search
                        value={search}
                        onChange={(v) => { setSearch(v); }}
                        placeholder="Search by activity name..."
                        customCss={styles.search}
                    />
                    <div css={styles.buttonWrapper}>
                        <PrimaryButton icon={<MdAdd />} onClick={() => setModalOpen(true)}>
                            Log
                        </PrimaryButton>
                    </div>
                </div>

                <div css={styles.tableWrapper}>
                    <table css={styles.table}>
                        <thead css={styles.thead}>
                            <tr>
                                <th css={[styles.th, styles.thIcon]}>
                                    <OnlyIconButton
                                        icon={<TbSelect />}
                                        selectedIcon={<MdCheckBox />}
                                        iconColor="--color-gray"
                                        selectedIconColor="--color-blue"
                                        selectedBg="transparent"
                                        selected={allSelected}
                                        onToggle={toggleAll}
                                        legend="Select all"
                                        selectedLegend="Deselect all"
                                    />
                                </th>
                                <th css={styles.th}>Date</th>
                                <th css={styles.th}>Activity</th>
                                <th css={styles.th}>Type</th>
                                <th css={styles.th}>Duration</th>
                                <th css={styles.th}>State</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.length === 0 && !loading ? (
                                <tr>
                                    <td css={[styles.td, styles.empty]} colSpan={5}>No entries found.</td>
                                </tr>
                            ) : (
                                entries.map((entry) => {
                                    const selected = selectedIds.has(entry.id);
                                    return (
                                        <tr key={`${entry.type}-${entry.id}`} css={[styles.tr, selected && styles.trSelected]}>
                                            <td css={[styles.td, styles.tdIcon]}>
                                                <OnlyIconButton
                                                    icon={<MdCheckBoxOutlineBlank />}
                                                    selectedIcon={<MdCheckBox />}
                                                    iconColor="--color-gray"
                                                    selectedIconColor="--color-blue"
                                                    selectedBg="transparent"
                                                    selected={selected}
                                                    onToggle={() => toggleRow(entry.id)}
                                                    legend="Select"
                                                    selectedLegend="Deselect"
                                                />
                                            </td>
                                            <td css={[styles.td, styles.tdMuted]}>{formatDate(entry.start_time)}</td>
                                            <td css={styles.td}>{entry.activity_name}</td>
                                            <td css={styles.td}>
                                                <Badge variant={entry.type === 'workout' ? 'primary' : 'warning'}>
                                                    {entry.type === 'workout' ? 'Workout' : 'Exercise'}
                                                </Badge>
                                            </td>
                                            <td css={[styles.td, styles.tdMuted]}>{formatDuration(entry.duration_seconds)}</td>
                                            <td css={styles.td}>
                                                <Badge variant={entry.completed ? 'success' : 'gray'}>
                                                    {entry.completed ? 'Completed' : 'Incomplete'}
                                                </Badge>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    customCss={styles.pagination}
                />
            </div>

            <AddLogModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onCreated={handleCreated}
            />
        </Layout>
    );
};

export default LogView;
