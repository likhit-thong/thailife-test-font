import { Button, Modal } from "antd";
import FormAddEmployee from "../../add-employee/form-add-employee";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { setEditModal } from "@/redux/features/editmodal-slice";

const StyledModal = styled(Modal)`
  margin-top: 18px;
  padding-top: 16px;
`;

export default function EmpEditModal({}) {
  const dispatch = useDispatch();
  const { open, emp } = useSelector((state) => state.editmodalReducer.values);
  console.log("Emp ---> ", emp);
  const handleCancle = () => {
    dispatch(setEditModal({ open: false }));
  };
  return (
    <>
      <StyledModal
        title="แก้ไขข้อมูลพนักงาน"
        centered
        open={open}
        //onOk={() => setOpen(false)}
        onCancel={handleCancle}
        footer={false}
        width={1000}
      >
        <FormAddEmployee empUpdated={emp} />
      </StyledModal>
    </>
  );
}
