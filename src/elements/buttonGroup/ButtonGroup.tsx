import React from "react";
import { elementClassNames } from "../../shared/utils";
import { ButtonGroupItem } from "./buttonGroupItem/ButtonGroupItem";
import "./ButtonGroup.scss";

export interface ButtonGroupProps {
  /** Join buttons as segmented group */
  segmented?: boolean;
  /** Buttons will stretch/shrink to occupy the full width */
  fullWidth?: boolean;
  /** Remove top left and right border radius */
  connectedTop?: boolean;
  /** Button components */
  children?: React.ReactNode;
}

export function ButtonGroup({
  children,
  segmented,
  fullWidth,
  connectedTop,
}: ButtonGroupProps) {
  const className = elementClassNames(
    "ButtonGroup",
    segmented && "Segmented",
    fullWidth && "FullWidth",
    connectedTop && "ConnectedTop"
  );

  const contents = (React.Children.toArray(
    children
  ) as React.ReactElement<{}>[]).map((child, index) => (
    <ButtonGroupItem button={child} key={index} />
  ));

  return <div className={className}>{contents}</div>;
}
