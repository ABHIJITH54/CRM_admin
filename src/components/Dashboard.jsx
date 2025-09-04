
import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  Building2,
  LayoutGrid,
  MoreVertical,
  X,
  User,
  Briefcase,
  LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom"; // Added NavLink import
import logo from "../assets/logo.png";
import API from "../api/api";
import { logoutUser } from "../store/authSlice";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total_managers: 0,
    total_staff: 0,
    total_customers: 0,
    total_departments: 0,
  });
  const [customers, setCustomers] = useState([]);

  const sidebarRef = useRef(null);
  const closeBtnRef = useRef(null);
  const searchInputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access, user } = useSelector((state) => state.auth);

  const statusStyles = (status) => {
    if (status === "New") return "bg-green-50 text-green-600 ring-green-100";
    if (status === "Converted") return "bg-red-50 text-red-600 ring-red-100";
    if (status === "In Progress") return "bg-amber-50 text-amber-700 ring-amber-100";
    return "bg-gray-100 text-gray-600 ring-gray-200";
  };

  // Updated NavItem component with React Router navigation
  const NavItem = ({ icon: Icon, label, to }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full text-left flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
          isActive 
            ? "bg-white text-[#0B1A50] font-medium" 
            : "text-white/80 hover:bg-white/10"
        }`
      }
    >
      <Icon size={18} className="shrink-0" />
      <span className="text-sm truncate">{label}</span>
    </NavLink>
  );

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (searchOpen) {
          setSearchOpen(false);
        } else {
          setSidebarOpen(false);
        }
      }
      if (e.key === "Tab" && sidebarOpen) {
        const focusables = sidebarRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    const onResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", onResize);
    if (sidebarOpen) setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [sidebarOpen, searchOpen]);

  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await API.get("dashboard/stats/");
        if (!isMounted) return;
        const data = res.data || {};
        setStats({
          total_managers: data.total_managers ?? 0,
          total_staff: data.total_staff ?? 0,
          total_customers: data.total_customers ?? 0,
          total_departments: data.total_departments ?? 0,
        });
        setCustomers(Array.isArray(data.recent_customers) ? data.recent_customers : []);
      } catch (e) {
        setStats({
          total_managers: 0,
          total_staff: 0,
          total_customers: 0,
          total_departments: 0,
        });
        setCustomers([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, []);

  const statCards = [
    { label: "Total Managers", value: stats.total_managers, icon: "👤" },
    { label: "Total Staffs", value: stats.total_staff, icon: "🧑‍💼" },
    { label: "Total Customers", value: stats.total_customers, icon: "🧳" },
    { label: "Total Departments", value: stats.total_departments, icon: "🏢" },
  ];

  const handleLogout = () => {
    dispatch(logoutUser({ navigate }));
  };

  const displayName = (() => {
    const full = `${user?.first_name || ""} ${user?.last_name || ""}`.trim();
    return full || user?.username || user?.email || "User";
  })();

  const displayRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "—";

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex">
      {sidebarOpen && (
        <aside
          ref={sidebarRef}
          className="fixed md:relative top-0 left-0 h-screen w-72 md:w-64 bg-[#0B1A50] text-white z-50 flex flex-col"
          aria-hidden={false}
        >
          <div className="h-16 flex items-center justify-between gap-3 px-4 border-b border-white/10">
            <img src={logo} alt="Company Logo" className="h-8 w-auto object-contain" />
            <button
              ref={closeBtnRef}
              type="button"
              className="md:hidden p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Updated navigation with React Router NavLinks */}
          <nav className="flex-1 mt-2 px-3 space-y-1 pb-6 overflow-y-auto">
            <NavItem icon={User} label="Dashboard" to="/dashboard" />
            <NavItem icon={Users} label="Managers" to="/manager" />
            <NavItem icon={LayoutGrid} label="Staff Management" to="/staff" />
            <NavItem icon={Briefcase} label="Customers" to="/customers" />
            <NavItem icon={Building2} label="Departments" to="/department" />
          </nav>
        </aside>
      )}

      {sidebarOpen && window.innerWidth < 768 && (
        <button
          type="button"
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close overlay"
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 flex items-center px-3 sm:px-4 md:px-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-md hover:bg-gray-50 flex flex-col justify-center items-center gap-1.5"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Toggle sidebar"
            >
              <span className="block w-6 h-0.5 bg-[#2C2C74] rounded"></span>
              <span className="block w-4 h-0.5 bg-[#2C2C74] rounded self-end"></span>
              <span className="block w-6 h-0.5 bg-[#2C2C74] rounded"></span>
            </button>
            <h1 className="text-base sm:text-[17px] font-semibold text-gray-900">Dashboard</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200 w-48 sm:w-56 lg:w-72">
                  <Search size={16} className="text-gray-400 shrink-0" />
                  <input
                    ref={searchInputRef}
                    placeholder="Search"
                    className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                    onBlur={() => setSearchOpen(false)}
                  />
                </div>
              ) : (
                <button
                  className="p-2 rounded-md hover:bg-gray-50"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Open search"
                >
                  <Search size={18} className="text-gray-600" />
                </button>
              )}
            </div>

            <div className="hidden sm:block text-right text-[11px] sm:text-xs leading-tight">
              <div className="font-medium text-gray-900 truncate max-w-[120px]">
                {displayName}
              </div>
              <div className="text-gray-500">{displayRole}</div>
            </div>

            <img
              alt="avatar"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
                user?.email || "user"
              )}`}
            />

            {access ? (
              <button
                className="p-2 rounded-md hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                onClick={handleLogout}
                aria-label="Logout"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            ) : null}

            <button className="p-2 rounded-md hover:bg-gray-50">
              <MoreVertical size={18} />
            </button>
          </div>
        </header>

        <div className="px-3 sm:px-4 md:px-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-4 sm:mt-6">
            Welcome, {displayName}!
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-4 sm:mt-6">
            {statCards.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-xl shadow-sm px-4 sm:px-5 py-3 sm:py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-base sm:text-lg">
                    {s.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] sm:text-xs text-gray-500 truncate">
                      {s.label}
                    </div>
                    <div className="text-lg sm:text-xl font-semibold text-gray-900">
                      {loading ? 0 : s.value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm mt-4 sm:mt-6 overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4">
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900">
                Customers
              </h3>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="min-w-[720px] sm:min-w-full border-separate border-spacing-0">
                <thead>
                  <tr className="text-left text-[11px] sm:text-xs font-semibold text-gray-500">
                    <th className="px-4 sm:px-6 py-2 sm:py-3">Customer ID</th>
                    <th className="px-4 sm:px-6 py-2 sm:py-3">Name</th>
                    <th className="px-4 sm:px-6 py-2 sm:py-3">Phone</th>
                    <th className="px-4 sm:px-6 py-2 sm:py-3">Email</th>
                    <th className="px-4 sm:px-6 py-2 sm:py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] sm:text-sm text-gray-700">
                  {(loading ? [] : customers).map((c, idx) => (
                    <tr
                      key={(c.customer_id || c.id || "row") + idx}
                      className={idx % 2 === 1 ? "bg-gray-50/80" : ""}
                    >
                      <td className="px-4 sm:px-6 py-2 sm:py-3">
                        <span className="inline-block bg-gray-100 text-gray-600 text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-md">
                          {c.customer_id}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-2 sm:py-3 whitespace-nowrap">
                        <span className="truncate block max-w-[140px] sm:max-w-none">
                          {c.name}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-2 sm:py-3 whitespace-nowrap">
                        {c.phone}
                      </td>
                      <td className="px-4 sm:px-6 py-2 sm:py-3">
                        <span className="truncate block max-w-[180px] sm:max-w-none">
                          {c.email}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-2 sm:py-3">
                        <span
                          className={`inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium ring-1 ${statusStyles(
                            c.status === "new"
                              ? "New"
                              : c.status === "converted"
                              ? "Converted"
                              : c.status === "in_progress"
                              ? "In Progress"
                              : c.status
                          )}`}
                        >
                          {c.status === "new"
                            ? "New"
                            : c.status === "converted"
                            ? "Converted"
                            : c.status === "in_progress"
                            ? "In Progress"
                            : c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!loading && customers.length === 0 ? (
                    <tr>
                      <td
                        className="px-4 sm:px-6 py-6 text-center text-gray-500"
                        colSpan={5}
                      >
                        No recent customers
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          <div className="h-10 sm:h-16" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
