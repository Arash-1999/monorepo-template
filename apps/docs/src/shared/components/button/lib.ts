import type { Interpolation, Theme } from "@emotion/react";
import type { ButtonSize, ButtonVariant } from "./types";

const sizeHandler = (size: ButtonSize) => {
	switch (size) {
		case "small":
			return { padding: "5px 12px 4px" };
		case "medium":
			return { padding: "9px 16px 8px" };
		case "large":
			return { padding: "11px 24px 10px" };
	}
};

const variants: Record<ButtonVariant, Interpolation<Theme>> = {
	outlined: (theme) => ({
		background: "transparent",
		border: `1px solid ${theme.color.primary.main}`,
		color: theme.color.primary.main,

		"&:hover": {},
	}),
	contained: (theme) => ({
		background: theme.color.primary.main,
		color: theme.color.primary.contrastText,
		border: `1px solid ${theme.color.primary.main}`,
	}),
	text: (theme) => ({
		background: "transparent",
		border: "none",
		color: theme.color.primary.main,
	}),
};

const svgUrlHelper = (path: string): string => {
	let result = "/icon";

	if (path.startsWith("/")) {
		result += path;
	}

	if (path.slice(-1) === "/") {
		result += "sprites.svg";
	} else {
		result += "/sprites.svg";
	}
	return result;
};

const fontSize: Record<ButtonSize, string> = {
	small: "1rem",
	medium: "1.25rem",
	large: "1.5rem",
};

export { fontSize, svgUrlHelper, sizeHandler, variants };
