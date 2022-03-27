import {
	FaDribbble,
	FaGithub,
	FaInstagram,
	FaLinkedinIn,
	FaTwitter,
} from "react-icons/fa";

export const SocialLinks = () => {
	return (
		<div className="flex flex-row gap-3 px-1 my-4">
			<a
				href="https://github.com/bencooper96"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FaGithub color="white" />
			</a>
			<a
				href="https://www.linkedin.com/in/ben-a-cooper/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FaLinkedinIn color="white" />
			</a>

			<a
				href="https://www.instagram.com/ben.coo.per/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FaInstagram color="white" />
			</a>
			<a
				href="https://twitter.com/cooperben83"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FaTwitter color="white" />
			</a>
			{/* <a
				href="https://dribbble.com/ben-cooper/about"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FaDribbble color="white" />
			</a> */}
		</div>
	);
};
