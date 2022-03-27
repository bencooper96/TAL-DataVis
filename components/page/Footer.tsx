import { Button } from "../inputs";
import { SocialLinks } from "./Footer/socialLinks";

export const Footer = () => {
	return (
		<footer className="w-full bg-primary py-10 px-2 md:px-4">
			<Button color="black" href="https://bencooper.xyz" className="my-4">
				My other work
			</Button>

			<SocialLinks />
			<p className="text-white font-serif text-sm px-1 mt-4">
				Copyright © 2022 Ben Cooper, All rights reserved.
			</p>
		</footer>
	);
};
