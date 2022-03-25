export const VisContainer = ({
	label,
	children,
}: {
	label: string;
	children?: React.ReactNode;
}) => {
	return (
		<div className="flex flex-col gap-1 w-full">
			<h3 className="text-xl text-gray px-1">{label}</h3>
			<div className="bg-gray-light p-4 rounded-lg">{children}</div>
		</div>
	);
};
