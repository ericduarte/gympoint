export function planSearchRequest(data) {
  return {
    type: '@plan/PLAN_SEARCH_REQUEST',
    payload: { data },
  };
}

export function planSearchSuccess(data) {
  return {
    type: '@plan/PLAN_SEARCH_SUCCESS',
    payload: { data },
  };
}

export function planSaveRequest(data) {
  return {
    type: '@plan/PLAN_SAVE_REQUEST',
    payload: { data },
  };
}

export function planSaveSuccess(data) {
  return {
    type: '@plan/PLAN_SAVE_SUCCESS',
    payload: { data },
  };
}

export function planDeleteRequest(id) {
  return {
    type: '@plan/PLAN_DELETE_REQUEST',
    payload: { id },
  };
}

export function planDeleteSuccess(id) {
  return {
    type: '@plan/PLAN_DELETE_SUCCESS',
    id,
  };
}

export function planFailure() {
  return {
    type: '@plan/PLAN_FAILURE',
  };
}

export function planSaveFailure() {
  return {
    type: '@plan/PLAN_SAVE_FAILURE',
  };
}

export function planSetPageState(pageState) {
  return {
    type: '@plan/PLAN_SET_PLAN_STATE',
    payload: { pageState },
  };
}
