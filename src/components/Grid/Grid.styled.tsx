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
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.fontSize.primary};
`;

export const HeaderGrid = styled.div`
  grid-area: header;
  height: fit-content;
`;

export const BodyGrid = styled.div`
  grid-area: body;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

export const FooterGrid = styled.div`
  display: flex;
  justify-content: center;
  grid-area: footer;
  margin-top: 24px;
`;

export const Body = styled.div``;
