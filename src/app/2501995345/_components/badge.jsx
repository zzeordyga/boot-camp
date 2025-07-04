export default function Badge({ children }) {
  return (
    <div className="flex items-center px-3 py-1 bg-[#2e63e9] text-white rounded-full text-sm font-semibold hover:bg-[#2e63e9]/90 transition-colors duration-300 cursor-pointer">
      {children}
    </div>
  );
}
