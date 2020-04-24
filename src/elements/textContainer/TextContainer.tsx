import React from 'react';
import './TextContainer.scss';
import { Spacing, elementClassNames, variationName } from '../../shared/utils';

export interface TextContainerProps {
  /** The amount of vertical spacing children will get between them.
   * @default extraSmall;
   */
  spacing?: Spacing;
  /** The content to render in the text container. */
  children?: React.ReactNode;
}

/** A text container is used to wrap text elements such as paragraphs, headings, and lists to give them vertical spacing.
 * ___
 * BEST PRACTICES:
 *
 * - The closer the spacing, the closer the relationship between content topics. The closeness visually represents the relationship.
 * - Use tight spacing to relate content topics to each other
 * - Use loose spacing to separate concepts that are independent of each other */
export function TextContainer({ spacing = 'extraSmall', children }: TextContainerProps) {
  const className = elementClassNames(spacing && variationName('TextContainer--spacing', spacing));

  return <div className={className}>{children}</div>;
}
