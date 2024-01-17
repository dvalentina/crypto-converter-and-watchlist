import IconButton from '@/components/IconButton';

import { Container } from './Pagination.styled';

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
      <IconButton
        onClick={() => handlePageIndexChange(pageIndex - 1)}
        src='images/previousIcon.svg'
        alt='previous page'
        disabled={pageIndex === 1 ? true : false}
      />
      {pageIndex} of {maxPageIndex}
      <IconButton
        onClick={() => handlePageIndexChange(pageIndex + 1)}
        src='images/nextIcon.svg'
        alt='next page'
        disabled={pageIndex === maxPageIndex ? true : false}
      />
    </Container>
  );
}

export default Pagination;
