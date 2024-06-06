import Highlights from "../../components/Highlights";
import SongsCards from "../../components/SongsCards";

const Dashboard = () => {
  return (
    <div className="flex w-5/6 flex-1 flex-col gap-8 overflow-hidden">
      <Highlights />
      <SongsCards title="Genres" type="genre" />
      <SongsCards title="Artists" type="artist" />
    </div>
  );
};
export default Dashboard;
