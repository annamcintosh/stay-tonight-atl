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
import { retrieveSiteData } from "../services/geocodingService";

export const getSites = () => (dispatch, getState) => {
  dispatch(setSitesLoading());
  axios
    .get("/api/sites")
    .then((res) => {
      const databaseResponse = res.data;
      const prevState = getState();
      const prevStateSites = prevState.site.sites;
      const retrieveSiteDataArr = retrieveSiteData(
        databaseResponse,
        prevStateSites
      );
      const response = Promise.all(retrieveSiteDataArr);
      return response;
    })
    .then((res) => {
      return dispatch({
        type: GET_SITES,
        payload: res,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err?.response?.data && err?.response?.status) {
        return dispatch(returnErrors(err.response.data, err.response.status));
      }
    });
};

export const getSite = (siteId) => (dispatch) => {
  dispatch(setSitesLoading());
  axios
    .get(`/api/sites/${siteId}`)
    .then((res) => {
      return dispatch({
        type: GET_SITE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err?.response?.data && err?.response?.status) {
        return dispatch(returnErrors(err.response.data, err.response.status));
      }
    });
};

// ADDSITE WITH TOKEN
export const addSite = (newSite) => (dispatch, getState) => {
  dispatch(setSitesLoading());
  axios
    .post("/api/sites/add", newSite, tokenConfig(getState))
    .then((res) => {
      console.log("Add site res.data=", res.data);
       dispatch({
        type: ADD_SITE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err?.response?.data && err?.response?.status) {
        return dispatch(returnErrors(err.response.data, err.response.status));
      }
    });
};

// DELETESITE WITH TOKEN
export const deleteSite = (siteId) => (dispatch, getState) => {
  dispatch(setSitesLoading());
  axios
    .delete(`/api/sites/${siteId}`, tokenConfig(getState))
    .then((res) => {
      return dispatch({
        type: DELETE_SITE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err?.response?.data && err?.response?.status) {
        return dispatch(returnErrors(err.response.data, err.response.status));
      }
    });
};

export const setSitesLoading = () => {
  return {
    type: SITES_LOADING,
  };
};
