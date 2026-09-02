import type {PropsWithChildren} from "react";
import type {Interpolation, Theme} from "@emotion/react";
import styles from "./index.style.tsx";

type ContainerProps = {
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const Container = ({ children, customCss }: PropsWithChildren<ContainerProps>) => {
    return (
        <div
            css={[
                styles.wrapper,
                ...(Array.isArray(customCss) ? customCss : customCss ? [customCss] : []),
            ]}>
            {children}
        </div>
    );
};

export default Container;