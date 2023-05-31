import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, SAVE_SELECTED_POST } from './actionTypes';
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

export const saveSelectedPost = (post) => {
  return {
    type: SAVE_SELECTED_POST,
    payload: post,
  };
};

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

export function fetchPostById(id) {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());
    try {
      const response = await fetch(baseUrl + `/posts/${id}`);
      if (!response.ok) throw new Error('Failed to fetch posts.');

      const data = await response.json();
      dispatch(saveSelectedPost(data));
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
    }
  };
}
