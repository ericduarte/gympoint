import React from 'react';
import PropTypes from 'prop-types';
import { Table, ColumnHeader, Column } from './styles';
import Loading from '../Loading';
import LabelButton from '~/components/LabelButton';

export default function DataTable(props) {
  const {
    list,
    fields,
    showActions,
    onDelete,
    keyField,
    loading,
    customActions,
    showCustomActions,
  } = props;

  function handleEdit(row) {
    const { onEdit } = props;
    onEdit(row);
  }

  function handleDelete(row) {
    onDelete(row);
  }

  function renderTitles() {
    return (
      <tr role="row">
        {fields.map(field => {
          return (
            <ColumnHeader key={field.name} dataType={field.dataType}>
              {field.displayName}
            </ColumnHeader>
          );
        })}
        {showActions && <th> </th>}
      </tr>
    );
  }

  function parseField(row, field) {
    const { name, action } = field;
    const path = name.split('.');
    let fieldOut = row;
    path.forEach(el => {
      fieldOut = fieldOut[el];
    });

    if (action) {
      return action(fieldOut);
    }
    return fieldOut;
  }

  function renderRow(row) {
    return (
      <tr role="row" key={row[keyField]}>
        {fields &&
          fields.map(field => {
            return (
              <Column key={field.name} type={field.dataType}>
                {parseField(row, field)}
              </Column>
            );
          })}
        {(showActions || showCustomActions) && (
          <td>
            {showActions && (
              <>
                <LabelButton
                  type="button"
                  color="delete"
                  label="apagar"
                  onClick={() => handleDelete(row)}
                />
                <LabelButton
                  type="button"
                  color="edit"
                  label="editar"
                  onClick={() => handleEdit(row)}
                />
              </>
            )}
            {showCustomActions && (
              <>
                {customActions &&
                  customActions.map(act => {
                    const { label, action, color } = act;
                    return (
                      <LabelButton
                        type="button"
                        color={color}
                        label={label}
                        onClick={() => action(row)}
                      />
                    );
                  })}
              </>
            )}
          </td>
        )}
      </tr>
    );
  }

  function renderRows() {
    return (
      <>
        {list &&
          list.map(row => {
            return renderRow(row);
          })}
      </>
    );
  }

  return (
    <div>
      <div>
        {loading ? (
          <Loading>Carregando...</Loading>
        ) : (
          <Table>
            <thead>{renderTitles()}</thead>
            <tbody>{renderRows()}</tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

DataTable.defaultProps = {
  loading: false,
  customActions: undefined,
  showCustomActions: false,
  showActions: false,
  onEdit: undefined,
  onDelete: undefined,
};

DataTable.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      keyField: PropTypes.string,
      width: PropTypes.string,
      sort: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  keyField: PropTypes.string.isRequired,
  showActions: PropTypes.bool,
  loading: PropTypes.bool,
  customActions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
  showCustomActions: PropTypes.bool,
};
