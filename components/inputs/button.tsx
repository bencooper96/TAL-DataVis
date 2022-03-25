interface ButtonProps {
	onClick?: () => void;
	color?: string;
	children: React.ReactNode;
}

export const Button = ({
	onClick,
	color = "primary",
	children,
}: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`bg-${color} px-4 py-2 rounded-md text-white font-medium w-min`}
		>
			{children}
		</button>
	);
};
