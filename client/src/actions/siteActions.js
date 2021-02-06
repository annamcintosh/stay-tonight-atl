import { GET_SITES, ADD_SITE, DELETE_SITE, SITES_LOADING } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getSites = () => (dispatch) => {
  dispatch(setSitesLoading());
  axios
    .get('/api/sites')
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

export const addSite = (site) => (dispatch, getState) => {
  axios
    .post(
      '/api/sites',
      site,
      tokenConfig(getState)
    )
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

export const deleteSite = (id) => (dispatch, getState) => {
  axios
    .delete(`api/sites/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_SITE,
        payload: id,
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
