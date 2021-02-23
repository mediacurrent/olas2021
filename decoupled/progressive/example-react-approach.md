# Example Approach Using React Portals and Drupal Blocks.

This is an approach to interspersing twig blocks and react components.

{% tabs %}
{% tab title="root.tsx" %}
```tsx
import React, { ReactElement, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { components, Component } from './components';

const APP_CONTAINER_ID = 'react-root';
const appRoot = document.getElementById(APP_CONTAINER_ID);

interface PortalProps {
  root: HTMLElement;
  children: ReactNode;
}

const Portal = ({ root, children }: PortalProps) => {
  const el = document.createElement('div');

  useEffect(() => {
    root.innerHTML = '';
    root.appendChild(el);

    return () => {
      root.removeChild(el);
    };
  }, [el, root]);

  return ReactDOM.createPortal(children, el);
};

const App = (): ReactElement => (
  <>
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
  </>
);

const main = () => {
  if (appRoot) {
    ReactDOM.render(<App />, appRoot);
  }
};

main();
```
{% endtab %}

{% tab title="components.ts" %}
```tsx

import Profile from '../components/profile/profile.component';
import Settings from '../components/settings/settings.component';

export interface Component {
  id: string;
  render: (data: { [key: string]: string }) => ReactElement;
}

export const components: Component[] = [
  {
    id: 'profile',
    render: (dataset) => <Profile {...dataset} />
  },
  {
    id: 'settings',
    render: (dataset) => <Settings {...dataset} />
  },
];
```
{% endtab %}
{% endtabs %}