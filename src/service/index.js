import { useState } from "react";
import { InventoryManagementContext } from "../constants";

function ContextProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <InventoryManagementContext.Provider value={{ setIsAdmin, isAdmin }}>
      {children}
    </InventoryManagementContext.Provider>
  );
}

export default ContextProvider;
