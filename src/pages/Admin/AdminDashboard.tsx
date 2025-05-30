import IncomeOverview from "../../Components/Dashboard/Overview/IncomeOverview";
import OverviewCard from "../../Components/Dashboard/Overview/OverviewCards";
import RecentUser from "../../Components/Dashboard/Overview/RecentUser";

const AdminDashboard = () => {
  return (
    <div>
      <>
        <div className="">
          <OverviewCard />
          <IncomeOverview />
        </div>
        <div>
          <RecentUser />
        </div>
      </>
    </div>
  );
};

export default AdminDashboard;
