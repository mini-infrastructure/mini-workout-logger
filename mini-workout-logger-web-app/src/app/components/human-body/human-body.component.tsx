import { useEffect, useRef, useState } from 'react';
import { Global } from '@emotion/react';
import styles, { globalMuscleStyles } from './human-body.component.style.tsx';

interface HumanBodyProps {
    selectedMuscles?: string[];
    onSelectionChange?: (muscles: string[]) => void;
    highlightedMuscles?: string[];
}

const HumanBody = ({
    selectedMuscles,
    onSelectionChange,
    highlightedMuscles,
}: HumanBodyProps) => {
    const resolved = {
        selectedMuscles: selectedMuscles ?? [],
        highlightedMuscles: highlightedMuscles ?? [],
    };
    const containerRef = useRef<HTMLDivElement>(null);
    const [svgContent, setSvgContent] = useState('');
    const interactive = !!onSelectionChange;

    useEffect(() => {
        fetch('/front.svg').then(r => r.text()).then(setSvgContent);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !svgContent) return;

        container.querySelectorAll('[id^="Muscle."]').forEach(el => {
            el.classList.remove('muscle--selected', 'muscle--highlighted');
        });

        resolved.selectedMuscles.forEach(id => {
            container.querySelector(`[id="${id}"]`)?.classList.add('muscle--selected');
        });

        resolved.highlightedMuscles.forEach(id => {
            container.querySelector(`[id="${id}"]`)?.classList.add('muscle--highlighted');
        });
    }, [svgContent, selectedMuscles, highlightedMuscles]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !interactive || !svgContent) return;

        const handleClick = (e: MouseEvent) => {
            const target = (e.target as Element).closest('[id^="Muscle."]');
            if (!target) return;
            const id = target.id;
            const current = resolved.selectedMuscles;
            const next = current.includes(id)
                ? current.filter(m => m !== id)
                : [...current, id];
            onSelectionChange!(next);
        };

        container.addEventListener('click', handleClick);
        return () => container.removeEventListener('click', handleClick);
    }, [svgContent, interactive, selectedMuscles, onSelectionChange]);

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
