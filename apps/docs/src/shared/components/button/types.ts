import type { ReactNode } from "react";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "text" | "contained" | "outlined";

interface Props {
	fullWidth?: boolean;
	children: ReactNode;
	variant?: ButtonVariant;
	href?: string;
	onClick?: () => void;
	size?: ButtonSize;
	icon?: {
		start?: string;
		end?: string;
		align?: "center" | "around" | "semi-around";
	};
	loading?: boolean;
}

export type { ButtonSize, ButtonVariant, Props };
