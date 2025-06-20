
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Logo from "@/components/common/Logo";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Landing", path: "/landing" },
    { name: "Tools", path: "/tools" },
    { name: "Trending", path: "/trending-tools" },
    { name: "Insights", path: "/insights" },
    { name: "Blog", path: "/blog" },
    { name: "Submit Tool", path: "/submit-tool" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              {isMobile ? (
                <Logo size="small" />
              ) : (
                <div className="flex items-center gap-3">
                  <Logo size="small" />
                  <span className="text-primary font-bold text-xl dark:text-white">Top AI Tools</span>
                </div>
              )}
            </NavLink>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary dark:text-primary-foreground font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 shadow-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? "text-primary dark:text-primary-foreground font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground"
                }`
              }
              onClick={closeMenu}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
