'use client';

import CurrencyCard from '../CurrencyCard';

import { Container } from './Converter.styled';

function Converter() {
  return (
    <Container>
      <CurrencyCard />
      <div>{'<>'}</div>
      <CurrencyCard />
    </Container>
  );
}

export default Converter;
