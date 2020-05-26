import React from "react";

export const classNameBase = "Avis";
export const WithinContentContext = React.createContext(false);
export interface Action extends BaseAction {}
export type AppBridgeTarget = "ADMIN_PATH" | "REMOTE" | "APP";

export interface BaseAction {
  /** A unique identifier for the action */
  id?: string;
  /** Content the action displays */
  content?: any;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** A destination to link to, rendered in the action */
  url?: string;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Callback when an action takes place */
  onAction?(e?: any): void;
}
export interface AppBridgeAction
  extends Action,
    DisableableAction,
    DestructableAction,
    AppBridgeActionTarget {}
export interface IconableAction extends Action {
  /** Source of the icon */
  icon?: any;
}

export interface LoadableAction extends Action {
  /** Should a spinner be displayed */
  loading?: boolean;
}

export interface AppBridgeActionTarget {
  /**
   * Where to display the target link
   * @default 'APP'
   * @embeddedAppOnly
   */
  target?: AppBridgeTarget;
}
export interface ComplexAction
  extends Action,
    DisableableAction,
    DestructableAction,
    AppBridgeAction,
    IconableAction,
    LoadableAction {}

export type Falsy = boolean | undefined | null | 0;
export type Distribution =
  | "equalSpacing"
  | "leading"
  | "trailing"
  | "center"
  | "fill"
  | "fillEvenly";
export type Spacing = "none" | "extraSmall" | "small" | "medium" | "normal";
export type Responsive<T> = T | T[];
export type Alignment = "leading" | "trailing" | "center" | "fill" | "baseline";
export interface DisableableAction extends Action {
  /** Should the action be disabled */
  disabled?: boolean;
}
export interface DestructableAction extends Action {
  /** Destructive action */
  destructive?: boolean;
}
/** Appends @var classNameBase to each item passed to it, and joins them as a one element. Ex. 'Icon', 'Icon-Blue'; => @var classNameBase-Icon @var classNameBase-Icon-Blue */
export const elementClassNames = (
  ...classes: (string | string[] | Falsy)[]
) => {
  let classCollection: (string | Falsy)[] = [];
  for (let singleClass of classes.filter(Boolean)) {
    if (singleClass instanceof Array) {
      singleClass.forEach((c) => {
        classCollection.push(classNameBase + "-" + c);
      });
    } else {
      classCollection.push(classNameBase + "-" + singleClass);
    }
  }
  return classCollection.join(" ");
};

// Wraps `element` in `Component`, if it is not already an instance of
// `Component`. If `props` is passed, those will be added as props on the
// wrapped component. If `element` is null, the component is not wrapped.
export function wrapWithComponent<P>(
  element: React.ReactNode | null | undefined,
  Component: React.ComponentType<P>,
  props: P
): React.ReactNode {
  if (element == null) {
    return null;
  }

  return isElementOfType(element, Component) ? (
    element
  ) : (
    <Component {...props}>{element}</Component>
  );
}

// Returns all children that are valid elements as an array. Can optionally be
// filtered by passing `predicate`.
export function elementChildren<T extends React.ReactElement<{}>>(
  children: React.ReactNode,
  predicate: (element: T) => boolean = () => true
): T[] {
  return React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && predicate(child as T)
  ) as T[];
}

/** Combines the two params together with camelCase. Ex. 'color', 'blue' => colorBlue */
export const variationName = (name: string, value: string | string[]) => {
  let r = [] as any;

  if (!(value instanceof Array)) value = [value];

  value.forEach((v) => {
    r.push(`${v.charAt(0).toUpperCase()}${v.slice(1)}`);
  });

  return name + r.join("-");
};
// Checks whether `element` is a React element of type `Component` (or one of
// the passed components, if `Component` is an array of React components).
export function isElementOfType<P>(
  element: React.ReactNode | null | undefined,
  Component: React.ComponentType<P> | React.ComponentType<P>[]
): boolean {
  if (
    element == null ||
    !React.isValidElement(element) ||
    typeof element.type === "string"
  ) {
    return false;
  }

  const { type } = element;
  const Components = Array.isArray(Component) ? Component : [Component];

  return Components.some(
    (AComponent) => typeof type !== "string" && isComponent(AComponent, type)
  );
}

// In development, we compare based on the name of the function because
// React Hot Loader proxies React components in order to make updates. In
// production we can simply compare the components for equality.
const isComponent =
  process.env.NODE_ENV === "development"
    ? hotReloadComponentCheck
    : (
        AComponent: React.ComponentType<any>,
        AnotherComponent: React.ComponentType<any>
      ) => AComponent === AnotherComponent;

function hotReloadComponentCheck(
  AComponent: React.ComponentType<any>,
  AnotherComponent: React.ComponentType<any>
) {
  const componentName = AComponent.name;
  const anotherComponentName = (AnotherComponent as React.StatelessComponent<
    any
  >).displayName;

  return (
    AComponent === AnotherComponent ||
    (Boolean(componentName) && componentName === anotherComponentName)
  );
}

export const decodeCamelCase = (label: any) => {
  let _decodedString;

  _decodedString = label.split(/(?=[A-Z])/).join(" ");

  return _decodedString.charAt(0).toUpperCase() + _decodedString.slice(1);
};
