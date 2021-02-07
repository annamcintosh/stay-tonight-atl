import {
  GET_SITES,
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
    case DELETE_SITE:
      return {
        ...state,
        sites: state.sites.filter((site) => site._id !== action.payload),
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
