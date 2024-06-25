import { Layout } from "../components/Layout";
import { ProjectsList } from "../components/ProjectsList";

export const Projects = () => {
  const elements = [
    { title: "CobyLake 2.0", owner: "Sachinthi Weerasinha" },
    { title: "IronWolf (Pre Alpha)", owner: "Bhagya Ranasinghe" },
    { title: "ZestaControl", owner: "Nisanya Pathirana" },
    { title: "EXPA Global Info System", owner: "Lishani Sooriyampola" },
    { title: "Windows 11", owner: "Aakkash Gnanaratnem" },
  ];

  return (
    <Layout title="Projects">
      <ProjectsList elements={elements} />
    </Layout>
  );
};
