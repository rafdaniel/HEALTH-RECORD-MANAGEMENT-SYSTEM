import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function Layout({ children, title, subtitle }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 lg:ml-64 w-full">
        <Header
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <main>{children}</main>
      </div>
    </div>
  );
}
