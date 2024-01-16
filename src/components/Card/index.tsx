import React from 'react';

import { Container } from './Card.styled';

interface ICard {
  children?: React.ReactNode;
  className?: string;
}

function Card({ children, className }: ICard) {
  return <Container className={className}>{children}</Container>;
}

export default Card;
