import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background: #ffff;
  padding: 0 30px;
`;

export const Page = styled(NavLink)`
  font-weight: bold;
  margin-left: 5px;

  &.is-active {
    color: black;
  }
  color: #c9c9c9;
`;

export const SignOut = styled.button`
  background: none;
  border: none;
  color: #ee4d64ff;
`;

export const Logo = styled.img`
  width: 150px;
`;

export const Content = styled.div`
  height: 64px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
