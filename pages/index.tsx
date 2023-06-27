import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input, PaginationProps } from 'semantic-ui-react';
import RecordList from '../components/recordList';
import Layout from '../components/layout';
import { useDeleteUserRecord, useUserRecordsInfo } from '../hooks/queryHooks';

const StyledSearch = styled(Input)`
  &&& {
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-bottom: 1rem;
  }
`;

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState<string[]>([]);
  const {mutate: mutateDeleteUserRecord} = useDeleteUserRecord()
  const { data = {}, refetch } = useUserRecordsInfo(
    {
      page: currentPage,
      size: 10,
      search,
      filter: '',
      order: orderBy.join(','),
    }
    );
  const {
    data: records = [],
    total_pages: totalPages = 1
  } = data;
  
  useEffect(() => {
    refetch();
  }, [currentPage, search, orderBy]);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };


  const handleOrderChange = (columnName: string) => {
    const orderMatch1 = orderBy.indexOf(columnName);
    const orderMatch2 = orderBy.indexOf(`-${columnName}`);
    if (orderMatch1 > -1) {
      const updatedList = [...orderBy];
      updatedList[orderMatch1] = `-${columnName}`;
      setOrderBy(updatedList);
    } else if (orderMatch2 > -1) {
      const updatedList = [...orderBy];
      updatedList.splice(orderMatch2, 1);
      setOrderBy(updatedList);
    } else {
      setOrderBy([...orderBy, columnName]);
    }
  };

  const handlePageChange = (
    _: React.MouseEvent,
    { activePage }: PaginationProps
  ) => {
    setCurrentPage(activePage as number);
  };

  return (
    <Layout>
      <StyledSearch
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
      />
      <RecordList
        records={records}
        orderBy={orderBy}
        currentPage={currentPage}
        totalPages={totalPages}
        handleSearchChange={handleSearchChange}
        handleOrderChange={handleOrderChange}
        onPageChange={handlePageChange}
        onDeleteRecord={mutateDeleteUserRecord}
      />
    </Layout>
  );
};

export default Home;