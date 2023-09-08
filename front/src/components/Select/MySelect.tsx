import React from "react";
import * as styles from "./mySelect.module.scss";

type Option = {
  value: string;
  name: string;
};

type Props = {
  options: Option[];
  defaultValue: string;
  value: string;
  onChange: (value: string) => void;
};

const MySelect = ({ options, defaultValue, value, onChange }: Props) => {
  return (
    <select
      className={styles.mySelect}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option style={{ display: "none" }} disabled value="">
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
export default MySelect;
