import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Toast } from 'radix-ui';

import { MainPage as App } from 'pages'

import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme 
      accentColor="indigo"
      grayColor="mauve"
      panelBackground="translucent"
      scaling="100%"
      radius="full"
    >
      <Toast.Provider swipeDirection="right">
        <App />
      </Toast.Provider>
    </Theme>
  </StrictMode>,
)
