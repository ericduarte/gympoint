/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { MdAdd } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import { CardHeader, CardBody, CardFooter } from './styles';
import DataTable from '~/components/DataTable';
import SearchInput from '~/components/SearchInput';
import Button from '~/components/Button';
import Pagination from '~/components/Pagination';
import confirmationAlert from '~/components/ConfirmationAlert';

export default function List({
  onEdit,
  fields,
  searchField,
  listHeader,
  resource,
  searchAction,
  removeAction,
  setPageStateAction,
  showAdd,
  showActions,
  showCustomActions,
  customActions,
  searchPlaceHolder,
}) {
  const [searchTerm, setTermSearch] = useState('');
  const list = useSelector(state => {
    if (state[resource]) {
      return state[resource].table.list;
    }
    return [];
  });

  const pageState = useSelector(state => state[resource].pageState);
  const loading = useSelector(state => state[resource].loading);
  const pageSize = useSelector(state => state[resource].table.pageSize);
  const currentPage = useSelector(state => state[resource].table.page);
  const recordCount = useSelector(state => state[resource].table.recordCount);

  const dispatch = useDispatch();

  useEffect(() => {
    if (pageState === 'LISTING')
      dispatch(searchAction({ [searchField]: searchTerm, page: 1 }));
  }, [pageState]);

  function handleSearch(value, page = 1) {
    setTermSearch(value);
    dispatch(searchAction({ [searchField]: value, page }));
  }

  function setPageState(data) {
    dispatch(setPageStateAction(data));
  }

  function paginate(page) {
    handleSearch(searchTerm, page);
  }

  function handleEdit(row) {
    onEdit(row);
  }

  function handleDelete(row) {
    confirmationAlert(
      'Atenção',
      'Tem certeza que deseja excluir este registro',
      () => dispatch(removeAction(row.id))
    );
  }

  function handleAdd() {
    setPageState('INSERTING', resource);
  }

  return (
    <>
      <CardHeader>
        <h1>{listHeader}</h1>
        <aside>
          <Form>
            <div>
              {showAdd && (
                <Button
                  color="primary"
                  label="CADASTRAR"
                  onClick={handleAdd}
                  icon={<MdAdd color="#fff" size={24} />}
                />
              )}

              <SearchInput
                handleSearch={handleSearch}
                placeholder={searchPlaceHolder}
              />
            </div>
          </Form>
        </aside>
      </CardHeader>
      <CardBody>
        <DataTable
          fields={fields}
          list={list}
          keyField="id"
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
          showActions={showActions}
          showCustomActions={showCustomActions}
          customActions={customActions}
        />
      </CardBody>
      <CardFooter>
        <aside>
          <Pagination
            pageSize={pageSize}
            recordCount={recordCount}
            paginate={paginate}
            currentPage={currentPage}
            pageNeighbours={2}
          />
        </aside>
      </CardFooter>
    </>
  );
}

List.defaultProps = {
  customActions: undefined,
  showAdd: true,
};

List.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      keyField: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  searchField: PropTypes.string.isRequired,
  listHeader: PropTypes.string.isRequired,
  showAdd: PropTypes.bool,
  customActions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
};
