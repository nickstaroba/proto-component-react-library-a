import "./App.scss";

import clsx from "clsx";
import React, { FunctionComponent } from "react";

export const COMPONENT_NAME = "App";

export interface AppProps {
    className?: string;
}

export const App: FunctionComponent<AppProps> = (props) => (
    <div className={clsx(COMPONENT_NAME, props.className)}>
        {props.children}
    </div>
);
