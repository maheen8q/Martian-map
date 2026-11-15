function Svg({ children }) {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      {children}
    </svg>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconBrand() {
  return (
    <Svg>
      <path {...stroke} d="M4 16.5c2.4-4.2 5-6.3 8-6.3s5.6 2.1 8 6.3" />
      <path {...stroke} d="M8.5 16.5h7" />
      <circle cx="12" cy="7.2" r="1.15" fill="currentColor" />
    </Svg>
  );
}

export function IconTerrain() {
  return (
    <Svg>
      <path {...stroke} d="M3 17.5 8.4 9.2l3.8 5.2 2.3-2.5L21 17.5" />
    </Svg>
  );
}

export function IconSlope() {
  return (
    <Svg>
      <path {...stroke} d="M4 17.5 19 7" />
      <path {...stroke} d="M4 17.5h15" />
    </Svg>
  );
}

export function IconHazard() {
  return (
    <Svg>
      <path {...stroke} d="M12 4.5 20.5 19H3.5L12 4.5z" />
      <path {...stroke} d="M12 10v4" />
      <path d="M12 16.6h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export function IconPoi() {
  return (
    <Svg>
      <path {...stroke} d="M12 20s6-5.1 6-9.2A6 6 0 0 0 6 10.8C6 14.9 12 20 12 20z" />
      <circle cx="12" cy="10.6" r="1.6" fill="currentColor" />
    </Svg>
  );
}

export function IconRadar() {
  return (
    <Svg>
      <path {...stroke} d="M5 16c2.2-2.4 4.4-3.6 7-3.6S16.8 13.6 19 16" />
      <path {...stroke} d="M7.5 12.2c1.4-1.5 2.8-2.2 4.5-2.2s3.1.7 4.5 2.2" />
      <path {...stroke} d="M10.2 8.8c.5-.4 1.1-.6 1.8-.6s1.3.2 1.8.6" />
    </Svg>
  );
}

export function IconLayers() {
  return (
    <Svg>
      <path {...stroke} d="m12 4 8 4-8 4-8-4 8-4z" />
      <path {...stroke} d="m4 12 8 4 8-4" />
      <path {...stroke} d="m4 16 8 4 8-4" />
    </Svg>
  );
}

export function IconRoute() {
  return (
    <Svg>
      <circle cx="6" cy="16" r="1.4" fill="currentColor" />
      <path {...stroke} d="M7.2 15.2C10 13 12 11.2 14.2 11.2c1.6 0 2.4 1.3 3.6 1.3" />
      <path {...stroke} d="M16.2 9.2 19.2 12.4 16 13.2" />
    </Svg>
  );
}

export function IconChart() {
  return (
    <Svg>
      <path {...stroke} d="M4 16.5c2.2-1.2 3.2-4.8 5.4-4.8 1.8 0 2.2 2.4 3.8 2.4 2.2 0 3-4.2 6.8-6.1" />
      <path {...stroke} d="M4 19h16" />
    </Svg>
  );
}

export function IconClock() {
  return (
    <Svg>
      <circle {...stroke} cx="12" cy="12" r="7.5" />
      <path {...stroke} d="M12 8.2V12l2.6 1.8" />
    </Svg>
  );
}

export function IconTarget() {
  return (
    <Svg>
      <circle {...stroke} cx="12" cy="12" r="7" />
      <circle {...stroke} cx="12" cy="12" r="3" />
      <path {...stroke} d="M12 3.5V6M12 18v2.5M3.5 12H6M18 12h2.5" />
    </Svg>
  );
}
