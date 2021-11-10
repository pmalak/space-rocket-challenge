import React                       from "react";
import ReactDOM                    from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import App                                 from "./components/app";
import { FavoriteLaunchesContextProvider } from "./utils/favorites-context";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <CSSReset />
        <FavoriteLaunchesContextProvider>
          <App />
        </FavoriteLaunchesContextProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
