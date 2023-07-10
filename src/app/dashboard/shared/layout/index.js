"use client";
import { Layout } from "antd";
import { useState } from "react";
import styled from "@emotion/styled";
import BaseHeader from "./header";
import BaseSider from "./sider";
import BaseContent from "./content";
import BaseFooter from "./footer";

const StyledLayout = styled(Layout)`
  width: 100%;
  height: 100vh;
`;

export default function BaseLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <StyledLayout>
      <BaseSider collapsed={collapsed} />
      <Layout>
        <BaseHeader collapsed={collapsed} onCallapsed={setCollapsed} />
        <BaseContent>{children}</BaseContent>
        <BaseFooter />
      </Layout>
    </StyledLayout>
  );
}
