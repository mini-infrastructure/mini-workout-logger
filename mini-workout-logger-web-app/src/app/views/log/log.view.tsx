import { useState } from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { TbSelect } from 'react-icons/tb';
import Layout from '../../components/layout/layout.component.tsx';
import Search from '../../components/search/search.component.tsx';
import Pagination from '../../components/pagination/pagination.component.tsx';
import Badge from '../../components/badge/badge.component.tsx';
import OnlyIconButton from '../../components/button/only-icon-button.component.tsx';
import { useWorkoutExecutionLog } from '../../hooks/useWorkoutExecutionLog.tsx';
import styles from './log.view.style.tsx';

const formatDate = (iso: string): string => {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
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
    const { entries, pagination, page, setPage, search, setSearch } = useWorkoutExecutionLog();
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    const allSelected = entries.length > 0 && entries.every((e) => selectedIds.has(e.id));

    const toggleRow = (id: number) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const toggleAll = () => {
        if (allSelected) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(entries.map((e) => e.id)));
        }
    };

    return (
        <Layout>
            <div css={styles.pageWrapper}>
                <div css={styles.toolbar}>
                    <Search
                        value={search}
                        onChange={setSearch}
                        placeholder="Search by workout name..."
                        customCss={styles.search}
                    />
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
                                <th css={styles.th}>Workout</th>
                                <th css={styles.th}>Duration</th>
                                <th css={styles.th}>State</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.length === 0 ? (
                                <tr>
                                    <td css={[styles.td, styles.empty]} colSpan={5}>No executions found.</td>
                                </tr>
                            ) : (
                                entries.map((entry) => {
                                    const selected = selectedIds.has(entry.id);
                                    return (
                                        <tr key={entry.id} css={[styles.tr, selected && styles.trSelected]}>
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
                                            <td css={styles.td}>{entry.workout_name}</td>
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

                {pagination && pagination.total_pages > 1 && (
                    <div css={styles.footer}>
                        <Pagination
                            page={page}
                            totalPages={pagination.total_pages}
                            onPageChange={setPage}
                        />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default LogView;
