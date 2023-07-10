import {
  MenuFoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  PoweroffOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar } from "antd";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMenuIndex } from "@/redux/features/setting-slice";
const { Sider } = Layout;

const StyledSider = styled(Sider)``;

const StyledBanner = styled("div")`
  display: flex;
  justify-content: ${(props) => (props.collapsed ? "center" : "space-around")};
  align-items: center;
  height: 68px;
  width: 100%;
  color: #ffffff;
`;

const StyledAppName = styled("span")`
  font-size: 20px;
  font-weight: 400;
`;

const StyledAppVersion = styled("span")`
  font-size: 14px;
  font-weight: 400;
`;

export default function BaseSider({ collapsed }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const menuIndex = useSelector(
    (state) => state.settingReducer.values.menuIndex
  );

  //const [menuIndex, setMenuIndex] = useState(["1"]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     let _menuIndex = localStorage.getItem("E_MENU_INDEX");
  //     setMenuIndex(_menuIndex ? JSON.parse(_menuIndex) : menuIndex);
  //   }
  // }, []);

  // Handle Basic Route.
  const handleSelect = ({ item, key }) => {
    //setMenuIndex([key]);
    dispatch(setMenuIndex([key]));
    switch (key) {
      case "1":
        router.push("/dashboard");
        break;
      case "2":
        router.push("/dashboard/add-employee");
        break;
    }
  };

  return (
    <StyledSider trigger={null} collapsible collapsed={collapsed}>
      <StyledBanner collapsed={collapsed}>
        {!collapsed && (
          <>
            <StyledAppName>HR Portal</StyledAppName>
            <StyledAppVersion>v0.1</StyledAppVersion>
          </>
        )}
        {collapsed && (
          <StyledAppName>
            <Avatar size="large">HR</Avatar>
          </StyledAppName>
        )}
      </StyledBanner>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={menuIndex}
        selectedKeys={menuIndex}
        onSelect={handleSelect}
        items={[
          {
            key: "1",
            icon: <HomeOutlined />,
            label: "หน้าหลัก",
          },
          {
            key: "2",
            icon: <UserAddOutlined />,
            label: "เพิ่มข้อมูลพนักงาน",
          },
        ]}
      />
    </StyledSider>
  );
}
