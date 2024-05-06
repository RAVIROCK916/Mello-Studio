import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useAlbumStore } from "../../store/album-store";
import Highlights from "../../components/Highlights";

const Dashboard = () => {

  const albumsData = useAlbumStore((state) => state.fetchAlbums);
  const fetchAlbums = async () => {
    const data = await albumsData();
    console.log(data)
  }

  useEffect(() => {
    fetchAlbums()
  })
  
	return (
		<div className="w-full flex">
      <Navbar />
      <Highlights />
		</div>
	);
};
export default Dashboard;
