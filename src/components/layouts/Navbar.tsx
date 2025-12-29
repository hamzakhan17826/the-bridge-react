import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, UserCircle2 } from 'lucide-react';
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

  // Auth is read directly and stored in state so UI updates without page refresh
  return (
    <>
      <nav className="bg-white px-6 py-4 relative">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="text-purple-800 flex flex-col items-center">
              <Link to="/">
                <img
                  className="logo-default h-16"
                  src="/images/the-bridge-logo.png"
                  alt="The bridge logo"
                  width={100}
                  height={64}
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-8 tracking-widest">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? 'text-primary font-bold' : 'text-gray-900'}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/episodes"
                className={({ isActive }) =>
                  `${isActive ? 'text-primary font-bold' : 'text-gray-900'}`
                }
              >
                Episodes
              </NavLink>
              <NavLink
                to="/reviews"
                className={({ isActive }) =>
                  `${isActive ? 'text-primary font-bold' : 'text-gray-900'}`
                }
              >
                Reviews
              </NavLink>
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  `${isActive ? 'text-primary font-bold' : 'text-gray-900'}`
                }
              >
                Blogs
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${isActive ? 'text-primary font-bold' : 'text-gray-900'}`
                }
              >
                Contact
              </NavLink>
              <div className="h-6 w-px bg-gray-300" />

              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-700 cursor-pointer"
                    aria-haspopup="menu"
                    aria-expanded={accountOpen}
                    onClick={() => setAccountOpen((v) => !v)}
                  >
                    <UserCircle2 className="h-5 w-5" />
                    <span>Account</span>
                  </button>
                  {accountOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow-lg">
                      <div className="flex flex-col p-2 text-sm font-bold tracking-widest">
                        <Link
                          to="/profile"
                          className="py-2 px-2 text-gray-900 hover:text-gray-700"
                          onClick={() => setAccountOpen(false)}
                        >
                          Profile
                        </Link>
                        {userRoles.includes('admin') && (
                          <Link
                            to="/dashboard"
                            className="py-2 text-gray-900 hover:text-gray-700"
                            onClick={() => setAccountOpen(false)}
                          >
                            Dashboard
                          </Link>
                        )}
                        <div className="my-2 h-px w-full bg-gray-200" />
                        <button
                          className="py-2 px-2 text-left text-gray-900 hover:text-gray-700 cursor-pointer"
                          onClick={() => {
                            setAccountOpen(false);
                            clientLogout();
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `${isActive ? 'text-primary font-bold' : 'text-gray-900'}`
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `${isActive ? 'text-white bg-primary px-2 py-1 rounded-lg' : 'text-white bg-primary px-2 py-1 rounded-lg text-gray-900'}`
                    }
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((v) => !v)}
            >
              {isOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden absolute top-full z-50 w-full right-0 border border-gray-200 bg-white shadow-lg"
          >
            <div className="flex flex-col p-4 text-xs font-bold tracking-widest uppercase">
              <Link
                to="/"
                className="py-2 text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/episodes"
                className="py-2 text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Episodes
              </Link>
              <Link
                to="/reviews"
                className="py-2 text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </Link>
              <Link
                to="/blogs"
                className="py-2 text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Blogs
              </Link>
              <Link
                to="/contact"
                className="py-2 text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <div className="my-2 h-px w-full bg-gray-200" />
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="py-2 text-gray-900"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  {userRoles.includes('admin') && (
                    <Link
                      to="/dashboard"
                      className="py-2 text-gray-900"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    className="mt-2 inline-flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-gray-900"
                    onClick={() => {
                      setIsOpen(false);
                      clientLogout();
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="py-2 text-gray-900"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
