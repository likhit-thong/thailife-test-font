import { Avatar, List, Tag } from "antd";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import EmpEditModal from "./emp-edit-modal";
import { useState } from "react";
import { setEditModal } from "@/redux/features/editmodal-slice";

const StyledDivInfo = styled("div")`
  display: flex;
  flex-direction: column;
`;
const StyledFieldInfo = styled("div")`
  font-weight: 600;
`;

const StyledAvatar = styled(Avatar)`
  width: 84px;
  height: 84px;
`;

const StyleTitle = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-right: 12px;
`;

const StyleEdit = styled(EditOutlined)`
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
`;

export default function EmpList() {
  const dispatch = useDispatch();
  const { searchListEmp } = useSelector(
    (state) => state.employeeReducer.values
  );
  const [isEdit, setIsEdit] = useState(false);

  const handleModal = (isOpen, employee) => {
    dispatch(setEditModal({ open: isOpen, emp: employee }));
    setIsEdit(isOpen);
  };

  const handleCloseModal = () => {
    setIsEdit(false);
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={searchListEmp || []}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <StyledAvatar
                  size={"large"}
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={
                <StyleTitle>
                  {item.emp_fullname}
                  <StyleEdit onClick={() => handleModal(true, item)} />
                </StyleTitle>
              }
              description={
                <StyledDivInfo>
                  <StyledFieldInfo>
                    สังกัดส่วนงาน: {item.emp_department_name}
                  </StyledFieldInfo>
                  <StyledFieldInfo>
                    ตำแหน่ง: {item.emp_position_name}
                  </StyledFieldInfo>
                  {/* <StyledFieldInfo>ข้อมูลการติดต่อ:</StyledFieldInfo> */}
                  <StyledFieldInfo>
                    Tel: {item.emp_mobile}, Email: {item.emp_email}
                  </StyledFieldInfo>
                  <StyledFieldInfo>
                    <Tag
                      color={item.emp_status === "ACTIVE" ? "green" : "volcano"}
                    >
                      {item.emp_status}
                    </Tag>
                  </StyledFieldInfo>
                </StyledDivInfo>
              }
            />
          </List.Item>
        )}
      />
      {isEdit && <EmpEditModal />}
    </>
  );
}
