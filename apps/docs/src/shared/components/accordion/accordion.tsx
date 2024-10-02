"use client";
import { useState, useEffect, useRef } from "react";
import { AccordionProps } from "./types";
import { styles } from "./accordion.style";

const Accordion = ({
  defaultExpanded = false,
  clickableHeader = false,
  header,
  children,
  icon = "expand-more",
  iconPosition = "end",
  expand,
  changeExpand,
  shouldUnmount = false,
}: AccordionProps) => {
  // TODO: use functionality hook
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(
    defaultExpanded ? 0 : undefined,
  );
  const [open, setOpen] = useState<boolean>(defaultExpanded);

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
    if (open && contentRef.current) {
      const { height: contentHeight } =
        contentRef.current.getBoundingClientRect();
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  const toggleOpen = () => {
    if (changeExpand) {
      changeExpand();
    } else {
      setOpen((s) => !s);
    }
  };

  return (
    <div css={styles.container}>
      <div
        onClick={clickableHeader ? toggleOpen : undefined}
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
          onClick={clickableHeader ? undefined : toggleOpen}
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

export default Accordion;
