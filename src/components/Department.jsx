
import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  Building2,
  LayoutGrid,
  MoreVertical,
  X,
  Plus,
  Briefcase,
  User,
  LogOut,
  Calendar,
} from "lucide-react";
import logo from "../assets/logo.png";
import API from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { useNavigate, NavLink } from "react-router-dom"; // Added NavLink import

const Departments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const sidebarRef = useRef(null);
  const closeBtnRef = useRef(null);
  const searchInputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get current user from Redux store - using the same approach as Dashboard
  const { access, user } = useSelector((state) => state.auth);

  // Create display name and role using the same logic as Dashboard
  const displayName = (() => {
    const full = `${user?.first_name || ""} ${user?.last_name || ""}`.trim();
    return full || user?.username || user?.email || "User";
  })();

  const displayRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "—";

  // Fetch departments from API
  const fetchDepartments = async (params = {}) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (params.search) queryParams.append('search', params.search);
      
      const response = await API.get(`departments/?${queryParams.toString()}`);
      setDepartments(response.data.results || response.data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search - real-time search as user types
  const handleSearch = (value) => {
    setSearchTerm(value);
    fetchDepartments({ search: value });
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutUser({ navigate }));
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

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

  const AddDepartmentModal = ({ isOpen, onClose }) => {
    const [departmentName, setDepartmentName] = useState("");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
      if (!isOpen) {
        setDepartmentName("");
      }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
      e.preventDefault();
      setUploading(true);
      
      try {
        const departmentData = {
          name: departmentName,
          status: 'active'
        };

        await API.post("departments/", departmentData);
        fetchDepartments({ search: searchTerm });
        onClose();
      } catch (error) {
        console.error("Failed to add department:", error);
        if (error.response?.data) {
          const errorMsg = Object.values(error.response.data).flat().join(', ');
          alert(`Failed to add department: ${errorMsg}`);
        } else {
          alert('Failed to add department. Please try again.');
        }
      } finally {
        setUploading(false);
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white">
          <div className="px-6 sm:px-10 pt-8 pb-6">
            <div className="mb-8 flex items-start justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Add Department</h2>
              <button onClick={onClose} className="text-2xl leading-none text-gray-500 hover:text-gray-700">×</button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Department Name - Only field in modal */}
              <div className="mb-8">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Department Name
                </label>
                <input
                  name="departmentName"
                  placeholder="Department Name"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  required
                  className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex w-full items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl bg-[#E9E9F1] px-8 py-3 text-[15px] font-semibold text-[#0B1A50] hover:bg-[#E1E1EE] transition"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#0B1A50] px-8 py-3 text-[15px] font-semibold text-white hover:bg-[#0A1748] transition disabled:opacity-50"
                  disabled={uploading}
                >
                  {uploading ? "Adding..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (showAddModal) setShowAddModal(false);
        else if (searchOpen) setSearchOpen(false);
        else setSidebarOpen(false);
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
      setSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", onResize);
    if (sidebarOpen) setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [sidebarOpen, searchOpen, showAddModal]);

  return (
    <div className="h-screen bg-[#F6F8FC] flex overflow-hidden">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside
          ref={sidebarRef}
          className="fixed inset-y-0 left-0 md:relative w-64 bg-[#0B1A50] text-white z-50 flex flex-col"
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

      {/* Mobile Overlay */}
      {sidebarOpen && window.innerWidth < 768 && (
        <button
          type="button"
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close overlay"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white flex items-center justify-between px-4 md:px-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger menu */}
            <button
              className="p-2 rounded-md hover:bg-gray-50 flex flex-col justify-center items-center gap-1.5"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Toggle sidebar"
            >
              <span className="block w-6 h-0.5 bg-[#2C2C74] rounded"></span>
              <span className="block w-4 h-0.5 bg-[#2C2C74] rounded self-end"></span>
              <span className="block w-6 h-0.5 bg-[#2C2C74] rounded"></span>
            </button>
            <h1 className="text-base sm:text-[17px] font-semibold text-gray-900">
              Departments
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200 w-48 sm:w-56 lg:w-72">
                  <Search size={16} className="text-gray-400 shrink-0" />
                  <input
                    ref={searchInputRef}
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
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

            {/* Updated to show logged-in user's name dynamically using Dashboard approach */}
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
                onClick={handleLogout}
                className="p-2 rounded-md hover:bg-gray-50"
                aria-label="Logout"
              >
                <LogOut size={18} className="text-gray-600" />
              </button>
            ) : null}
            
            <button className="p-2 rounded-md hover:bg-gray-50">
              <MoreVertical size={18} />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            {/* Add Department Button */}
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-[#0B1A50] hover:bg-[#0A1748] text-white font-medium flex items-center gap-2 px-5 py-2 rounded-lg text-sm shadow-sm"
              >
                <Plus size={16} />
                Add Department
              </button>
            </div>

            {/* Search bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                <Search size={16} className="text-gray-400 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>
            </div>

            {/* Departments List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Departments
                </h3>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-gray-500">Loading departments...</div>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {departments.length === 0 ? (
                    <div className="px-6 py-8 text-center text-gray-500">
                      No departments found
                    </div>
                  ) : (
                    departments.map((department) => (
                      <div key={department.id} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{department.name}</h4>
                            {department.description && (
                              <p className="text-sm text-gray-500 mt-1">{department.description}</p>
                            )}
                            {department.created_at && (
                              <div className="flex items-center gap-2 mt-2">
                                <Calendar size={12} className="text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  Created on {formatDate(department.created_at)}
                                </span>
                              </div>
                            )}
                          </div>
                          {department.staff_count !== undefined && (
                            <div className="text-right">
                              <span className="text-sm font-medium text-gray-900">
                                {department.staff_count}
                              </span>
                              <p className="text-xs text-gray-500">
                                Staff
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Department Modal */}
      <AddDepartmentModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
};

export default Departments;
