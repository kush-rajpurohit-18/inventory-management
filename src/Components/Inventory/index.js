import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import "./style.css";
import Card from "../Card";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GetInventoryContainer } from "../../Containers/getInventoryContainer";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import { InventoryManagementContext } from "../../constants";
import EditProduct from "./EditInventory";

const StyledTableCell = styled(TableCell)({
  color: "#87c750",
});
const StyledHeading = styled("h1")({
  fontWeight: "400",
});

export function InventoryManagementView({ rows, setRows }) {
  const [isVisible, setIsVisible] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [noOfCategories, setNoOfCategories] = useState(0);
  const [isVisibleRows, setIsVisibleRows] = useState(0);
  const [zeroStocks, setZeroStocks] = useState([]);
  const [toggleState, setToggleState] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setIsFormData] = useState({});
  const { isAdmin, setIsAdmin } = useContext(InventoryManagementContext);

  useEffect(() => {
    if (toggleState) setIsAdmin(false);
    else setIsAdmin(true);
  }, [toggleState, setIsAdmin]);

  useEffect(() => {
    const calculateStats = () => {
      let totalPrice = 0;
      const visibleRows = rows.filter((row) => !isVisible[row.name]);
      totalPrice = visibleRows.reduce((acc, row) => {
        const price = parseFloat(row.value.replace("$", ""));
        return acc + price;
      }, 0);
      const noOfCategories = new Set(visibleRows.map((row) => row.category));
      const zeroStocks = visibleRows.filter((row) => row.quantity === 0);
      setIsVisibleRows(visibleRows);
      return { totalPrice, noOfCategories, zeroStocks };
    };

    const { totalPrice, noOfCategories, zeroStocks } = calculateStats();
    let t = parseFloat(totalPrice);
    setTotalPrice(t.toLocaleString());
    setNoOfCategories(noOfCategories.size);
    setZeroStocks(zeroStocks.length);
  }, [rows, isVisible]);

  const cardData = [
    {
      icon: LocalGroceryStoreIcon,
      title: "Total Product",
      number: isVisibleRows?.length,
    },
    {
      icon: CurrencyExchangeIcon,
      title: "Total Store Value",
      number: totalPrice,
    },
    {
      icon: RemoveShoppingCartIcon,
      title: "Out of stocks",
      number: zeroStocks,
    },
    {
      icon: CategoryIcon,
      title: "No of category",
      number: noOfCategories,
    },
  ];

  const handleToggle = () => {
    setToggleState(!toggleState);
  };
  const handleClickEdit = (item) => {
    setIsEdit(true);
    setIsFormData(item);
  };
  const handleCloseEditForm = () => {
    setIsEdit(false);
  };
  const handleVisibilityToggle = (rowName) => {
    setIsVisible((prevVisibility) => ({
      ...prevVisibility,
      [rowName]: !prevVisibility[rowName],
    }));
  };
  const handleOnDelete = (item) => {
    const updatedData = rows.filter((row) => row.name !== item.name);
    setRows(updatedData);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setIsFormData({ ...formData, [name]: value });
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedData = rows.map((row) => {
      if (row.name === formData.name) {
        return {
          ...row,
          category: formData.category,
          price: formData.price,
          quantity: Number(formData.quantity),
          value: formData.value,
        };
      }
      return row;
    });
    setRows(updatedData);
    setIsEdit(false);
  };

  return (
    <div className="table-view-with-stats-cards">
      <header className="table-view-header">
        <div>
          <span>admin</span>
          <Switch checked={toggleState} onChange={handleToggle} />
          <span>user</span>
        </div>
        <LogoutIcon />
      </header>
      <StyledHeading>Inventory stats</StyledHeading>
      <div className="table-view-cards">
        {cardData.map((item) => (
          <Card
            key={item.title}
            icon={item.icon}
            title={item.title}
            number={item.number}
          />
        ))}
      </div>
      <TableContainer sx={{ backgroundColor: "#1C1C1C", borderRadius: "10px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ borderBottom: "2px solid #2E2C2C" }}>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Value</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={
                  !isAdmin
                    ? {
                        pointerEvents: "none",
                        borderBottom: "2px solid #2E2C2C",
                      }
                    : { borderBottom: "2px solid #2E2C2C" }
                }
              >
                <TableCell
                  sx={
                    isVisible[row.name] || !isAdmin
                      ? { color: "grey" }
                      : { color: "white" }
                  }
                >
                  {row.name}
                </TableCell>
                <TableCell
                  sx={
                    isVisible[row.name] || !isAdmin
                      ? { color: "grey" }
                      : { color: "white" }
                  }
                >
                  {row.category}
                </TableCell>
                <TableCell
                  sx={
                    isVisible[row.name] || !isAdmin
                      ? { color: "grey" }
                      : { color: "white" }
                  }
                >
                  {row.price}
                </TableCell>
                <TableCell
                  sx={
                    isVisible[row.name] || !isAdmin
                      ? { color: "grey" }
                      : { color: "white" }
                  }
                >
                  {row.quantity}
                </TableCell>
                <TableCell
                  sx={
                    isVisible[row.name] || !isAdmin
                      ? { color: "grey" }
                      : { color: "white" }
                  }
                >
                  {row.value}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleClickEdit(row)}
                    disabled={isVisible[row.name]}
                  >
                    <EditIcon
                      sx={{
                        fontSize: "18px",
                        ...((!isAdmin || isVisible[row.name]) && {
                          color: "grey",
                        }),
                        ...(isAdmin &&
                          !isVisible[row.name] && { color: "green" }),
                      }}
                      className="table-view-icon-action-button"
                    />
                  </IconButton>
                  <IconButton onClick={() => handleVisibilityToggle(row.name)}>
                    {isVisible[row.name] ? (
                      <VisibilityOff
                        sx={{
                          fontSize: "18px",
                          ...(!isAdmin && { color: "grey" }),
                          ...(isAdmin && { color: "hotpink" }),
                        }}
                      />
                    ) : (
                      <Visibility
                        sx={{
                          fontSize: "18px",
                          ...(!isAdmin && { color: "grey" }),
                          ...(isAdmin && { color: "hotpink" }),
                        }}
                        className="table-view-icon-action-button"
                      />
                    )}
                  </IconButton>
                  <IconButton onClick={() => handleOnDelete(row)}>
                    <DeleteIcon
                      sx={{
                        fontSize: "18px",
                        ...(!isAdmin && { color: "grey" }),
                        ...(isAdmin && { color: "red" }),
                      }}
                      className="table-view-icon-action-button"
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditProduct
        isEdit={isEdit}
        handleCloseEditForm={handleCloseEditForm}
        formData={formData}
        handleOnChange={handleOnChange}
        handleEditSubmit={handleEditSubmit}
      />
    </div>
  );
}

export default function InventoryManagement(props) {
  return (
    <GetInventoryContainer {...props}>
      <InventoryManagementView />
    </GetInventoryContainer>
  );
}
