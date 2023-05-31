import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, SAVE_SELECTED_POST } from '../actions/actionTypes';

const initialState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case SAVE_SELECTED_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };
      
    default:
      return state;
  }
}
