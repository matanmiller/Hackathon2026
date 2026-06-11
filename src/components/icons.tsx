import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const BookIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2H11v18H4.5A2.5 2.5 0 0 1 2 17.5v-13Z" />
    <path d="M22 4.5A2.5 2.5 0 0 0 19.5 2H13v18h6.5a2.5 2.5 0 0 0 2.5-2.5v-13Z" />
  </svg>
);

export const ClipboardCheckIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 3h6v3H9z" />
    <path d="m9 13 2 2 4-4" />
  </svg>
);

export const ChatBubbleIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M21 12a8.5 8.5 0 0 1-8.5 8.5c-1.4 0-2.7-.32-3.86-.9L3 21l1.46-4.36A8.5 8.5 0 1 1 21 12Z" />
  </svg>
);

export const CrossIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 4v16M4 12h16" />
  </svg>
);

export const SirenIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 2a6 6 0 0 1 6 6v6H6V8a6 6 0 0 1 6-6Z" />
    <path d="M12 2v2" />
    <path d="M5 14h14v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3Z" />
    <path d="M9 21h6" />
    <path d="M2 9h2M20 9h2" />
  </svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const SendIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M2 2 9 22l4-9 9-4L2 2Z" />
    <path d="M2 2l11 11" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const CheckCircleIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const XCircleIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6M9 9l6 6" />
  </svg>
);

export const AirwayIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M9 21V10a3 3 0 0 1 6 0v11" />
    <path d="M9 14H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2" />
    <path d="M15 14h3a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2" />
    <circle cx="12" cy="5" r="2" />
  </svg>
);

export const DropletIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 2.5s6 6.7 6 11a6 6 0 1 1-12 0c0-4.3 6-11 6-11Z" />
  </svg>
);

export const BotIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="4" y="8" width="16" height="12" rx="2" />
    <path d="M12 8V4" />
    <circle cx="12" cy="3" r="1" />
    <path d="M9 13v1M15 13v1" />
    <path d="M9 18h6" />
  </svg>
);

export const UserCircleIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.5 19a5.5 5.5 0 0 1 11 0" />
  </svg>
);

export const LoaderIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 2v4" opacity="0.9" />
    <path d="M12 18v4" opacity="0.5" />
    <path d="m4.93 4.93 2.83 2.83" opacity="0.6" />
    <path d="m16.24 16.24 2.83 2.83" opacity="0.3" />
    <path d="M2 12h4" opacity="0.7" />
    <path d="M18 12h4" opacity="0.4" />
    <path d="m4.93 19.07 2.83-2.83" opacity="0.5" />
    <path d="m16.24 7.76 2.83-2.83" opacity="0.8" />
  </svg>
);

export const ArrowIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ShieldIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
  </svg>
);

export const MedicalKitIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    <path d="M12 11v6M9 14h6" />
  </svg>
);

export const StormIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M17.5 17a4.5 4.5 0 0 0-1-8.9A6 6 0 0 0 5 9.5 4 4 0 0 0 5.5 17h12Z" />
    <path d="m13 11-2 4h3l-2 4" />
  </svg>
);

export const CarIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" />
    <path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4Z" />
    <circle cx="7.5" cy="17" r="1.5" />
    <circle cx="16.5" cy="17" r="1.5" />
  </svg>
);

export const ClockIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export const MicrophoneIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0" />
    <path d="M12 19v3" />
    <path d="M8 22h8" />
  </svg>
);

export const StopCircleIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="10" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
);
