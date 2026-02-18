import type {PropsWithChildren} from "react";
import type { Interpolation, Theme } from "@emotion/react";
import styles from "./container.component.style.tsx";

type ContainerProps = {
    css?: Interpolation<Theme>;
};

const Container = ({ children, css }: PropsWithChildren<ContainerProps>) => {
    return (
        <div css={[styles.wrapper, css]}>
            {children}
        </div>
    );
};

export default Container;