import { Search, Bell, Menu } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle: string;
  onMenuClick?: () => void;
}

export function Header({ title, subtitle, onMenuClick }: HeaderProps) {
  return (
    <header className="min-h-[93px] bg-white border-b border-gray-100 shadow-sm px-4 md:px-8 py-4 flex items-center">
      <div className="flex items-center justify-between w-full flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-sm md:text-base text-gray-500">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="w-64 lg:w-80 h-[42px] pl-10 pr-4 border border-gray-200 rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="relative">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
