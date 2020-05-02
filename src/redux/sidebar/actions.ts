import sidebarActionTypes from "./types";

export const toggleSidebar = (option: any) => ({
  type: sidebarActionTypes.TOGGLE_SIDEBAR,
  payload: option,
});
