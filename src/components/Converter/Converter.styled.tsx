import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 40px;
  width: 40px;
  border: 1px solid black;
  cursor: pointer;
  background: white;

  &:hover {
    border: 2px solid;
    border-image: linear-gradient(45deg, turquoise, mediumslateblue) 1;
  }

  &:active {
    border: 3px solid;
    border-image: linear-gradient(45deg, turquoise, mediumslateblue) 1;
  }

  &:focus-visible {
    outline: 1px solid black;
  }
`;
