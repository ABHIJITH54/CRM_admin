
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
  User,
  Briefcase,
  ChevronDown,
  LogOut,
} from "lucide-react";
import logo from "../assets/logo.png";
import API from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { useNavigate, NavLink } from "react-router-dom"; // Added NavLink import

const StaffManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [managers, setManagers] = useState([]);
  
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

  // Fetch staff from API
  const fetchStaff = async (params = {}) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (params.search) queryParams.append('search', params.search);
      if (params.from_date) queryParams.append('from_date', params.from_date);
      if (params.to_date) queryParams.append('to_date', params.to_date);
      
      const response = await API.get(`staff/?${queryParams.toString()}`);
      setStaffMembers(response.data.results || response.data);
    } catch (error) {
      console.error("Failed to fetch staff:", error);
      setStaffMembers([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch managers for dropdown
  const fetchManagers = async () => {
    try {
      const response = await API.get('managers/list/');
      setManagers(response.data || []);
    } catch (error) {
      console.error("Failed to fetch managers:", error);
      setManagers([]);
    }
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchTerm(value);
    fetchStaff({ search: value, from_date: fromDate, to_date: toDate });
  };

  // Handle filter apply
  const handleApplyFilter = () => {
    fetchStaff({ search: searchTerm, from_date: fromDate, to_date: toDate });
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutUser({ navigate }));
  };

  // Handle status toggle
  const handleStatusToggle = async (staffId, currentStatus) => {
    try {
      await API.patch(`staff/${staffId}/`, {
        status: currentStatus ? 'inactive' : 'active'
      });
      fetchStaff({ search: searchTerm, from_date: fromDate, to_date: toDate });
    } catch (error) {
      console.error("Failed to update staff status:", error);
      alert('Failed to update staff status. Please try again.');
    }
  };

  useEffect(() => {
    fetchStaff();
    fetchManagers();
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

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`${enabled ? "bg-[#0B1A50]" : "bg-gray-300"} relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 focus:outline-none`}
    >
      <span className={`${enabled ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200`} />
    </button>
  );

  const AddStaffModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      phone: "",
      mail: "",
      skills: "",
      manager: "",
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
      if (!isOpen) {
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          mail: "",
          skills: "",
          manager: "",
        });
      }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
      e.preventDefault();
      setUploading(true);
      
      try {
        const staffData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          user_email: formData.mail,
          skill: formData.skills,
          manager: formData.manager,
          password: 'defaultpassword123',
          status: 'active'
        };

        await API.post("staff/", staffData);
        fetchStaff({ search: searchTerm, from_date: fromDate, to_date: toDate });
        onClose();
      } catch (error) {
        console.error("Failed to add staff:", error);
        if (error.response?.data) {
          const errorMsg = Object.values(error.response.data).flat().join(', ');
          alert(`Failed to add staff: ${errorMsg}`);
        } else {
          alert('Failed to add staff. Please try again.');
        }
      } finally {
        setUploading(false);
      }
    };

    const handleInputChange = (e) => {
      setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-4xl rounded-2xl bg-white">
          <div className="px-6 sm:px-10 pt-8 pb-4">
            <div className="mb-8 flex items-start justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Add Staff</h2>
              <button onClick={onClose} className="text-2xl leading-none text-gray-500 hover:text-gray-700">×</button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Grid: 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* First Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">First Name</label>
                  <input
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
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
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>

                {/* Phone with flag + +91 */}
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
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
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
                    value={formData.mail}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">Skills</label>
                  <input
                    name="skills"
                    placeholder="Skill"
                    value={formData.skills}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>

                {/* Manager */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">Manager</label>
                  <div className="relative">
                    <select
                      name="manager"
                      value={formData.manager}
                      onChange={handleInputChange}
                      required
                      className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 pr-10 text-gray-900 placeholder-gray-500 outline-none"
                    >
                      <option value="">Select Manager</option>
                      {managers.map((manager) => (
                        <option key={manager.id} value={manager.id}>
                          {manager.name || `${manager.user?.first_name} ${manager.user?.last_name}`}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  </div>
                </div>
              </div>

              {/* Footer buttons aligned right */}
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
    };
    window.addEventListener("keydown", onKey);
    const onResize = () => setSidebarOpen(window.innerWidth >= 768);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [showAddModal, searchOpen]);

  return (
    <div className="h-screen bg-[#F6F8FC] flex overflow-hidden">
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

      {sidebarOpen && window.innerWidth < 768 && (
        <button
          type="button"
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close overlay"
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white flex items-center justify-between px-4 md:px-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-md hover:bg-gray-50 flex flex-col justify-center items-center gap-1.5"
              onClick={() => setSidebarOpen((p) => !p)}
              aria-label="Toggle sidebar"
            >
              <span className="block w-6 h-0.5 bg-[#2C2C74] rounded" />
              <span className="block w-4 h-0.5 bg-[#2C2C74] rounded self-end" />
              <span className="block w-6 h-0.5 bg-[#2C2C74] rounded" />
            </button>
            <h1 className="text-base sm:text-[17px] font-semibold text-gray-900">
              Staff Management
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

        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-[#0B1A50] hover:bg-[#0A1748] text-white font-medium flex items-center gap-2 px-5 py-2 rounded-lg text-sm shadow-sm"
              >
                <Plus size={16} />
                Add Staff
              </button>
            </div>

            <div className="mb-6 rounded-xl bg-white p-4 sm:p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1" />
                <div className="w-full sm:w-[320px]">
                  <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2">
                    <Search size={16} className="mr-3 shrink-0 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>
                <div className="min-w-[260px] flex flex-1 items-center justify-end gap-3">
                  <div className="hidden items-center gap-3 sm:flex">
                    <span className="text-sm text-gray-600">From</span>
                    <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                      <Calendar size={14} className="mr-2 text-gray-400" />
                      <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="bg-transparent text-sm outline-none"
                      />
                    </div>
                    <span className="text-sm text-gray-600">To</span>
                    <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                      <Calendar size={14} className="mr-2 text-gray-400" />
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
                    className="rounded-lg bg-[#0B1A50] px-5 py-2 text-sm font-medium text-white hover:bg-[#0A1748]"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-gray-500">Loading staff...</div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="border-b bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Username
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Manager
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Skill
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Phone
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Joined On
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Mail
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {staffMembers.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                            No staff members found
                          </td>
                        </tr>
                      ) : (
                        staffMembers.map((staff) => (
                          <tr key={staff.id} className="hover:bg-gray-50">
                            <td className="whitespace-nowrap px-6 py-4">
                              <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                {staff.employee_id || staff.username || `user_${staff.id.toString().padStart(3, '0')}`}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                              {staff.name || 'N/A'}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                              {staff.manager_name || 'N/A'}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                              {staff.skill || 'N/A'}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                              {staff.phone || 'N/A'}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-gray-400" />
                                <span className="text-sm text-gray-900">
                                  {formatDate(staff.joined_date || staff.created_at)}
                                </span>
                              </div>
                            </td>
                            <td className="max-w-[220px] truncate whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                              {staff.email || 'N/A'}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <ToggleSwitch
                                enabled={staff.status === 'active' || staff.status === true}
                                onChange={() => handleStatusToggle(staff.id, staff.status === 'active' || staff.status === true)}
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

      <AddStaffModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
};

export default StaffManagement;
