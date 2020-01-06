import React from 'react';
import BasePage from '../BasePage';
import PlanForm from './form';

import {
  planSearchRequest,
  planDeleteRequest,
  planSaveRequest,
  planSetPageState,
} from '~/store/modules/plan/actions';

export default function Plan() {
  return (
    <BasePage
      listHeader="Gerenciamento de planos"
      addHeader="Cadastro de planos"
      updateHeader="Edição de planos"
      searchField="title"
      resource="plan"
      searchAction={planSearchRequest}
      removeAction={planDeleteRequest}
      saveAction={planSaveRequest}
      setPageStateAction={planSetPageState}
      Form={PlanForm}
      searchPlaceHolder="Buscar plano..."
      fields={[
        { name: 'title', displayName: 'TÍTULO', textAlign: 'left' },
        {
          name: 'formattedDuration',
          displayName: 'DURAÇÃO',
          textAlign: 'center',
        },
        {
          name: 'formattedPrice',
          displayName: 'VALOR p/ MÊS',
          textAlign: 'right',
        },
      ]}
    />
  );
}
