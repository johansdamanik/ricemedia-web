import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE} from './actionTypes';
import { baseUrl } from '../baseUrl';

export function fetchPostsRequest() {
  return {
    type: FETCH_POSTS_REQUEST,
  };
}

export function fetchPostsSuccess(payload) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: payload,
  };
}

export function fetchPostsFailure(error) {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: error,
  };
}

export function fetchPosts() {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());
    try {
      const response = await fetch(baseUrl + '/posts');
      if (!response.ok) throw new Error('Failed to fetch posts.');

      const data = await response.json();
      dispatch(fetchPostsSuccess(data));
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
    }
  };
}

export function addPost(postForm) {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + '/posts', {
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token'),
          'content-type': 'application/json',
        },
        body: JSON.stringify(postForm),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const data = await response.json();
      dispatch(fetchPosts());
    } catch (error) {
      throw error;
    }
  };
}

export function editPost(postForm) {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + '/posts/' + postForm.id, {
        method: 'PUT',
        headers: {
          access_token: localStorage.getItem('access_token'),
          'content-type': 'application/json',
        },
        body: JSON.stringify(postForm),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const data = await response.json();
      dispatch(fetchPosts());
    } catch (error) {
      throw error;
    }
  };
}

export function deletePost(id) {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + `/posts/${id}`, {
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

      dispatch(fetchPosts());
    } catch (error) {
      throw error;
    }
  };
}
