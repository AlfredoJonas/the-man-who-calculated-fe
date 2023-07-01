import React from 'react';
import { render, fireEvent, waitFor, getAllByTestId } from '@testing-library/react';
import Home from '../pages';
import { useDeleteUserRecord, useUserRecordsInfo } from '../hooks/queryHooks';
import { paginatedApiUserRecordsProps } from '../types';

const mockDoLogout = jest.fn();

// Mock the queryHooks
jest.mock('../hooks/queryHooks', () => ({
    useUserInfo: () => ({
        data: { data: {username: 'test@test.com', balanace: 1000}},
    }),
    useUserLogout: () => ({
        mutate: mockDoLogout,
    }),
    useDeleteUserRecord: jest.fn().mockReturnValue({ mutate: jest.fn() }),
    useUserRecordsInfo: jest.fn().mockReturnValue({
        data: {
            data: [
                // sample records data
                { id: 1, name: 'Record 1' },
                { id: 2, name: 'Record 2' },
                { id: 3, name: 'Record 3' },
            ],
            total_pages: 3,
            },
            refetch: jest.fn(),
    }),
}));

// Mock the router
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe.only('Home', () => {
  test('renders the record list', () => {
    const { getByTestId } = render(<Home />);
    const recordList = getByTestId('record-list');
    expect(recordList).toBeInTheDocument();
  });

  test('fires refetch on order change', async () => {
    const { getByText } = render(<Home />);
    const orderButton = getByText('Amount') as HTMLButtonElement;

    fireEvent.click(orderButton);

    await waitFor(() => {
      expect(useUserRecordsInfo({} as paginatedApiUserRecordsProps).refetch).toHaveBeenCalled();
    });
  });

  test('fires delete record on record deletion', async () => {
    const { getAllByTestId } = render(<Home />);
    const deleteButtons = getAllByTestId('delete') as HTMLButtonElement[];

    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(useDeleteUserRecord().mutate).toHaveBeenCalled();
    });
  });

});
