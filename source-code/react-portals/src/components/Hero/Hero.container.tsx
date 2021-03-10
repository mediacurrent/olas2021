import React, { useEffect, useState } from "react";

import HeroComponent from "./Hero.component";
import { TableData } from "../Table/Table.component";
import Loading from "../utils/loading";

const API_URL = "https://0il32.sse.codesandbox.io";

type EntryInput = {
  firstName: string;
  lastName: string;
};

const Hero = () => {
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
    <HeroComponent addEntry={addEntry} data={data} />
  );
};

export default Hero;
