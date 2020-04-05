import React from "react";

const TableHeader = ({ headers }) => {
  const headerTemplate = Object.keys(headers).map((key) => {
    return <th key={key}>{headers[key]}</th>;
  });
  return <tr>{headerTemplate}</tr>;
};

export default TableHeader;
