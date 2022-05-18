export function apiPrefixedRoute(url: string) {
	if (process.env.NODE_ENV == "development") {
		return `http://localhost:3000/api/${url}`;
	}
	return `https://tal-data-vis.vercel.app/api/${url}`;
}
