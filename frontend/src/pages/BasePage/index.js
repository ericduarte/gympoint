import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Content, Wrapper, Card } from './styles';
import List from './list';

export default function BasePage(props) {
  const [formData, setFormData] = useState({});
  const {
    formSchema,
    resource,
    fields,
    setPageStateAction,
    removeAction,
    saveAction,
    searchAction,
    searchField,
    showCustomActions,
    Form,
    showAdd,
    searchPlaceHolder,
    listHeader,
    showActions,
    customActions,
  } = props;

  const pageState = useSelector(state => {
    if (state[resource]) {
      return state[resource].pageState;
    }
    return [];
  });

  const dispatch = useDispatch();

  function setPageState(data) {
    dispatch(setPageStateAction(data));
  }

  function handleEdit(row) {
    setFormData(row);
    setPageState('EDITING');
  }

  function renderCardContent() {
    switch (pageState) {
      case 'INSERTING':
        return (
          <Form
            schema={formSchema}
            saveAction={saveAction}
            setPageStateAction={setPageStateAction}
          />
        );
      case 'EDITING':
        return (
          <Form
            schema={formSchema}
            formData={formData}
            saveAction={saveAction}
            setPageStateAction={setPageStateAction}
            id={formData.id}
          />
        );
      default:
        return (
          <List
            onEdit={handleEdit}
            resource={resource}
            fields={fields}
            searchField={searchField}
            listHeader={listHeader}
            removeAction={removeAction}
            searchAction={searchAction}
            setPageStateAction={setPageStateAction}
            showActions={showActions}
            showAdd={showAdd}
            showCustomActions={showCustomActions}
            customActions={customActions}
            searchPlaceHolder={searchPlaceHolder}
          />
        );
    }
  }

  return (
    <Wrapper>
      <Content>
        <Card>{renderCardContent()}</Card>
      </Content>
    </Wrapper>
  );
}

BasePage.defaultProps = {
  showActions: true,
  customActions: null,
  removeAction: null,
  saveAction: null,
  searchAction: null,
  searchField: null,
  showCustomActions: false,
  Form: null,
  showAdd: true,
  searchPlaceHolder: null,
};

BasePage.propTypes = {
  formSchema: PropTypes.shape().isRequired,
  resource: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  listHeader: PropTypes.string.isRequired,
  setPageStateAction: PropTypes.func.isRequired,
  showActions: PropTypes.func,
  customActions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
  removeAction: PropTypes.func,
  saveAction: PropTypes.func,
  searchAction: PropTypes.func,
  searchField: PropTypes.string,
  showCustomActions: PropTypes.bool,
  Form: PropTypes.element,
  showAdd: PropTypes.bool,
  searchPlaceHolder: PropTypes.string,
};
