import React from 'react';
import { render, fireEvent, waitFor, within } from '@testing-library/react';
import { useOperationsInfo, useNewOperation } from '../hooks/queryHooks';
import NewOperation from '../pages/newOperation';
import { newOperationProps } from '../types';

const operations = [
    {
        "id": 1,
        "type": "addition",
        "cost": 0.2,
        "fields": {
            "A": {
                "type": "number",
                "value": "",
                "required": true
            },
            "B": {
                "type": "number",
                "value": "",
                "required": true
            }
        }
    },
    {
        "id": 5,
        "type": "random_string",
        "cost": 0.6,
        "fields": {}
    }
];

const mockDoLogout = jest.fn();
// Mock the useNewOperation hook
const mockNewOperation = jest.fn();
// Mock the queryHooks
jest.mock('../hooks/queryHooks', () => ({
    useUserInfo: () => ({
        data: { data: {username: 'test@test.com', balanace: 1000}},
    }),
    useUserLogout: () => ({
        mutate: mockDoLogout,
    }),
    useNewOperation: () => ({ mutate: mockNewOperation, isLoading: false }),
    useOperationsInfo: () => ({ data: { data: operations } }),
}));

// Mock the router
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('NewOperation', () => {
  test('renders the form', () => {
    const { getByPlaceholderText, getByText } = render(<NewOperation />);
    const operationLabel = getByText('Select Operation');
    const calculateButton = getByText('Calculate');

    expect(operationLabel).toBeInTheDocument();
    expect(calculateButton).toBeInTheDocument();
  });

  test('fires newOperation on form submission', async () => {
    const { getByText, getByPlaceholderText } = render(<NewOperation />);
    const operationItem = getByText('addition (cost: 0.2)');
    const calculateButton = getByText('Calculate') as HTMLButtonElement;
    fireEvent.click(operationItem);

    await waitFor(() => {
        expect(getByPlaceholderText('number A')).toBeInTheDocument();
    });

    const inputA = getByPlaceholderText('number A');
    const inputB = getByPlaceholderText('number B');
    
    fireEvent.change(inputA, { target: { value: '10' } });
    fireEvent.change(inputB, { target: { value: '10' } });

    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(mockNewOperation).toHaveBeenCalledWith({
        operation_id: 1,
        variables: "{\"A\":\"10\",\"B\":\"10\"}"
      } as newOperationProps);
    });
  });
});
