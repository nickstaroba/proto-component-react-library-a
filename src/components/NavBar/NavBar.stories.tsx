import { LoremIpsum } from "lorem-ipsum";
import React, { forwardRef, HTMLProps } from "react";

import { App, NavBar } from "..";
import exampleIcon from "../../assets/graphic_eq-24px.svg";

export default { component: NavBar, title: "NavBar" };

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
});

const MOCK_BRAND_NAME = "Proto Component React Library A";

const MOCK_BRAND_ICON = (
    <img alt={MOCK_BRAND_NAME} height={24} src={exampleIcon} width={24} />
);

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

const MOCK_CONTENT = (
    <div style={{ padding: "1rem" }}>
        {lorem
            .generateParagraphs(2)
            .split(/\r?\n/)
            .map((output) => {
                return (
                    <p key={output.substr(16)} style={{ margin: "0 0 1rem" }}>
                        {output}
                    </p>
                );
            })}
    </div>
);

export const standard = (): JSX.Element => {
    return (
        <App>
            <NavBar
                mainIcon={MOCK_BRAND_ICON}
                mainLink={<Link href={"#"}>{MOCK_BRAND_NAME}</Link>}
            >
                {lorem
                    .generateWords(3)
                    .split(/\s/)
                    .map((output) => {
                        return (
                            <Link href={"#"} key={output}>
                                {output}
                            </Link>
                        );
                    })}
            </NavBar>
            {MOCK_CONTENT}
        </App>
    );
};

export const manyMenuItems = (): JSX.Element => {
    return (
        <App>
            <NavBar
                mainIcon={MOCK_BRAND_ICON}
                mainLink={<Link href={"#"}>{MOCK_BRAND_NAME}</Link>}
            >
                {lorem
                    .generateSentences(20)
                    .split(/\.\s/)
                    .map((output) => {
                        return (
                            <Link href={"#"} key={output}>
                                {output}
                            </Link>
                        );
                    })}
            </NavBar>
            {MOCK_CONTENT}
        </App>
    );
};
