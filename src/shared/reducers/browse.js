import { FETCH_CATEGORIES, FETCH_NEW_RELEASES } from 'constants/ActionTypes';

function fetchCategories(state, categories) {
  if(state.categories === categories) {
    return state;
  } else if(categories.categories) {
    categories = categories.categories;
  }

  return Object.assign({}, state, {
    categories: Object.assign({}, state.categories, {
      ...categories,
      items: state.categories.items.concat(categories.items),
    }),
  });
}

function fetchNewReleases(state, newReleases) {
  if(state.newReleases === newReleases) {
    return state;
  }

  return Object.assign({}, state, { newReleases });
}

function fetchCategoryPlaylists(state, { id, playlists }) {
  return Object.assign({}, state, {
    categories: Object.assign({}, state.categories, {
      [id]: playlists,
    }),
  });
}

const initialState = {
  categories: {
    items: [],
  },
  newReleases: {
    items: [],
  },
};

export default function browse (state = initialState, action) {
  switch(action.type) {
    case FETCH_CATEGORIES + '_SUCCESS':
      return fetchCategories(state, action.categories);
    case 'FETCH_CATEGORY_PLAYLISTS_SUCCESS':
      return fetchCategoryPlaylists(state, action);
    case FETCH_NEW_RELEASES + '_SUCCESS':
      return fetchNewReleases(state, action.newReleases);
    default:
      return state;
  }
}
