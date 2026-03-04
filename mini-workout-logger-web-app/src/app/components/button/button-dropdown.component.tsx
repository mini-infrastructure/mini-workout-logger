import type {ButtonProps} from "./button.component.tsx";
import {PropsWithChildren} from "react";
import Button from "./button.component.tsx";

type ButtonDropdownProps = ButtonProps & {};

const ButtonDropdown = ({
                            children
                        }: PropsWithChildren<ButtonDropdownProps>) => {
    return (
        <>
            <Button>

            </Button>
        </>
    );
};

export default ButtonDropdown;
