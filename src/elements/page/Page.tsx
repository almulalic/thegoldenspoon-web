import React, { Fragment, Children } from "react";
import "./Page.scss";
import { elementClassNames, variationName } from "../../shared/utils";
import { Stack } from "../stack/Stack";
import { Navbar } from "../../components";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useHistory } from "react-router-dom";

const SideNav = require("@trendmicro/react-sidenav");
const {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} = require("@trendmicro/react-sidenav");

export type Padding = "none" | "small" | "normal" | "large";

export interface PageAction {
  label: string;
  url?: string;
  onClick?(): void;
  disabled?: boolean;
}

export interface PageThumbnailProps {
  /** Show border around thumbnail
   * @default true;
   */
  outline?: boolean;
  /** Alt text for the thumbnail image */
  alt: string;

  /** Add small space between the thumbnail borders and the image */
  spaceAround?: boolean;
}

export interface PageProps {
  /** Padding of the page.
   * @default normal;
   */
  padding?: Padding;
  customClassName?: string;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;

  /** Fix for browsers collapsing margins of first child elements. @default true */
  marginFix?: boolean;

  /*Nije moguce disable primary action za neki role jer ako se stavi action mora postojati pa ovaj prop sluzi da mu prosljedite isAdmin ili isManager kako bi se prikazala il sklonila akcija*/
  hasPrimaryAction?: boolean;

  title?: string;

  titleBold?: boolean;

  primaryAction?: PageAction;
  primaryActionNode?: React.ReactNode;

  secondaryAction?: PageAction;

  thumbnail?: PageThumbnailProps;

  thumbnailNode?: React.ReactNode;

  children?: React.ReactNode;
  includeNavigation: boolean;
}

export function Page({
  padding = "normal",
  narrowWidth,
  marginFix = true,
  customClassName,
  includeNavigation = true,
  children,
}: PageProps) {
  const className = elementClassNames(
    "Page",
    padding && padding !== "normal" && variationName("Page--padding", padding),
    marginFix && "Page--marginFix",
    narrowWidth && "Page--narrowWidth",
    customClassName && customClassName
  );

  return (
    <div className={className}>
      {includeNavigation ? (
        <div className="Page--hasNavigation">
          <Navbar />
          {children}
        </div>
      ) : (
        { children }
      )}
    </div>
  );
}
