/* istanbul ignore file */
import { useEffect } from "react";

export const useClickTrap = (ref, handleClick): void => {
    useEffect(() => {
        const handleClickOutside = (event): void => {
            if (ref.current && !ref.current.contains(event.target)) {
                handleClick();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return (): void => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, handleClick]);
};
