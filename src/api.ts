export interface Project {
  name: string;
  users: number;
  dashboards: number;
  category: string;
}

let MOCK_PROJECT_DATA = [
  { name: "Project A", users: 4, dashboards: 3, category: "D" },
  { name: "Project B", users: 2, dashboards: 4, category: "C" },
  { name: "Project C", users: 1, dashboards: 2, category: "F" },
  { name: "Project D", users: 3, dashboards: 2, category: "D" },
];

export async function fetchProjects() {
  return new Promise<Project[]>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PROJECT_DATA);
    }, 1000);
  });
}

export async function deleteProject(projectName: string) {
  return new Promise<Project[]>((resolve) => {
    setTimeout(() => {
      MOCK_PROJECT_DATA = MOCK_PROJECT_DATA.filter(
        ({ name }) => projectName !== name
      );
      resolve(MOCK_PROJECT_DATA);
    }, 1000);
  });
}
