import { Meta, StoryObj } from "@storybook/react";
import { getGraphColorPalette } from "lib/utils/color-utils";
import { ContributionsTreemap } from "./contributions-treemap";

type Story = StoryObj<typeof ContributionsTreemap>;

const meta: Meta<typeof ContributionsTreemap> = {
  title: "Components/Graphs/ContributionsTreemap",
  component: ContributionsTreemap,
};

export default meta;

export const Owners: Story = {
  args: {
    data: {
      id: "root",
      children: [
        { id: "hono-js", value: 45 },
        { id: "reduxjs", value: 12 },
        { id: "nodejs", value: 76 },
        { id: "reactjs", value: 89 },
        { id: "angular", value: 33 },
        { id: "babel", value: 52 },
        { id: "expressjs", value: 64 },
        { id: "webpack", value: 22 },
        { id: "eslint", value: 17 },
        { id: "jest", value: 91 },
        { id: "vuejs", value: 41 },
        { id: "nestjs", value: 55 },
        { id: "axios", value: 8 },
        { id: "lodash", value: 37 },
        { id: "moment", value: 67 },
        { id: "storybook", value: 14 },
        { id: "graphql", value: 72 },
        { id: "prisma", value: 5 },
        { id: "mongodb", value: 29 },
        { id: "redis", value: 83 },
      ],
    },
    color: getGraphColorPalette(),
    onDrillDown: () => {},
    onDrillUp: () => {},
    orgId: null,
    projectId: null,
    isLoading: false,
  },
};

export const Repositories: Story = {
  args: {
    data: {
      id: "root",
      children: [
        { id: "kubernetes", value: 42 },
        { id: "minikube", value: 15 },
        { id: "kops", value: 72 },
        { id: "helm", value: 91 },
        { id: "kubectl", value: 33 },
        { id: "kube-proxy", value: 58 },
        { id: "kubelet", value: 22 },
        { id: "kube-scheduler", value: 67 },
        { id: "kube-controller-manager", value: 8 },
        { id: "etcd", value: 79 },
        { id: "kube-dns", value: 11 },
        { id: "coredns", value: 25 },
        { id: "flannel", value: 63 },
        { id: "calico", value: 41 },
        { id: "istio", value: 37 },
        { id: "prometheus", value: 54 },
        { id: "grafana", value: 18 },
        { id: "cni", value: 88 },
        { id: "kubernetes-dashboard", value: 9 },
        { id: "dashboard", value: 75 },
      ],
    },
    color: getGraphColorPalette(),
    onDrillDown: () => {},
    onDrillUp: () => {},
    orgId: "kubernetes",
    projectId: null,
    isLoading: false,
  },
};

export const Contributors: Story = {
  args: {
    data: {
      id: "root",
      children: [
        { id: "nickytonline", value: 10 },
        { id: "brandonroberts", value: 97 },
        { id: "BekahHW", value: 30 },
        { id: "isabensusan", value: 41 },
        { id: "bdougie", value: 52 },
        { id: "jpmcb", value: 63 },
        { id: "OgDev-01", value: 34 },
      ],
    },
    color: getGraphColorPalette(),
    onDrillDown: () => {},
    onDrillUp: () => {},
    orgId: "open-sauced",
    projectId: "app",
    isLoading: false,
  },
};

export const Loading: Story = {
  args: { isLoading: true },
};
