import React, { Component } from "react";
import DropDownList from "../../CommonComponents/dropdown-component";
class TableRow extends Component {
  state = {};
  onselectedDropDown = (dropDown) => {
    this.props.onChangeDropDown(this.props.data, dropDown);
  };
  onChangedBooleanValue = (booleanValue) => {
    this.props.onChangeValueField(this.props.data, booleanValue.value);
  };
  onChangedValue = (value) => {
    this.props.onChangeValueField(this.props.data, value);
  };
  onChangedName = (value) => {
    this.props.onChangeNameField(this.props.data, value);
  };
  getNameFeildInputStyles(isEnabled, nameFeildError) {
    let styles = {};
    if (isEnabled && nameFeildError) {
      const style1 = {
        pointerEvents: "all",
        borderColor: "red",
      };
      styles = Object.assign(styles, style1);
    } else if (isEnabled && !nameFeildError) {
      const style2 = {
        pointerEvents: "all",
      };
      styles = Object.assign(styles, style2);
    } else if (!isEnabled) {
      const style3 = {
        pointerEvents: "none",
      };
      styles = Object.assign(styles, style3);
    }
    return styles;
  }
  getValueFeildInputStyles(isEnabled, valueFeildError) {
    let styles = {};
    if (isEnabled && valueFeildError) {
      const style1 = {
        pointerEvents: "all",
        borderColor: "red",
      };
      styles = Object.assign(styles, style1);
    } else if (isEnabled && !valueFeildError) {
      const style2 = {
        pointerEvents: "all",
      };
      styles = Object.assign(styles, style2);
    } else if (!isEnabled) {
      const style3 = {
        pointerEvents: "none",
      };
      styles = Object.assign(styles, style3);
    }
    return styles;
  }
  render() {
    const { data, dropDown, onEditToggle, booleanDropDown } = this.props;

    const isEnabled = data["isEnabled"];
    const styleDisable = {
      pointerEvents: "none",
    };
    const styleEnalbe = {
      pointerEvents: "all",
    };
    const errorMessageStyle = {
      fontSize: "12px",
      color: "red",
      fontWeight: "bold",
    };
    const varient = !isEnabled ? "primary" : "success";
    const editButtonName = !isEnabled ? "Edit" : "Save";
    const selectedType = data[2];
    const valiableName = data[1];
    const value = data[3];
    const nameFeildError = data["error"]["nameField"]["value"];
    const nameFeildErrorMsg = data["error"]["nameField"]["msg"];
    const valueFeildError = data["error"]["valueField"]["value"];
    const valueFeildErrorMsg = data["error"]["valueField"]["msg"];

    let valueFieldTemplate = <input></input>;
    const styleNameInput = this.getNameFeildInputStyles(
      isEnabled,
      nameFeildError
    );
    const styleValueInput = this.getValueFeildInputStyles(
      isEnabled,
      valueFeildError
    );

    if (selectedType === "Boolean") {
      valueFieldTemplate = (
        <DropDownList
          style={isEnabled ? styleEnalbe : styleDisable}
          isEnabled={isEnabled}
          dropDown={booleanDropDown}
          onChangeDropDown={this.onChangedBooleanValue}
          selectedType={value}
          variant="btn-primary-outline border border-secondary"
        ></DropDownList>
      );
    } else {
      valueFieldTemplate = (
        <React.Fragment>
          <input
            className="form-control"
            style={styleValueInput}
            type={selectedType === "Double" ? "number" : "text"}
            onBlur={(event) => this.onChangedValue(event.target.value)}
            maxLength="32"
            defaultValue={value}
          ></input>
          <span style={errorMessageStyle}>{valueFeildErrorMsg}</span>
        </React.Fragment>
      );
    }

    return (
      <tr>
        <td>
          <span>{data.id}</span>
        </td>
        <td>
          <React.Fragment>
            <input
              className="form-control"
              style={styleNameInput}
              onBlur={(event) => this.onChangedName(event.target.value)}
              maxLength="32"
              defaultValue={valiableName}
            ></input>
            <span style={errorMessageStyle}>{nameFeildErrorMsg}</span>
          </React.Fragment>
        </td>
        <td>
          <DropDownList
            style={isEnabled ? styleEnalbe : styleDisable}
            isEnabled={isEnabled}
            dropDown={dropDown}
            onChangeDropDown={this.onselectedDropDown}
            selectedType={selectedType}
            variant="btn-primary-outline border border-warning"
          ></DropDownList>
        </td>
        <td>{valueFieldTemplate}</td>
        <td>
          <button
            onClick={() => onEditToggle(data)}
            className={`btn-${varient}-outline border border-${varient} btn-sm m-2`}
          >
            {editButtonName}
          </button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
