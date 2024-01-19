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
    <Container data-testid='pagination'>
      <IconButton
        onClick={() => handlePageIndexChange(pageIndex - 1)}
        src='images/previousIcon.svg'
        alt='previous page'
        disabled={pageIndex === 1 ? true : false}
        dataTestId='previous-button'
      />
      {pageIndex} of {maxPageIndex}
      <IconButton
        onClick={() => handlePageIndexChange(pageIndex + 1)}
        src='images/nextIcon.svg'
        alt='next page'
        disabled={pageIndex === maxPageIndex ? true : false}
        dataTestId='next-button'
      />
    </Container>
  );
}

export default Pagination;
