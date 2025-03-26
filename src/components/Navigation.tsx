
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Calculator", path: "/calculator" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-energy-green to-energy-blue">
              Green Energy Institute
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary transform scale-x-100 transition-transform"></span>
                )}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-foreground/80">
                  {user.email?.split('@')[0]}
                </span>
                <button 
                  onClick={handleSignOut}
                  className="btn-secondary flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/sign-in"
                className="btn-primary"
              >
                Sign In
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </nav>
      </div>

      <div
        className={`md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-8 pt-24 h-full">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`py-3 text-lg font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <div className="py-3 mt-2 text-lg font-medium text-foreground/80">
                {user.email}
              </div>
              <button
                onClick={handleSignOut}
                className="py-3 flex items-center text-lg font-medium transition-colors text-foreground/80 hover:text-foreground"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="py-3 text-lg font-medium transition-colors text-foreground/80 hover:text-foreground"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
