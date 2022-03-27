interface ButtonProps {
	onClick?: () => void;
	color?: string;
	children: React.ReactNode;
	disabled?: boolean;
}

export const Button = ({
	onClick,
	color = "primary",
	children,
	disabled = false,
}: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`bg-${color} ${
				disabled ? "opacity-50" : ""
			} px-4 py-2 rounded-md text-white font-medium`}
		>
			{children}
		</button>
	);
};
