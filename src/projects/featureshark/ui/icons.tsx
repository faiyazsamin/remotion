const icon24Style: React.CSSProperties = { width: 15, height: 15, display: "block" };

export const IconEye: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M21.544 11.045c.304.426.456.64.456.955 0 .316-.152.529-.456.955C20.183 14.871 16.579 19 12 19c-4.579 0-8.183-4.129-9.544-6.045C2.152 12.529 2 12.316 2 12c0-.315.152-.529.456-.955C3.817 9.129 7.421 5 12 5c4.579 0 8.183 4.129 9.544 6.045Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export const IconUploadInbox: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={icon24Style}>
    <path d="M12 2L12 10M12 10L15 7M12 10L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 13H5.16026C6.06543 13 6.51802 13 6.91584 13.183C7.31367 13.3659 7.60821 13.7096 8.19729 14.3968L8.80271 15.1032C9.39179 15.7904 9.68633 16.1341 10.0842 16.317C10.482 16.5 10.9346 16.5 11.8397 16.5H12.1603C13.0654 16.5 13.518 16.5 13.9158 16.317C14.3137 16.1341 14.6082 15.7904 15.1973 15.1032L15.8027 14.3968C16.3918 13.7096 16.6863 13.3659 17.0842 13.183C17.482 13 17.9346 13 18.8397 13H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 2.12695C18.6251 2.28681 19.7191 2.64808 20.5355 3.46455C22 4.92902 22 7.28604 22 12.0001C22 16.7141 22 19.0712 20.5355 20.5356C19.0711 22.0001 16.714 22.0001 12 22.0001C7.28595 22.0001 4.92893 22.0001 3.46447 20.5356C2 19.0712 2 16.7141 2 12.0001C2 7.28604 2 4.92902 3.46447 3.46455C4.28094 2.64808 5.37486 2.28681 7 2.12695" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconChat: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={icon24Style}>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 10.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 14H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconFeedbackRail: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={icon24Style}>
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
      fill="currentColor"
    />
  </svg>
);

export const IconMap: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={icon24Style}>
    <path d="M3 8.70938C3 7.23584 3 6.49907 3.39264 6.06935C3.53204 5.91678 3.70147 5.79466 3.89029 5.71066C4.42213 5.47406 5.12109 5.70705 6.51901 6.17302C7.58626 6.52877 8.11989 6.70665 8.6591 6.68823C8.85714 6.68147 9.05401 6.65511 9.24685 6.60952C9.77191 6.48541 10.2399 6.1734 11.176 5.54937L12.5583 4.62778C13.7574 3.82843 14.3569 3.42876 15.0451 3.3366C15.7333 3.24444 16.4168 3.47229 17.7839 3.92799L18.9487 4.31624C19.9387 4.64625 20.4337 4.81126 20.7169 5.20409C21 5.59692 21 6.11871 21 7.16229V15.2907C21 16.7642 21 17.501 20.6074 17.9307C20.468 18.0833 20.2985 18.2054 20.1097 18.2894C19.5779 18.526 18.8789 18.293 17.481 17.827C16.4137 17.4713 15.8801 17.2934 15.3409 17.3118C15.1429 17.3186 14.946 17.3449 14.7532 17.3905C14.2281 17.5146 13.7601 17.8266 12.824 18.4507L11.4417 19.3722C10.2426 20.1716 9.64311 20.5713 8.95493 20.6634C8.26674 20.7556 7.58319 20.5277 6.21609 20.072L5.05132 19.6838C4.06129 19.3538 3.56627 19.1888 3.28314 18.7959C3 18.4031 3 17.8813 3 16.8377V8.70938Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 6.63867V20.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 3V17" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const IconCalendar: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={icon24Style}>
    <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 4V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 4V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2.5 9H21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z" fill="currentColor" />
    <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="currentColor" />
    <path d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z" fill="currentColor" />
  </svg>
);

export const IconClipboard: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={icon24Style}>
    <path d="M16 4.00195C18.175 4.01406 19.3529 4.11051 20.1213 4.87889C21 5.75757 21 7.17179 21 10.0002V16.0002C21 18.8286 21 20.2429 20.1213 21.1215C19.2426 22.0002 17.8284 22.0002 15 22.0002H9C6.17157 22.0002 4.75736 22.0002 3.87868 21.1215C3 20.2429 3 18.8286 3 16.0002V10.0002C3 7.17179 3 5.75757 3.87868 4.87889C4.64706 4.11051 5.82497 4.01406 8 4.00195" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 14H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 10.5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 17.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const IconUsers: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={icon24Style}>
    <circle cx="9" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 9C16.6569 9 18 7.65685 18 6C18 4.34315 16.6569 3 15 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="9" cy="17" rx="7" ry="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18 14C19.7542 14.3847 21 15.3589 21 16.5C21 17.5293 19.9863 18.4229 18.5 18.8704" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconUserPlus: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={icon24Style}>
    <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 13.3271C14.0736 13.1162 13.0609 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C17.6874 22 19.3315 20.9817 19.8068 19.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="18" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18 14.6667V17.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.6665 16L19.3332 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconChart: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={icon24Style}>
    <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 18V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 18V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 18V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconSettings: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={icon24Style}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0836C21.3378 9.66277 21.4803 9.13093 21.411 8.60504C21.3591 8.21062 21.1262 7.8071 20.6602 7.00007C20.1943 6.19303 19.9613 5.78952 19.6457 5.54734C19.2249 5.22443 18.693 5.08192 18.1671 5.15115C17.9271 5.18275 17.6836 5.28143 17.3479 5.45889C16.8545 5.71967 16.2644 5.73009 15.7811 5.45106C15.2978 5.17202 15.0117 4.65581 14.9909 4.09803C14.9767 3.71853 14.9404 3.45837 14.8477 3.23466C14.6448 2.74461 14.2554 2.35526 13.7654 2.15224Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const IconChip: React.FC<{ small?: boolean; tiny?: boolean }> = ({ small, tiny }) => {
  const size = tiny ? 10 : small ? 12 : 15;

  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
      <path d="M7 10C7 8.58579 7 7.87868 7.43934 7.43934C7.87868 7 8.58579 7 10 7H14C15.4142 7 16.1213 7 16.5607 7.43934C17 7.87868 17 8.58579 17 10V14C17 15.4142 17 16.1213 16.5607 16.5607C16.1213 17 15.4142 17 14 17H10C8.58579 17 7.87868 17 7.43934 16.5607C7 16.1213 7 15.4142 7 14V10Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 12C4 8.22876 4 6.34315 5.17157 5.17157C6.34315 4 8.22876 4 12 4C15.7712 4 17.6569 4 18.8284 5.17157C20 6.34315 20 8.22876 20 12C20 15.7712 20 17.6569 18.8284 18.8284C17.6569 20 15.7712 20 12 20C8.22876 20 6.34315 20 5.17157 18.8284C4 17.6569 4 15.7712 4 12Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
};

