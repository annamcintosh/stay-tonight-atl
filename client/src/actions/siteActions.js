import {
  GET_SITES,
  GET_SITE,
  ADD_SITE,
  DELETE_SITE,
  SITES_LOADING,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getSites = () => (dispatch) => {
  dispatch(setSitesLoading());
  axios
    .get("/api/sites")
    .then((res) =>
      dispatch({
        type: GET_SITES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getSite = (siteId) => (dispatch) => {
  dispatch(setSitesLoading());
  axios
    .get(`/api/sites/${siteId}`)
    .then((res) =>
      dispatch({
        type: GET_SITE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADDSITE WITH TOKEN
export const addSite = (newSite) => (dispatch, getState) => {
  dispatch(setSitesLoading());
  axios
    .post("/api/sites/add", newSite, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_SITE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETESITE WITH TOKEN
export const deleteSite = (siteId) => (dispatch, getState) => {
  dispatch(setSitesLoading());
  axios
    .delete(`/api/sites/${siteId}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_SITE,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setSitesLoading = () => {
  return {
    type: SITES_LOADING,
  };
};
