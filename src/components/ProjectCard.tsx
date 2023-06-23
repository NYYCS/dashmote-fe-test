import { useMemo } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Row, Col, Avatar, Tag, Button, Modal } from "antd";

import { Project, deleteProject } from "../api";

import styles from "./ProjectCard.module.css";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const queryClient = useQueryClient();
  const category = useMemo(
    () => project.category.toLowerCase(),
    [project.category]
  );
  const mutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.setQueryData<Project[]>(["projects"], (projects) => {
        return projects?.filter((p) => p.name !== project.name);
      });
    },
  });
  function openDeleteModal() {
    Modal.warning({
      title: "Are you sure you want to delete this project?",
      okText: "Delete",
      okType: "danger",
      onOk: () => mutation.mutateAsync(project.name),
      closable: true,
    });
  }

  return (
    <Row className={`${styles["project-card"]} ${styles[`cat-${category}`]}`}>
      <Col xs={4} md={2}>
        <Avatar className={`project-category ${styles[`cat-${category}`]}`}>
          {project.category}
        </Avatar>
      </Col>
      <Col
        xs={20}
        md={8}
        style={{ textAlign: "left", display: "flex", alignItems: "center" }}
      >
        <div className={styles["project-cell"]}>
          <span className={styles["project-name"]}>{project.name}</span>
        </div>
      </Col>
      <Col xs={0} md={6}>
        <div className={styles["project-cell"]}>
          <span
            className={styles["project-users"]}
          >{`${project.users} users`}</span>
        </div>
      </Col>
      <Col xs={0} md={6}>
        <div className={styles["project-cell"]}>
          <Tag color="green">{`${project.dashboards} dashboards`}</Tag>
        </div>
      </Col>
      <Col xs={0} md={2}>
        <Button onClick={() => openDeleteModal()} type="text" danger>
          Delete
        </Button>
      </Col>
    </Row>
  );
}
