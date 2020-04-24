import React from 'react';
import { elementClassNames } from '../../../shared/utils';
import '../Stack.scss';

export interface StackItemProps {
  /** Elements to display inside item */
  children?: React.ReactNode;
  /** Fill the remaining horizontal space in the stack with the item
   * @default false
   */
  fill?: boolean;
  keepWidth?: boolean;
}

export function StackItem({ children, fill, keepWidth }: StackItemProps) {
  const className = elementClassNames('Stack--Item', fill && 'Stack--Item-Fill', keepWidth && 'Stack--Item-KeepWidth');

  return <div className={className}>{children}</div>;
}
