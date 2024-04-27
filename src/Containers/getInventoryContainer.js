import { Alert } from "@mui/material";
import axios from "axios";
import { Children, cloneElement, useEffect, useState } from "react";

export function GetInventoryContainer(props) {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
      );
      if (response?.data !== undefined) {
        setRows(response.data);
      } else {
        throw new Error(response);
      }
    } catch (error) {
      <Alert severity="error">{error.message}</Alert>;
    }
  };

  const children = Children.only(props.children);
  return cloneElement(children, { rows, setRows });
}
