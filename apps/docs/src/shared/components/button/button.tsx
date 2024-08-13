import type { Props } from "./types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Interpolation, Theme } from "@emotion/react";
import { variants, fontSize, sizeHandler, svgUrlHelper } from "./lib";

const ButtonComponent = ({
	children,
	icon,
	href,
	onClick,
	size = "medium",
	variant = "contained",
	fullWidth,
	loading,
}: Props) => {
	const pathname = usePathname();

	const css: Record<string, Interpolation<Theme>> = {
		container: [
			variants[variant],
			(theme) => ({
				borderRadius: theme.radius.md,
				cursor: "pointer",
				display: "inline-flex",
				alignItems: "center",
				textTransform: "uppercase",
				justifyContent:
					icon && (icon.align === "center" ? "center" : "space-between"),
				fontWeight: 500,
				fontFamily: "inherit",
				gap: "8px",

				...(fullWidth ? { width: "100%" } : {}),

				...sizeHandler(size),
			}),
		],

		icon: {
			width: "1em",
			height: "1em",
		},
	};

	const startIcon =
		icon && icon.start ? (
			<svg css={css["icon"]}>
				<use href={`${svgUrlHelper(pathname)}#${icon.start}`} />
			</svg>
		) : null;
	const endIcon =
		icon && icon.end ? (
			<svg css={css["icon"]}>
				<use href={`${svgUrlHelper(pathname)}#${icon.end}`} />
			</svg>
		) : null;

	// TODO: add loading component
	const nodes = loading ? (
		<span />
	) : (
		<>
			{icon && icon.align === "semi-around" ? (
				<span css={{ flexBasis: "1em", fontSize: fontSize[size] }}>
					{startIcon}
				</span>
			) : (
				startIcon
			)}

			<span>{children}</span>

			{icon && icon.align === "semi-around" ? (
				<span css={{ flexBasis: "1em", fontSize: fontSize[size] }}>
					{endIcon}
				</span>
			) : (
				endIcon
			)}
		</>
	);

	return href ? (
		<Link css={css["container"]} href={href}>
			{nodes}
		</Link>
	) : (
		<button css={css["container"]} onClick={onClick}>
			{nodes}
		</button>
	);
};

export default ButtonComponent;
