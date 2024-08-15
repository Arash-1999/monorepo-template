import type { ReactNode } from "react";

interface AccordionProps {
	defaultExpanded?: boolean;
	clickableHeader?: boolean;
	header: ReactNode;
	children: ReactNode;
	icon?: string;
	iconPosition?: "start" | "end";
	expand?: boolean;
	changeExpand?: () => void;
	shouldUnmount?: boolean;
}

export type { AccordionProps };
