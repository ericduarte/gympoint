import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logoH.png';
import { Container, Content, Profile, SignOut, Logo, Page } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  const pages = [
    {
      label: 'ALUNOS',
      path: '/student',
    },
    {
      label: 'PLANOS',
      path: '/plan',
    },
    {
      label: 'MATRÍCULAS',
      path: '/registration',
    },
    {
      label: 'PEDIDOS DE AUXILIOS',
      path: '/help-order',
    },
  ];

  function renderPages() {
    return (
      <>
        {pages.map(page => (
          <Page
            key={page.label}
            activeClassName="is-active"
            to={page.path}
            label={page.label}
            selected={false}
          >
            {page.label}
          </Page>
        ))}
      </>
    );
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Logo src={logo} alt="" />
          {renderPages()}
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <SignOut onClick={handleSignOut}>sair do sistema</SignOut>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
