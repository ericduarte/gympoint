import { takeLatest, call, put, all } from 'redux-saga/effects';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { formatDatePicker } from '~/utils';
import {
  registrationFailure,
  registrationSearchSuccess,
  registrationSaveSuccess,
  registrationDeleteSuccess,
  registrationSaveFailure,
} from './actions';

function* searchRegistrations({ payload }) {
  try {
    const { name, page, pageSize } = payload.data;

    const res = yield call(api.get, 'registrations', {
      params: {
        name: name || '',
        page,
        pageSize,
      },
    });

    const { data } = res;
    const parsedList = data.list.map(item => ({
      ...item,
      start_date: format(parseISO(item.start_date), 'yyyy-MM-dd'),
      end_date: format(parseISO(item.end_date), 'yyyy-MM-dd'),
      startDateFormatted: format(
        parseISO(item.start_date),
        "dd 'de' MMMM 'de' yyyy",
        {
          locale: pt,
        }
      ),
      endDateFormatted: format(
        parseISO(item.end_date),
        "dd 'de' MMMM 'de' yyyy",
        {
          locale: pt,
        }
      ),
    }));
    data.list = parsedList;
    yield put(registrationSearchSuccess(data));
  } catch (error) {
    toast.error(`Erro pesquisar matrículas!${error}`);
    yield put(registrationFailure());
  }
}

function* addRegistration(data) {
  try {
    const res = yield call(api.post, 'registrations', data);

    toast.success('Registrationo cadastrado com sucesso');
    yield put(registrationSaveSuccess(res.data));
  } catch (error) {
    toast.error(`Erro cadastrar matrícula!${error}`);
    yield put(registrationSaveFailure());
  }
}

function* updateRegistration(data) {
  try {
    data.start_date = parseISO(data.start_date);
    const res = yield call(api.put, `registrations/${data.id}`, data);

    toast.success('Registrationo atualizado com sucesso');
    yield put(registrationSaveSuccess(res.data));
  } catch (error) {
    toast.error(`Erro ao atualizar matrícula!${error}`);
    yield put(registrationSaveFailure());
  }
}

function* saveRegistration({ payload }) {
  const { id } = payload.data;

  if (id) {
    yield updateRegistration(payload.data);
  } else {
    yield addRegistration(payload.data);
  }
}

function* deleteRegistration({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `registrations/${id}`);

    toast.success('Registrationo removido com sucesso');
    yield put(registrationDeleteSuccess(id));
  } catch (error) {
    toast.error(`Erro remover registrationos! ${error}`);
    yield put(registrationFailure());
  }
}

export default all([
  takeLatest('@registration/REGISTRATION_SEARCH_REQUEST', searchRegistrations),
  takeLatest('@registration/REGISTRATION_SAVE_REQUEST', saveRegistration),
  takeLatest('@registration/REGISTRATION_DELETE_REQUEST', deleteRegistration),
]);
