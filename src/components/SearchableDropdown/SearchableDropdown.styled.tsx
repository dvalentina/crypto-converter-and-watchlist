import styled from 'styled-components';

interface IOption {
  $notFound?: boolean;
}

export const Container = styled.div`
  position: relative;
`;

export const List = styled.ul`
  position: absolute;
  top: 48px;
  border: 1px solid black;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: white;
`;

export const Option = styled.li<IOption>`
  display: flex;
  align-items: center;
  list-style-type: none;
  height: 40px;
  font-size: 20px;
  margin: 0;
  padding: 2px 8px;

  cursor: ${({ $notFound }) => ($notFound ? 'default' : 'pointer')};
  color: ${({ $notFound }) => ($notFound ? 'grey' : 'black')};
`;
