import { AlbumType } from "../types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {
  item: {
    id: string;
    name: string;
    tracks: {
      album: AlbumType;
    }[];
    images: {
      url: string;
    }[];
    followers: {
      href: string;
      total: number;
    };
  };
};

const cardVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "tween",
    },
  },
};

const titleVariants = {
  initial: {},
  animate: {
    x: 5,
    y: -35,
    originX: 0,
    scale: 1.25,
    color: "#fefefe",
    transition: {
      duration: 0.2,
      type: "tween",
    },
  },
};

const ArtistCard = ({ item }: Props) => {
  return (
    <motion.div
      className="flex flex-col gap-2"
      initial="initial"
      animate="initial"
      whileHover="animate"
    >
      <Link to="/dashboard/genres">
        <div
          className="size-48 overflow-hidden rounded-md bg-cover bg-center bg-no-repeat brightness-90 transition duration-[3000] hover:brightness-75"
          style={{
            backgroundImage: `url(${item.images[0].url})`,
          }}
        ></div>
      </Link>
      <motion.h1 className="font-bold" variants={titleVariants}>
        {item.name}
      </motion.h1>
    </motion.div>
  );
};
export default ArtistCard;
