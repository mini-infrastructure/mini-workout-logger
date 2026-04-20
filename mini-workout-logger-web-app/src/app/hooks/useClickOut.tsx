import * as React from "react";
import {useEffect} from "react";

export const useClickOut = (ref: React.RefObject<HTMLDivElement | null>, callback: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!document.contains(event.target as Node)) return;
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        const timeout = setTimeout(() => {
            document.addEventListener("click", handleClickOutside);
        }, 0);

        return () => {
            clearTimeout(timeout);
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref, callback]);
};
