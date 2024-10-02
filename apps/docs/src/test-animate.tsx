import { keyframes } from "@emotion/react";

const animate = keyframes`
  0% {
    stroke-dashoffset: -64;
  }

  50% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -64;
  }
`;

const TestAnimate = () => {
	return (
		<>
			<svg>
				<use
					href="/icon/sprites.svg#heart-outline"
					width={128}
					height={128}
					css={{
						strokeLinecap: "round",
						strokeWidth: "1px",
						animation: `${animate} 2s linear infinite`,
						strokeDasharray: "1000",
					}}
				/>
			</svg>
		</>
	);
};

export default TestAnimate;
