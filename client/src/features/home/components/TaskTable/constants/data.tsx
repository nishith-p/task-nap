import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  DoubleArrowUpIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const taskStatuses = [
  {
    value: "BACKLOG",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "SELECTED",
    label: "Selected",
    icon: CircleIcon,
  },
  {
    value: "INPROGRESS",
    label: "In-progress",
    icon: StopwatchIcon,
  },
  {
    value: "DONE",
    label: "Done",
    icon: CheckCircledIcon,
  },
];

export const taskCategories = [
  {
    value: "BUG",
    label: "Bug",
  },
  {
    value: "FR",
    label: "Feature",
  },
  {
    value: "CR",
    label: "Change",
  },
];

export const taskPriorities = [
  {
    label: "Low",
    value: "LOW",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "MEDIUM",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "HIGH",
    icon: ArrowUpIcon,
  },
  {
    label: "Critical",
    value: "CRITICAL",
    icon: DoubleArrowUpIcon,
  },
];
