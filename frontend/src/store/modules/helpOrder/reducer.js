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

export default function helpOrder(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@helpOrder/HELP_ORDER_SEARCH_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@helpOrder/HELP_ORDER_SEARCH_SUCCESS': {
        draft.table = action.payload.data;
        draft.loading = false;
        break;
      }

      case '@helpOrder/HELP_ORDER_SAVE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@helpOrder/HELP_ORDER_SAVE_SUCCESS': {
        draft.formData = action.payload.data;
        draft.loading = false;
        draft.pageState = 'LISTING';
        break;
      }

      case '@helpOrder/HELP_ORDER_DELETE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@helpOrder/HELP_ORDER_DELETE_SUCCESS': {
        draft.loading = false;
        draft.success = true;
        draft.table.list = state.table.list.filter(el => el.id !== action.id);
        break;
      }

      case '@helpOrder/HELP_ORDER_SAVE_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@helpOrder/HELP_ORDER_FAILURE': {
        draft.formData = {};
        draft.loading = false;
        break;
      }

      case '@helpOrder/HELP_ORDER_SET_HELP_ORDER_STATE': {
        draft.pageState = action.payload.pageState;
        break;
      }

      default:
    }
  });
}
