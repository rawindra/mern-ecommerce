import type { FC } from "react";
import Layout from "../../components/shared/Layout";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  return (
    <Layout>
      <div>Dashboard Page</div>
    </Layout>
  );
};

export default Dashboard;
