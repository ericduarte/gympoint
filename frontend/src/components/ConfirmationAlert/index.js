import React from 'react';
import { confirmAlert } from 'react-confirm-alert';

import { Container, Button } from './styles';

export default function confirmationAlert(title,message,onYesClick) {
  return confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <Container>
          <h1>{title}</h1>
          <p>{message}</p>
          <Button
            kind="primary"
            onClick={() => {
              onYesClick();
              onClose();
            }}
          >
            Sim
          </Button>
          <Button onClick={onClose}>Não</Button>
        </Container>
      );
    }
  });
}
