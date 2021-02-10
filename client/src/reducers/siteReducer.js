import {
  GET_SITES,
  GET_SITE,
  ADD_SITE,
  DELETE_SITE,
  SITES_LOADING,
} from "../actions/types";

const initialState = {
  sites: [],
  loading: false,
};

export default function siteReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SITES:
      return {
        ...state,
        sites: action.payload,
        loading: false,
      };
    case GET_SITE:
      return {
        ...state,
        sites: state.sites.filter((site) => site.siteId === action.payload),
        loading: false,
      };
    case DELETE_SITE:
      return {
        ...state,
        sites: state.sites.filter((site) => site.siteId !== action.payload),
      };
    case ADD_SITE:
      return {
        ...state,
        sites: [action.payload, ...state.sites],
      };
    case SITES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
