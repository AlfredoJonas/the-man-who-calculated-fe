import React, { memo } from 'react';
import styled from 'styled-components';
import { Table, Pagination, PaginationProps, Icon, SemanticICONS } from 'semantic-ui-react';
import { UserRecord } from '../types';
import { recordKeyValues } from '../utils/constant';

/**
 * Props for the RecordList component.
 */
interface RecordListProps {
  records: UserRecord[];
  orderBy: string[];
  currentPage: number;
  totalPages: number;
  handleOrderChange: (filter: string) => void;
  onPageChange: (event: React.MouseEvent, data: PaginationProps) => void;
  onDeleteRecord: (id: number) => void;
}

/**
 * RecordList component for displaying a list of records.
 *
 * @param {RecordListProps} props - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
const RecordList: React.FC<RecordListProps> = memo(({
  records,
  orderBy,
  currentPage,
  totalPages,
  handleOrderChange,
  onPageChange,
  onDeleteRecord,
}) => {
  /**
   * Determines the icon to display based on the current order.
   *
   * @param {string} key - The key of the column.
   * @returns {SemanticICONS | undefined} - The icon name.
   */
  const checkOrderIcon = (key: string): SemanticICONS | undefined => {
    if (orderBy.includes(key)) {
      return "arrow up";
    } else if (orderBy.includes(`-${key}`)) {
      return "arrow down";
    } else {
      return "arrows alternate vertical";
    }
  };

  return (
    <StyledTable celled stackable>
      <Table.Header>
        <Table.Row>
          {recordKeyValues.map(({ key, value }) => (
            <StyledHeaderCell onClick={() => handleOrderChange(key)} key={key}>
              <span>
                {value}
                <Icon name={checkOrderIcon(key)} />
              </span>
            </StyledHeaderCell>
          ))}
          <Table.HeaderCell>
            <span>Action</span>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {records &&
          records.length > 0 &&
          records.map((record: UserRecord) => (
            <Table.Row key={record.id}>
              {recordKeyValues.map(({ key }) => (
                <Table.Cell key={`${record.id}-${key}`}>{record[key]}</Table.Cell>
              ))}
              <Table.Cell>
                <StyledIcon name="trash" color='red' onClick={() => onDeleteRecord(record.id)} />
              </Table.Cell>
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


/**
 * Styled component for the table.
 */
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

/**
 * Styled component for the header cell.
 */
const StyledHeaderCell = styled(Table.HeaderCell)`
  &&&{
    cursor: pointer;
  }
`;

/**
 * Styled component for the icon.
 */
const StyledIcon = styled(Icon)`
  &&&{
    cursor: pointer;
  }
`;


export default RecordList;
