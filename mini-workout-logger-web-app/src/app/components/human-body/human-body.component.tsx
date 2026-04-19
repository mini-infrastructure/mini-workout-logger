import { useEffect, useRef, useState } from 'react';
import { Global } from '@emotion/react';
import styles, { globalMuscleStyles } from './human-body.component.style.tsx';
import MuscleService from '../../services/muscle.service.tsx';

interface HumanBodyProps {
    selectedMuscles?: string[];
    onSelectionChange?: (muscles: string[]) => void;
    highlightedMuscles?: string[];
}

interface MuscleInfo {
    name: string;
    parentCode: string | null;
}

const HumanBody = ({
    selectedMuscles = [],
    onSelectionChange,
    highlightedMuscles = [],
}: HumanBodyProps) => {
    const containerRef  = useRef<HTMLDivElement>(null);
    const tooltipRef    = useRef<HTMLDivElement>(null);
    const nameRef       = useRef<HTMLSpanElement>(null);
    const rootRef       = useRef<HTMLSpanElement>(null);
    const hoveredRef    = useRef<Element | null>(null);
    const nameMapRef    = useRef<Record<string, MuscleInfo>>({});

    const [svgLoaded, setSvgLoaded] = useState(false);
    const interactive = !!onSelectionChange;

    const selectedMusclesRef = useRef(selectedMuscles);
    selectedMusclesRef.current = selectedMuscles;

    // Load SVG directly into the DOM — never through React state so React
    // never reconciles innerHTML and wipes manually-managed CSS classes.
    useEffect(() => {
        fetch('/front.svg')
            .then(r => r.text())
            .then(svgText => {
                if (containerRef.current) {
                    containerRef.current.innerHTML = svgText;
                    setSvgLoaded(true);
                }
            });
    }, []);

    // Fetch muscle names and build code → { name, parentCode } map.
    useEffect(() => {
        MuscleService.getAll('en_US').then(muscles => {
            const map: Record<string, MuscleInfo> = {};
            muscles.forEach(m => {
                if (m.code) {
                    map[m.code] = { name: m.name, parentCode: m.parent_code ?? null };
                }
            });
            nameMapRef.current = map;
        });
    }, []);

    // Sync CSS classes with selection / highlight state.
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !svgLoaded) return;

        container.querySelectorAll('[id^="Muscle."]').forEach(el => {
            el.classList.toggle('muscle--selected',    selectedMuscles.includes(el.id));
            el.classList.toggle('muscle--highlighted', highlightedMuscles.includes(el.id));
        });
    }, [svgLoaded, selectedMuscles, highlightedMuscles]);

    // Click delegation.
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !interactive || !svgLoaded) return;

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
    }, [svgLoaded, interactive, onSelectionChange]);

    // Hover + tooltip delegation — all DOM-direct, no setState, no re-renders.
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !svgLoaded) return;

        const findRoot = (code: string): string => {
            const info = nameMapRef.current[code];
            if (!info?.parentCode) return code;
            return findRoot(info.parentCode);
        };

        const showTooltip = (x: number, y: number, name: string, rootName: string) => {
            const el = tooltipRef.current;
            if (!el) return;
            el.style.left    = `${x + 14}px`;
            el.style.top     = `${y + 14}px`;
            el.style.display = 'flex';
            if (nameRef.current) nameRef.current.textContent = name;
            if (rootRef.current) {
                rootRef.current.textContent   = rootName;
                rootRef.current.style.display = rootName ? '' : 'none';
            }
        };

        const hideTooltip = () => {
            if (tooltipRef.current) tooltipRef.current.style.display = 'none';
        };

        const clearHover = () => {
            hoveredRef.current?.classList.remove('muscle--hovered');
            hoveredRef.current = null;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const target = (e.target as Element).closest('[id^="Muscle."]');

            if (!target) {
                clearHover();
                hideTooltip();
                return;
            }

            if (target !== hoveredRef.current) {
                clearHover();
                target.classList.add('muscle--hovered');
                hoveredRef.current = target;
            }

            const info = nameMapRef.current[target.id];
            if (!info) { hideTooltip(); return; }

            const rootCode = findRoot(target.id);
            const rootName = rootCode !== target.id ? (nameMapRef.current[rootCode]?.name ?? '') : '';
            showTooltip(e.clientX, e.clientY, info.name, rootName);
        };

        const handleMouseLeave = () => {
            clearHover();
            hideTooltip();
        };

        container.addEventListener('mousemove',  handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            container.removeEventListener('mousemove',  handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            clearHover();
            hideTooltip();
        };
    }, [svgLoaded]);

    return (
        <>
            <Global styles={globalMuscleStyles} />
            <div
                ref={containerRef}
                css={styles.container}
                className={interactive ? 'muscle--interactive' : undefined}
            />
            <div ref={tooltipRef} css={styles.tooltip} style={{ display: 'none' }}>
                <span ref={nameRef} css={styles.tooltipPrimary} />
                <span ref={rootRef} css={styles.tooltipSecondary} />
            </div>
        </>
    );
};

export default HumanBody;
