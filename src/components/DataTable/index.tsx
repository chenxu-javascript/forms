import React, { Fragment } from "react";
import Search from "./Search";
import Table from "./Table";
import { IProps } from "./interface";

const DataTable: React.FC<IProps> = props => {
  const { conditions, column } = props;
  return (
    <Fragment>
      {/* <Search conditions={conditions} /> */}
      <Table />
    </Fragment>
  );
};

export default DataTable;
