import React, { useState } from "react";
import { Button, Col, Form, Table } from "react-bootstrap";

export type TableData = {
  headers: string[];
  rows: string[][];
};

interface TableRowProps {
  rowData: string[];
  removeEntry?: Function;
  updateEntry?: Function;
}

const TableRow = ({ rowData, updateEntry, removeEntry }: TableRowProps) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [rowId, rowFirstName, rowLastName] = rowData;

  const handleUpdateClick = () => {
    setIsUpdating(true);
  };

  const handleCancelClick = () => {
    setIsUpdating(false);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const input = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
    };

    if (updateEntry) {
      setIsUpdating(false);

      // Pass input to addEntry mutation.
      updateEntry(rowId, input);
    }
  };

  return (
    <tr>
      {isUpdating ? (
        <td colSpan={2}>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Row>
                <Col>
                  <Form.Control
                    defaultValue={rowFirstName}
                    name="firstName"
                    placeholder="First Name"
                    required
                    type="text"
                  />
                </Col>
                <Col>
                  <Form.Control
                    defaultValue={rowLastName}
                    name="lastName"
                    placeholder="Last Name"
                    required
                    type="text"
                  />
                </Col>
              </Form.Row>
            </Form.Group>

            <Button type="submit" variant="success">
              submit
            </Button>
          </Form>
        </td>
      ) : (
        rowData.map((col: string, index: number) => {
          if (index < 1) return;

          return <td key={col}>{col}</td>;
        })
      )}
      <td style={{ textAlign: "right" }}>
        {isUpdating ? (
          <Button onClick={handleCancelClick} variant="danger">
            X
          </Button>
        ) : (
          <Button
            disabled={!removeEntry}
            onClick={handleUpdateClick}
            variant="primary"
          >
            update
          </Button>
        )}

        <Button
          disabled={isUpdating || !removeEntry}
          onClick={() => removeEntry && removeEntry(rowId)}
          style={{ marginLeft: "20px" }}
          variant="danger"
        >
          delete
        </Button>
      </td>
    </tr>
  );
};

interface TableProps {
  data?: TableData;
  removeEntry?: Function;
  updateEntry?: Function;
}

const TableComponent = ({ data, removeEntry, updateEntry }: TableProps) => {
  const { headers, rows } = data || {};

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {headers &&
            headers.map(
              (header: string, index: number) =>
                index > 0 && <th key={header}>{header}</th>
            )}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows.map((row: string[]) => (
            <TableRow
              rowData={row}
              key={row[0]}
              removeEntry={removeEntry}
              updateEntry={updateEntry}
            />
          ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