/** First item in the rail, and the active one on Admin Home. Solid, not stroked. */
export const IconHome: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={icon24Style}>
    <path fillRule="evenodd" clipRule="evenodd" d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="currentColor" />
  </svg>
);

/** Open book — the Help Center entry, between Calendar and Clipboard. */
export const IconHomeRail: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={icon24Style}>
    <path
      d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M15 18H9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const IconBook: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={icon24Style}>
    <path d="M20.082 3.01787L20.1081 3.76741L20.082 3.01787ZM16.5 3.48757L16.2849 2.76907V2.76907L16.5 3.48757ZM13.6738 4.80287L13.2982 4.15375L13.2982 4.15375L13.6738 4.80287ZM3.9824 3.07501L3.93639 3.8236L3.9824 3.07501ZM7 3.48757L7.19136 2.76239V2.76239L7 3.48757ZM10.2823 4.87558L9.93167 5.5386L10.2823 4.87558ZM13.6276 20.0694L13.9804 20.7312L13.6276 20.0694ZM17 18.6335L16.8086 17.9083H16.8086L17 18.6335ZM19.9851 18.2229L20.032 18.9715L19.9851 18.2229ZM10.3724 20.0694L10.0196 20.7312H10.0196L10.3724 20.0694ZM7 18.6335L7.19136 17.9083H7.19136L7 18.6335ZM4.01486 18.2229L3.96804 18.9715H3.96804L4.01486 18.2229ZM2.75 16.1437V4.99792H1.25V16.1437H2.75ZM22.75 16.1437V4.93332H21.25V16.1437H22.75ZM20.0559 2.26832C18.9175 2.30798 17.4296 2.42639 16.2849 2.76907L16.7151 4.20606C17.6643 3.92191 18.9892 3.80639 20.1081 3.76741L20.0559 2.26832ZM16.2849 2.76907C15.2899 3.06696 14.1706 3.6488 13.2982 4.15375L14.0495 5.452C14.9 4.95981 15.8949 4.45161 16.7151 4.20606L16.2849 2.76907ZM3.93639 3.8236C4.90238 3.88297 5.99643 3.99842 6.80864 4.21274L7.19136 2.76239C6.23055 2.50885 5.01517 2.38707 4.02841 2.32642L3.93639 3.8236ZM6.80864 4.21274C7.77076 4.46663 8.95486 5.02208 9.93167 5.5386L10.6328 4.21257C9.63736 3.68618 8.32766 3.06224 7.19136 2.76239L6.80864 4.21274ZM13.9804 20.7312C14.9714 20.2029 16.1988 19.6206 17.1914 19.3587L16.8086 17.9083C15.6383 18.2171 14.2827 18.8702 13.2748 19.4075L13.9804 20.7312ZM17.1914 19.3587C17.9943 19.1468 19.0732 19.0314 20.032 18.9715L19.9383 17.4744C18.9582 17.5357 17.7591 17.6575 16.8086 17.9083L17.1914 19.3587ZM10.7252 19.4075C9.71727 18.8702 8.3617 18.2171 7.19136 17.9083L6.80864 19.3587C7.8012 19.6206 9.0286 20.2029 10.0196 20.7312L10.7252 19.4075ZM7.19136 17.9083C6.24092 17.6575 5.04176 17.5357 4.06168 17.4744L3.96804 18.9715C4.9268 19.0314 6.00566 19.1468 6.80864 19.3587L7.19136 17.9083ZM21.25 16.1437C21.25 16.8295 20.6817 17.4279 19.9383 17.4744L20.032 18.9715C21.5062 18.8793 22.75 17.6799 22.75 16.1437H21.25ZM22.75 4.93332C22.75 3.47001 21.5847 2.21507 20.0559 2.26832L20.1081 3.76741C20.7229 3.746 21.25 4.25173 21.25 4.93332H22.75ZM1.25 16.1437C1.25 17.6799 2.49378 18.8793 3.96804 18.9715L4.06168 17.4744C3.31831 17.4279 2.75 16.8295 2.75 16.1437H1.25ZM13.2748 19.4075C12.4825 19.8299 11.5175 19.8299 10.7252 19.4075L10.0196 20.7312C11.2529 21.3886 12.7471 21.3886 13.9804 20.7312L13.2748 19.4075ZM13.2982 4.15375C12.4801 4.62721 11.4617 4.65083 10.6328 4.21257L9.93167 5.5386C11.2239 6.22189 12.791 6.18037 14.0495 5.452L13.2982 4.15375ZM2.75 4.99792C2.75 4.30074 3.30243 3.78463 3.93639 3.8236L4.02841 2.32642C2.47017 2.23065 1.25 3.49877 1.25 4.99792H2.75Z" fill="currentColor" />
    <path d="M12 5.854V20.9999" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 9L9 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19 9L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 13L9 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19 13L15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Surveys — speech-bubble outline around a smile, after the user icons. */
