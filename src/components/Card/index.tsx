import React from 'react';

import { Container } from './Card.styled';

interface ICard {
  children?: React.ReactNode;
  className?: string;
  dataTestId?: string;
}

function Card({ children, className, dataTestId }: ICard) {
  return (
    <Container className={className} data-testid={dataTestId}>
      {children}
    </Container>
  );
}

export default Card;
