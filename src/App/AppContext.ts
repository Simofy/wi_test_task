import { createContext } from "react";
import { AppContextType } from "../types";

const AppContext = createContext<AppContextType>({
  manageUser: () => { },
  countries: [],
  users: []
});

export default AppContext;