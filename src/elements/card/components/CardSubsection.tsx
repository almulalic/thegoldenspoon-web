import React from "react";
import "../Card.scss";

export interface CardSubsectionProps {
  children?: React.ReactNode;
}

export function CardSubsection({ children }: CardSubsectionProps) {
  return <div className={"Card--Subsection"}>{children}</div>;
}
