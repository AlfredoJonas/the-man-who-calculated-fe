import React, { memo } from 'react';
import styled from 'styled-components';
import { Table, Pagination, PaginationProps, Icon, SemanticICONS } from 'semantic-ui-react';
import { Record } from '../types';
import { recordKeyValues } from '../utils/constant';

const StyledTable = styled(Table)`
  &&& {
    th {
      background-color: #efefef;
      color: #333;
    }
    td {
      background-color: #fff;
      color: #333;
    }
    .pagination {
      display: flex;
      justify-content: center;
    }
    margin: 0;
  }
`;

const StyledHeaderCell = styled(Table.HeaderCell)`
  &&&{
    cursor: pointer;
  }
`;


const StyledIcon = styled(Icon)`
  &&&{
    cursor: pointer;
  }
`

interface RecordListProps {
  records: Record[];
  orderBy: string[];
  currentPage: number;
  totalPages: number;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOrderChange: (filter: string) => void;
  onPageChange: (event: React.MouseEvent, data: PaginationProps) => void;
  onDeleteRecord: (id: number) => void;
}

const RecordList: React.FC<RecordListProps> = memo(({
  records,
  orderBy,
  currentPage,
  totalPages,
  handleSearchChange,
  handleOrderChange,
  onPageChange,
  onDeleteRecord,
}) => {
  const checkorderIcon = (key: string): SemanticICONS | undefined => {
    if (orderBy.includes(key)) {
      return "arrow up"
    } else if (orderBy.includes(`-${key}`)) {
      return "arrow down"
    } else {
      return "arrows alternate vertical"
    }
  }
  return (
      <StyledTable celled stackable>
        <Table.Header>
          <Table.Row>
            {
              recordKeyValues.map(({key, value}) => (
                <StyledHeaderCell onClick={() => handleOrderChange(key)} key={key}>
                  <span>
                    {value} 
                    <Icon name={checkorderIcon(key)} />
                  </span>
                  
                </StyledHeaderCell>
              ))
            }
            <Table.HeaderCell>
              <span>Action</span>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {records && records.length > 0 && records.map((record: Record) => (
            <Table.Row key={record.id}>
              {
                recordKeyValues.map(({key}) => (
                  <Table.Cell key={`${record.id}-${key}`}>{record[key]}</Table.Cell>
                ))
              }
              <Table.Cell><StyledIcon name="trash" color='red' onClick={() => onDeleteRecord(record.id)}/></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={7}>
              <Pagination
                activePage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </StyledTable>
  );
});

export default RecordList;
