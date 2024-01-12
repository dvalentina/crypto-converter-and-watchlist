import { Button, Container } from './Pagination.styled';

interface IPagination {
  handlePageIndexChange: (pageIndex: number) => void;
  pageIndex: number;
  maxPageIndex: number;
}

function Pagination({
  handlePageIndexChange,
  pageIndex,
  maxPageIndex,
}: IPagination) {
  return (
    <Container>
      <Button onClick={() => handlePageIndexChange(pageIndex - 1)}>
        {'< Previous Page'}
      </Button>
      {pageIndex} of {maxPageIndex}
      <Button onClick={() => handlePageIndexChange(pageIndex + 1)}>
        {'Next Page >'}
      </Button>
    </Container>
  );
}

export default Pagination;