export const IconSurveys: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={icon24Style}>
    <path d="M10.0128 21.9673L9.86335 22.7023H9.86335L10.0128 21.9673ZM16.0342 20.4846C15.6622 20.6668 15.5084 21.116 15.6906 21.488C15.8728 21.86 16.3221 22.0138 16.6941 21.8316L16.0342 20.4846ZM10.1622 21.2324C5.93808 20.3736 2.75 16.6065 2.75 12.0832H1.25C1.25 17.3253 4.94577 21.7025 9.86335 22.7023L10.1622 21.2324ZM2.75 12.0832C2.75 6.92275 6.89721 2.75 12 2.75V1.25C6.05709 1.25 1.25 6.10606 1.25 12.0832H2.75ZM12 2.75C17.1028 2.75 21.25 6.92275 21.25 12.0832H22.75C22.75 6.10606 17.9429 1.25 12 1.25V2.75ZM12.75 20.1498V15.1082H11.25V20.1498H12.75ZM21.25 12.0832C21.25 15.7797 19.1208 18.9726 16.0342 20.4846L16.6941 21.8316C20.2798 20.0752 22.75 16.369 22.75 12.0832H21.25ZM9.86335 22.7023C11.5214 23.0394 12.75 21.618 12.75 20.1498H11.25C11.25 20.909 10.6697 21.3355 10.1622 21.2324L9.86335 22.7023Z" fill="currentColor" />
    <path d="M9 11.8C9 11.3582 9.35817 11 9.8 11H14.2C14.6418 11 15 11.3582 15 11.8V12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12V11.8Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13.5 11V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10.5 11V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Bottom of the rail: the Switch Workspace swap arrows. */
export const IconSwitchWorkspace: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={icon24Style}>
    <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M17 10H7L10.4375 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 14L17 14L13.5625 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconSearch: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14, display: "block" }}>
    <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconImage: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14, display: "block" }}>
    <path d="M5 14.9999H6.39445C7.1804 14.9999 7.57337 14.9999 7.90501 15.1774C8.23665 15.3549 8.45463 15.6819 8.8906 16.3358L9.05039 16.5755C9.47306 17.2095 9.68439 17.5265 9.97087 17.5095C10.2573 17.4925 10.4297 17.1527 10.7743 16.4731L12.7404 12.5964C13.0987 11.8898 13.2779 11.5365 13.5711 11.5247C13.8642 11.5129 14.0711 11.8508 14.485 12.5264L15.1222 13.5668C15.5512 14.2671 15.7656 14.6172 16.1072 14.8086C16.4487 14.9999 16.8593 14.9999 17.6805 14.9999H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const IconShareSquare: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14, display: "block" }}>
    <path d="M13 11L22 2M22 2H16.6562M22 2V7.34375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconSun: React.FC<{ tiny?: boolean }> = ({ tiny }) => {
  const size = tiny ? 10 : 14;

  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 21V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 12L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 12L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19.0708 4.92969L18.678 5.32252" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5.32178 18.6777L4.92894 19.0706" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19.0708 19.0703L18.678 18.6775" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5.32178 5.32227L4.92894 4.92943" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export const IconBell: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14, display: "block" }}>
    <path d="M18.7491 9.70957V9.00497C18.7491 5.13623 15.7274 2 12 2C8.27256 2 5.25087 5.13623 5.25087 9.00497V9.70957C5.25087 10.5552 5.00972 11.3818 4.5578 12.0854L3.45036 13.8095C2.43882 15.3843 3.21105 17.5249 4.97036 18.0229C9.57274 19.3257 14.4273 19.3257 19.0296 18.0229C20.789 17.5249 21.5612 15.3843 20.5496 13.8095L19.4422 12.0854C18.9903 11.3818 18.7491 10.5552 18.7491 9.70957Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconChevronDown: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: 10, height: 10, display: "block" }}>
    <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconArrowUp: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: 12, height: 12, display: "block" }}>
    <path d="M12 20L12 4M12 4L18 10M12 4L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CardArtInsights: React.FC = () => (
  <svg viewBox="0 0 96 96" fill="none" style={{ width: "100%", height: "100%" }}>
    <rect x="16" y="50" width="12" height="30" rx="3.5" fill="#F0EEFD" />
    <rect x="34" y="36" width="12" height="44" rx="3.5" fill="#C9C3FB" />
    <rect x="52" y="56" width="12" height="24" rx="3.5" fill="#F0EEFD" />
    <rect x="70" y="20" width="12" height="60" rx="3.5" fill="#6D5EF3" />
    <line x1="14" y1="84" x2="84" y2="84" stroke="#8B87A8" strokeWidth="3" strokeLinecap="round" />
    <path d="M24 78 44 58l10 9 16-24" stroke="#2EC4B6" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="70" cy="43" r="4" fill="#F4A340" />
  </svg>
);

