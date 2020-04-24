import React, { Fragment } from "react";
import "./Page.scss";
import { elementClassNames, variationName } from "../../shared/utils";
import { Stack } from "../stack/Stack";

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
}

export function Page({
  padding = "normal",
  narrowWidth,
  marginFix = true,
  title,
  thumbnail,
  children,
  customClassName,
}: PageProps) {
  const className = elementClassNames(
    "Page",
    padding && padding !== "normal" && variationName("Page--padding", padding),
    marginFix && "Page--marginFix",
    narrowWidth && "Page--narrowWidth",
    customClassName && customClassName
  );

  const breadcrumbMarkup = <div></div>;

  const titleMarkup = title ? (
    <Fragment>
      <Stack alignment="center">
        <h1>{title}</h1>
      </Stack>
    </Fragment>
  ) : null;

  const actionsMarkup = <div></div>;

  const headerClass = elementClassNames((thumbnail || title) && "Page--Header");

  return (
    <div className={className}>
      {breadcrumbMarkup}
      {titleMarkup ? (
        <div className={headerClass}>
          <Stack alignment={thumbnail ? "center" : "leading"}>
            <Stack.Item fill>{titleMarkup}</Stack.Item>
            {actionsMarkup}
          </Stack>
        </div>
      ) : null}
      {children}
    </div>
  );
}
