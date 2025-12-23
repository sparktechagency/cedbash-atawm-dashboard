import IncomeOverview from "../../Components/Dashboard/Overview/IncomeOverview";
import OverviewCard from "../../Components/Dashboard/Overview/OverviewCards";

const AdminDashboard = () => {
  return (
    <div>
      <>
        <div className="min-h-[88vh] ">
          <OverviewCard />
          <IncomeOverview />
        </div>
        <div>{/* <RecentUser /> */}</div>
      </>
    </div>
  );
};

export default AdminDashboard;
