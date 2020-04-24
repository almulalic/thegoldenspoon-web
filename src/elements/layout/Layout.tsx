import React from "react";
import "./Layout.scss";
import { LayoutAnnotatedSection, LayoutSection } from "./components";
import { elementClassNames } from "../../shared/utils";

export interface LayoutProps {
  /** Automatically adds sections to layout. */
  sectioned?: boolean;
  /** Removes margins and paddings for seamless effect. */
  seamless?: boolean;
  /** The content to display inside the layout. */
  children?: React.ReactNode;
}

/** PROPS: sectioned (Automatically adds section to layout)
 *
 * The layout component is used to create the main layout on a page. Layouts sections come in three main configurations: one-column,
 * two-column, and annotated. One and two column layouts can be combined in the same page. Annotated layouts should be used on their
 * own and only on settings pages. */
export class Layout extends React.Component<LayoutProps, never> {
  static AnnotatedSection = LayoutAnnotatedSection;
  static Section = LayoutSection;

  render() {
    const { children, sectioned, seamless } = this.props;

    const content = sectioned ? (
      <LayoutSection>{children}</LayoutSection>
    ) : (
      children
    );

    return (
      <div
        className={elementClassNames("Layout", seamless && "Layout--Seamless")}
      >
        {content}
      </div>
    );
  }
}
