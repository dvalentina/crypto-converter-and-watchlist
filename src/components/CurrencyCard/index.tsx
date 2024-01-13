'use client';

import { Container, CurrencyList, Input } from './CurrencyCard.styled';

function CurrencyCard() {
  return (
    <Container>
      <Input type='number'></Input>
      <CurrencyList>Bitcoin</CurrencyList>
    </Container>
  );
}

export default CurrencyCard;
