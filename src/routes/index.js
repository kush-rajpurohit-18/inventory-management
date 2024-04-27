import { Route, Routes } from "react-router-dom";
import InventoryManagement from "../Components/Inventory";

export default function Router() {
  return (
    <Routes>
      <Route exact path="/inventory-management-app" element={<InventoryManagement />} />
    </Routes>
  );
}
