'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-areas:
    'header'
    'body'
    'footer';
  padding: 24px 0;
  height: 100vh;
  grid-template-rows: auto 1fr auto;
  box-sizing: border-box;
`;

export const HeaderGrid = styled.div`
  grid-area: header;
  height: fit-content;
`;

export const BodyGrid = styled.div`
  grid-area: body;
`;

export const FooterGrid = styled.div`
  display: flex;
  justify-content: center;
  grid-area: footer;
  margin-top: 24px;
`;

export const Body = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: auto 200px 200px 200px 200px auto;
`;
