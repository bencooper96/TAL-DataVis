import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
	const router = useRouter();
	return (
		<div className="w-full bg-primary py-4 px-2 md:px-4 ">
			<div className="mx-auto md:flex justify-between align-items-end">
				<h1 className="text-xl font-serif text-white ">
					This American Life Experiment
				</h1>
				{router.pathname == "/" ? (
					<Link href="/about">
						<a className="text-sm underline font-sans text-white self-center">
							What am I looking at?
						</a>
					</Link>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};
