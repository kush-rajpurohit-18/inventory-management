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
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const children = Children.only(props.children);
  return cloneElement(children, { rows, setRows });
}
