interface MarqueeProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
}

export function Marquee({ label }: MarqueeProps) {
  return (
    <svg viewBox="0 0 800 24" height="100%">
      <text x={5} y={19} fontSize={19} fill="#f2bebe">
        {`${label}    ${label}`}
      </text>
    </svg>
  );
}
