import "./Button.scss";

import clsx from "clsx";
import React, { ButtonHTMLAttributes, FunctionComponent } from "react";

import { Intent } from "../../enums";

export const COMPONENT_NAME = "Button";

export interface ButtonProps {
    intent?: Intent;
}

export const Button: FunctionComponent<
    ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, intent, ...props }) => (
    <button
        className={clsx(className, COMPONENT_NAME, intent && `c-${intent}`)}
        {...props}
    >
        {children}
    </button>
);
