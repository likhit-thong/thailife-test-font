"use client";
import {
  Card,
  Col,
  Form,
  Row,
  Input,
  Radio,
  DatePicker,
  Button,
  Space,
  message,
} from "antd";
import styled from "@emotion/styled";
import Selection from "../../shared/select-common";
import { StyleSpace } from "../../shared/styled-common";
import { dateFormatDMY, useDayJs } from "@/utils/date-utils";
import { useEffect, useState } from "react";
import StartEndDate from "./start-end-date";
import { useRouter } from "next/navigation";
import ApiService from "@/services/api";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalEmpMaster } from "@/redux/features/employee-slice";
import { setEditModal } from "@/redux/features/editmodal-slice";
import { setMenuIndex } from "@/redux/features/setting-slice";
const dayjs = useDayJs();

const StyledCard = styled(Card)``;
const StyledRequired = styled("span")`
  font-weight: 600;
  color: red;
`;
const InputTitle = styled("span")`
  font-weight: 800;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

const StyledDivAction = styled("div")`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const initailEmpInfo = {
  empType: "FULLTIME",
  empGender: "",
  empFullName: "",
  empThaiId: "",
  empBirthDate: "",
  empCurrentAddress: "",
  empDomicileAddress: "",
  empMobile: "",
  empEmail: "",
  empStatus: "ACTIVE",
  empStatusDesc: "",
  empActionStatus: "NEW",
  empDivision: "",
  empPosition: "",
  empStartDate: "",
  empEndDate: "",
};