export const CardArtChangelog: React.FC = () => (
  <svg viewBox="0 0 96 96" fill="none" style={{ width: "100%", height: "100%" }}>
    <path d="M30 16h26l18 18v46a4 4 0 0 1-4 4H30a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4z" fill="#F0EEFD" />
    <path d="M56 16l18 18h-16a2 2 0 0 1-2-2V16z" fill="#C9C3FB" />
    <rect x="36" y="44" width="26" height="5" rx="2.5" fill="#6D5EF3" />
    <rect x="36" y="56" width="18" height="5" rx="2.5" fill="#C9C3FB" />
    <circle cx="70" cy="70" r="13" fill="#FCE3C3" />
    <path d="M70 63v7l5 3.5" stroke="#F4A340" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CardArtReview: React.FC = () => (
  <svg viewBox="0 0 96 96" fill="none" style={{ width: "100%", height: "100%" }}>
    <rect x="24" y="12" width="48" height="72" rx="7" fill="#F0EEFD" />
    <rect x="30" y="20" width="36" height="56" rx="4" fill="#FFFFFF" />
    <rect x="35" y="30" width="26" height="4" rx="2" fill="#C9C3FB" />
    <rect x="35" y="40" width="20" height="4" rx="2" fill="#C9C3FB" />
    <circle cx="66" cy="60" r="14" fill="#2EC4B6" />
    <path d="M59 60l4.5 4.5 8-8.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CardArtRoadmap: React.FC = () => (
  <svg viewBox="0 0 96 96" fill="none" style={{ width: "100%", height: "100%" }}>
    <path d="M14 80h20l8-14 12 22 8-18h20" stroke="#6D5EF3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="14" cy="80" r="5" fill="#F0EEFD" />
    <circle cx="34" cy="66" r="5" fill="#6D5EF3" />
    <circle cx="54" cy="88" r="5" fill="#C9C3FB" />
    <circle cx="70" cy="70" r="5" fill="#C9C3FB" />
    <circle cx="44" cy="26" r="5" fill="#F0EEFD" />
    <circle cx="44" cy="26" r="2.5" fill="#6D5EF3" />
    <line x1="48" y1="26" x2="70" y2="26" stroke="#C9C3FB" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="74" cy="26" r="5" fill="#2EC4B6" />
    <circle cx="74" cy="26" r="1.8" fill="#FFFFFF" />
  </svg>
);

/**
 * Icons below are sized by prop rather than by `icon24Style`, because the
 * embeddable widget renders them much larger than the admin rail does.
 */

/** Outline house — the widget's Home tab. `IconHome` is the solid admin-rail variant. */
export const IconHomeOutline: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 18H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Dismiss control in the widget header. */
export const IconClose: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

/** The widget's "new feedback" floating action button. */
export const IconPlus: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * Oversized macOS pointer. The tip is at 15% across and 6% down the box, which
 * is what callers offset against to land the tip on a target.
 */
export const CURSOR_TIP = { x: 0.15, y: 0.06 };

export const IconCursor: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg
    viewBox="0 0 24 32"
    fill="none"
    style={{ width: (size * 24) / 32, height: size, display: "block" }}
  >
    <path
      d="M4.2 2.1L4.2 26.4L10.6 20.4L14.6 29.8L18.2 28.2L14.2 19.1L21.6 18.6Z"
      fill="#ffffff"
      stroke="#12131a"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/** Attachment affordance on the feedback form. */
export const IconPaperclip: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M7.9175 17.8068L15.8084 10.2535C16.7558 9.34668 16.7558 7.87637 15.8084 6.96951C14.861 6.06265 13.325 6.06265 12.3776 6.96951L4.54387 14.4681C2.74382 16.1911 2.74382 18.9847 4.54387 20.7077C6.34391 22.4308 9.26237 22.4308 11.0624 20.7077L19.0105 13.0997C21.6632 10.5605 21.6632 6.44362 19.0105 3.90441C16.3578 1.3652 12.0569 1.3652 9.40419 3.90441L3 10.0346" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Submit glyph on the form's primary button. */
export const IconPaperPlane: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M17.4975 18.4851L20.6281 9.09373C21.8764 5.34874 22.5006 3.47624 21.5122 2.48782C20.5237 1.49939 18.6511 2.12356 14.906 3.37189L5.57477 6.48218C3.49295 7.1761 2.45203 7.52305 2.13608 8.28637C2.06182 8.46577 2.01692 8.65596 2.00311 8.84963C1.94433 9.67365 2.72018 10.4495 4.27188 12.0011L4.55451 12.2837C4.80921 12.5384 4.93655 12.6658 5.03282 12.8075C5.22269 13.0871 5.33046 13.4143 5.34393 13.7519C5.35076 13.9232 5.32403 14.1013 5.27057 14.4574C5.07488 15.7612 4.97703 16.4131 5.0923 16.9147C5.32205 17.9146 6.09599 18.6995 7.09257 18.9433C7.59255 19.0656 8.24576 18.977 9.5522 18.7997L9.62363 18.79C9.99191 18.74 10.1761 18.715 10.3529 18.7257C10.6738 18.745 10.9838 18.8496 11.251 19.0285C11.3981 19.1271 11.5295 19.2585 11.7923 19.5213L12.0436 19.7725C13.5539 21.2828 14.309 22.0379 15.1101 21.9985C15.3309 21.9877 15.5479 21.9365 15.7503 21.8474C16.4844 21.5244 16.8221 20.5113 17.4975 18.4851Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 18L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Pointing-hand pointer, the shape a browser shows over a control. Its tip is
 * the fingertip, at 42% across and 4% down the box.
 */
/*
  The hand's art sits inside (8, 8)-(37, 38) of its 50-unit square, so the view
  box is cropped to it — otherwise the glyph renders a third smaller than the
  arrow it replaces.
*/
const HAND_BOX = { x: 6, y: 6, size: 34 };

/**
 * The pointing finger's tip, as a fraction of the cropped box. The fingertip is
 * at (20, 8) in the artwork's own coordinates.
 */
export const HAND_TIP = {
  x: (20 - HAND_BOX.x) / HAND_BOX.size,
  y: (8 - HAND_BOX.y) / HAND_BOX.size,
};

const HAND_OUTLINE =
  "M33 38H21c-.6 0-1-.4-1-1 0-1.5-.7-2.4-1.8-3.8-.6-.7-1.3-1.6-2-2.7-1.9-3-3.6-6.6-4-7.9-.4-1.3-.1-2.2.3-2.7.4-.6 1.2-.9 2.1-.9 1.2 0 2.4 1 3.5 2.3V11c0-1.7 1.3-3 3-3s3 1.3 3 3v4.2c.3-.1.6-.2 1-.2 1.1 0 2 .6 2.5 1.4.4-.3.9-.4 1.4-.4 1.4 0 2.5.9 2.9 2.2.3-.1.7-.2 1.1-.2 1.7 0 3 1.3 3 3v3c0 2.6-.5 4.7-1 6.7s-1 3.9-1 6.3c0 .6-.4 1-1 1z";

const HAND_PATH =
  "M33 38H21c-.6 0-1-.4-1-1 0-1.5-.7-2.4-1.8-3.8-.6-.7-1.3-1.6-2-2.7-1.9-3-3.6-6.6-4-7.9-.4-1.3-.1-2.2.3-2.7.4-.6 1.2-.9 2.1-.9 1.2 0 2.4 1 3.5 2.3V11c0-1.7 1.3-3 3-3s3 1.3 3 3v4.2c.3-.1.6-.2 1-.2 1.1 0 2 .6 2.5 1.4.4-.3.9-.4 1.4-.4 1.4 0 2.5.9 2.9 2.2.3-.1.7-.2 1.1-.2 1.7 0 3 1.3 3 3v3c0 2.6-.5 4.7-1 6.7s-1 3.9-1 6.3c0 .6-.4 1-1 1zm-11.1-2H32c.1-2.2.6-4 1-5.8.5-2 1-3.9 1-6.2v-3c0-.6-.4-1-1-1s-1 .4-1 1v1c0 .6-.4 1-1 1s-1-.4-1-1v-3c0-.6-.4-1-1-1s-1 .4-1 1v2c0 .6-.4 1-1 1s-1-.4-1-1v-3c0-.6-.4-1-1-1s-1 .4-1 1v2c0 .6-.4 1-1 1s-1-.4-1-1v-9c0-.6-.4-1-1-1s-1 .4-1 1v15c0 .6-.4 1-1 1s-1-.4-1-1v-.8c-.9-2.3-2.8-4.2-3.5-4.2-.2 0-.4 0-.5.1-.1.1-.1.4 0 .9.3 1.1 1.8 4.3 3.8 7.5.6 1 1.2 1.7 1.8 2.5 1.1 1.2 2.1 2.3 2.3 4z";

/**
 * The pointing hand a browser shows over a control.
 *
 * The artwork is a hollow outline — an outer contour with the palm cut out of
 * it. So it is drawn twice: the outer contour alone, filled white to give the
 * hand a body, then the full glyph in ink on top, which lands exactly on that
 * fill's edge. Using the whole path for the first pass would cut the hole
 * straight back out; stroking it would put white outside the ink.
 */
export const IconHandPointer: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg
    viewBox={`${HAND_BOX.x} ${HAND_BOX.y} ${HAND_BOX.size} ${HAND_BOX.size}`}
    style={{ width: size, height: size, display: "block" }}
  >
    <path d={HAND_OUTLINE} fill="#ffffff" />
    <path d={HAND_PATH} fill="#12131a" />
  </svg>
);

