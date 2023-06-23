import { useState } from "react";
import { Row, Col, Input, Grid, Typography, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";

import { ProjectCard } from "./ProjectCard";
import { Project, fetchProjects } from "../api";

import styles from "./ProjectListing.module.css";

const { useBreakpoint } = Grid;

export function ProjectListing() {
  const { md } = useBreakpoint();
  const [keyword, setKeyword] = useState("");
  const { data: projects, status } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => await fetchProjects(),
    select: (projects: Project[]) => {
      return projects.filter((project) => {
        if (keyword.length === 0) return true;
        return project.name.includes(keyword);
      });
    },
  });

  return (
    <div className={styles["project-listing"]}>
      {md ? (
        status === "success" && (
          <Row>
            <Col span={5} offset={19}>
              <Input
                className={styles["search-input"]}
                prefix={<SearchOutlined />}
                placeholder="Search for a keyword"
                onChange={(e) => setKeyword(e.target.value)}
              ></Input>
            </Col>
          </Row>
        )
      ) : (
        <div className={styles["mobile-projects-header"]}>
          <Typography>
            <Typography.Title level={1}>Hello Sarah!</Typography.Title>
            <Typography.Paragraph style={{ color: "#223273" }}>
              Here you can find all of your projects and dashboards.
            </Typography.Paragraph>
          </Typography>
          <Input
            className={styles["mobile-search-input"]}
            suffix={<SearchOutlined />}
            placeholder="Search"
            bordered={false}
            onChange={(e) => setKeyword(e.target.value)}
          ></Input>
        </div>
      )}
      {!md && <Typography.Title level={5}>My Projects:</Typography.Title>}
      {status === "success" && (
        <div className={styles["projects"]}>
          {projects?.map((project) => {
            return <ProjectCard project={project} key={project.name} />;
          })}
        </div>
      )}
      {status === "loading" && (
        <div className={styles["loading"]}>
          <Spin />
        </div>
      )}
    </div>
  );
}