export default function FormAddEmployee({ empUpdated }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isOpenUpdated = useSelector(
    (state) => state.editmodalReducer.values.open
  );
  const { globalEmpMaster } = useSelector(
    (state) => state.employeeReducer.values
  );
  const [empInfo, setEmpInfo] = useState({
    ...initailEmpInfo,
  });
  const [status, setStatus] = useState("");
  const [empMaster, setEmpMaster] = useState({
    listDepartment: [],
    listPosition: [],
  });
  const [statusAction, setStatueAction] = useState(
    empUpdated ? "update" : "add"
  );

  useEffect(() => {
    callEmpMaster();
  }, []);

  useEffect(() => {
    if (statusAction === "add") {
      dispatch(setMenuIndex(["2"]));
    }
  }, [statusAction]);

  /** pass data to form when update. */
  useEffect(() => {
    if (isOpenUpdated) {
      initailForm();
    }
  }, [isOpenUpdated]);

  const initailForm = () => {
    if (empUpdated) {
      setEmpInfo({
        empId: empUpdated.emp_id,
        empType: empUpdated.emp_type,
        empGender: empUpdated.emp_gender,
        empFullName: empUpdated.emp_fullname,
        empThaiId: empUpdated.emp_thaiid,
        empBirthDate: empUpdated.emp_birthdate,
        empCurrentAddress: empUpdated.emp_current_address,
        empDomicileAddress: empUpdated.emp_domicile_address,
        empMobile: empUpdated.emp_mobile,
        empEmail: empUpdated.emp_email,
        empDivision: empUpdated.emp_department_id,
        empPosition: empUpdated.emp_position_id,
        empStartDate: empUpdated.emp_startdate,
        empEndDate: empUpdated.emp_enddate,
        empStatus: empUpdated.emp_status,
        empStatusDesc: empUpdated.emp_status_desc || "",
      });
    }
  };

  const callEmpMaster = async () => {
    try {
      let empMaster = await ApiService.callGetEmpMater();
      if (empMaster) {
        dispatch(setGlobalEmpMaster(empMaster));
        setEmpMaster(empMaster);
      }
      initailForm();
    } catch (e) {}
  };

  const handleInput = (key = "", value) => {
    /** Validate Here. */
    if (key === "empThaiId" || key === "empMobile") {
      // Remove any non-digit characters
      value = value.replace(/\D/g, "");
      value = key === "empThaiId" ? value.slice(0, 13) : value.slice(0, 10);
    }

    if (key in empInfo) {
      if (key === "empType") {
        setEmpInfo({
          ...empInfo,
          [key]: value,
          empStartDate: "",
          empEndDate: "",
        });
      } else {
        let objPosition;
        if (key === "empPosition") {
          objPosition = empMaster.listPosition.find(
            (pos) => pos.emp_position_id === value
          );
          setEmpInfo({
            ...empInfo,
            [key]: value,
            empDivision: objPosition
              ? objPosition.emp_department_id
              : empInfo.empDivision,
          });
        } else {
          setEmpInfo({
            ...empInfo,
            [key]: value,
          });
        }
      }
    }
  };

  const handleDateTime = (key, strDate, date) => {
    console.log("Date: ", key, strDate, date);
    handleInput(key, strDate);
  };

  const handleStartEndDate = (value, dateString) => {
    //console.log("Selected Time: ", value);
    //console.log("Formatted Selected Time: ", dateString);
    setEmpInfo({
      ...empInfo,
      empStartDate: dateString[0],
      empEndDate: dateString[1],
    });
  };

  const validateEmpRequest = () => {
    for (const key in empInfo) {
      if (empInfo[key] === null || empInfo[key] === "") {
        if (key === "empEndDate" && empInfo.empType === "FULLTIME") {
          return true;
        }
        if (key === "empStatusDesc" && empInfo.empStatus !== "INACTIVE") {
          return true;
        }
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      console.log("Action : ", statusAction);
      console.log("EmpRequest : ", empInfo);
      setStatus("submit");

      /** Validate no input */
      if (!validateEmpRequest(empInfo)) {
        return;
      }
      /** Validate spacial format. */
      if (empInfo.empMobile.length !== 10 || empInfo.empThaiId.length !== 13) {
        return;
      }

      if (statusAction === "update") {
        empInfo.empActionStatus = "UPDATED";
        empInfo.empUpdatedBy = "Admin";
        empInfo.empStatusDesc =
          empInfo.empStatus === "ACTIVE" ? "" : empInfo.empStatusDesc;

        let rowsAffected = await ApiService.callUpdateEmployee(empInfo);
        if (rowsAffected > 0) {
          setStatus("");
          message.success("อัพเดตข้อมูลพนักงานเรียบร้อย");
        }
      } else if (statusAction === "add") {
        empInfo.empCreateBy = "Admin";
        let rowsAffected = await ApiService.callSaveEmployee(empInfo);
        if (rowsAffected > 0) {
          //setEmpInfo({ ...initailEmpInfo });
          setStatus("");
          message.success("เพิ่มข้อมูลพนักงานเรียบร้อย");
        }
      }
    } catch (e) {
      console.error(e);
      setStatus("");
      message.error("ขออภัยเกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง");
    }
  };

  const handleCancel = () => {
    if (statusAction === "update") {
      dispatch(setEditModal({ open: false }));
      return;
    }
    setEmpInfo({ ...initailEmpInfo });
    setStatus("");
    //router.push("/dashboard");
  };

  let listDepartment = [];
  let listPosition = [];
  if (empMaster.listDepartment.length) {
    listDepartment = empMaster.listDepartment.map((dep) => ({
      value: dep.emp_department_id,
      label: dep.emp_department_name,
    }));
  }

  if (empMaster.listPosition.length) {
    if (empInfo.empDivision) {
      listPosition = empMaster.listPosition
        .filter((dep) => dep.emp_department_id === empInfo.empDivision)
        .map((dep) => ({
          value: dep.emp_position_id,
          label: dep.emp_position_name,
        }));
    } else {
      listPosition = empMaster.listPosition.map((dep) => ({
        value: dep.emp_position_id,
        label: dep.emp_position_name,
      }));
    }
  }

  return (
    <Row gutter={24}>
      <Col span={24}>
        <StyleSpace direction="vertical" size={"middle"}>
          <StyledCard title="ข้อมูลส่วนตัว">
            <Form layout="vertical">
              {statusAction === "add" && (
                <Row gutter={16}>
                  <Col span={16}>
                    <Form.Item
                      label={
                        <InputTitle>
                          ประเภท<StyledRequired>*</StyledRequired>
                        </InputTitle>
                      }
                    >
                      <Radio.Group
                        defaultValue={empInfo.empType}
                        value={empInfo.empType}
                        buttonStyle="solid"
                        onChange={(e) => handleInput("empType", e.target.value)}
                      >
                        <Radio.Button value="FULLTIME">งานประจำ</Radio.Button>
                        <Radio.Button value="CONTRACT">Contract</Radio.Button>
                        {/* <Radio.Button value="PART">พาร์ทไทม์</Radio.Button> */}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              )}
              {statusAction === "update" && (
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label={<InputTitle>รหัสพนักงาน</InputTitle>}>
                      <Input
                        placeholder=""
                        disabled={true}
                        value={empInfo.empId}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={<InputTitle>ประเภท</InputTitle>}>
                      <Radio.Group
                        defaultValue={empInfo.empType}
                        value={empInfo.empType}
                        buttonStyle="solid"
                        onChange={(e) => handleInput("empType", e.target.value)}
                      >
                        <Radio.Button value="FULLTIME">งานประจำ</Radio.Button>
                        <Radio.Button value="CONTRACT">Contract</Radio.Button>
                        {/* <Radio.Button value="PART">พาร์ทไทม์</Radio.Button> */}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              )}
              {statusAction === "update" && (
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label={<InputTitle>สถานนะ</InputTitle>}>
                      <Radio.Group
                        defaultValue={empInfo.empStatus}
                        value={empInfo.empStatus}
                        buttonStyle="solid"
                        onChange={(e) =>
                          handleInput("empStatus", e.target.value)
                        }
                      >
                        <Radio.Button value="ACTIVE">ACTIVE</Radio.Button>
                        <Radio.Button value="INACTIVE">INACTIVE</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              )}
              {empInfo.empStatus === "INACTIVE" &&
                statusAction === "update" && (
                  <Row gutter={24}>
                    <Col span={16}>
                      <Form.Item
                        label={
                          <InputTitle>
                            กรุณาใส่รายละเอียด
                            <StyledRequired>*</StyledRequired>
                          </InputTitle>
                        }
                      >
                        <TextArea
                          rows={2}
                          showCount
                          maxLength={100}
                          value={empInfo.empStatusDesc}
                          onChange={(e) =>
                            handleInput("empStatusDesc", e.target.value)
                          }
                          status={
                            !empInfo.empStatusDesc && status === "submit"
                              ? "error"
                              : ""
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              <Row gutter={24}>
                <Col span={4}>
                  <Form.Item
                    label={
                      <InputTitle>
                        เพศ<StyledRequired>*</StyledRequired>
                      </InputTitle>
                    }
                  >
                    <Selection
                      title={"เลือก"}
                      onChange={(value) => handleInput("empGender", value)}
                      elmValue={empInfo.empGender}
                      isRequired={!empInfo.empGender && status === "submit"}
                      contents={[
                        {
                          value: "MALE",
                          label: "ชาย",
                        },
                        {
                          value: "FEMALE",
                          label: "หญิง",
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={
                      <InputTitle>
                        ชื่อ-นามสกุล<StyledRequired>*</StyledRequired>
                      </InputTitle>
                    }
                  >
                    <Input
                      placeholder=""
                      status={
                        !empInfo.empFullName && status === "submit"
                          ? "error"
                          : ""
                      }
                      value={empInfo.empFullName}
                      onChange={(e) =>
                        handleInput("empFullName", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={
                      <InputTitle>
                        หมายเลขบัตรประชาชน (13 หลัก)
                        <StyledRequired>*</StyledRequired>
                      </InputTitle>
                    }
                  >
                    <Input
                      placeholder=""
                      showCount
                      maxLength={13}
                      status={
                        (!empInfo.empThaiId && status === "submit") ||
                        (status === "submit" && empInfo.empThaiId.length !== 13)
                          ? "error"
                          : ""
                      }
                      value={empInfo.empThaiId}
                      onChange={(e) => handleInput("empThaiId", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label={
                      <InputTitle>
                        วัน/เดือน/ปี เกิด<StyledRequired>*</StyledRequired>
                      </InputTitle>
                    }
                  >
                    <StyledDatePicker
                      placeholder="วัน / เดือน / ปี เกิด"
                      status={
                        !empInfo.empBirthDate && status === "submit"
                          ? "error"
                          : ""
                      }
                      value={
                        empInfo.empBirthDate
                          ? dayjs(empInfo.empBirthDate, dateFormatDMY)
                          : null
                      }
                      format={dateFormatDMY}
                      onChange={(date, dateString) =>
                        handleDateTime("empBirthDate", dateString, date)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}></Col>
              </Row>
            </Form>
          </StyledCard>

          <StyledCard title="ข้อมูลการติดต่อ">
            <Form layout="vertical">
              <Row gutter={24}>
                <Col span={16}>
                  <Form.Item
                    label={
                      <InputTitle>
                        ที่อยู่ปัจจุบัน<StyledRequired>*</StyledRequired>
                      </InputTitle>
                    }
                  >
                    <TextArea
                      rows={4}
                      showCount
                      value={empInfo.empCurrentAddress}
                      maxLength={300}
                      onChange={(e) =>
                        handleInput("empCurrentAddress", e.target.value)
                      }
                      status={
                        !empInfo.empCurrentAddress && status === "submit"
                          ? "error"
                          : ""
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={16}>
                  <Form.Item
                    label={
                      <InputTitle>
                        ที่อยู่ตามภูมิลำเนา<StyledRequired>*</StyledRequired>
                      </InputTitle>
                    }
                  >
                    <TextArea
                      rows={4}
                      showCount
                      maxLength={300}
                      value={empInfo.empDomicileAddress}
                      onChange={(e) =>
                        handleInput("empDomicileAddress", e.target.value)
                      }
                      status={
                        !empInfo.empDomicileAddress && status === "submit"
                          ? "error"
                          : ""
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label={
                      <InputTitle>
                        เบอร์โทรศัพท์<StyledRequired>*</StyledRequired>
                      </InputTitle>
                    }
                  >
                    <Input
                      placeholder=""
                      maxLength={10}
                      showCount
                      value={empInfo.empMobile}
                      status={
                        (!empInfo.empMobile && status === "submit") ||
                        (status === "submit" && empInfo.empMobile.length !== 10)
                          ? "error"
                          : ""
                      }
                      onChange={(e) => handleInput("empMobile", e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={
                      <InputTitle>
                        อีเมล
                        <StyledRequired>*</StyledRequired>
                      </InputTitle>
                    }
                  >
                    <Input
                      placeholder=""
                      value={empInfo.empEmail}
                      status={
                        !empInfo.empEmail && status === "submit" ? "error" : ""
                      }
                      onChange={(e) => handleInput("empEmail", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </StyledCard>

          <StyledCard title="ข้อมูลการทำงาน">
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label={
                      <InputTitle>
                        สังกัดส่วนงาน<StyledRequired>*</StyledRequired>
                      </InputTitle>
                    }
                  >
                    <Selection
                      title={"เลือก"}
                      onChange={(value) => handleInput("empDivision", value)}
                      elmValue={empInfo.empDivision}
                      isRequired={!empInfo.empDivision && status === "submit"}
                      contents={listDepartment}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={
                      <InputTitle>
                        ตำแหน่ง<StyledRequired>*</StyledRequired>
                      </InputTitle>
                    }
                  >
                    <Selection
                      title={"เลือก"}
                      onChange={(value) => handleInput("empPosition", value)}
                      elmValue={empInfo.empPosition}
                      isRequired={!empInfo.empPosition && status === "submit"}
                      contents={listPosition}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                {empInfo.empType === "FULLTIME" ? (
                  <>
                    <Col span={8}>
                      <Form.Item
                        label={<InputTitle>วันที่เริ่มงาน</InputTitle>}
                      >
                        <StyledDatePicker
                          format={dateFormatDMY}
                          value={
                            empInfo.empStartDate
                              ? dayjs(empInfo.empStartDate, dateFormatDMY)
                              : null
                          }
                          placeholder="เลือก"
                          status={
                            !empInfo.empStartDate && status === "submit"
                              ? "error"
                              : ""
                          }
                          onChange={(date, dateString) =>
                            handleDateTime("empStartDate", dateString, date)
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}></Col>
                  </>
                ) : (
                  <>
                    <Col span={8}>
                      <Form.Item
                        label={
                          <InputTitle>
                            วันเริ่ม/สิ้นสุด การทำงาน
                            <StyledRequired>*</StyledRequired>
                          </InputTitle>
                        }
                      >
                        <StartEndDate
                          elmValue={[
                            empInfo.empStartDate
                              ? dayjs(empInfo.empStartDate, dateFormatDMY)
                              : null,
                            empInfo.empEndDate
                              ? dayjs(empInfo.empEndDate, dateFormatDMY)
                              : null,
                          ]}
                          onChange={handleStartEndDate}
                          isRequired={
                            (!empInfo.empStartDate || !empInfo.empEndDate) &&
                            status === "submit"
                          }
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Row>
            </Form>
          </StyledCard>

          <StyledCard>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col span={24}>
                  <StyledDivAction>
                    <Space wrap>
                      <Button type="primary" onClick={handleSubmit}>
                        บันทึกข้อมูล
                      </Button>
                      <Button onClick={handleCancel}>
                        {statusAction === "add" ? "ยกเลิก" : "ปิด"}
                      </Button>
                    </Space>
                  </StyledDivAction>
                </Col>
              </Row>
            </Form>
          </StyledCard>
        </StyleSpace>
      </Col>
    </Row>
  );
}
