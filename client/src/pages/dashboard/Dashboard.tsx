import Navbar from "../../components/Navbar";
import Highlights from "../../components/Highlights";
import SongsCards from "../../components/SongsCards";

const Dashboard = () => {

  return (
    <div className="flex max-w-full">
      <Navbar />
      <div className="overflow-hidden flex flex-col w-5/6 gap-8">
        <Highlights />
        <SongsCards title="Genres" type="genre" />
      </div>
    </div>
  );
};
export default Dashboard;
