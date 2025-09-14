import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div className="bg-zinc-800 px-4 py-4 text-zinc-200 flex flex-col items-center">
            <div className="flex gap-2">
                <Link to={"https://github.com/BhaveshUV"} className="hover:text-white"><FontAwesomeIcon icon={faGithub} /></Link>
                <Link to={"https://www.linkedin.com/in/bhavesh-vishwakarma-5316062a1/"} className="hover:text-white"><FontAwesomeIcon icon={faLinkedin} /></Link>
            </div>
            <span className="cursor-default">Ascend</span>
        </div>
    )
};

export default Footer;