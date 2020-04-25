import React from "react";
import { elementClassNames, DisableableAction } from "../../../shared/utils";

import { ButtonGroup } from "../../buttonGroup/ButtonGroup";
import { Heading } from "../../heading/Heading";
import "../Card.scss";
import { Stack } from "../../stack/Stack";

export interface CardHeaderProps {
  title?: React.ReactNode;
  actions?: DisableableAction[];
  children?: React.ReactNode;
}

export function CardHeader({ children, title, actions }: CardHeaderProps) {
  const actionMarkup = actions ? <ButtonGroup>actions</ButtonGroup> : null;

  const titleMarkup = React.isValidElement(title) ? (
    title
  ) : (
    <Heading>{title}</Heading>
  );

  const headingMarkup =
    actionMarkup || children ? (
      <Stack alignment="baseline">
        <Stack.Item fill>{titleMarkup}</Stack.Item>
        {actionMarkup}s{children}
      </Stack>
    ) : (
      titleMarkup
    );

  return (
    <div className={elementClassNames("Card--Header")}>{headingMarkup}</div>
  );
}
