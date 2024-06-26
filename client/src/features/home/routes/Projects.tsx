import { BaseLayout } from "@/features/shared/BaseLayout";
import { Layout } from "../components/Layout";
import { ProjectsList } from "../components/ProjectsList";

export const Projects = () => {
  const elements = [
    { id: 1, title: "CobyLake 2.0", owner: "Sachinthi Weerasinha" },
    { id: 2, title: "IronWolf (Pre Alpha)", owner: "Bhagya Ranasinghe" },
    { id: 3, title: "ZestaControl", owner: "Nisanya Pathirana" },
    { id: 4, title: "EXPA Global Info System", owner: "Lishani Sooriyampola" },
    { id: 5, title: "Windows 11", owner: "Aakkash Gnanaratnem" },
  ];

  return (
    <BaseLayout>
      <Layout title="Projects">
        <ProjectsList elements={elements} />
      </Layout>
    </BaseLayout>
  );
};
