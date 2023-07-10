import { Card, Col, Form, Row, Input, Radio } from "antd";
import styled from "@emotion/styled";
import Selection from "../../shared/select-common";
import { useEffect, useState } from "react";
import ApiService from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import { setSearchListEmp } from "@/redux/features/employee-slice";
import { setMenuIndex } from "@/redux/features/setting-slice";

const { Search } = Input;

const StyledCard = styled(Card)``;
const InputTitle = styled("span")`
  font-weight: 600;
`;

const TxtPlaceholder = {
  empId: "พิมพ์ รหัสพนักงาน (Ex. EMP0110001)",
  thaiId: "พิมพ์ เลขบัตรประจำตัวประชาชน",
  name: "พิมพ์ ชื่อ-นามสกุล",
};

export default function Searchable() {
  const dispatch = useDispatch();

  const [optSearch, setOptSearch] = useState("empId");
  const [placeholder, setPlaceholder] = useState(TxtPlaceholder[optSearch]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(setMenuIndex(["1"]));
  }, []);

  useEffect(() => {
    if (!query) {
      dispatch(setSearchListEmp([]));
    }
  }, [query]);

  const handleOptionSearch = (value) => {
    setPlaceholder(TxtPlaceholder[value]);
    setOptSearch(value);
    setQuery("");
  };

  const handleChange = (value) => {
    setQuery(value);
  };

  const handleSearch = async (value) => {
    try {
      if (!query) return;
      let empList = await ApiService.callSearchEmployee({
        qr: optSearch === "empId" ? query.toUpperCase() : query,
        opt: optSearch,
      });
      console.log("search ---> ", empList);
      dispatch(setSearchListEmp(empList));
    } catch (e) {}
  };

  return (
    <Row gutter={24}>
      <Col span={20}>
        <StyledCard title="ค้นหาข้อมูลพนักงาน">
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={18}>
                <Form.Item label={<InputTitle>ค้นหาโดย</InputTitle>}>
                  <Radio.Group
                    defaultValue={optSearch}
                    buttonStyle="solid"
                    onChange={(e) => handleOptionSearch(e.target.value)}
                  >
                    <Radio.Button value="empId">รหัสพนักงาน</Radio.Button>
                    <Radio.Button value="thaiId">เลขบัตรประชาชน</Radio.Button>
                    <Radio.Button value="name">ชื่อ-นามสกุล</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={18}>
                <Form.Item>
                  <Search
                    placeholder={placeholder}
                    value={query}
                    allowClear
                    enterButton="ค้นหา"
                    size="large"
                    onChange={(e) => handleChange(e.target.value)}
                    onSearch={handleSearch}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </StyledCard>
      </Col>
    </Row>
  );
}
