import Background, {type BackgroundProps} from '../background.component.tsx';
import Container from '../../container/container.component.tsx';
import styles from './blocks.component.style.tsx';

const BlocksBackground = ({ childrenInFront = true }: BackgroundProps) => (
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
