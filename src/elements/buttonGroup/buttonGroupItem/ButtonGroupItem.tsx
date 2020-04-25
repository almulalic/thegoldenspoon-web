import React from "react";

import { elementClassNames } from "../../../shared/utils";

import "../ButtonGroup.scss";

export interface ButtonGroupItemProps {
  button: React.ReactElement;
}

interface State {
  focused: boolean;
}

export class ButtonGroupItem extends React.PureComponent<
  ButtonGroupItemProps,
  State
> {
  state: State = { focused: false };

  render() {
    const { button } = this.props;
    const { focused } = this.state;

    const className = elementClassNames(
      "ButtonItem",
      focused && "ButtonItem--focused",
      button.props.plain && "ButtonItem--plain"
    );

    return (
      <div
        className={className}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {button}
      </div>
    );
  }

  private handleFocus = () => {
    this.setState({ focused: true });
  };

  private handleBlur = () => {
    this.setState({ focused: false });
  };
}
