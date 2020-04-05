/* istanbul ignore file */
import { useEffect, useState } from "react";

interface WindowSize {
    innerHeight?: number;
    innerWidth?: number;
}

export const useWindowSize = (): WindowSize => {
    const isWindow = typeof window === "object";

    const getSize = (): WindowSize => {
        return {
            innerHeight: isWindow ? window.innerHeight : undefined,
            innerWidth: isWindow ? window.innerWidth : undefined,
        };
    };

    const [windowSize, setWindowSize] = useState<WindowSize>(getSize);

    useEffect(() => {
        const handleResize = (): void => {
            setWindowSize(getSize());
        };

        if (isWindow) {
            window.addEventListener("resize", handleResize);
        }

        return (): void => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return windowSize;
};
