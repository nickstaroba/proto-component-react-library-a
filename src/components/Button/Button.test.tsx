import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";
import React from "react";

import { Button } from "..";
import { Intent } from "../../enums";

describe("Button", () => {
    test("renders", () => {
        const { container } = render(<Button />);
        expect(container.querySelector(".Button")).toBeDefined();
    });

    test("renders with intent", () => {
        const { container } = render(<Button intent={Intent.Primary} />);
        expect(container.querySelector(".Button")).toHaveClass(
            `c-${Intent.Primary}`
        );
    });
});
