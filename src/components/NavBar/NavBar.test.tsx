import "@testing-library/jest-dom/extend-expect";

import { act, fireEvent, render } from "@testing-library/react";
import matchMediaPolyfill from "mq-polyfill";
import React, { forwardRef, HTMLProps } from "react";

import { NavBar } from "..";
import exampleIcon from "../../assets/graphic_eq-24px.svg";

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}

const MOCK_NAME = "Proto Component React Library A";

interface LinkProps extends HTMLProps<HTMLAnchorElement> {
    children: string;
    className?: string;
    onClick?: () => void;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
    ({ children, className, onClick, ...props }, ref) => {
        return (
            <a className={className} onClick={onClick} ref={ref} {...props}>
                {children}
            </a>
        );
    }
);
Link.displayName = "Link";

describe("NavBar", () => {
    beforeAll(() => {
        matchMediaPolyfill(window);
        window.resizeTo = function resizeTo(width, height): void {
            Object.assign(this, {
                innerWidth: width,
                innerHeight: height,
                outerWidth: width,
                outerHeight: height,
            }).dispatchEvent(new Event("resize"));
        };
    });

    test("renders mobile layout", () => {
        act(() => {
            window.resizeTo(320, 568);
        });

        const { getByAltText, getByText, queryByText } = render(
            <NavBar
                mainIcon={
                    <img
                        alt={MOCK_NAME}
                        height={24}
                        src={exampleIcon}
                        width={24}
                    />
                }
                mainLink={<Link href={"#"}>{MOCK_NAME}</Link>}
            >
                <Link href={"#"}>One</Link>
                <Link href={"#"}>Two</Link>
                <Link href={"#"}>Three</Link>
            </NavBar>
        );
        expect(getByAltText("Navigation")).toBeInTheDocument();
        expect(getByText(MOCK_NAME)).toBeInTheDocument();
        expect(queryByText("One")).toBeNull();
    });

    test("renders desktop layout", () => {
        act(() => {
            window.resizeTo(1024, 768);
        });

        const { getByText, queryByAltText } = render(
            <NavBar
                mainIcon={
                    <img
                        alt={MOCK_NAME}
                        height={24}
                        src={exampleIcon}
                        width={24}
                    />
                }
                mainLink={<Link href={"#"}>{MOCK_NAME}</Link>}
            >
                <Link href={"#"}>One</Link>
                <Link href={"#"}>Two</Link>
                <Link href={"#"}>Three</Link>
            </NavBar>
        );
        expect(queryByAltText("Navigation")).toBeNull();
        expect(getByText(MOCK_NAME)).toBeInTheDocument();
        expect(getByText("One")).toBeInTheDocument();
    });

    test("toggles menu when menu button clicked", () => {
        act(() => {
            window.resizeTo(320, 568);
        });

        const { getByText, getByAltText, queryByText } = render(
            <NavBar mainLink={<Link href={"#"}>{MOCK_NAME}</Link>}>
                <Link href={"#"}>One</Link>
                <Link href={"#"}>Two</Link>
                <Link href={"#"}>Three</Link>
            </NavBar>
        );

        expect(queryByText("One")).toBeNull();

        fireEvent.click(getByAltText("Navigation"));

        expect(getByText("One")).toBeInTheDocument();

        fireEvent.click(getByAltText("Navigation"));

        expect(queryByText("One")).toBeNull();
    });

    test("closes when escape key pressed", () => {
        act(() => {
            window.resizeTo(320, 568);
        });

        const { getByText, getByAltText, queryByText } = render(
            <NavBar mainLink={<Link href={"#"}>{MOCK_NAME}</Link>}>
                <Link href={"#"}>One</Link>
                <Link href={"#"}>Two</Link>
                <Link href={"#"}>Three</Link>
            </NavBar>
        );

        fireEvent.click(getByAltText("Navigation"));

        expect(getByText("One")).toBeInTheDocument();

        fireEvent.keyDown(getByText(MOCK_NAME), {
            key: "Escape",
            code: "Escape",
            keyCode: 27,
            charCode: 27,
        });

        expect(queryByText("One")).toBeNull();
    });
});
