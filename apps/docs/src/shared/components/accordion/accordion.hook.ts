import { useRef, useEffect, useState } from "react";

interface TUseAccordionFn {
	defaultExpand?: boolean;
	expand?: boolean;
	changeExpand?: () => void;
}

const useAccordionFn = <TContent extends HTMLElement = HTMLDivElement>({
	expand,
	defaultExpand = false,
	changeExpand,
}: TUseAccordionFn) => {
	const contentRef = useRef<TContent>(null);
	const [height, setHeight] = useState<number | undefined>(
		defaultExpand ? 0 : undefined,
	);
	const [open, setOpen] = useState<boolean>(defaultExpand);

	useEffect(() => {
		if (typeof expand !== "undefined") setOpen(expand);
	}, [expand]);

	useEffect(() => {
		if (!height || !open || contentRef.current === null) return undefined;
		const resizeObserver = new ResizeObserver((el) => {
			setHeight(el[0]?.contentRect.height);
		});

		resizeObserver.observe(contentRef.current);

		return () => {
			resizeObserver.disconnect();
		};
	}, [open, height]);

	useEffect(() => {
		if (open && contentRef.current !== null) {
			const { height: contentHeight } =
				contentRef.current.getBoundingClientRect();
			setHeight(contentHeight);
		} else {
			setHeight(0);
		}
	}, [open]);

	const toggle = () => {
		if (changeExpand) {
			changeExpand();
		} else {
			setOpen((s) => !s);
		}
	};

	return { contentRef, height, open, toggle };
};

export { useAccordionFn };
