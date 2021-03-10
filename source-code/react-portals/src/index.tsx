import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Portals from "./Portals";
import Hero from "./components/Hero/Hero.container";
import Table from "./components/Table/Table.container";

import "bootstrap/dist/css/bootstrap.css";

/**
 *
 */
const ROOT_ID = "block-olasapp";
const appRoot = document.getElementById(ROOT_ID);

const init = () => {
  if (appRoot) {
    ReactDOM.render(<App />, appRoot);
  }
};

init();

/**
 *
 */
const HERO_ROOT_ID = "block-olashero";
const heroRoot = document.getElementById(HERO_ROOT_ID);

const initHero = () => {
  if (heroRoot) {
    ReactDOM.render(<Hero />, heroRoot);
  }
};

initHero();

/**
 *
 */
const TABLE_ROOT_ID = "block-olastable";
const tableRoot = document.getElementById(TABLE_ROOT_ID);

const initTable = () => {
  if (tableRoot) {
    ReactDOM.render(<Table />, tableRoot);
  }
};

initTable();

/**
 *
 */
const PORTALS_ROOT_ID = "block-olasportals";
const portalsRoot = document.getElementById(PORTALS_ROOT_ID);

const initPortals = () => {
  if (portalsRoot) {
    ReactDOM.render(<Portals />, portalsRoot);
  }
};

initPortals();
