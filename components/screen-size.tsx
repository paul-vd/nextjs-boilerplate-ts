export default function ScreenSize() {
  return (
    <div
      className="fixed right-0 z-50 flex items-center justify-center w-8 h-8 mr-12 bg-white border border-gray-100 rounded-sm shadow-lg"
      style={{ background: 'white', bottom: 30 }}
    >
      <span className="font-bold sm:hidden">xs</span>
      <span className="hidden font-bold sm:block md:hidden">sm</span>
      <span className="hidden font-bold md:block lg:hidden">md</span>
      <span className="hidden font-bold lg:block xl:hidden">lg</span>
      <span className="hidden font-bold xl:block">xl</span>
    </div>
  );
}
