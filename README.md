# Proto Component - React Library A

React component library for prototyping and experimentation.

## Installation

```
npm i -P @proto-component/react-library-a
```

## Integration

Styles are extracted from the JavaScript bundle into a single stylesheet:

```
@proto-component/react-library-a/styles.css
```

Import styles in the application's root component:

```
import "@proto-component/react-library-a/styles.css";
```

## Components

### App

App acts as a wrapper for the components that make up the application. It applies a minimal set of styles to create a consistent experience for its child components.

App is an optional component.

#### Usage

```
import { App } from "@proto-component/react-library-a";
import React, { FunctionComponent } from "react";

export const Root: FunctionComponent = () => {
    return <App>Hello!~</App>;
};
```

### NavBar

NavBar is a navigation component that supports desktop and mobile resolutions.

For NavBar to trap focus, `props.mainLink` and the last element of `props.children` must be created with `React.forwardRef`.

#### Usage

```
import "./Navigation.scss";

import { NavBar } from "@proto-component/react-library-a";
import React, { forwardRef, FunctionComponent, HTMLProps } from "react";
import { NavLink } from "react-router-dom";

import BrandIcon from "../assets/memory-24px.svg";

export const COMPONENT_NAME = "Navigation";

interface WillTrapFocusProps extends HTMLProps<HTMLAnchorElement> {
    children: string;
    className?: string;
    onClick?: () => void;
}

const WillTrapFocus = forwardRef<HTMLAnchorElement, WillTrapFocusProps>(
    ({ children, className, onClick, ...props }, ref) => {
        return (
            <a className={className} onClick={onClick} ref={ref} {...props}>
                {children}
            </a>
        );
    }
);
WillTrapFocus.displayName = "WillTrapFocus";

const WontTrapFocus: FunctionComponent = ({ children }) => {
    return <a href={"#"}>{children}</a>;
};
WontTrapFocus.displayName = "WontTrapFocus";

export const Navigation: FunctionComponent = () => {
    return (
        <NavBar
            className={COMPONENT_NAME}
            mainIcon={<BrandIcon />}
            mainLink={<NavLink to={"/"}>React TS</NavLink>}
        >
            <NavLink to={"/components/"}>Components</NavLink>
            <NavLink to={"/images/"}>Images</NavLink>
            <WillTrapFocus href={"#"}>Example</WillTrapFocus>
        </NavBar>
    );
};

Navigation.displayName = COMPONENT_NAME;
```

## License

[MIT]

[mit]: https://choosealicense.com/licenses/mit/
