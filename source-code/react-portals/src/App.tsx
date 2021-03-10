import React, { useEffect, useState } from "react";

import Hero from "./components/Hero/Hero.component";
import Table, { TableData } from "./components/Table/Table.component";
import Loading from "./components/utils/loading";

const API_URL = "https://0il32.sse.codesandbox.io";

export type Entry = {
  id: string;
  firstName: string;
  lastName: string;
};

type EntryInput = {
  firstName: string;
  lastName: string;
};

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<TableData | undefined>(undefined);

  const addEntry = (input: EntryInput) => {
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    };

    fetch(API_URL, reqOptions)
      .then((response) => response.json())
      .then((data) => setData(data));
  };

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

  return (
    <>
      {loading ? (
        <div style={{ height: "50vh" }}>
          <Loading />
        </div>
      ) : (
        <>
          <Hero data={data} addEntry={addEntry} />
          <Table
            data={data}
            removeEntry={removeEntry}
            updateEntry={updateEntry}
          />
        </>
      )}
    </>
  );
};

export default App;
