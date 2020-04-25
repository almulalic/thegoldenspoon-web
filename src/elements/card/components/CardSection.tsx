import React from "react";
import { elementClassNames } from "../../../shared/utils";
import { ComplexAction } from "../../../shared/utils";
import { Stack } from "../../stack/Stack";
import { ButtonGroup } from "../../buttonGroup/ButtonGroup";
import "../Card.scss";

export interface CardSectionProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  subdued?: boolean;
  fullWidth?: boolean;
  seamless?: boolean;
  actions?: ComplexAction[];
}

export function CardSection({
  children,
  title,
  subdued,
  fullWidth,
  seamless,
  actions,
}: CardSectionProps) {
  const className = elementClassNames(
    "Card--Section",
    subdued && "Card--Section-Subdued",
    fullWidth && "Card--Section-fullWidth",
    seamless && "Card--Section-Seamless"
  );

  const actionMarkup = actions ? actions : null;

  const titleMarkup = typeof title === "string" ? <h2>{title}</h2> : title;

  const titleAreaMarkup =
    titleMarkup || actionMarkup ? (
      <div className={"Card--SectionHeader"}>
        {actionMarkup ? (
          <Stack alignment="baseline">
            <Stack.Item fill>{titleMarkup}</Stack.Item>
            {actionMarkup}
          </Stack>
        ) : (
          titleMarkup
        )}
      </div>
    ) : null;

  return (
    <div className={className}>
      {titleAreaMarkup}
      {children}
    </div>
  );
}
