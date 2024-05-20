import { Link } from "react-router-dom";

const Logo = () => {
	return (
		<Link to="/" className="text-3xl cursor-pointer">
			<span className="text-primary-1 font-extrabold">Mello</span>
			<span className="text-primary-2">Studio</span>
		</Link>
	);
};
export default Logo;
