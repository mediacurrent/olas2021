import React, { useContext } from "react";

import TableComponent from "./Table.component";
import Loading from "../utils/loading";
import { PortalsContext } from "../../Portals";

const Table = () => {
  const portalInstance = useContext(PortalsContext);
  const { data, loading, removeEntry, updateEntry } = portalInstance;

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
