import * as React from "react";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (!navigationRef.current) return;
  navigationRef.current.navigate(name, params);
}
