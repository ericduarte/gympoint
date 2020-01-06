import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 200px;
  height: 100%;
  background: #fff;
  margin: 0px;
  left: ${props => {
    return props.visible ? '0px' : '-200px';
  }};

  ul li a {
    color: rgba(87, 137, 136, 0.9);
  }

  ul li {
    padding: 15px 10px;
    border-bottom: 1px solid rgba(87, 137, 136, 0.3);
  }
`;

export const Toggle = styled.button`
  position: absolute;
  left: 230px;
  top: 20px;
  background: none;
  border: 0;
`;
