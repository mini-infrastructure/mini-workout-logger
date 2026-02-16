import styles from "./blocks.component.style.tsx";

/**
 * WRAPPER (grid 1)
 * ├── LEFT (1/3)
 * │   ├── bloco 1 (1/3 altura)
 * │   └── bloco 2 (2/3 altura)
 * │
 * └── RIGHT (2/3)
 *     ├── TOP (2/3 altura)
 *     │   ├── 1/4
 *     │   ├── 2/4
 *     │   └── 1/4
 *     │
 *     └── BOTTOM (1/3 altura)
 *         ├── 1/4
 *         ├── 1/4
 *         └── 1/2
 */
const BlocksBackground = () => {
    return (
        <div css={styles.wrapper}>
            {/* LEFT */}
            <div css={styles.left}>
                <div css={styles.block} />
                <div css={styles.block} />
            </div>

            {/* RIGHT */}
            <div css={styles.right}>

                {/* TOP */}
                <div css={styles.rightTop}>
                    <div css={styles.block} />
                    <div css={[styles.block, styles.double]} />
                    <div css={styles.block} />
                </div>

                {/* BOTTOM */}
                <div css={styles.rightBottom}>
                    <div css={styles.block} />
                    <div css={styles.block} />
                    <div css={[styles.block, styles.half]} />
                </div>
            </div>
        </div>
    );
};


export default BlocksBackground;