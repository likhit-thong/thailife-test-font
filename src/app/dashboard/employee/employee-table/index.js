import { Card, Col, Row } from "antd";
import styled from "@emotion/styled";
import EmpTable from "./table";
import EmpList from "./emp-list";

const StyledCard = styled(Card)``;

export default function EmployeeTable() {
  return (
    <Row gutter={24}>
      <Col span={16}>
        <StyledCard>
          <EmpList />
        </StyledCard>
      </Col>
    </Row>
  );
}
