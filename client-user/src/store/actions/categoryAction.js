import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_BYID_SUCCESS } from './actionTypes';
import { baseUrl } from '../baseUrl';

export function fetchCategoriesRequest() {
  return {
    type: FETCH_CATEGORIES_REQUEST,
  };
}

export function fetchCategoriesSuccess(payload) {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: payload,
  };
}

export function fetchCategoriesFailure(error) {
  return {
    type: FETCH_CATEGORIES_FAILURE,
    payload: error,
  };
}

export function fetchCategoryData(category) {
  return {
    type: FETCH_CATEGORIES_BYID_SUCCESS,
    payload: category,
  }
}

export function fetchCategories() {
  return async (dispatch) => {
    dispatch(fetchCategoriesRequest());

    try {
      const response = await fetch(baseUrl + '/categories');
      if (!response.ok) throw new Error('Failed to fetch categories.');

      const data = await response.json();
      dispatch(fetchCategoriesSuccess(data));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error.message));
    }
  };
}

export function fetchCategoryById(id) {
  return async (dispatch) => {
    dispatch(fetchCategoriesRequest());
    try {
      const response = await fetch(baseUrl + `/categories/${id}`);
      if (!response.ok) throw new Error('Failed to fetch category by id.');

      const data = await response.json();
      dispatch(fetchCategoryData(data));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error.message));
    }
  };
}
