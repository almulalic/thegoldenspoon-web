import React from "react";
import { elementClassNames, DisableableAction } from "../../../shared/utils";
import "../Card.scss";
import { Stack } from "../../stack/Stack";

export interface CardHeaderProps {
  title?: React.ReactNode;
  actions?: DisableableAction[];
  children?: React.ReactNode;
}

export function CardHeader({ children, title, actions }: CardHeaderProps) {
  const titleMarkup = React.isValidElement(title) ? title : <h1>{title}</h1>;

  const headingMarkup = children ? (
    <Stack alignment="baseline">
      <Stack.Item fill>{titleMarkup}</Stack.Item>s{children}
    </Stack>
  ) : (
    titleMarkup
  );

  return (
    <div className={elementClassNames("Card--Header")}>{headingMarkup}</div>
  );
}
