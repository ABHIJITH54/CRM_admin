
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
  Calendar,
  Briefcase,
  User,
  ChevronDown,
  LogOut,
} from "lucide-react";
import logo from "../assets/logo.png";
import API from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { useNavigate, NavLink } from "react-router-dom"; // Added NavLink import

const Manager = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [departments, setDepartments] = useState([]);

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

  // Fetch managers from API
  const fetchManagers = async (params = {}) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (params.search) queryParams.append('search', params.search);
      if (params.from_date) queryParams.append('from_date', params.from_date);
      if (params.to_date) queryParams.append('to_date', params.to_date);
      
      const response = await API.get(`managers/?${queryParams.toString()}`);
      setManagers(response.data.results || response.data);
    } catch (error) {
      console.error("Failed to fetch managers:", error);
      setManagers([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch departments for dropdown
  const fetchDepartments = async () => {
    try {
      const response = await API.get('departments/list/');
      setDepartments(response.data || []);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      setDepartments([]);
    }
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchTerm(value);
    fetchManagers({ search: value, from_date: fromDate, to_date: toDate });
  };

  // Handle filter apply
  const handleApplyFilter = () => {
    fetchManagers({ search: searchTerm, from_date: fromDate, to_date: toDate });
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutUser({ navigate }));
  };

  // Handle status toggle
  const handleStatusToggle = async (managerId, currentStatus) => {
    try {
      await API.patch(`managers/${managerId}/`, {
        status: currentStatus ? 'inactive' : 'active'
      });
      fetchManagers({ search: searchTerm, from_date: fromDate, to_date: toDate });
    } catch (error) {
      console.error("Failed to update manager status:", error);
      alert('Failed to update manager status. Please try again.');
    }
  };

  useEffect(() => {
    fetchManagers();
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

  const ToggleSwitch = ({ enabled, onChange }) => {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`${
          enabled ? "bg-[#0B1A50]" : "bg-gray-300"
        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 focus:outline-none`}
      >
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200`}
        />
      </button>
    );
  };

  const AddManagerModal = ({ isOpen, onClose }) => {
    const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      phone: "",
      mail: "",
      department: "",
      teamName: "",
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
      if (!isOpen) {
        setForm({
          firstName: "",
          lastName: "",
          phone: "",
          mail: "",
          department: "",
          teamName: "",
        });
      }
    }, [isOpen]);

    if (!isOpen) return null;

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
      e.preventDefault();
      setUploading(true);
      
      try {
        const managerData = {
          first_name: form.firstName,
          last_name: form.lastName,
          phone: form.phone,
          user_email: form.mail,
          department: form.department,
          team_name: form.teamName,
          password: 'defaultpassword123',
          status: 'active'
        };

        await API.post("managers/", managerData);
        fetchManagers({ search: searchTerm, from_date: fromDate, to_date: toDate });
        onClose();
      } catch (error) {
        console.error("Failed to add manager:", error);
        if (error.response?.data) {
          const errorMsg = Object.values(error.response.data).flat().join(', ');
          alert(`Failed to add manager: ${errorMsg}`);
        } else {
          alert('Failed to add manager. Please try again.');
        }
      } finally {
        setUploading(false);
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-4xl rounded-2xl bg-white">
          <div className="px-6 sm:px-10 pt-8 pb-6">
            <div className="mb-8 flex items-start justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Add Manager</h2>
              <button onClick={onClose} className="text-2xl leading-none text-gray-500 hover:text-gray-700">×</button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* First Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">First Name</label>
                  <input
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={onChange}
                    required
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">Last Name</label>
                  <input
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={onChange}
                    required
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">Phone</label>
                  <div className="flex items-stretch rounded-xl bg-gray-100">
                    <div className="flex items-center gap-2 rounded-l-xl px-3">
                      {/* India flag stripes */}
                      <span className="inline-block h-4 w-6 overflow-hidden rounded-[2px]">
                        <span className="block h-1/3 w-full bg-orange-500" />
                        <span className="block h-1/3 w-full bg-white" />
                        <span className="block h-1/3 w-full bg-green-600" />
                      </span>
                      <span className="text-sm font-medium text-gray-900">+91</span>
                    </div>
                    <input
                      name="phone"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={onChange}
                      required
                      className="min-w-0 flex-1 rounded-r-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
                    />
                  </div>
                </div>

                {/* Mail */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">Mail</label>
                  <input
                    name="mail"
                    type="email"
                    placeholder="Mail"
                    value={form.mail}
                    onChange={onChange}
                    required
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">Department</label>
                  <div className="relative">
                    <select
                      name="department"
                      value={form.department}
                      onChange={onChange}
                      required
                      className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 pr-10 text-gray-900 outline-none"
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
                  </div>
                </div>

                {/* Team Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">Team</label>
                  <input
                    name="teamName"
                    placeholder="Team Name"
                    value={form.teamName}
                    onChange={onChange}
                    required
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="mt-10 flex w-full items-center justify-end gap-4">
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
            <h1 className="text-base sm:text-[17px] font-semibold text-gray-900">Manager</h1>
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
            {/* Add Manager Button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-[#0B1A50] hover:bg-[#0A1748] text-white font-medium flex items-center gap-2 px-5 py-2 rounded-lg text-sm shadow-sm"
              >
                <Plus size={16} />
                Add Manager
              </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 mb-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex-1" />
                <div className="w-full sm:w-[320px]">
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
                    <Search size={16} className="text-gray-400 mr-3 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Search" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent outline-none text-sm w-full" 
                    />
                  </div>
                </div>
                <div className="flex-1 flex justify-end items-center gap-3 min-w-[260px]">
                  <div className="hidden sm:flex items-center gap-3">
                    <span className="text-sm text-gray-600">From</span>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                      <Calendar size={14} className="text-gray-400 mr-2" />
                      <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="bg-transparent text-sm outline-none"
                      />
                    </div>
                    <span className="text-sm text-gray-600">To</span>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                      <Calendar size={14} className="text-gray-400 mr-2" />
                      <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="bg-transparent text-sm outline-none"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={handleApplyFilter}
                    className="bg-[#0B1A50] hover:bg-[#0A1748] text-white font-medium px-5 py-2 rounded-lg text-sm"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Managers Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-gray-500">Loading managers...</div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined On</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mail</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {managers.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                            No managers found
                          </td>
                        </tr>
                      ) : (
                        managers.map((manager) => (
                          <tr key={manager.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-md font-medium">
                                {manager.employee_id || manager.username || `mgr_${manager.id.toString().padStart(3, '0')}`}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {manager.name || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {manager.phone || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {manager.department_name || manager.department || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {manager.team_name || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-gray-400" />
                                <span className="text-sm text-gray-900">
                                  {formatDate(manager.joined_date || manager.created_at)}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-[220px] truncate">
                              {manager.email || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <ToggleSwitch 
                                enabled={manager.status === 'active' || manager.status === true} 
                                onChange={() => handleStatusToggle(manager.id, manager.status === 'active' || manager.status === true)} 
                              />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Manager Modal */}
      <AddManagerModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
};

export default Manager;
