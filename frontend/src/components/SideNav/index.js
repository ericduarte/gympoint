import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdViewHeadline } from 'react-icons/md';

import { Container, Toggle } from './styles';

export default function SideNav() {
  const [visible, setVisible] = useState(true);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container visible={visible}>
      <Toggle onClick={handleToggleVisible}>
        <MdViewHeadline color="#578988" size={40} />
      </Toggle>
      <ul>
        <li>
          <Link to="/dashboard">DASHBOARD</Link>
        </li>
        <li>
          <Link to="/profile">Perfil</Link>
        </li>
      </ul>
    </Container>
  );
}