/** Validation tick beside the character counter. */
export const IconCheck: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M4 12.5L9.5 18L20 6.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Submit-in-flight indicator: a ring with a gap, so rotation is legible. The
 * caller drives the angle from the frame — a CSS animation would not render.
 */
export const IconSpinner: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M3.67981 11.3333H2.92981H3.67981ZM3.67981 13L3.15157 13.5324C3.44398 13.8225 3.91565 13.8225 4.20805 13.5324L3.67981 13ZM5.88787 11.8657C6.18191 11.574 6.18377 11.0991 5.89203 10.8051C5.60029 10.511 5.12542 10.5092 4.83138 10.8009L5.88787 11.8657ZM2.52824 10.8009C2.2342 10.5092 1.75933 10.511 1.46759 10.8051C1.17585 11.0991 1.17772 11.574 1.47176 11.8657L2.52824 10.8009ZM18.6156 7.39279C18.8325 7.74565 19.2944 7.85585 19.6473 7.63892C20.0001 7.42199 20.1103 6.96007 19.8934 6.60721L18.6156 7.39279ZM12.0789 2.25C7.03155 2.25 2.92981 6.3112 2.92981 11.3333H4.42981C4.42981 7.15072 7.84884 3.75 12.0789 3.75V2.25ZM2.92981 11.3333L2.92981 13H4.42981L4.42981 11.3333H2.92981ZM4.20805 13.5324L5.88787 11.8657L4.83138 10.8009L3.15157 12.4676L4.20805 13.5324ZM4.20805 12.4676L2.52824 10.8009L1.47176 11.8657L3.15157 13.5324L4.20805 12.4676ZM19.8934 6.60721C18.287 3.99427 15.3873 2.25 12.0789 2.25V3.75C14.8484 3.75 17.2727 5.20845 18.6156 7.39279L19.8934 6.60721Z" fill="currentColor" />
    <path d="M20.3139 11L20.8411 10.4666C20.549 10.1778 20.0788 10.1778 19.7867 10.4666L20.3139 11ZM18.1004 12.1333C17.8058 12.4244 17.8031 12.8993 18.0942 13.1939C18.3854 13.4885 18.8603 13.4913 19.1549 13.2001L18.1004 12.1333ZM21.4729 13.2001C21.7675 13.4913 22.2424 13.4885 22.5335 13.1939C22.8247 12.8993 22.822 12.4244 22.5274 12.1332L21.4729 13.2001ZM5.31794 16.6061C5.1004 16.2536 4.6383 16.1442 4.28581 16.3618C3.93331 16.5793 3.82391 17.0414 4.04144 17.3939L5.31794 16.6061ZM11.8827 21.75C16.9451 21.75 21.0639 17.6915 21.0639 12.6667H19.5639C19.5639 16.8466 16.1332 20.25 11.8827 20.25V21.75ZM21.0639 12.6667V11H19.5639V12.6667H21.0639ZM19.7867 10.4666L18.1004 12.1333L19.1549 13.2001L20.8411 11.5334L19.7867 10.4666ZM19.7867 11.5334L21.4729 13.2001L22.5274 12.1332L20.8411 10.4666L19.7867 11.5334ZM4.04144 17.3939C5.65405 20.007 8.56403 21.75 11.8827 21.75V20.25C9.10023 20.25 6.66584 18.7903 5.31794 16.6061L4.04144 17.3939Z" fill="currentColor" />
  </svg>
);

