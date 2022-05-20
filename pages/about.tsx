import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Header, Footer, Main } from "../components/page";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>This American Life</title>
				<meta name="description" content="About this experiment" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Main>
				<Header />
				<div className="container px-2 mx-auto py-8 flex flex-col gap-8">
					<Link href="/">
						<a className="underline">Back</a>
					</Link>
					<h1 className="text-2xl text-gray">About</h1>

					<p>
						This project doesn’t have too much to it.
						<br /> Basically, I wanted to learn something new and figured this
						could be a fun way to do so. What you’re looking at here is a
						collection of visualizations of transcripts that I scraped from{" "}
						<a
							href="https://www.thisamericanlife.org/"
							target="_blank"
							rel="noopener noreferrer"
							className="underline text-secondary"
						>
							ThisAmericanLife.org.
						</a>
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-3 text-center">
						<div className="w-full">
							<h3 className="text-lg text-gray">Front End</h3>
							<TechnologyTile name="Next.JS" link="https://nextjs.org/" />
							<TechnologyTile
								name="TailwindCSS"
								link="https://tailwindcss.com/"
							/>
							<TechnologyTile
								name="Recharts"
								link="https://recharts.org/en-US"
							/>
						</div>
						<div className="w-full">
							<h3 className="text-lg text-gray">Back End</h3>
							<TechnologyTile
								name="PostgresSQL"
								link="https://www.postgresql.org/"
							/>
							<TechnologyTile name="Node Js" link="https://nodejs.org/en/" />
							<TechnologyTile name="Prisma" link="https://www.prisma.io/" />
						</div>
						<div className="w-full">
							<h3 className="text-lg text-gray">Crawler</h3>
							<TechnologyTile name="Python" link="https://www.python.org/" />
							<TechnologyTile name="Pandas" link="https://pandas.pydata.org/" />
							<TechnologyTile
								name="Beautiful Soup"
								link="https://www.crummy.com/software/BeautifulSoup/"
							/>
						</div>
					</div>
				</div>
			</Main>

			<Footer />
		</>
	);
};

export default Home;

const TechnologyTile = ({ name, link }: { name: string; link?: string }) => {
	return (
		<a href={link} target="_blank" rel="noopener noreferrer">
			<div
				className={`bg-primary text-white p-2 mx-auto rounded-full my-4 w-40 text-center ${
					link && "hover:opacity-100"
				} opacity-90`}
			>
				{name}
			</div>
		</a>
	);
};
