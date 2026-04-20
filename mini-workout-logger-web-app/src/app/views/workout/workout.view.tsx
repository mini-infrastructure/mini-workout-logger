import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FaRegClock } from 'react-icons/fa';
import { IoPlay, IoPause, IoStop } from 'react-icons/io5';
import Layout from '../../components/layout/layout.component.tsx';
import Card from '../../components/card/card.component.tsx';
import OnlyIconButton from '../../components/button/only-icon-button.component.tsx';
import { useWorkout } from '../../hooks/useWorkout.tsx';
import styles from './workout.view.style.tsx';

const WorkoutView = () => {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const { workout } = useWorkout(id);

    const [isPlaying, setIsPlaying] = useState(searchParams.get('mode') === 'play');
    const [elapsed, setElapsed] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setElapsed((s) => s + 1);
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPlaying]);

    const handleStop = () => {
        setIsPlaying(false);
        setElapsed(0);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <Layout>
            <div css={styles.pageWrapper}>
                <div css={styles.header}>
                    <span css={styles.title}>{workout?.name}</span>

                    <Card customCss={styles.timerCard}>
                        <span css={styles.clockIcon}>
                            <FaRegClock />
                        </span>
                        <span css={styles.timerDisplay}>{formatTime(elapsed)}</span>
                        <OnlyIconButton
                            icon={<IoPlay />}
                            selectedIcon={<IoPause />}
                            iconColor="--color-blue"
                            selectedIconColor="--color-white"
                            selected={isPlaying}
                            onToggle={(val) => setIsPlaying(val)}
                            legend="Start"
                            selectedLegend="Pause"
                        />
                        <OnlyIconButton
                            icon={<IoStop />}
                            iconColor="--color-white"
                            legend="Stop"
                            onToggle={handleStop}
                        />
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default WorkoutView;
