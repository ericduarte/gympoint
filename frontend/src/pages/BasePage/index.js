import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Content, Wrapper, Card } from './styles';
import List from './list';

export default function BasePage(props) {
  const [formData, setFormData] = useState({});
  const {
    FormWrapper,
    formSchema,
    resource,
    fields,
    setPageStateAction,
    removeAction,
    saveAction,
    searchAction,
    searchField,
    listHeader,
    showActions,
    showCustomActions,
    customActions,
    Form,
    showAdd,
    searchPlaceHolder,
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
            FormWrapper={FormWrapper}
            saveAction={saveAction}
            setPageStateAction={setPageStateAction}
          />
        );
      case 'EDITING':
        return (
          <Form
            schema={formSchema}
            FormWrapper={FormWrapper}
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
};

BasePage.propTypes = {
  FormWrapper: PropTypes.func.isRequired,
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
};
