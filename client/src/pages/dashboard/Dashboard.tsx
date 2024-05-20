import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Highlights from "../../components/Highlights";
import Songs from "../../components/Songs";

const Dashboard = () => {

  useEffect(() => {
  });

  return (
    <div className="flex max-w-full">
      <Navbar />
      <div className="overflow-hidden">
        <Highlights />
        {/* <Songs /> */}
      </div>
    </div>
  );
};
export default Dashboard;
