"use client";
import { useAccordionFn } from "./accordion.hook";
import { styles } from "./accordion.style";
import { AccordionProps } from "./types";

const TestAccordion = ({
	clickableHeader = false,
	iconPosition = "end",
	icon = "expand-more",
	header,
	children,
	shouldUnmount,
}: AccordionProps) => {
	const { open, contentRef, height, toggle } = useAccordionFn({});

	return (
		<div css={styles.container}>
			<div
				onClick={clickableHeader ? toggle : undefined}
				css={[
					styles.headerContainer,
					(theme) => ({
						flexDirection: iconPosition === "start" ? "row-reverse" : "row",
						borderBottom:
							typeof height === "number" && height > 0
								? `1px solid ${theme.color.divider}`
								: "1px solid transparent",
					}),
				]}
			>
				<div css={styles.headerTitle}>{header}</div>
				<button
					onClick={clickableHeader ? undefined : toggle}
					css={[
						styles.headerButton,
						{
							...(open ? { transform: "rotate(180deg)" } : {}),
						},
					]}
				>
					<svg>
						<use href={`/icon/general.sprites.svg#${icon}`} />
					</svg>
				</button>
			</div>

			<div
				css={[
					styles.contentContainer,
					{
						height,
					},
				]}
			>
				<div ref={contentRef}>
					<div css={styles.content}>
						{shouldUnmount ? (open ? children : null) : children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TestAccordion;
