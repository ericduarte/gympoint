import styled from 'styled-components';

export const Table = styled.table`
  overflow-x: auto;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;

  th,
  td {
    text-align: center;
    padding: 8px;
  }

  td {
    border-bottom: 1px solid #ddd;
    height: 50px;
    color: #808080;
  }

  button {
    float: right;
  }
`;
