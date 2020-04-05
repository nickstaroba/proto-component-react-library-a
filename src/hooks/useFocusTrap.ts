/* istanbul ignore file */
/* https://github.com/testing-library/react-testing-library/issues/376#issuecomment-497369928 */
import { useEffect } from "react";

export const useFocusTrap = (
    firstTrapFocusElementRef,
    lastTrapFocusElementRef,
    enabled = true
): void => {
    useEffect(() => {
        const onTabPress = (event): void => {
            if (event.key === "Tab" && enabled) {
                const isFocusedOnFirstRef =
                    firstTrapFocusElementRef.current === document.activeElement;
                const isFocusedOnLastRef =
                    lastTrapFocusElementRef.current === document.activeElement;

                if (!event.shiftKey && isFocusedOnLastRef) {
                    event.preventDefault();
                    firstTrapFocusElementRef.current.focus();
                } else if (event.shiftKey && isFocusedOnFirstRef) {
                    event.preventDefault();
                    lastTrapFocusElementRef.current.focus();
                }
            }
        };

        window.addEventListener("keydown", onTabPress);

        return (): void => window.removeEventListener("keydown", onTabPress);
    });
};
