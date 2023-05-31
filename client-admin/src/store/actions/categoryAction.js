import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE } from './actionTypes';
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

export function addCategory(name) {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + '/categories', {
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token'),
          'content-type': 'application/json',
        },
        body: JSON.stringify(name),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      dispatch(fetchCategories());
    } catch (error) {
      throw error;
    }
  };
}

export function editCategory(category) {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + `/categories/${category.id}`, {
        method: 'PUT',
        headers: {
          access_token: localStorage.getItem('access_token'),
          'content-type': 'application/json',
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      dispatch(fetchCategories());
    } catch (error) {
      throw error;
    }
  };
}

export function deleteCategory(id) {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + `/categories/${id}`, {
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token'),
          'content-type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      dispatch(fetchCategories());
    } catch (error) {
      throw error;
    }
  };
}
