import { useState } from 'react';
import type { JSX } from '@emotion/react/jsx-runtime';
import type { Interpolation, Theme } from '@emotion/react';
import styles from './carousel.component.style.tsx';

export type CarouselProps = {
    /** Each element is one slide. */
    children: JSX.Element[];
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const Carousel = ({ children, customCss }: CarouselProps) => {
    const [current, setCurrent] = useState(0);
    const count = children.length;

    if (count === 0) return null;

    return (
        <div css={[styles.root, customCss]}>
            <div css={styles.track}>
                {children.map((child, i) => (
                    <div key={i} css={i === current ? undefined : { display: 'none' }}>
                        {child}
                    </div>
                ))}
            </div>

            {count > 1 && (
                <div css={styles.dots}>
                    {children.map((_, i) => (
                        <span
                            key={i}
                            css={styles.dot(i === current)}
                            onClick={() => setCurrent(i)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Carousel;
