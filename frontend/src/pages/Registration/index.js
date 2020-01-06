import React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import BasePage from '../BasePage';
import RegistrationForm from './form';

import {
  registrationSearchRequest,
  registrationDeleteRequest,
  registrationSaveRequest,
  registrationSetPageState,
} from '~/store/modules/registration/actions';

export default function Registration() {
  function handleActiveField(status) {
    return status ? (
      <MdCheckCircle size={23} color="#42CB59" />
    ) : (
      <MdCheckCircle size={23} color="#DDDDDD" />
    );
  }
  return (
    <BasePage
      listHeader="Gerenciamento de matrículas"
      editHeader="Edição de matrículas"
      insertHeader="Cadastro de matrículas"
      searchField="title"
      resource="registration"
      searchAction={registrationSearchRequest}
      removeAction={registrationDeleteRequest}
      saveAction={registrationSaveRequest}
      setPageStateAction={registrationSetPageState}
      showActions
      Form={RegistrationForm}
      searchPlaceHolder="Informe o aluno..."
      fields={[
        { name: 'student.name', displayName: 'Aluno', textAlign: 'left' },
        { name: 'plan.title', displayName: 'Plano', textAlign: 'left' },
        {
          name: 'startDateFormatted',
          displayName: 'Início',
          textAlign: 'center',
        },
        { name: 'endDateFormatted', displayName: 'Fim', textAlign: 'center' },
        {
          name: 'active',
          displayName: 'Ativa',
          action: handleActiveField,
          textAlign: 'center',
        },
      ]}
    />
  );
}
