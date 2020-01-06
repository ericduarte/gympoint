import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import {
  helpOrderFailure,
  helpOrderSearchSuccess,
  helpOrderSaveSuccess,
  helpOrderDeleteSuccess,
  helpOrderSaveFailure,
} from './actions';

function* searchHelpOrders({ payload }) {
  try {
    const { name, page, pageSize } = payload.data;

    const res = yield call(api.get, 'help-orders', {
      params: {
        name: name || '',
        page,
        pageSize,
      },
    });

    yield put(helpOrderSearchSuccess(res.data));
  } catch (error) {
    toast.error(`Erro pesquisar pedidos de axílio!${error}`);
    yield put(helpOrderFailure());
  }
}

function* addHelpOrder(data) {
  try {
    const res = yield call(api.post, 'help-orders', data);

    toast.success('HelpOrdero cadastrado com sucesso');
    yield put(helpOrderSaveSuccess(res.data));
  } catch (error) {
    toast.error('Erro cadastrar helpOrdero!');
    yield put(helpOrderSaveFailure());
  }
}

function* updateHelpOrder(data) {
  try {
    const res = yield call(api.post, `help-orders/${data.id}/answer`, data);
    toast.success('HelpOrdero atualizado com sucesso');
    yield put(helpOrderSaveSuccess(res.data));
  } catch (error) {
    toast.error(`Erro atualizar helpOrdero!${error}`);
    yield put(helpOrderSaveFailure());
  }
}

function* saveHelpOrder({ payload }) {
  const { id } = payload.data;

  if (id) {
    yield updateHelpOrder(payload.data);
  } else {
    yield addHelpOrder(payload.data);
  }
}

function* deleteHelpOrder({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `helpOrders/${id}`);

    toast.success('HelpOrdero removido com sucesso');
    yield put(helpOrderDeleteSuccess(id));
  } catch (error) {
    toast.error(`Erro remover helpOrderos! ${error}`);
    yield put(helpOrderFailure());
  }
}

export default all([
  takeLatest('@helpOrder/HELP_ORDER_SEARCH_REQUEST', searchHelpOrders),
  takeLatest('@helpOrder/HELP_ORDER_SAVE_REQUEST', saveHelpOrder),
  takeLatest('@helpOrder/HELP_ORDER_DELETE_REQUEST', deleteHelpOrder),
]);
