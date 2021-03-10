import React, { useContext } from "react";

import HeroComponent from "./Hero.component";
import Loading from "../utils/loading";
import { PortalsContext } from "../../Portals";

const Hero = () => {
  const portalInstance = useContext(PortalsContext);
  const { data, loading, addEntry } = portalInstance;

  return loading ? (
    <div style={{ height: "350px" }}>
      <Loading />
    </div>
  ) : (
    <HeroComponent addEntry={addEntry} data={data} />
  );
};

export default Hero;
