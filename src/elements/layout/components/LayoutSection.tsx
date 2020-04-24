import React from 'react';
import '../Layout.scss';
import { elementClassNames } from '../../../shared/utils';

export interface LayoutSectionProps {
  children?: React.ReactNode;
  secondary?: boolean;
  fullWidth?: boolean;
  oneHalf?: boolean;
  oneThird?: boolean;
}

export function LayoutSection({ children, secondary, fullWidth, oneHalf, oneThird }: LayoutSectionProps) {
  const className = elementClassNames(
    'Layout--Section',
    secondary && 'Layout--Section-secondary',
    fullWidth && 'Layout--Section-fullWidth',
    oneHalf && 'Layout--Section-oneHalf',
    oneThird && 'Layout--Section-oneThird'
  );

  return <div className={className}>{children}</div>;
}
