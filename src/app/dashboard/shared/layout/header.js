import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import styled from "@emotion/styled";
const { Header } = Layout;

const StyledHeader = styled(Header)`
  padding: 0;
  background: ${(props) => props.bg};
`;

const StyledButton = styled(Button)`
  font-size: 16px;
  width: 64px;
  height: 64px;
`;

export default function BaseHeader({ collapsed, onCallapsed }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <StyledHeader bg={colorBgContainer}>
      <StyledButton
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => onCallapsed(!collapsed)}
      />
    </StyledHeader>
  );
}
