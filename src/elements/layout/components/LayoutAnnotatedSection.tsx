import React from 'react';
import '../Layout.scss';
import { Heading } from '../../heading/Heading';
import { TextContainer } from '../../textContainer/TextContainer';
import { elementClassNames } from '../../../shared/utils';

export interface LayoutAnnotatedSectionProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export function LayoutAnnotatedSection(props: LayoutAnnotatedSectionProps) {
  const { children, title, description } = props;

  const descriptionMarkup = typeof description === 'string' ? <p>{description}</p> : description;

  return (
    <div className={elementClassNames('Layout--AnnotatedSection')}>
      <div className={elementClassNames('Layout--AnnotationWrapper')}>
        <div className={elementClassNames('Layout--Annotation')}>
          <TextContainer>
            <Heading>{title}</Heading>
            {descriptionMarkup && <div className={elementClassNames('Layout--AnnotationDescription')}>{descriptionMarkup}</div>}
          </TextContainer>
        </div>

        <div className={elementClassNames('Layout--AnnotationContent')}>{children}</div>
      </div>
    </div>
  );
}
