import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import {
  planFailure,
  planSearchSuccess,
  planSaveSuccess,
  planDeleteSuccess,
  planSaveFailure,
} from './actions';

function* searchPlans({ payload }) {
  try {
    const { title, page, pageSize } = payload.data;

    const res = yield call(api.get, 'plans', {
      params: {
        title: title || '',
        page,
        pageSize,
      },
    });

    const { data } = res;
    const parsedList = data.list.map(item => ({
      ...item,
      formattedPrice: item.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      formattedDuration: `${item.duration} meses`,
    }));

    data.list = parsedList;
    yield put(planSearchSuccess(data));
  } catch (error) {
    toast.error('Erro pesquisar planos!');
    yield put(planFailure());
  }
}

function* addPlan(data) {
  try {
    const res = yield call(api.post, 'plans', data);

    toast.success('Plano cadastrado com sucesso');
    yield put(planSaveSuccess(res.data));
  } catch (error) {
    toast.error(`Erro cadastrar plano!${error}`);
    yield put(planSaveFailure());
  }
}

function* updatePlan(data) {
  try {
    const res = yield call(api.put, `plans/${data.id}`, data);

    toast.success('Plano atualizado com sucesso');
    yield put(planSaveSuccess(res.data));
  } catch (error) {
    toast.error('Erro atualizar plano!');
    yield put(planSaveFailure());
  }
}

function* savePlan({ payload }) {
  const { id } = payload.data;

  if (id) {
    yield updatePlan(payload.data);
  } else {
    yield addPlan(payload.data);
  }
}

function* deletePlan({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `plans/${id}`);

    toast.success('Plano removido com sucesso');
    yield put(planDeleteSuccess(id));
  } catch (error) {
    toast.error(`Erro remover planos! ${error}`);
    yield put(planFailure());
  }
}

export default all([
  takeLatest('@plan/PLAN_SEARCH_REQUEST', searchPlans),
  takeLatest('@plan/PLAN_SAVE_REQUEST', savePlan),
  takeLatest('@plan/PLAN_DELETE_REQUEST', deletePlan),
]);
