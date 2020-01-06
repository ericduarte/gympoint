export function registrationSearchRequest(data) {
  return {
    type: '@registration/REGISTRATION_SEARCH_REQUEST',
    payload: { data },
  };
}

export function registrationSearchSuccess(data) {
  return {
    type: '@registration/REGISTRATION_SEARCH_SUCCESS',
    payload: { data },
  };
}

export function registrationSaveRequest(data) {
  return {
    type: '@registration/REGISTRATION_SAVE_REQUEST',
    payload: { data },
  };
}

export function registrationSaveSuccess(data) {
  return {
    type: '@registration/REGISTRATION_SAVE_SUCCESS',
    payload: { data },
  };
}

export function registrationDeleteRequest(id) {
  return {
    type: '@registration/REGISTRATION_DELETE_REQUEST',
    payload: { id },
  };
}

export function registrationDeleteSuccess(id) {
  return {
    type: '@registration/REGISTRATION_DELETE_SUCCESS',
    id,
  };
}

export function registrationFailure() {
  return {
    type: '@registration/REGISTRATION_FAILURE',
  };
}

export function registrationSaveFailure() {
  return {
    type: '@registration/REGISTRATION_SAVE_FAILURE',
  };
}

export function registrationSetPageState(pageState) {
  return {
    type: '@registration/REGISTRATION_SET_REGISTRATION_STATE',
    payload: { pageState },
  };
}
