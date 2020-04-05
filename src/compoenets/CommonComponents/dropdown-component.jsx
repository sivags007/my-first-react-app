import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const DropDownList = ({
  dropDown,
  style,
  onChangeDropDown,
  selectedType,
  variant,
}) => {
  return (
    <DropdownButton
      id="dropdown"
      variant={variant}
      title={selectedType.toString()}
      style={style}
    >
      {dropDown.map((dropDownValue) => {
        return (
          <Dropdown.Item
            key={dropDownValue.id}
            eventKey={dropDownValue.id}
            onSelect={() => onChangeDropDown(dropDownValue)}
          >
            {dropDownValue.value.toString()}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
};

export default DropDownList;
