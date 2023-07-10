import { Layout } from "antd";
import styled from "@emotion/styled";
const { Footer } = Layout;

const StyledFooter = styled(Footer)`
  text-align: center;
`;

export default function BaseFooter() {
  return <StyledFooter>HR Portal ©2023 Used for Pre-test</StyledFooter>;
}
