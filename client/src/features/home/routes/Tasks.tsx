import { Layout } from "../components/Layout";
import { TasksList } from "../components/TasksList";

export const Tasks = () => {
  const elements = [
    {
      status: "BACKLOG",
      title:
        "You can't compress the program without quantifying the open-source SSD pixel!",
      proj: "CobyLake 2.0",
      priority: "URGENT",
      assignee: "Sachinthi Weerasinha",
      ddl: "2024/06/20",
    },
    {
      status: "BACKLOG",
      title: "We need to bypass the neural TCP card!",
      proj: "IronWolf (Pre Alpha)",
      priority: "LOW",
      assignee: "Bhagya Ranasinghe",
      ddl: "2024/06/21",
    },
    {
      status: "BACKLOG",
      title:
        "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      proj: "ZestaControl",
      priority: "LOW",
      assignee: "Nisanya Pathirana",
      ddl: "2024/10/22",
    },
    {
      status: "BACKLOG",
      title:
        "I'll parse the wireless SSL protocol, that should driver the API panel!",
      proj: "EXPA Global Info System",
      priority: "MEDIUM",
      assignee: "Lishani Sooriyampola",
      ddl: "2024/07/21",
    },
    {
      status: "BACKLOG",
      title:
        "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
      proj: "Windows 11",
      priority: "HIGH",
      assignee: "Aakkash Gnanaratnem",
      ddl: "2024/06/30",
    },
    {
      status: "BACKLOG",
      title:
        "You can't compress the program without quantifying the open-source SSD pixel!",
      proj: "CobyLake 2.0",
      priority: "URGENT",
      assignee: "Sachinthi Weerasinha",
      ddl: "2024/06/20",
    },
    {
      status: "BACKLOG",
      title: "We need to bypass the neural TCP card!",
      proj: "IronWolf (Pre Alpha)",
      priority: "LOW",
      assignee: "Bhagya Ranasinghe",
      ddl: "2024/06/21",
    },
    {
      status: "BACKLOG",
      title:
        "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      proj: "ZestaControl",
      priority: "LOW",
      assignee: "Nisanya Pathirana",
      ddl: "2024/10/22",
    },
    {
      status: "BACKLOG",
      title:
        "I'll parse the wireless SSL protocol, that should driver the API panel!",
      proj: "EXPA Global Info System",
      priority: "MEDIUM",
      assignee: "Lishani Sooriyampola",
      ddl: "2024/07/21",
    },
    {
      status: "BACKLOG",
      title:
        "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
      proj: "Windows 11",
      priority: "HIGH",
      assignee: "Aakkash Gnanaratnem",
      ddl: "2024/06/30",
    },
  ];

  return (
    <Layout title="Tasks">
      <TasksList elements={elements} />
    </Layout>
  );
};
