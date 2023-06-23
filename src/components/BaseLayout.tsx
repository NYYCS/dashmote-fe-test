import React from "react";
import { Layout, Button, Badge, Avatar } from "antd";
import { BellOutlined, MenuOutlined } from "@ant-design/icons";

import styles from "./BaseLayout.module.css";

const { Header, Content } = Layout;

interface Props {
  children: React.ReactNode;
}

export const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout className={styles["layout"]}>
      <Header className={styles["header"]}>
        <Button
          className={styles["menu-btn"]}
          icon={<MenuOutlined />}
          type="text"
        ></Button>
        <div className={styles["header-items"]}>
          <Badge dot>
            <BellOutlined style={{ fontSize: "18px" }} />
          </Badge>
          <span className={styles["user-username"]}>Sarah Green</span>
          <Avatar></Avatar>
        </div>
      </Header>
      <Content className={styles["main-container"]}>{children}</Content>
    </Layout>
  );
};
