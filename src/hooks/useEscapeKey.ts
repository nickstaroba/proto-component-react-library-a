/* istanbul ignore file */
import { useEffect } from "react";

export const useEscapeKey = (handleEscapePressed): void => {
    useEffect(() => {
        const onEscapePress = (event): void => {
            if (event.key === "Escape") {
                handleEscapePressed();
            }
        };

        window.addEventListener("keydown", onEscapePress);

        return (): void => window.removeEventListener("keydown", onEscapePress);
    });
};
