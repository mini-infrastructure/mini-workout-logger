import * as React from "react";
import {useEffect} from "react";

export const useClickOut = (ref: React.RefObject<HTMLDivElement | null>, callback: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        // document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, callback]);
};