/* ------------------------------------------------------------------ *
 * Feedback board — chrome
 * ------------------------------------------------------------------ */

/** The Shark AI pill's leading glyph. */
export const IconSparkle: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M8.03339 3.65784C8.37932 2.78072 9.62068 2.78072 9.96661 3.65785L11.0386 6.37599C11.1442 6.64378 11.3562 6.85576 11.624 6.96137L14.3422 8.03339C15.2193 8.37932 15.2193 9.62068 14.3422 9.96661L11.624 11.0386C11.3562 11.1442 11.1442 11.3562 11.0386 11.624L9.96661 14.3422C9.62067 15.2193 8.37932 15.2193 8.03339 14.3422L6.96137 11.624C6.85575 11.3562 6.64378 11.1442 6.37599 11.0386L3.65784 9.96661C2.78072 9.62067 2.78072 8.37932 3.65785 8.03339L6.37599 6.96137C6.64378 6.85575 6.85576 6.64378 6.96137 6.37599L8.03339 3.65784Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16.4885 13.3481C16.6715 12.884 17.3285 12.884 17.5115 13.3481L18.3121 15.3781C18.368 15.5198 18.4802 15.632 18.6219 15.6879L20.6519 16.4885C21.116 16.6715 21.116 17.3285 20.6519 17.5115L18.6219 18.3121C18.4802 18.368 18.368 18.4802 18.3121 18.6219L17.5115 20.6519C17.3285 21.116 16.6715 21.116 16.4885 20.6519L15.6879 18.6219C15.632 18.4802 15.5198 18.368 15.3781 18.3121L13.3481 17.5115C12.884 17.3285 12.884 16.6715 13.3481 16.4885L15.3781 15.6879C15.5198 15.632 15.632 15.5198 15.6879 15.3781L16.4885 13.3481Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/** Collapse-the-panel control at the far left of the board's top bar. */
export const IconPanelCollapse: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.7" />
    <path d="M9 4V20" stroke="currentColor" strokeWidth="1.7" />
    <path d="M16.5 9.5L14 12L16.5 14.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** App-switcher grid at the right of the board's top bar. */
export const IconGrid: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    {[5, 12, 19].map((cy) =>
      [5, 12, 19].map((cx) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.9" fill="currentColor" />
      )),
    )}
  </svg>
);

/** Channel mark on a feedback row. */
export const IconGithubMark: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size, display: "block" }}>
    <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12c0 4.65 3.01 8.59 7.19 9.98.53.1.72-.23.72-.5 0-.25-.01-1.08-.01-1.96-2.93.54-3.55-1.25-3.55-1.25-.48-1.22-1.17-1.55-1.17-1.55-.95-.65.07-.64.07-.64 1.06.07 1.62 1.09 1.62 1.09.94 1.6 2.46 1.14 3.06.87.1-.68.37-1.15.67-1.41-2.34-.27-4.8-1.17-4.8-5.2 0-1.15.41-2.09 1.09-2.83-.11-.27-.47-1.34.1-2.79 0 0 .88-.28 2.88 1.08a10.1 10.1 0 0 1 5.24 0c2-1.36 2.88-1.08 2.88-1.08.57 1.45.21 2.52.1 2.79.68.74 1.09 1.68 1.09 2.83 0 4.04-2.47 4.93-4.82 5.19.38.33.72.97.72 1.96 0 1.41-.01 2.55-.01 2.9 0 .28.19.61.73.5A10.51 10.51 0 0 0 22.5 12C22.5 6.2 17.8 1.5 12 1.5Z" />
  </svg>
);

/** Row-level overflow menu. */
export const IconEllipsis: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size, display: "block" }}>
    <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const IconClock: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 8V12L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconHelpCircle: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
  </svg>
);

/** Sort-by control's leading glyph. */
export const IconSortBars: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M5 20V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 20V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M19 20V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/* ------------------------------------------------------------------ *
 * Feedback board — status and board glyphs
 * ------------------------------------------------------------------ */

export const IconStatusReview: React.FC<{ size?: number }> = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3.4" fill="currentColor" />
  </svg>
);

