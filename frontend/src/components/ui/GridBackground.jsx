const GridBackground = ({ children }) => {
  return (
    <div className="bg-grid-white/[0.2] relative w-full bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  );
};
export default GridBackground;
