import { useEffect, useRef, useState } from 'react';
import { Global } from '@emotion/react';
import styles, { globalMuscleStyles } from './human-body.component.style.tsx';

interface HumanBodyProps {
    selectedMuscles?: string[];
    onSelectionChange?: (muscles: string[]) => void;
    highlightedMuscles?: string[];
}

const HumanBody = ({
    selectedMuscles = [],
    onSelectionChange,
    highlightedMuscles = [],
}: HumanBodyProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svgContent, setSvgContent] = useState('');
    const interactive = !!onSelectionChange;

    // Always-current ref — updated synchronously during render, before any effect runs.
    const selectedMusclesRef = useRef(selectedMuscles);
    selectedMusclesRef.current = selectedMuscles;

    useEffect(() => {
        fetch('/front.svg').then(r => r.text()).then(setSvgContent);
    }, []);

    // Sync CSS classes with selection state.
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !svgContent) return;

        container.querySelectorAll('[id^="Muscle."]').forEach(el => {
            el.classList.toggle('muscle--selected', selectedMuscles.includes(el.id));
            el.classList.toggle('muscle--highlighted', highlightedMuscles.includes(el.id));
        });
    }, [svgContent, selectedMuscles, highlightedMuscles]);

    // Click delegation — registered once per SVG load, reads current selection via ref.
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !interactive || !svgContent) return;

        const handleClick = (e: MouseEvent) => {
            const target = (e.target as Element).closest('[id^="Muscle."]');
            if (!target) return;
            const id = target.id;
            const current = selectedMusclesRef.current;
            const next = current.includes(id)
                ? current.filter(m => m !== id)
                : [...current, id];
            onSelectionChange!(next);
        };

        container.addEventListener('click', handleClick);
        return () => container.removeEventListener('click', handleClick);
    }, [svgContent, interactive, onSelectionChange]);

    return (
        <>
            <Global styles={globalMuscleStyles} />
            <div
                ref={containerRef}
                css={styles.container}
                className={interactive ? 'muscle--interactive' : undefined}
                dangerouslySetInnerHTML={{ __html: svgContent }}
            />
        </>
    );
};

export default HumanBody;