export const IconStatusPlanned: React.FC<{ size?: number }> = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7.4v6.2M12 7.4l2.6 2.6M12 7.4L9.4 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.6 16.2h6.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const IconStatusProgress: React.FC<{ size?: number }> = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 12V7.6M12 12l3.4 2.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const IconStatusDone: React.FC<{ size?: number }> = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8.2 12.3l2.7 2.7 5-5.3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconStatusClosed: React.FC<{ size?: number }> = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const IconBug: React.FC<{ size?: number }> = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M19 15V11.9375C19 9.76288 17.2371 8 15.0625 8H8.9375C6.76288 8 5 9.76288 5 11.9375V15C5 18.866 8.13401 22 12 22C15.866 22 19 18.866 19 15Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16.5 8.5V7.5C16.5 5.01472 14.4853 3 12 3C9.51472 3 7.5 5.01472 7.5 7.5V8.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M19 14H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 14H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14.5 3.5L17 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9.5 3.5L7 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20.5 20.0002L18.5 19.2002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20.5 7.9998L18.5 8.7998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3.5 20.0002L5.5 19.2002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3.5 7.9998L5.5 8.7998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 21.5V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Feature Requests board — the same flame the row's pill uses. */
export const IconFlame: React.FC<{ size?: number }> = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M20 15C20 19.2545 17.3819 21.1215 15.3588 21.751C14.9274 21.8853 14.6438 21.3823 14.9019 21.0115C15.7823 19.7462 16.8 17.8159 16.8 16C16.8 14.0494 15.1559 11.7465 13.8721 10.3261C13.5786 10.0014 13.0667 10.2163 13.0507 10.6537C12.9976 12.1029 12.7689 14.0418 11.7828 15.5614C11.6241 15.806 11.2872 15.8262 11.1063 15.5975C10.7982 15.2079 10.4901 14.7265 10.182 14.3462C10.016 14.1414 9.71604 14.1386 9.52461 14.3198C8.77825 15.0265 7.73333 16.1286 7.73333 17.5C7.73333 18.4893 8.20479 19.7206 8.69077 20.6741C8.91147 21.1071 8.50204 21.615 8.08142 21.3715C6.24558 20.3088 4 18.1069 4 15C4 11.8536 8.31029 7.49484 9.95605 3.37694C10.2157 2.72714 11.0161 2.42181 11.5727 2.84585C14.9439 5.41391 20 10.3781 20 15Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const IconBulb: React.FC<{ size?: number }> = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M14.5 19.5H9.5M14.5 19.5C14.5 18.7865 14.5 18.4297 14.5381 18.193C14.6609 17.4296 14.6824 17.3815 15.1692 16.7807C15.3201 16.5945 15.8805 16.0927 17.0012 15.0892C18.5349 13.7159 19.5 11.7206 19.5 9.5C19.5 5.35786 16.1421 2 12 2C7.85786 2 4.5 5.35786 4.5 9.5C4.5 11.7206 5.4651 13.7159 6.99876 15.0892C8.11945 16.0927 8.67987 16.5945 8.83082 16.7807C9.31762 17.3815 9.3391 17.4296 9.46192 18.193C9.5 18.4297 9.5 18.7865 9.5 19.5M14.5 19.5C14.5 20.4346 14.5 20.9019 14.299 21.25C14.1674 21.478 13.978 21.6674 13.75 21.799C13.4019 22 12.9346 22 12 22C11.0654 22 10.5981 22 10.25 21.799C10.022 21.6674 9.83261 21.478 9.70096 21.25C9.5 20.9019 9.5 20.4346 9.5 19.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 17V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13.7324 14C13.3866 14.5978 12.7403 15 12 15C11.2597 15 10.6134 14.5978 10.2676 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ------------------------------------------------------------------ *
 * Feedback detail pane
 * ------------------------------------------------------------------ */

export const IconInfo: React.FC<{ size?: number }> = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 11v5.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="12" cy="7.9" r="1.05" fill="currentColor" />
  </svg>
);

export const IconSliders: React.FC<{ size?: number }> = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M14 14.5C14 12.8431 15.3431 11.5 17 11.5C18.6568 11.5 20 12.8431 20 14.5C20 16.1569 18.6568 17.5 17 17.5C15.3431 17.5 14 16.1569 14 14.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3.99998 9.5C3.99998 11.1569 5.34312 12.5 6.99998 12.5C8.65683 12.5 9.99998 11.1569 9.99998 9.5C9.99998 7.84315 8.65683 6.5 6.99998 6.5C5.34312 6.5 3.99998 7.84315 3.99998 9.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16.9585 9L16.9585 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6.9585 15L6.9585 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16.9585 22L16.9585 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6.9585 2L6.9585 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Open the pane full width. */
export const IconExpand: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M9 15L2 22M2 22H7.85714M2 22V16.1429" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 9L22 2M22 2H16.1429M22 2V7.85714" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconHeart: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M12 20.2C10.6 19 4 15.2 4 10.3A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 8 2.3c0 4.9-6.6 8.7-8 9.9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
);

/** Shrink the pane back out of its modal. Mirror of `IconExpand`. */
export const IconCollapse: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M2 22L9 15M9 15H3.14286M9 15V20.8571" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 2L15 9M15 9H20.8571M15 9V3.14286" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ------------------------------------------------------------------ *
 * Public board
 * ------------------------------------------------------------------ */

