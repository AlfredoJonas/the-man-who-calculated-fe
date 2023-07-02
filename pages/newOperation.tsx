import React, { SyntheticEvent, useState } from 'react';
import { Form, Button, Dropdown, DropdownProps, Message } from 'semantic-ui-react';
import { Operation, OperationFields, ResponseType } from '../types';
import { useNewOperation, useOperationsInfo } from '../hooks/queryHooks';
import Layout from '../components/layout';
import { AxiosError } from 'axios';

const NewOperation: React.FC = () : JSX.Element => {
  const { data = {} } = useOperationsInfo();
  const [response, setResponse] = useState<ResponseType | null>();
  const [error, setError] = useState<AxiosError | null>();
  const { mutate: newOperation, isLoading } = useNewOperation((data: ResponseType | null) => setResponse(data), (error: AxiosError | null) => setError(error));
  const [operation, setOperation] = useState<string>();
  const [fields, setFields] = useState<Record<string, OperationFields> | undefined>();
  const { data: operations = [] } = data;
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const operationObj = operations.find((op: Operation) => op.type === operation) as Operation;
    const newFields: Record<string, string | number> = fields
    ? Object.fromEntries(
        Object.entries(fields).map(([key, value]: [string, OperationFields]) => [
          key,
          value.value,
        ])
      )
    : {}
    newOperation({
      operation_id: operationObj.id,
      variables: JSON.stringify(newFields),
    });
  };

  const onChangeOperation = (event: SyntheticEvent<HTMLElement, Event>, { value }: DropdownProps) => {
    const currentOperation = operations.find((op: Operation) => op.type === value) as Operation | undefined;
    setOperation(value as string);
    setFields(currentOperation?.fields);
    setResponse(null);
    setError(null);
  };

  const onFieldChange = (value: string, key: string) => {
    if (fields) {
      const newValues = { ...fields };
      newValues[key] = { ...newValues[key], value };
      setFields(newValues);
    }
  };

  return (
    <Layout>
      <Form onSubmit={handleSubmit}>
        <Form.Field required={true}>
          <label>Operation</label>
          <Dropdown
            placeholder="Select Operation"
            required
            selection
            options={operations.map((op: Operation) => ({ key: op.id, value: op.type, text: `${op.type} (cost: ${op.cost})` }))}
            value={operation}
            onChange={onChangeOperation}
          />
        </Form.Field>
        {fields && Object.entries(fields).map(([key, value]: [string, OperationFields]) => (
          <Form.Field key={key} required={value.required}>
            <label>{key} {value.type}</label>
            <input
              type="number"
              placeholder={`${value.type} ${key}`}
              value={value.value}
              onChange={(e) => onFieldChange(e.target.value, key)}
              required={value.required}
            />
          </Form.Field>
        ))}
        <Button type="submit" disabled={!operation} loading={isLoading}>Calculate</Button>
      </Form>
      {response && (
        <Message
          success
          header='Your operation was successful, this is the result:'
          content={response.result}
        />
      )}
      
      {error && (
        <Message
          error
          header={error.response ? error.response.statusText : ''}
        />
      )}
    </Layout>
  );
};

export default NewOperation;
