import React from 'react';
import BasePage from '../BasePage';
import Form from './form';
import {
  studentsSearchRequest,
  studentsDeleteRequest,
  studentsSaveRequest,
  studentsSetPageState,
} from '~/store/modules/student/actions';

export default function Student() {
  return (
    <BasePage
      resource="student"
      listHeader="Gerenciamento de alunos"
      addHeader="Cadastro de alunos"
      updateHeader="Edição de alunos"
      searchField="name"
      fields={[
        { name: 'name', displayName: 'NOME', dataType: 'string' },
        { name: 'email', displayName: 'E-MAIL', dataType: 'string' },
        { name: 'age', displayName: 'IDADE', dataType: 'integer' },
      ]}
      searchAction={studentsSearchRequest}
      removeAction={studentsDeleteRequest}
      saveAction={studentsSaveRequest}
      setPageStateAction={studentsSetPageState}
      showActions
      searchPlaceHolder="Buscar aluno..."
      Form={Form}
    />
  );
}
