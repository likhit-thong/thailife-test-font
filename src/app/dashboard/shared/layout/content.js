import { Layout, theme } from "antd";
import styled from "@emotion/styled";
const { Content } = Layout;

const StyledLayoutContent = styled(Layout)`
  display: flex;
  align-items: center;
`;

const StyledContent = styled(Content)`
  width: 92%;
  margin: 12px 12px;
  padding: 6px;
  overflow: auto;
  //background: ${(props) => props.bg};
`;

export default function BaseContent({ children }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <StyledLayoutContent>
      <StyledContent bg={colorBgContainer}>{children}</StyledContent>
    </StyledLayoutContent>
  );
}
