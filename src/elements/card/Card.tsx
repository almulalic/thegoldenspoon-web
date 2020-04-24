import React from "react";
import {
  elementClassNames,
  DisableableAction,
  ComplexAction,
  WithinContentContext,
  Spacing,
  variationName,
} from "../../shared/utils";
import { CardHeader, CardSection, CardSubsection } from "./components";
import "./Card.scss";

export interface CardProps {
  /** Title content for the card */
  title?: React.ReactNode;
  /** Inner content of the card */
  children?: React.ReactNode;
  /** A less prominent card */
  subdued?: boolean;
  /** Auto wrap content in section */
  sectioned?: boolean;
  /** Should the overflow be hidden or not */
  showOverflow?: boolean;
  /** Card header actions */
  actions?: DisableableAction[];
  /** Footer text */
  footerText?: React.ReactNode;
  /** Primary action in the card footer */
  primaryFooterAction?: ComplexAction;
  /** Secondary actions in the card footer */
  secondaryFooterActions?: ComplexAction[];
  /** The content of the disclosure button rendered when there is more than one secondary footer action */
  secondaryFooterActionsDisclosureText?: string;
  /** Spacing between card that are next to each other.
   * @default 'large';
   */
  spaceBetweenCards?: Spacing;

  minHeight?: string;
  maxHeight?: string;
  scrollContentHeight?: string;
}

interface State {
  secondaryFooterActionsPopoverOpen: boolean;
}

/** Props: title, subdued, sectioned, actions, primaryFooterAction, secondaryFooterActions, secondaryFooterActionsDisclosureText */
export class Card extends React.PureComponent<CardProps, State> {
  static Section = CardSection;
  static Header = CardHeader;
  static Subsection = CardSubsection;

  state: State = {
    secondaryFooterActionsPopoverOpen: false,
  };

  render() {
    const {
      spaceBetweenCards = "large",
      sectioned,
      minHeight,
      maxHeight,
      showOverflow = false,
      children,
      subdued,
      actions,
      title,
    } = this.props;

    const className = elementClassNames(
      "Card",
      subdued && "Card--Subdued",
      showOverflow && "Card--ShowOverflow",
      spaceBetweenCards &&
        variationName("Card--SpaceBetween-", spaceBetweenCards)
    );

    const headerMarkup =
      title || actions ? <CardHeader actions={actions} title={title} /> : null;

    const footerMarkup = null;

    return (
      <WithinContentContext.Provider value>
        <div
          className={className}
          style={{ minHeight: minHeight, maxHeight: maxHeight }}
        >
          {headerMarkup}
          {footerMarkup}
        </div>
      </WithinContentContext.Provider>
    );
  }

  private toggleSecondaryActionsPopover = () => {
    this.setState(({ secondaryFooterActionsPopoverOpen }) => {
      return {
        secondaryFooterActionsPopoverOpen: !secondaryFooterActionsPopoverOpen,
      };
    });
  };
}
