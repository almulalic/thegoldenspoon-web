import React from "react";

export const classNameBase = "Avis";

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
