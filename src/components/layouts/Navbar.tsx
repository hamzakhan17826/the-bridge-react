import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, UserCircle2, Heart, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import {
  getAuthFlag,
  getUserRoles,
  logout as clientLogout,
} from '../../lib/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(getAuthFlag());
  const [userRoles, setUserRoles] = useState<string[]>(getUserRoles() ?? []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAccountOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setAccountOpen(false);
      }
    };
    if (accountOpen) {
      document.addEventListener('keydown', onKey);
      document.addEventListener('mousedown', onClick);
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [accountOpen]);

  useEffect(() => {
    const update = () => {
      setIsLoggedIn(getAuthFlag());
      setUserRoles(getUserRoles() ?? []);
    };
    const onAuthChange = () => update();
    const onStorage = (e: StorageEvent) => {
      if (['auth', 'userRole'].includes(e.key || '')) update();
    };
    const onFocus = () => update();
    window.addEventListener('authchange', onAuthChange as EventListener);
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('authchange', onAuthChange as EventListener);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-100/50 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-blue-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative bg-linear-to-r from-purple-500 to-blue-500 p-2 rounded-xl">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-grotesk-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-200">
                    The Bridge
                  </h1>
                  <p className="text-xs text-purple-600 font-grotesk-medium -mt-1 mb-0">
                    Bridging Two Worlds
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-xl font-grotesk-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-linear-to-r from-purple-500 to-blue-500 shadow-lg'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/episodes"
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-xl font-grotesk-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-linear-to-r from-purple-500 to-blue-500 shadow-lg'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                  }`
                }
              >
                Episodes
              </NavLink>
              <NavLink
                to="/reviews"
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-xl font-grotesk-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-linear-to-r from-purple-500 to-blue-500 shadow-lg'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                  }`
                }
              >
                Reviews
              </NavLink>
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-xl font-grotesk-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-linear-to-r from-purple-500 to-blue-500 shadow-lg'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                  }`
                }
              >
                Blogs
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-xl font-grotesk-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-linear-to-r from-purple-500 to-blue-500 shadow-lg'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                  }`
                }
              >
                Contact
              </NavLink>
              {isLoggedIn && userRoles.includes('user') && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-xl font-grotesk-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-linear-to-r from-purple-500 to-blue-500 shadow-lg'
                        : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              )}
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 text-purple-700 font-grotesk-medium text-sm transition-all duration-200 transform hover:scale-105 cursor-pointer"
                    aria-haspopup="menu"
                    aria-expanded={accountOpen}
                    onClick={() => setAccountOpen((v) => !v)}
                  >
                    <div className="w-6 h-6 rounded-full bg-linear-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <UserCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span>Account</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                  {accountOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-purple-100 bg-white/95 backdrop-blur-md shadow-xl">
                      <div className="p-2">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-grotesk-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200"
                          onClick={() => setAccountOpen(false)}
                        >
                          <UserCircle2 className="w-4 h-4" />
                          Profile
                        </Link>
                        {/* {userRoles.includes('user') && (
                          <Link
                            to="/dashboard"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-grotesk-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200"
                            onClick={() => setAccountOpen(false)}
                          >
                            <Sparkles className="w-4 h-4" />
                            Dashboard
                          </Link>
                        )} */}
                        <div className="my-2 h-px bg-linear-to-r from-transparent via-purple-200 to-transparent"></div>
                        <button
                          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-grotesk-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                          onClick={() => {
                            setAccountOpen(false);
                            clientLogout();
                          }}
                        >
                          <X className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-3">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-xl font-grotesk-medium text-sm transition-all duration-200 ${
                        isActive
                          ? 'text-purple-600 bg-purple-100'
                          : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                      }`
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `px-6 py-2 rounded-xl font-grotesk-medium text-sm text-white bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 ${
                        isActive ? 'ring-2 ring-purple-300' : ''
                      }`
                    }
                  >
                    Register
                  </NavLink>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                type="button"
                className="lg:hidden p-2 rounded-xl text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((v) => !v)}
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-purple-100/50 bg-white/95 backdrop-blur-md">
            <div className="container mx-auto px-6 py-6">
              <div className="flex flex-col space-y-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-grotesk-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-linear-to-r from-purple-500 to-blue-500 shadow-lg'
                        : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/episodes"
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-grotesk-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-linear-to-r from-purple-500 to-blue-500 shadow-lg'
                        : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Episodes
                </NavLink>
                <NavLink
                  to="/reviews"
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-grotesk-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-linear-to-r from-purple-500 to-blue-500 shadow-lg'
                        : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Reviews
                </NavLink>
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-grotesk-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-linear-to-r from-purple-500 to-blue-500 shadow-lg'
                        : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Blogs
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-grotesk-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-linear-to-r from-purple-500 to-blue-500 shadow-lg'
                        : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </NavLink>
                {isLoggedIn && userRoles.includes('user') && (
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl font-grotesk-medium text-sm transition-all duration-200 ${
                        isActive
                          ? 'text-white bg-linear-to-r from-purple-500 to-blue-500 shadow-lg'
                          : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                )}

                <div className="h-px bg-linear-to-r from-transparent via-purple-200 to-transparent my-4"></div>

                {isLoggedIn ? (
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-grotesk-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <UserCircle2 className="w-4 h-4" />
                      Profile
                    </Link>
                    <button
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm font-grotesk-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                      onClick={() => {
                        setIsOpen(false);
                        clientLogout();
                      }}
                    >
                      <X className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl font-grotesk-medium text-sm text-center transition-all duration-200 ${
                          isActive
                            ? 'text-purple-600 bg-purple-100'
                            : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl font-grotesk-medium text-sm text-center text-white bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg transition-all duration-200 ${
                          isActive ? 'ring-2 ring-purple-300' : ''
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      Register
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
    </>
  );
}
