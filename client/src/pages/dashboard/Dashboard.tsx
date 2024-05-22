import Navbar from "../../components/Navbar";
import Highlights from "../../components/Highlights";
import SongsCards from "../../components/SongsCards";

const Dashboard = () => {
  return (
    <div className="flex max-w-full">
      <Navbar />
      <div className="flex w-5/6 flex-col gap-8 overflow-hidden">
        <Highlights />
        <SongsCards title="Genres" type="genre" />
        <SongsCards title="Artists" type="artist" />
      </div>
    </div>
  );
};
export default Dashboard;
