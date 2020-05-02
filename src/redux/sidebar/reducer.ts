import sidebarActionTypes from './types';

const INITIAL_STATE = {
  sidebarState: 'collapsed'
};

const sidebarReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case sidebarActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarState: action.payload
      };
    default:
      return state;
  }
};

export default sidebarReducer;
