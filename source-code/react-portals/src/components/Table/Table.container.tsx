import React, { useEffect, useState } from "react";

import TableComponent from "./Table.component";
import { TableData } from "../Table/Table.component";
import Loading from "../utils/loading";

const API_URL = "https://0il32.sse.codesandbox.io";

type EntryInput = {
  firstName: string;
  lastName: string;
};

const Table = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<TableData | undefined>(undefined);

  const removeEntry = (id: string) => {
    const reqOptions = { method: "DELETE" };

    fetch(`${API_URL}/${id}`, reqOptions)
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  const updateEntry = (id: string, input: EntryInput) => {
    const reqOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    };

    fetch(`${API_URL}/${id}`, reqOptions)
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  // On initial load, get data.
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (loading) setLoading(false);
        setData(data);
      });
  }, []);

  return loading ? (
    <div style={{ height: "350px" }}>
      <Loading />
    </div>
  ) : (
    <TableComponent
      data={data}
      removeEntry={removeEntry}
      updateEntry={updateEntry}
    />
  );
};

export default Table;
