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
      insertHeader="Cadastro de alunos"
      editHeader="Edição de alunos"
      searchField="name"
      fields={[
        { name: 'name', displayName: 'NOME', textAlign: 'left' },
        { name: 'email', displayName: 'E-MAIL', textAlign: 'left' },
        { name: 'age', displayName: 'IDADE', textAlign: 'center' },
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
