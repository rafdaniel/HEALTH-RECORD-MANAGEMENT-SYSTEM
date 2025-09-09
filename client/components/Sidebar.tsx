// Sidebar.tsx
import { Home, Users, Calendar, FileText, TrendingUp, X, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Patients", path: "/patients", icon: Users },
  { name: "Appointments", path: "/appointments", icon: Calendar },
  { name: "Medical Records", path: "/records", icon: FileText },
  { name: "Reports", path: "/reports", icon: TrendingUp },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleLogout = () => {
    setShowProfileMenu(false);
    onClose?.();
    navigate('/logout');
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div className={cn(
        "w-64 h-screen fixed left-0 top-0 bg-white border-r border-white shadow-lg flex flex-col z-50 transition-transform duration-300",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.02617 16.4917L1.67344 10.5609C1.52578 10.4238 1.38516 10.2761 1.25508 10.1249H4.31367C5.1082 10.1249 5.82539 9.64682 6.13125 8.91205L6.50039 8.02612L8.23359 11.8757C8.36719 12.1746 8.65898 12.3679 8.98594 12.3714C9.31289 12.3749 9.61172 12.1956 9.75938 11.9039L11.25 8.91908L11.3098 9.03862C11.6438 9.70658 12.3258 10.1285 13.0711 10.1285H16.7449C16.6148 10.2796 16.4742 10.4273 16.3266 10.5644L9.97383 16.4917C9.71016 16.7378 9.36211 16.8749 9 16.8749C8.63789 16.8749 8.28984 16.7378 8.02617 16.4917ZM17.7082 8.43744H13.0676C12.9621 8.43744 12.8637 8.37768 12.8145 8.28276L11.9988 6.65502C11.8547 6.37026 11.5629 6.18744 11.243 6.18744C10.923 6.18744 10.6312 6.36674 10.4871 6.65502L9.03164 9.56596L7.23867 5.56166C7.10156 5.2558 6.79219 5.05893 6.4582 5.06596C6.12422 5.07299 5.82187 5.27338 5.6918 5.58627L4.57383 8.26869C4.53164 8.37416 4.42617 8.44096 4.31367 8.44096H0.5625C0.471094 8.44096 0.386719 8.45502 0.305859 8.47963C0.105469 7.91713 0 7.31948 0 6.71127V6.50737C0 4.04994 1.77539 1.95463 4.19766 1.55033C5.80078 1.28315 7.43203 1.80698 8.57812 2.95307L9 3.37494L9.42188 2.95307C10.568 1.80698 12.1992 1.28315 13.8023 1.55033C16.2246 1.95463 18 4.04994 18 6.50737V6.71127C18 7.30541 17.9016 7.88901 17.7082 8.43744Z" fill="white"/>
                </svg>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800">HealthCare</div>
                <div className="text-xs text-gray-500">Management System</div>
              </div>
            </div>
            {onClose && (
              <button 
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        <nav className="px-6 flex-1">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-base">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-6 relative" ref={menuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/6169e26510d5d756317627889fa53d0c5d220af7?width=80"
              alt="Dr. Smith"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-gray-800">Dr. Smith</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute bottom-full left-6 right-6 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              <Link
                to="/profile"
                onClick={() => {
                  setShowProfileMenu(false);
                  onClose?.();
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Edit Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-red-600"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}