import styles from "./blocks.component.style.tsx";
import Container from "../../container/container.component.tsx";

const BlocksBackground = () => {
    return (
        <div css={styles.wrapper}>
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
                    <Container css={styles.double} />
                    <Container />
                </div>

                {/* BOTTOM */}
                <div css={styles.rightBottom}>
                    <Container />
                    <Container />
                    <Container css={styles.half} />
                </div>
            </div>
        </div>
    );
};


export default BlocksBackground;