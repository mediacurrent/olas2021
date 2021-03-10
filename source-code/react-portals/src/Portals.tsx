import React, {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";

import { components, Component } from "./components";

const API_URL = "https://0il32.sse.codesandbox.io";

const defaultContext: {
  data: any;
  loading: boolean;
  addEntry?: (input: EntryInput) => void;
  removeEntry?: (id: string) => void;
  updateEntry?: (id: string, input: EntryInput) => void;
} = {
  data: {},
  loading: false,
  addEntry: undefined,
  removeEntry: undefined,
  updateEntry: undefined,
};

export const PortalsContext = createContext(defaultContext);

interface PortalProps {
  root: HTMLElement;
  children: ReactNode;
}

type EntryInput = {
  firstName: string;
  lastName: string;
};

/**
 * Portal adds components to the correct place in the DOM.
 */
const Portal = ({ root, children }: PortalProps) => {
  const el = document.createElement("div");

  useEffect(() => {
    root.innerHTML = "";
    root.appendChild(el);

    return () => {
      root.removeChild(el);
    };
  }, [el, root]);

  return ReactDOM.createPortal(children, el);
};

/**
 * Portals is the parent to ALL connected React components.
 */
const Portals = (): ReactElement => {
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

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
    <PortalsContext.Provider
      value={{ data, loading, addEntry, removeEntry, updateEntry }}
    >
      {components.map((component: Component) => {
        const { id, render } = component;
        const mountPoint = document.getElementById(id);

        if (mountPoint) {
          const { dataset } = mountPoint;

          return (
            <Portal key={id} root={mountPoint}>
              {render(dataset)}
            </Portal>
          );
        }
      })}
    </PortalsContext.Provider>
  );
};

export default Portals;
