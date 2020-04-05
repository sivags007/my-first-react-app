import React, { Component } from "react";
import TableHeader from "./Children/table-header.component";
import TableRow from "./Children/table-row.component";

class Table extends Component {
  state = {
    table: {
      headers: {
        1: "Index",
        2: "VariableName",
        3: "Type",
        4: "Value",
        5: "Toggle Ebitablity",
      },
      data: [
        {
          id: 1,
          1: "str",
          2: "String",
          3: "this is a string value",
          isEnabled: false,
          error: {
            nameField: { value: false, msg: "" },
            valueField: { value: false, msg: "" },
          },
        },
        {
          id: 2,
          1: "varDouble",
          2: "Double",
          3: "2.1672",
          isEnabled: true,
          error: {
            nameField: { value: false, msg: "" },
            valueField: { value: false, msg: "" },
          },
        },
        {
          id: 3,
          1: "varBool",
          2: "Boolean",
          3: false,
          isEnabled: true,
          error: {
            nameField: { value: false, msg: "" },
            valueField: { value: false, msg: "" },
          },
        },
      ],
    },
    dropDown: [
      { id: 1, value: "Double" },
      { id: 2, value: "String" },
      { id: 3, value: "Boolean" },
    ],
    booleanDropDown: [
      { id: 1, value: true },
      { id: 2, value: false },
    ],
  };

  validateVariableName = (rowData) => {
    let retVal = true;
    if (rowData[1] === "") {
      const table = { ...this.state.table };
      const index = table.data.indexOf(rowData);
      table.data[index] = { ...rowData };
      table.data[index]["error"]["nameField"]["value"] = true;
      table.data[index]["error"]["nameField"]["msg"] =
        "Variable name cannot blank";
      this.setState({ table: table });
      retVal = false;
    } else if (rowData[1].indexOf(" ") >= 0) {
      const table = { ...this.state.table };
      const index = table.data.indexOf(rowData);
      table.data[index] = { ...rowData };
      table.data[index]["error"]["nameField"]["value"] = true;
      table.data[index]["error"]["nameField"]["msg"] =
        "Variable name cannot have Sapce";
      this.setState({ table: table });
      retVal = false;
    } else {
      const table = { ...this.state.table };
      const index = table.data.indexOf(rowData);
      table.data[index] = { ...rowData };
      table.data[index]["error"]["nameField"]["value"] = false;
      table.data[index]["error"]["nameField"]["msg"] = "";
      this.setState({ table: table });
    }
    return retVal;
  };

  validateValueField = (rowData) => {
    let retVal = true;
    if (rowData[3] === "") {
      const table = { ...this.state.table };
      const index = table.data.indexOf(rowData);
      table.data[index] = { ...rowData };
      table.data[index]["error"]["valueField"]["value"] = true;
      table.data[index]["error"]["valueField"]["msg"] = "Value cannot Empty";
      this.setState({ table: table });
      retVal = false;
    } else {
      const table = { ...this.state.table };
      const index = table.data.indexOf(rowData);
      table.data[index] = { ...rowData };
      table.data[index]["error"]["valueField"]["value"] = false;
      table.data[index]["error"]["valueField"]["msg"] = "";
      this.setState({ table: table });
    }
    return retVal;
  };

  checkValidation = (rowData) => {
    return (
      this.validateVariableName(rowData) & this.validateValueField(rowData)
    );
  };

  onRowEditTogle = (rowData) => {
    const table = { ...this.state.table };
    const index = table.data.indexOf(rowData);
    table.data[index] = { ...rowData };
    if (table.data[index]["isEnabled"] === true) {
      if (!this.checkValidation(rowData)) {
        return;
      }
    }
    table.data[index]["isEnabled"] = !table.data[index]["isEnabled"];
    this.setState({ table: table });
  };

  onDropdownSelected = (rowData, dropDown) => {
    const table = { ...this.state.table };
    const index = table.data.indexOf(rowData);
    table.data[index] = { ...rowData };
    table.data[index][2] = dropDown.value;
    if (dropDown.value === "Boolean") {
      table.data[index][3] = false;
    }
    this.setState({ table: table });
  };
  onChangeValueField = (rowData, valueToBeChanged) => {
    const table = { ...this.state.table };
    const index = table.data.indexOf(rowData);
    table.data[index] = { ...rowData };
    table.data[index][3] = valueToBeChanged.trim();
    this.setState({ table: table });
  };
  onChangeNameField = (rowData, valueToBeChanged) => {
    const table = { ...this.state.table };
    const index = table.data.indexOf(rowData);
    table.data[index] = { ...rowData };
    table.data[index][1] = valueToBeChanged.trim();
    this.setState({ table: table });
  };

  render() {
    let tableStyle = {
      width: "100%",
      border: "1px solid black",
      borderCollapse: "collapse",
      textAlign: "center",
      verticalAlign: "middle",
    };

    return (
      <div>
        <h2>Table</h2>
        <table style={tableStyle}>
          <thead>
            <TableHeader headers={this.state.table.headers}></TableHeader>
          </thead>
          <tbody>
            {this.state.table.data.map((data) => {
              return (
                <TableRow
                  key={data.id}
                  dropDown={this.state.dropDown}
                  data={data}
                  onEditToggle={this.onRowEditTogle}
                  onChangeDropDown={this.onDropdownSelected}
                  booleanDropDown={this.state.booleanDropDown}
                  onChangeValueField={this.onChangeValueField}
                  onChangeNameField={this.onChangeNameField}
                ></TableRow>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
