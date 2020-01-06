export function helpOrderSearchRequest(data) {
  return {
    type: '@helpOrder/HELP_ORDER_SEARCH_REQUEST',
    payload: { data },
  };
}

export function helpOrderSearchSuccess(data) {
  return {
    type: '@helpOrder/HELP_ORDER_SEARCH_SUCCESS',
    payload: { data },
  };
}

export function helpOrderSaveRequest(data) {
  return {
    type: '@helpOrder/HELP_ORDER_SAVE_REQUEST',
    payload: { data },
  };
}

export function helpOrderSaveSuccess(data) {
  return {
    type: '@helpOrder/HELP_ORDER_SAVE_SUCCESS',
    payload: { data },
  };
}

export function helpOrderDeleteRequest(id) {
  return {
    type: '@helpOrder/HELP_ORDER_DELETE_REQUEST',
    payload: { id },
  };
}

export function helpOrderDeleteSuccess(id) {
  return {
    type: '@helpOrder/HELP_ORDER_DELETE_SUCCESS',
    id,
  };
}

export function helpOrderFailure() {
  return {
    type: '@helpOrder/HELP_ORDER_FAILURE',
  };
}

export function helpOrderSaveFailure() {
  return {
    type: '@helpOrder/HELP_ORDER_SAVE_FAILURE',
  };
}

export function helpOrderSetPageState(pageState) {
  return {
    type: '@helpOrder/HELP_ORDER_SET_HELP_ORDER_STATE',
    payload: { pageState },
  };
}
