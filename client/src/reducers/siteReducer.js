import {
  GET_SITES,
  GET_SITE,
  ADD_SITE,
  DELETE_SITE,
  SITES_LOADING,
} from "../actions/types";

const initialState = {
  sites: [],
  selectedSite: {},
  loading: false,
};

export default function siteReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SITES:
      return {
        ...state,
        sites: action.payload,
        selectedSite: {},
        loading: false,
      };
    case GET_SITE:
      return {
        ...state,
        sites: state.sites,
        selectedSite: action.payload,
        loading: false,
      };
    case DELETE_SITE:
      return {
        ...state,
        sites: state.sites.filter((site) => site.siteId !== action.payload),
        loading: false,
      };
    case ADD_SITE: {
      return Object.assign({}, state, {
        sites: state.sites.concat(action.payload),
      });
    }
    // case ADD_SITE: {
    //   return {
    //     ...state,
    //     sites: [action.payload, ...state.sites],
    //     // sites: [state.sites, action.payload],
    //     // sites: [state.sites, ...action.payload],
    //     loading: false,
    //   };
    // }
    case SITES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
