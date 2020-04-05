import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";
import React from "react";

import { App } from "..";

describe("App", () => {
    test("renders", () => {
        const { container } = render(<App />);
        expect(container.querySelector(".App")).toBeDefined();
    });
});
