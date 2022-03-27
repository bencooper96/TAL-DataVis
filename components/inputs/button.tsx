interface ButtonProps {
	onClick?: () => void;
	color?: string;
	children: React.ReactNode;
	disabled?: boolean;
	href?: string;
	className?: string;
}

export const Button = ({
	onClick,
	color = "primary",
	children,
	disabled = false,
	href,
	className,
}: ButtonProps) => {
	if (href) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={` bg-${color}  ${
					disabled ? "opacity-50" : ""
				} px-4 py-2 rounded-md text-white font-medium ${className}`}
			>
				{children}
			</a>
		);
	}
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={` bg-${color}  ${
				disabled ? "opacity-50" : ""
			} px-4 py-2 rounded-md text-white font-medium ${className}`}
		>
			{children}
		</button>
	);
};
