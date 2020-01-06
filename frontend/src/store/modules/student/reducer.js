import produce from 'immer';

const INITIAL_STATE = {
  table: {
    pageSize: 5,
    page: 1,
    recordCount: 0,
    list: [],
  },
  item: {},
  loading: false,
  pageState: 'LISTING',
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/STUDENT_SEARCH_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@student/STUDENT_SEARCH_SUCCESS': {
        draft.table = action.payload.data;
        draft.loading = false;
        break;
      }

      case '@student/STUDENT_SAVE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@student/STUDENT_SAVE_SUCCESS': {
        draft.item = action.payload.data;
        draft.loading = false;
        draft.pageState = 'LISTING';
        break;
      }

      case '@student/STUDENT_DELETE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@student/STUDENT_DELETE_SUCCESS': {
        draft.loading = false;
        draft.table.list = state.table.list.filter(el => el.id !== action.id);
        break;
      }

      case '@student/STUDENT_SAVE_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@student/STUDENT_FAILURE': {
        draft.item = {};
        draft.loading = false;
        break;
      }

      case '@student/STUDENT_SET_PAGE_STATE': {
        draft.pageState = action.payload.pageState;
        break;
      }

      default:
    }
  });
}
