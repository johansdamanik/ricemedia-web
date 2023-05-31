import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_BYID_SUCCESS } from '../actions/actionTypes';

const initialState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: 'Failed to fetch categories.',
      };

    case FETCH_CATEGORIES_BYID_SUCCESS:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
}