export const IconArrowLeft: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** "View as visitor" control in the public board's nav. */
export const IconMonitor: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10V11C22 13.8284 22 15.2426 21.1213 16.1213C20.2426 17 18.8284 17 16 17H8C5.17157 17 3.75736 17 2.87868 16.1213C2 15.2426 2 13.8284 2 11V10Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 22H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 17L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22 13H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Owner actions on a feedback you submitted yourself. */
export const IconPencil: React.FC<{ size?: number }> = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M4 22H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13.8881 3.66293L14.6296 2.92142C15.8581 1.69286 17.85 1.69286 19.0786 2.92142C20.3071 4.14999 20.3071 6.14188 19.0786 7.37044L18.3371 8.11195M13.8881 3.66293C13.8881 3.66293 13.9807 5.23862 15.3711 6.62894C16.7614 8.01926 18.3371 8.11195 18.3371 8.11195M13.8881 3.66293L7.07106 10.4799C6.60933 10.9416 6.37846 11.1725 6.17992 11.4271C5.94571 11.7273 5.74491 12.0522 5.58107 12.396C5.44219 12.6874 5.33894 12.9972 5.13245 13.6167L4.25745 16.2417M18.3371 8.11195L11.5201 14.9289C11.0584 15.3907 10.8275 15.6215 10.5729 15.8201C10.2727 16.0543 9.94775 16.2551 9.60398 16.4189C9.31256 16.5578 9.00282 16.6611 8.38334 16.8675L5.75834 17.7426M5.75834 17.7426L5.11667 17.9564C4.81182 18.0581 4.47573 17.9787 4.2485 17.7515C4.02128 17.5243 3.94194 17.1882 4.04356 16.8833L4.25745 16.2417M5.75834 17.7426L4.25745 16.2417" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const IconTrash: React.FC<{ size?: number }> = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M20.5001 6H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9.5 11L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14.5 11L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/** Author line on the support toast. */
export const IconPerson: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="12" cy="17" rx="7" ry="4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/** Tag chip beside a row's board pill. */
export const IconTag: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M4.72848 16.1369C3.18295 14.5914 2.41018 13.8186 2.12264 12.816C1.83509 11.8134 2.08083 10.7485 2.57231 8.61875L2.85574 7.39057C3.26922 5.59881 3.47597 4.70292 4.08944 4.08944C4.70292 3.47597 5.59881 3.26922 7.39057 2.85574L8.61875 2.57231C10.7485 2.08083 11.8134 1.83509 12.816 2.12264C13.8186 2.41018 14.5914 3.18295 16.1369 4.72848L17.9665 6.55812C20.6555 9.24711 22 10.5916 22 12.2623C22 13.933 20.6555 15.2775 17.9665 17.9665C15.2775 20.6555 13.933 22 12.2623 22C10.5916 22 9.24711 20.6555 6.55812 17.9665L4.72848 16.1369Z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8.60724" cy="8.87891" r="2" transform="rotate(-45 8.60724 8.87891)" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11.5417 18.5L18.5208 11.5208" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Logout control in the public board's admin nav. */
export const IconLogout: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ------------------------------------------------------------------ *
 * Roadmap
 * ------------------------------------------------------------------ */

/** Empty-stage illustration: nothing built here yet. */
export const IconHammer: React.FC<{ size?: number }> = ({ size = 34 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M13.6 6.6l3.8-3.8 3.8 3.8-3.8 3.8-3.8-3.8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M12.4 7.8L4.1 16.1a2 2 0 0 0 0 2.8l1 1a2 2 0 0 0 2.8 0l8.3-8.3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M10.2 9.9l3.9 3.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/** Kanban / List view toggle glyphs. */
export const IconKanban: React.FC<{ size?: number }> = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M2.5 6.5C2.5 4.29086 4.29086 2.5 6.5 2.5C8.70914 2.5 10.5 4.29086 10.5 6.5V9.16667C10.5 9.47666 10.5 9.63165 10.4659 9.75882C10.3735 10.1039 10.1039 10.3735 9.75882 10.4659C9.63165 10.5 9.47666 10.5 9.16667 10.5H6.5C4.29086 10.5 2.5 8.70914 2.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13.5 14.8333C13.5 14.5233 13.5 14.3683 13.5341 14.2412C13.6265 13.8961 13.8961 13.6265 14.2412 13.5341C14.3683 13.5 14.5233 13.5 14.8333 13.5H17.5C19.7091 13.5 21.5 15.2909 21.5 17.5C21.5 19.7091 19.7091 21.5 17.5 21.5C15.2909 21.5 13.5 19.7091 13.5 17.5V14.8333Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2.5 17.5C2.5 15.2909 4.29086 13.5 6.5 13.5H8.9C9.46005 13.5 9.74008 13.5 9.95399 13.609C10.1422 13.7049 10.2951 13.8578 10.391 14.046C10.5 14.2599 10.5 14.5399 10.5 15.1V17.5C10.5 19.7091 8.70914 21.5 6.5 21.5C4.29086 21.5 2.5 19.7091 2.5 17.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13.5 6.5C13.5 4.29086 15.2909 2.5 17.5 2.5C19.7091 2.5 21.5 4.29086 21.5 6.5C21.5 8.70914 19.7091 10.5 17.5 10.5H14.6429C14.5102 10.5 14.4438 10.5 14.388 10.4937C13.9244 10.4415 13.5585 10.0756 13.5063 9.61196C13.5 9.55616 13.5 9.48982 13.5 9.35714V6.5Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const IconList: React.FC<{ size?: number }> = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M14 16L16.1 18.5L20 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 6L3 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M21 10L3 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 14H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 18H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** The filled "New" button's leading glyph. */
export const IconPlusCircle: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12 8.2v7.6M8.2 12h7.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

/** Roadmap rail / panel mark. */
export const IconRoadmapBook: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M4 8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.87868C20 3.75736 20 5.17157 20 8V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M19.8978 16H7.89778C6.96781 16 6.50282 16 6.12132 16.1022C5.08604 16.3796 4.2774 17.1883 4 18.2235" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 7H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 10.5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ------------------------------------------------------------------ *
 * Media gallery and date picker
 * ------------------------------------------------------------------ */

export const IconUpload: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconArrowLeftSmall: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M15 5L9 12L15 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconArrowRightSmall: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, display: "block" }}>
    <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
