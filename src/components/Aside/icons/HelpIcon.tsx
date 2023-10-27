const HelpIcon: React.FC = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 920 1000"
      fill="currentColor"
      className="h-6 w-6 text-gray-600 group-hover:text-[#79ad34]"
      {...props}
    >
      <path d="M454 40c126.667-1.333 235.333 42 326 130s137.333 195.333 140 322c1.333 126.667-42.333 235.667-131 327S592.667 957.333 466 960c-126.667 1.333-235.667-42.333-327-131S1.333 632.667 0 506c-2.667-126.667 40.667-235.667 130-327S327.333 41.333 454 40m-2 740c20 0 36.333-6.333 49-19 12.667-12.667 19-28.333 19-47 1.333-20-4.333-36.333-17-49-12.667-12.667-29-19-49-19h-2c-18.667 0-34.333 6-47 18-12.667 12-19.667 27.333-21 46 0 20 6.333 36.333 19 49 12.667 12.667 28.333 19.667 47 21h2m166-328c17.333-22.667 26-48.667 26-78 0-52-18-90.667-54-116-34.667-25.333-79.333-38-134-38-42.667 0-77.333 8.667-104 26-45.333 28-69.333 76.667-72 146v4h110v-4c0-17.333 5.333-35.333 16-54 10.667-16 28.667-24 54-24 26.667 0 44 6.667 52 20 10.667 13.333 16 28 16 44 0 12-5.333 25.333-16 40-5.333 8-12 14.667-20 20l-6 4c-4 2.667-9.333 6.333-16 11a391.06 391.06 0 00-20 15c-6.667 5.333-13.667 11-21 17s-13 11.667-17 17c-9.333 13.333-15.333 39.333-18 78v8h108v-4c0-8 1.333-17.333 4-28 4-13.333 13.333-25.333 28-36l28-18c30.667-22.667 49.333-39.333 56-50" />
    </svg>
  );
};

export default HelpIcon;
