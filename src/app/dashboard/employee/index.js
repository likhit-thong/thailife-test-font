"use client";
import { Space } from "antd";
import styled from "@emotion/styled";
import Searchable from "./search";
import EmployeeTable from "./employee-table";
import { StyleSpace } from "../shared/styled-common";

const StyledDiv = styled("div")``;

export default function Employee() {
  return (
    <StyledDiv>
      <StyleSpace direction="vertical" size={"middle"}>
        <Searchable />
        <EmployeeTable />
      </StyleSpace>
    </StyledDiv>
  );
}
