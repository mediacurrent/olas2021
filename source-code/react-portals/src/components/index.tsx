/* eslint-disable react/display-name */
import React, { ReactElement } from "react";

import Hero from "./Hero/Hero.portal";
import Table from "./Table/Table.portal";

export interface Component {
  id: string;
  render: (data: DOMStringMap) => ReactElement;
}

/**
 * Register all React components that can be added as blocks.
 * @todo: Do we still need to pass in the id?
 * - The backend may be limiting what data we get back and its probably redundant.
 */
export const components: Component[] = [
  {
    id: "block-olasheroportal",
    render: (dataset) => {
      return <Hero {...dataset} />;
    },
  },
  {
    id: "block-olastableportal",
    render: (dataset) => {
      return <Table {...dataset} />;
    },
  },
];
