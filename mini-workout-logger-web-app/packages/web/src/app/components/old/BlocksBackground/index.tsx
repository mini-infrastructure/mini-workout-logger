import Background, { type BackgroundProps } from '../Background/index.tsx';
import Container from '../Container/index.tsx';
import styles from './index.style.tsx';

const BlocksBackground = ({ childrenInFront = false }: BackgroundProps) => (
    <Background customCss={styles.wrapper} childrenInFront={childrenInFront}>
        {/* LEFT */}
        <div css={styles.left}>
            <Container />
            <Container />
        </div>

        {/* RIGHT */}
        <div css={styles.right}>
            {/* TOP */}
            <div css={styles.rightTop}>
                <Container />
                <Container customCss={styles.double} />
                <Container />
            </div>

            {/* BOTTOM */}
            <div css={styles.rightBottom}>
                <Container />
                <Container />
                <Container customCss={styles.half} />
            </div>
        </div>
    </Background>
);

export default BlocksBackground;
