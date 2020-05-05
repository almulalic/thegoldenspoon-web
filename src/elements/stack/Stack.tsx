import React, { memo, NamedExoticComponent } from "react";
import { StackItem } from "./components/StackItem";
import "./Stack.scss";
import {
  elementClassNames,
  wrapWithComponent,
  elementChildren,
  variationName,
  Distribution,
  Responsive,
  Alignment,
  Spacing,
} from "../../shared/utils";

export type StackSpacing =
  | "extraTight"
  | "tight"
  | "loose"
  | "extraLoose"
  | "none";
export type StackWrap = "wrap" | "noWrap";

export interface StackProps {
  /** Elements to display inside stack */
  children?: React.ReactNode;
  /** Wrap stack elements to additional rows as needed on small screens (Defaults to true) */
  wrap?: Responsive<StackWrap>;
  /** Stack the elements vertically */
  vertical?: boolean;
  /** Adjust spacing between elements */
  spacing?: Responsive<StackSpacing>;
  /** Adjust vertical alignment of elements */
  alignment?: Responsive<Alignment>;
  /** Adjust horizontal alignment of elements */
  distribution?: Responsive<Distribution>;
  /** Should spacing options affect first child element (works only with Vertical stack) */
  affectFirst?: boolean;
  padding?: Responsive<Spacing>;
  onClick?(): void;
  customClassName?: string;
}

/** Stack Props: wrap, vertical, spacing, alignment, distribution, padding, affectFirst, onClick() */
export const Stack = memo(function Stack({
  distribution,
  affectFirst,
  alignment,
  children,
  vertical,
  spacing,
  padding,
  onClick,
  wrap,
  customClassName = "",
}: StackProps) {
  const className = elementClassNames(
    "Stack",
    vertical && "Stack--Vertical",
    spacing && variationName("Stack--spacing", spacing),
    distribution && variationName("Stack--distribution", distribution),
    alignment && variationName("Stack--alignment", alignment),
    wrap && wrap.length === 2 && variationName("Stack--", wrap),
    wrap === "noWrap" && "Stack--noWrap",
    affectFirst && "Stack--AffectFirst",
    padding && variationName("Stack--Padding", padding),
    onClick && "Stack--onClick"
  );
  const itemMarkup = elementChildren(children).map((child, index) => {
    const props = { key: index };
    return wrapWithComponent(child, StackItem, props);
  });

  return (
    <div onClick={onClick} className={className + " " + customClassName}>
      {itemMarkup}
    </div>
  );
}) as NamedExoticComponent<StackProps> & {
  Item: typeof StackItem;
};

Stack.Item = StackItem;
