import "./NavBar.scss";

import clsx from "clsx";
import React, { FunctionComponent, useRef, useState } from "react";
import { isForwardRef } from "react-is";

import CloseIcon from "../../assets/close-24px.svg";
import OpenIcon from "../../assets/menu-24px.svg";
import { useClickTrap, useEscapeKey, useFocusTrap } from "../../hooks";
import { useWindowSize } from "../../hooks/useWindowSize";

export const COMPONENT_NAME = "NavBar";

export interface SiteLink {
    children?: string;
}

export interface NavBarProps {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
    mainIcon?: React.ReactNode;
    mainLink: React.ReactElement<SiteLink>;
}

export const NavBar: FunctionComponent<NavBarProps> = ({
    children,
    className,
    mainIcon,
    mainLink,
}) => {
    const isFirstMenuItemForwardRef = isForwardRef(mainLink);
    let isLastMenuItemForwardRef;

    const navRef = useRef(null);
    const firstTrapFocusRef = useRef(null);
    const lastTrapFocusRef = useRef(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const windowSize = useWindowSize();

    const closeMenu = (): void => {
        setIsMenuOpen(false);
    };

    const toggleMenu = (): void => {
        setIsMenuOpen(!isMenuOpen);
    };

    const brandElement = React.cloneElement(mainLink as React.ReactElement, {
        children: (
            <>
                {mainIcon && (
                    <span className={`${COMPONENT_NAME}__brand-icon`}>
                        {mainIcon}
                    </span>
                )}
                <span className={`${COMPONENT_NAME}__brand-name`}>
                    {mainLink.props.children}
                </span>
            </>
        ),
        className: `${COMPONENT_NAME}__brand`,
        onClick: closeMenu,
        ref: /* istanbul ignore next */ isFirstMenuItemForwardRef
            ? firstTrapFocusRef
            : undefined,
    });

    const menuItemElements = React.Children.map(children, (child, index) => {
        let menuItemElement;

        isLastMenuItemForwardRef =
            index + 1 === React.Children.count(children) && isForwardRef(child);

        /* istanbul ignore else */
        if (
            React.isValidElement(child) &&
            typeof child.props.children === "string"
        ) {
            const menuItemContent = React.cloneElement(
                child as React.ReactElement,
                {
                    className: `${COMPONENT_NAME}__menu-link`,
                    onClick: closeMenu,
                    ref: /* istanbul ignore next */ isLastMenuItemForwardRef
                        ? lastTrapFocusRef
                        : undefined,
                    title: child.props.children,
                }
            );

            menuItemElement = (
                <li
                    className={`${COMPONENT_NAME}__menu-item`}
                    key={child.props.children}
                >
                    {menuItemContent}
                </li>
            );
        }

        return menuItemElement;
    });

    useFocusTrap(
        firstTrapFocusRef,
        lastTrapFocusRef,
        isMenuOpen && isFirstMenuItemForwardRef && isLastMenuItemForwardRef
    );

    useEscapeKey(closeMenu);

    useClickTrap(navRef, closeMenu);

    return (
        <nav
            aria-label={"Main"}
            className={clsx(
                COMPONENT_NAME,
                isMenuOpen && `${COMPONENT_NAME}--menu-open`,
                className
            )}
            ref={navRef}
        >
            <div className={`${COMPONENT_NAME}__menu-bar`}>
                {brandElement}
                {windowSize.innerWidth <= 768 && (
                    <button
                        aria-label={"Navigation"}
                        aria-controls={`${COMPONENT_NAME}-menu`}
                        aria-expanded={isMenuOpen}
                        aria-haspopup={"true"}
                        className={`${COMPONENT_NAME}__menu-button`}
                        onClick={toggleMenu}
                    >
                        <img
                            alt={"Navigation"}
                            height={24}
                            src={isMenuOpen ? CloseIcon : OpenIcon}
                            width={24}
                        />
                    </button>
                )}
            </div>
            {(windowSize.innerWidth > 768 || isMenuOpen) && (
                <ul
                    aria-expanded={isMenuOpen}
                    className={`${COMPONENT_NAME}__menu`}
                    id={`${COMPONENT_NAME}-menu`}
                >
                    {menuItemElements}
                </ul>
            )}
        </nav>
    );
};
