import { Interpolation } from "@emotion/react";
import { Theme } from "@emotion/react";

const styles: Record<string, Interpolation<Theme>> = {
	container: (theme) => ({
		border: `1px solid ${theme.color.divider}`,
		borderRadius: theme.radius.md,
	}),
	content: {
		padding: "16px",
	},
	contentContainer: {
		overflow: "hidden",
		transition: `height 0.2s ease-in-out`,
	},
	headerTitle: {
		flex: "1",
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	headerContainer: {
		display: "flex",
		alignItems: "cetner",
		justifyContent: "space-between",
		gap: "8px",
		padding: "8px 16px",
		transition: "border .3s linear",
	},
	headerButton: {
		backgroundColor: "transparent",
		outline: "none",
		border: "none",
		fontSize: "1.5rem",
		display: "grid",
		placeItems: "center",

		"& svg": {
			transition: "transform .2s linear",
			width: "1em",
			height: "1em",
		},
	},
};

export { styles };
