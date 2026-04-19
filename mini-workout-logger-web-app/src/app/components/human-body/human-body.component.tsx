import { useEffect, useRef, useState } from 'react';
import { Global } from '@emotion/react';
import { FaArrowsRotate } from 'react-icons/fa6';
import styles, { globalMuscleStyles } from './human-body.component.style.tsx';
import Button from '../button/button.component.tsx';
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

type BodyView = 'front' | 'back';

const HumanBody = ({
    selectedMuscles = [],
    onSelectionChange,
    highlightedMuscles = [],
}: HumanBodyProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const tooltipRef   = useRef<HTMLDivElement>(null);
    const nameRef      = useRef<HTMLSpanElement>(null);
    const rootRef      = useRef<HTMLSpanElement>(null);
    const hoveredRef   = useRef<Element | null>(null);
    const nameMapRef   = useRef<Record<string, MuscleInfo>>({});

    const [frontSvg, setFrontSvg] = useState('');
    const [backSvg,  setBackSvg]  = useState('');
    const [view, setView] = useState<BodyView>('front');

    const interactive  = !!onSelectionChange;
    const svgContent   = view === 'front' ? frontSvg : backSvg;

    const selectedMusclesRef = useRef(selectedMuscles);
    selectedMusclesRef.current = selectedMuscles;

    // Fetch both SVGs once on mount. Storing as state so React knows to
    // update dangerouslySetInnerHTML when they arrive.
    useEffect(() => {
        fetch('/front.svg').then(r => r.text()).then(setFrontSvg);
    }, []);

    useEffect(() => {
        fetch('/back.svg').then(r => r.text()).then(setBackSvg);
    }, []);

    // Fetch muscle names — stored in a ref so the hover handler always reads
    // the latest map without needing it as an effect dependency.
    useEffect(() => {
        MuscleService.getAll('en_US').then(muscles => {
            const map: Record<string, MuscleInfo> = {};
            muscles.forEach(m => {
                if (m.code) map[m.code] = { name: m.name, parentCode: m.parent_code ?? null };
            });
            nameMapRef.current = map;
        });
    }, []);

    // Sync selected / highlighted CSS classes.
    // key={view} on the container means React remounts it when the view changes,
    // so this effect re-runs after each SVG swap with a clean DOM.
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !svgContent) return;

        container.querySelectorAll('[id^="Muscle."]').forEach(el => {
            el.classList.toggle('muscle--selected',    selectedMuscles.includes(el.id));
            el.classList.toggle('muscle--highlighted', highlightedMuscles.includes(el.id));
        });
    }, [svgContent, selectedMuscles, highlightedMuscles]);

    // Click delegation.
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

    // Hover + tooltip — DOM-direct so mouse movement never triggers re-renders.
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !svgContent) return;

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
            if (!target) { clearHover(); hideTooltip(); return; }

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

        const handleMouseLeave = () => { clearHover(); hideTooltip(); };

        container.addEventListener('mousemove',  handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            container.removeEventListener('mousemove',  handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            clearHover();
            hideTooltip();
        };
    }, [svgContent]);

    return (
        <>
            <Global styles={globalMuscleStyles} />
            <div css={styles.wrapper}>
                {/* key={view} forces a full remount when the view switches,
                    so React never reconciles innerHTML across different SVGs. */}
                <div
                    key={view}
                    ref={containerRef}
                    css={styles.container}
                    className={interactive ? 'muscle--interactive' : undefined}
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                />
                <Button
                    icon={<FaArrowsRotate />}
                    onClick={() => setView(v => v === 'front' ? 'back' : 'front')}
                    customCss={styles.flipButton}
                />
            </div>
            <div ref={tooltipRef} css={styles.tooltip} style={{ display: 'none' }}>
                <span ref={nameRef} css={styles.tooltipPrimary} />
                <span ref={rootRef} css={styles.tooltipSecondary} />
            </div>
        </>
    );
};

export default HumanBody;
