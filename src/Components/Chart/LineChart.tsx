import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts";

const data = [
  {
    name: "Jan",
    users: 300,
  },
  {
    name: "Feb",
    users: 900,
  },
  {
    name: "Mar",
    users: 500,
  },
  {
    name: "Apr",
    users: 800,
  },
  {
    name: "May",
    users: 1200,
  },
  {
    name: "Jun",
    users: 1000,
  },
  {
    name: "Jul",
    users: 600,
  },
  {
    name: "Aug",
    users: 400,
  },
  {
    name: "Sep",
    users: 1100,
  },
  {
    name: "Oct",
    users: 800,
  },
  {
    name: "Nov",
    users: 600,
  },
  {
    name: "Dec",
    users: 1200,
  },
];
const Admin_Line_Chart = () => {
  return (
    <div className="w-full h-96 py-5 ">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#00000040" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, "max"]} />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="users"
            stroke="#FF9815" // Teal for service users
            strokeWidth={4}
            dot={{ r: 0, stroke: "#FF9815", strokeWidth: 0, fill: "#00000040" }} // Teal dots with white fill
            activeDot={{ r: 10 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Admin_Line_Chart;
