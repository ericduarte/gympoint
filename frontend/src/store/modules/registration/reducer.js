import produce from 'immer';

const INITIAL_STATE = {
  table: {
    pageSize: 5,
    page: 1,
    recordCount: 0,
    list: [],
  },
  formData: {},
  loading: false,
  pageState: 'LISTING',
};

export default function registration(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@registration/REGISTRATION_SEARCH_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@registration/REGISTRATION_SEARCH_SUCCESS': {
        draft.table = action.payload.data;
        draft.loading = false;
        break;
      }

      case '@registration/REGISTRATION_SAVE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@registration/REGISTRATION_SAVE_SUCCESS': {
        draft.formData = action.payload.data;
        draft.loading = false;
        draft.pageState = 'LISTING';
        break;
      }

      case '@registration/REGISTRATION_DELETE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@registration/REGISTRATION_DELETE_SUCCESS': {
        draft.loading = false;
        draft.success = true;
        draft.table.list = state.table.list.filter(el => el.id !== action.id);
        break;
      }

      case '@registration/REGISTRATION_SAVE_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@registration/REGISTRATION_FAILURE': {
        draft.formData = {};
        draft.loading = false;
        break;
      }

      case '@registration/REGISTRATION_SET_REGISTRATION_STATE': {
        draft.pageState = action.payload.pageState;
        break;
      }

      default:
    }
  });
}
