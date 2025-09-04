// import React, { useEffect, useRef, useState } from "react";
// import {
//   Search,
//   Users,
//   UserCheck,
//   Building2,
//   LayoutGrid,
//   MoreVertical,
//   X,
//   Plus,
//   Calendar,
//   User,
//   Mars,
//   Venus,
//   Briefcase,
//   ChevronDown,
// } from "lucide-react";
// import logo from "../assets/logo.png";

// const Customers = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const sidebarRef = useRef(null);
//   const closeBtnRef = useRef(null);
//   const searchInputRef = useRef(null);

//   const customers = [
//     { id: "user_001", name: "Natsai Craig", phone: "+91 98765 43210", gender: "Female", addedOn: "20/12/25", mail: "Melonie_Wizz@gmail.com", status: "New", avatar: null },
//     { id: "user_002", name: "Kate Morrison", phone: "+91 98765 43210", gender: "Male", addedOn: "20/12/25", mail: "Patrick_Mraz@yahoo.com", status: "Converted", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
//     { id: "user_003", name: "Natsai Craig", phone: "+91 98765 43210", gender: "Female", addedOn: "20/12/25", mail: "Bridget_Betty3@hotmail.com", status: "New", avatar: null },
//     { id: "user_004", name: "Drew Cano", phone: "+91 98765 43210", gender: "Male", addedOn: "20/12/25", mail: "Kenny_Wisozk11@hotmail.com", status: "Converted", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
//     { id: "user_005", name: "Orlando Diggs", phone: "+91 98765 43210", gender: "Male", addedOn: "20/12/25", mail: "Jane_Johnson84@hotmail.com", status: "New", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
//     { id: "user_006", name: "Natsai Craig", phone: "+91 98765 43210", gender: "Female", addedOn: "20/12/25", mail: "Leslie_Batz28@hotmail.com", status: "Converted", avatar: null },
//     { id: "user_007", name: "Andi Lane", phone: "+91 98765 43210", gender: "Male", addedOn: "20/12/25", mail: "Jaime_Jacobs@gmail.com", status: "In Progress", avatar: "https://randomuser.me/api/portraits/men/7.jpg" },
//     { id: "user_008", name: "Natsai Craig", phone: "+91 98765 43210", gender: "Female", addedOn: "20/12/25", mail: "Bruce22@hotmail.com", status: "Converted", avatar: null },
//   ];

//   const statusStyles = (status) => {
//     if (status === "New") return "bg-green-50 text-green-600 ring-green-100";
//     if (status === "Converted") return "bg-red-50 text-red-600 ring-red-100";
//     if (status === "In Progress") return "bg-amber-50 text-amber-700 ring-amber-100";
//     return "bg-gray-100 text-gray-600 ring-gray-200";
//   };

//   const NavItem = ({ active, icon: Icon, label }) => (
//     <button
//       type="button"
//       className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-md ${
//         active ? "bg-white text-[#0B1A50] font-medium" : "text-white/80 hover:bg-white/10"
//       }`}
//     >
//       <Icon size={18} className="shrink-0" />
//       <span className="text-sm truncate">{label}</span>
//     </button>
//   );

//   const AddCustomerModal = ({ isOpen, onClose }) => {
//     const [fileName, setFileName] = useState("Image012.png");
//     const [form, setForm] = useState({
//       fullName: "",
//       gender: "Male",
//       dob: "",
//       phone: "",
//       mail: "",
//     });

//     if (!isOpen) return null;

//     const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//         <div className="w-full max-w-4xl rounded-2xl bg-white">
//           <div className="px-6 sm:px-10 pt-8 pb-6">
//             <h2 className="mb-8 text-2xl font-semibold text-gray-900">Add Customer</h2>

//             {/* Grid Layout */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//               {/* Full Name */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Full Name</label>
//                 <input
//                   name="fullName"
//                   placeholder="Full Name"
//                   value={form.fullName}
//                   onChange={onChange}
//                   className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                 />
//               </div>

//               {/* Upload Profile Picture */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Upload Profile Picture</label>
//                 <div className="flex items-stretch overflow-hidden rounded-xl">
//                   <label className="cursor-pointer bg-gray-200 px-4 py-3 text-gray-900">
//                     <input
//                       type="file"
//                       className="hidden"
//                       onChange={(e) => {
//                         const f = e.target.files?.[0];
//                         if (f) setFileName(f.name);
//                       }}
//                     />
//                     Choose File
//                   </label>
//                   <div className="flex-1 bg-gray-100 px-4 py-3 text-gray-700 truncate">
//                     {fileName}
//                   </div>
//                   <button
//                     type="button"
//                     className="rounded-r-xl bg-[#0B1A50] px-5 py-3 text-white hover:bg-[#0A1748]"
//                   >
//                     Upload
//                   </button>
//                 </div>
//               </div>

//               {/* Gender */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Gender</label>
//                 <div className="relative">
//                   <select
//                     name="gender"
//                     value={form.gender}
//                     onChange={onChange}
//                     className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 pr-10 text-gray-900 outline-none"
//                   >
//                     <option>Male</option>
//                     <option>Female</option>
//                   </select>
//                   <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
//                 </div>
//               </div>

//               {/* Date of Birth */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Date of Birth</label>
//                 <input
//                   name="dob"
//                   type="text"
//                   placeholder="DD/MM/YYYY"
//                   value={form.dob}
//                   onChange={onChange}
//                   className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                 />
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Phone</label>
//                 <div className="flex items-stretch rounded-xl bg-gray-100">
//                   <div className="flex items-center gap-2 rounded-l-xl px-3">
//                     {/* India flag stripes */}
//                     <span className="inline-block h-4 w-6 overflow-hidden rounded-[2px]">
//                       <span className="block h-1/3 w-full bg-orange-500" />
//                       <span className="block h-1/3 w-full bg-white" />
//                       <span className="block h-1/3 w-full bg-green-600" />
//                     </span>
//                     <span className="text-sm font-medium text-gray-900">+91</span>
//                   </div>
//                   <input
//                     name="phone"
//                     placeholder="Phone"
//                     value={form.phone}
//                     onChange={onChange}
//                     className="min-w-0 flex-1 rounded-r-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                   />
//                 </div>
//               </div>

//               {/* Mail */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Mail</label>
//                 <input
//                   name="mail"
//                   placeholder="Mail"
//                   value={form.mail}
//                   onChange={onChange}
//                   className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                 />
//               </div>
//             </div>

//             {/* Footer Buttons */}
//             <div className="mt-10 flex w-full items-center justify-end gap-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="rounded-xl bg-[#E9E9F1] px-8 py-3 text-[15px] font-semibold text-[#0B1A50] hover:bg-[#E1E1EE] transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="rounded-xl bg-[#0B1A50] px-8 py-3 text-[15px] font-semibold text-white hover:bg-[#0A1748] transition"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   useEffect(() => {
//     if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
//   }, [searchOpen]);

//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") {
//         if (showAddModal) setShowAddModal(false);
//         else if (searchOpen) setSearchOpen(false);
//         else setSidebarOpen(false);
//       }
//       if (e.key === "Tab" && sidebarOpen) {
//         const focusables = sidebarRef.current?.querySelectorAll(
//           'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//         );
//         if (!focusables?.length) return;
//         const first = focusables[0];
//         const last = focusables[focusables.length - 1];
//         if (e.shiftKey && document.activeElement === first) {
//           e.preventDefault();
//           last.focus();
//         } else if (!e.shiftKey && document.activeElement === last) {
//           e.preventDefault();
//           first.focus();
//         }
//       }
//     };
//     document.addEventListener("keydown", onKey);

//     const onResize = () => {
//       setSidebarOpen(window.innerWidth >= 768);
//     };
//     window.addEventListener("resize", onResize);
//     if (sidebarOpen) setTimeout(() => closeBtnRef.current?.focus(), 50);
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       window.removeEventListener("resize", onResize);
//     };
//   }, [sidebarOpen, searchOpen, showAddModal]);

//   return (
//     <div className="h-screen bg-[#F6F8FC] flex overflow-hidden">
//       {sidebarOpen && (
//         <aside
//           ref={sidebarRef}
//           className="fixed inset-y-0 left-0 md:relative w-64 bg-[#0B1A50] text-white z-50 flex flex-col"
//           aria-hidden={false}
//         >
//           <div className="h-16 flex items-center justify-between gap-3 px-4 border-b border-white/10">
//             <img src={logo} alt="Company Logo" className="h-8 w-auto object-contain" />
//             <button
//               ref={closeBtnRef}
//               type="button"
//               className="md:hidden p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
//               onClick={() => setSidebarOpen(false)}
//               aria-label="Close sidebar"
//             >
//               <X size={18} />
//             </button>
//           </div>
//           <nav className="flex-1 mt-2 px-3 space-y-1 pb-6 overflow-y-auto">
//             <NavItem icon={User} label="Dashboard" />
//             <NavItem icon={Users} label="Managers" />
//             <NavItem active icon={LayoutGrid} label="Staff Management" />
//             <NavItem icon={Briefcase} label="Customers" />
//             <NavItem icon={Building2} label="Departments" />
//           </nav>
//         </aside>
//       )}

//       {sidebarOpen && window.innerWidth < 768 && (
//         <button
//           type="button"
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setSidebarOpen(false)}
//           aria-label="Close overlay"
//         />
//       )}

//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         <header className="h-16 bg-white flex items-center justify-between px-4 md:px-6 border-b border-gray-100 flex-shrink-0">
//           <div className="flex items-center gap-3">
//             <button
//               className="p-2 rounded-md hover:bg-gray-50 flex flex-col justify-center items-center gap-1.5"
//               onClick={() => setSidebarOpen((prev) => !prev)}
//               aria-label="Toggle sidebar"
//             >
//               <span className="block w-6 h-0.5 bg-[#2C2C74] rounded"></span>
//               <span className="block w-4 h-0.5 bg-[#2C2C74] rounded self-end"></span>
//               <span className="block w-6 h-0.5 bg-[#2C2C74] rounded"></span>
//             </button>
//             <h1 className="text-base sm:text-[17px] font-semibold text-gray-900">Customers</h1>
//           </div>

//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="relative">
//               {searchOpen ? (
//                 <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200 w-48 sm:w-56 lg:w-72">
//                   <Search size={16} className="text-gray-400 shrink-0" />
//                   <input
//                     ref={searchInputRef}
//                     placeholder="Search"
//                     className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
//                     onBlur={() => setSearchOpen(false)}
//                   />
//                 </div>
//               ) : (
//                 <button
//                   className="p-2 rounded-md hover:bg-gray-50"
//                   onClick={() => setSearchOpen(true)}
//                   aria-label="Open search"
//                 >
//                   <Search size={18} className="text-gray-600" />
//                 </button>
//               )}
//             </div>

//             <div className="hidden sm:block text-right text-[11px] sm:text-xs leading-tight">
//               <div className="font-medium text-gray-900 truncate max-w-[120px]">John Mathew</div>
//               <div className="text-gray-500">Admin</div>
//             </div>
//             <img
//               alt="avatar"
//               className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
//               src={`https://api.dicebear.com/7.x/identicon/svg?seed=john`}
//             />
//             <button className="p-2 rounded-md hover:bg-gray-50">
//               <MoreVertical size={18} />
//             </button>
//           </div>
//         </header>

//         <div className="flex-1 overflow-auto">
//           <div className="p-4 md:p-6">
//             {/* Add Customer Button */}
//             <div className="flex justify-end mb-6">
//               <button 
//                 onClick={() => setShowAddModal(true)}
//                 className="bg-[#0B1A50] hover:bg-[#0A1748] text-white font-medium flex items-center gap-2 px-5 py-2 rounded-lg text-sm shadow-sm"
//               >
//                 <Plus size={16} />
//                 Add Customer
//               </button>
//             </div>

//             {/* Filters */}
//             <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 mb-6">
//               <div className="flex items-center gap-4 flex-wrap">
//                 <div className="flex-1" />
//                 <div className="w-full sm:w-[320px]">
//                   <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
//                     <Search size={16} className="text-gray-400 mr-3 shrink-0" />
//                     <input type="text" placeholder="Search" className="bg-transparent outline-none text-sm w-full" />
//                   </div>
//                 </div>
//                 <div className="flex-1 flex justify-end items-center gap-3 min-w-[260px]">
//                   <div className="hidden sm:flex items-center gap-3">
//                     <span className="text-sm text-gray-600">From</span>
//                     <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
//                       <Calendar size={14} className="text-gray-400 mr-2" />
//                       <span className="text-sm">16/11/2022</span>
//                     </div>
//                     <span className="text-sm text-gray-600">To</span>
//                     <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
//                       <Calendar size={14} className="text-gray-400 mr-2" />
//                       <span className="text-sm">25/11/2022</span>
//                     </div>
//                   </div>
//                   <button className="bg-[#0B1A50] hover:bg-[#0A1748] text-white font-medium px-5 py-2 rounded-lg text-sm">
//                     Apply
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Table */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead className="bg-gray-50 border-b">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added On</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mail</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {customers.map((c) => (
//                       <tr key={c.id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-md font-medium">
//                             {c.id}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-3">
//                             {c.avatar ? (
//                               <img src={c.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
//                             ) : (
//                               <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
//                                 <User size={16} className="text-gray-500" />
//                               </div>
//                             )}
//                             <span className="text-sm font-medium text-gray-900">{c.name}</span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.phone}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-2">
//                             {c.gender === "Male" ? (
//                               <Mars size={16} className="w-4 h-4 text-black" />
//                             ) : (
//                               <Venus size={16} className="w-4 h-4 text-black" />
//                             )}
//                             <span className="text-sm text-gray-900">{c.gender}</span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-2">
//                             <Calendar size={14} className="text-gray-400" />
//                             <span className="text-sm text-gray-900">{c.addedOn}</span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-[220px] truncate">
//                           {c.mail}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles(c.status)}`}>
//                             {c.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add Customer Modal */}
//       <AddCustomerModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
//     </div>
//   );
// };

// export default Customers;



// import React, { useEffect, useRef, useState } from "react";
// import {
//   Search,
//   Users,
//   UserCheck,
//   Building2,
//   LayoutGrid,
//   MoreVertical,
//   X,
//   Plus,
//   Calendar,
//   User,
//   Mars,
//   Venus,
//   Briefcase,
//   ChevronDown,
// } from "lucide-react";
// import logo from "../assets/logo.png";
// import API from "../api/api";

// const Customers = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const sidebarRef = useRef(null);
//   const closeBtnRef = useRef(null);
//   const searchInputRef = useRef(null);

//   const fetchCustomers = async (params = {}) => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams();
//       if (params.search) queryParams.append('search', params.search);
//       if (params.from_date) queryParams.append('from_date', params.from_date);
//       if (params.to_date) queryParams.append('to_date', params.to_date);
      
//       const response = await API.get(`customers/?${queryParams.toString()}`);
//       setCustomers(response.data.results || response.data);
//     } catch (error) {
//       console.error("Failed to fetch customers:", error);
//       setCustomers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (value) => {
//     setSearchTerm(value);
//     fetchCustomers({ search: value, from_date: fromDate, to_date: toDate });
//   };

//   const handleApplyFilter = () => {
//     fetchCustomers({ search: searchTerm, from_date: fromDate, to_date: toDate });
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const statusStyles = (status) => {
//     if (status === "New") return "bg-green-50 text-green-600 ring-green-100";
//     if (status === "Converted") return "bg-red-50 text-red-600 ring-red-100";
//     if (status === "In Progress") return "bg-amber-50 text-amber-700 ring-amber-100";
//     return "bg-gray-100 text-gray-600 ring-gray-200";
//   };

//   const NavItem = ({ active, icon: Icon, label }) => (
//     <button
//       type="button"
//       className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-md ${
//         active ? "bg-white text-[#0B1A50] font-medium" : "text-white/80 hover:bg-white/10"
//       }`}
//     >
//       <Icon size={18} className="shrink-0" />
//       <span className="text-sm truncate">{label}</span>
//     </button>
//   );

//   const AddCustomerModal = ({ isOpen, onClose }) => {
//     const [fileName, setFileName] = useState("Image012.png");
//     const [form, setForm] = useState({
//       fullName: "",
//       gender: "Male",
//       dob: "",
//       phone: "",
//       mail: "",
//     });
//     const [uploading, setUploading] = useState(false);

//     if (!isOpen) return null;

//     const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//     const handleSubmit = async () => {
//       setUploading(true);
//       try {
//         const customerData = {
//           name: form.fullName,
//           gender: form.gender,
//           date_of_birth: form.dob,
//           phone: form.phone,
//           email: form.mail,
//           status: "New"
//         };

//         await API.post("customers/", customerData);
//         fetchCustomers();
//         onClose();
//         setForm({
//           fullName: "",
//           gender: "Male",
//           dob: "",
//           phone: "",
//           mail: "",
//         });
//       } catch (error) {
//         console.error("Failed to add customer:", error);
//       } finally {
//         setUploading(false);
//       }
//     };

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//         <div className="w-full max-w-4xl rounded-2xl bg-white">
//           <div className="px-6 sm:px-10 pt-8 pb-6">
//             <h2 className="mb-8 text-2xl font-semibold text-gray-900">Add Customer</h2>

//             {/* Grid Layout */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//               {/* Full Name */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Full Name</label>
//                 <input
//                   name="fullName"
//                   placeholder="Full Name"
//                   value={form.fullName}
//                   onChange={onChange}
//                   className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                 />
//               </div>

//               {/* Upload Profile Picture */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Upload Profile Picture</label>
//                 <div className="flex items-stretch overflow-hidden rounded-xl">
//                   <label className="cursor-pointer bg-gray-200 px-4 py-3 text-gray-900">
//                     <input
//                       type="file"
//                       className="hidden"
//                       onChange={(e) => {
//                         const f = e.target.files?.[0];
//                         if (f) setFileName(f.name);
//                       }}
//                     />
//                     Choose File
//                   </label>
//                   <div className="flex-1 bg-gray-100 px-4 py-3 text-gray-700 truncate">
//                     {fileName}
//                   </div>
//                   <button
//                     type="button"
//                     className="rounded-r-xl bg-[#0B1A50] px-5 py-3 text-white hover:bg-[#0A1748]"
//                   >
//                     Upload
//                   </button>
//                 </div>
//               </div>

//               {/* Gender */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Gender</label>
//                 <div className="relative">
//                   <select
//                     name="gender"
//                     value={form.gender}
//                     onChange={onChange}
//                     className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 pr-10 text-gray-900 outline-none"
//                   >
//                     <option>Male</option>
//                     <option>Female</option>
//                   </select>
//                   <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
//                 </div>
//               </div>

//               {/* Date of Birth */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Date of Birth</label>
//                 <input
//                   name="dob"
//                   type="date"
//                   placeholder="DD/MM/YYYY"
//                   value={form.dob}
//                   onChange={onChange}
//                   className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                 />
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Phone</label>
//                 <div className="flex items-stretch rounded-xl bg-gray-100">
//                   <div className="flex items-center gap-2 rounded-l-xl px-3">
//                     {/* India flag stripes */}
//                     <span className="inline-block h-4 w-6 overflow-hidden rounded-[2px]">
//                       <span className="block h-1/3 w-full bg-orange-500" />
//                       <span className="block h-1/3 w-full bg-white" />
//                       <span className="block h-1/3 w-full bg-green-600" />
//                     </span>
//                     <span className="text-sm font-medium text-gray-900">+91</span>
//                   </div>
//                   <input
//                     name="phone"
//                     placeholder="Phone"
//                     value={form.phone}
//                     onChange={onChange}
//                     className="min-w-0 flex-1 rounded-r-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                   />
//                 </div>
//               </div>

//               {/* Mail */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Mail</label>
//                 <input
//                   name="mail"
//                   type="email"
//                   placeholder="Mail"
//                   value={form.mail}
//                   onChange={onChange}
//                   className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                 />
//               </div>
//             </div>

//             {/* Footer Buttons */}
//             <div className="mt-10 flex w-full items-center justify-end gap-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="rounded-xl bg-[#E9E9F1] px-8 py-3 text-[15px] font-semibold text-[#0B1A50] hover:bg-[#E1E1EE] transition"
//                 disabled={uploading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 className="rounded-xl bg-[#0B1A50] px-8 py-3 text-[15px] font-semibold text-white hover:bg-[#0A1748] transition disabled:opacity-50"
//                 disabled={uploading}
//               >
//                 {uploading ? "Adding..." : "Add Customer"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   useEffect(() => {
//     if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
//   }, [searchOpen]);

//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") {
//         if (showAddModal) setShowAddModal(false);
//         else if (searchOpen) setSearchOpen(false);
//         else setSidebarOpen(false);
//       }
//       if (e.key === "Tab" && sidebarOpen) {
//         const focusables = sidebarRef.current?.querySelectorAll(
//           'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//         );
//         if (!focusables?.length) return;
//         const first = focusables[0];
//         const last = focusables[focusables.length - 1];
//         if (e.shiftKey && document.activeElement === first) {
//           e.preventDefault();
//           last.focus();
//         } else if (!e.shiftKey && document.activeElement === last) {
//           e.preventDefault();
//           first.focus();
//         }
//       }
//     };
//     document.addEventListener("keydown", onKey);

//     const onResize = () => {
//       setSidebarOpen(window.innerWidth >= 768);
//     };
//     window.addEventListener("resize", onResize);
//     if (sidebarOpen) setTimeout(() => closeBtnRef.current?.focus(), 50);
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       window.removeEventListener("resize", onResize);
//     };
//   }, [sidebarOpen, searchOpen, showAddModal]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB');
//   };

//   return (
//     <div className="h-screen bg-[#F6F8FC] flex overflow-hidden">
//       {sidebarOpen && (
//         <aside
//           ref={sidebarRef}
//           className="fixed inset-y-0 left-0 md:relative w-64 bg-[#0B1A50] text-white z-50 flex flex-col"
//           aria-hidden={false}
//         >
//           <div className="h-16 flex items-center justify-between gap-3 px-4 border-b border-white/10">
//             <img src={logo} alt="Company Logo" className="h-8 w-auto object-contain" />
//             <button
//               ref={closeBtnRef}
//               type="button"
//               className="md:hidden p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
//               onClick={() => setSidebarOpen(false)}
//               aria-label="Close sidebar"
//             >
//               <X size={18} />
//             </button>
//           </div>
//           <nav className="flex-1 mt-2 px-3 space-y-1 pb-6 overflow-y-auto">
//             <NavItem icon={User} label="Dashboard" />
//             <NavItem icon={Users} label="Managers" />
//             <NavItem icon={LayoutGrid} label="Staff Management" />
//             <NavItem active icon={Briefcase} label="Customers" />
//             <NavItem icon={Building2} label="Departments" />
//           </nav>
//         </aside>
//       )}

//       {sidebarOpen && window.innerWidth < 768 && (
//         <button
//           type="button"
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setSidebarOpen(false)}
//           aria-label="Close overlay"
//         />
//       )}

//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         <header className="h-16 bg-white flex items-center justify-between px-4 md:px-6 border-b border-gray-100 flex-shrink-0">
//           <div className="flex items-center gap-3">
//             <button
//               className="p-2 rounded-md hover:bg-gray-50 flex flex-col justify-center items-center gap-1.5"
//               onClick={() => setSidebarOpen((prev) => !prev)}
//               aria-label="Toggle sidebar"
//             >
//               <span className="block w-6 h-0.5 bg-[#2C2C74] rounded"></span>
//               <span className="block w-4 h-0.5 bg-[#2C2C74] rounded self-end"></span>
//               <span className="block w-6 h-0.5 bg-[#2C2C74] rounded"></span>
//             </button>
//             <h1 className="text-base sm:text-[17px] font-semibold text-gray-900">Customers</h1>
//           </div>

//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="relative">
//               {searchOpen ? (
//                 <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200 w-48 sm:w-56 lg:w-72">
//                   <Search size={16} className="text-gray-400 shrink-0" />
//                   <input
//                     ref={searchInputRef}
//                     placeholder="Search"
//                     value={searchTerm}
//                     onChange={(e) => handleSearch(e.target.value)}
//                     className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
//                     onBlur={() => setSearchOpen(false)}
//                   />
//                 </div>
//               ) : (
//                 <button
//                   className="p-2 rounded-md hover:bg-gray-50"
//                   onClick={() => setSearchOpen(true)}
//                   aria-label="Open search"
//                 >
//                   <Search size={18} className="text-gray-600" />
//                 </button>
//               )}
//             </div>

//             <div className="hidden sm:block text-right text-[11px] sm:text-xs leading-tight">
//               <div className="font-medium text-gray-900 truncate max-w-[120px]">John Mathew</div>
//               <div className="text-gray-500">Admin</div>
//             </div>
//             <img
//               alt="avatar"
//               className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
//               src={`https://api.dicebear.com/7.x/identicon/svg?seed=john`}
//             />
//             <button className="p-2 rounded-md hover:bg-gray-50">
//               <MoreVertical size={18} />
//             </button>
//           </div>
//         </header>

//         <div className="flex-1 overflow-auto">
//           <div className="p-4 md:p-6">
//             {/* Add Customer Button */}
//             <div className="flex justify-end mb-6">
//               <button 
//                 onClick={() => setShowAddModal(true)}
//                 className="bg-[#0B1A50] hover:bg-[#0A1748] text-white font-medium flex items-center gap-2 px-5 py-2 rounded-lg text-sm shadow-sm"
//               >
//                 <Plus size={16} />
//                 Add Customer
//               </button>
//             </div>

//             {/* Filters */}
//             <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 mb-6">
//               <div className="flex items-center gap-4 flex-wrap">
//                 <div className="flex-1" />
//                 <div className="w-full sm:w-[320px]">
//                   <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
//                     <Search size={16} className="text-gray-400 mr-3 shrink-0" />
//                     <input 
//                       type="text" 
//                       placeholder="Search" 
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="bg-transparent outline-none text-sm w-full" 
//                     />
//                   </div>
//                 </div>
//                 <div className="flex-1 flex justify-end items-center gap-3 min-w-[260px]">
//                   <div className="hidden sm:flex items-center gap-3">
//                     <span className="text-sm text-gray-600">From</span>
//                     <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
//                       <Calendar size={14} className="text-gray-400 mr-2" />
//                       <input
//                         type="date"
//                         value={fromDate}
//                         onChange={(e) => setFromDate(e.target.value)}
//                         className="bg-transparent text-sm outline-none"
//                       />
//                     </div>
//                     <span className="text-sm text-gray-600">To</span>
//                     <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
//                       <Calendar size={14} className="text-gray-400 mr-2" />
//                       <input
//                         type="date"
//                         value={toDate}
//                         onChange={(e) => setToDate(e.target.value)}
//                         className="bg-transparent text-sm outline-none"
//                       />
//                     </div>
//                   </div>
//                   <button 
//                     onClick={handleApplyFilter}
//                     className="bg-[#0B1A50] hover:bg-[#0A1748] text-white font-medium px-5 py-2 rounded-lg text-sm"
//                   >
//                     Apply
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Table */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               {loading ? (
//                 <div className="flex items-center justify-center h-64">
//                   <div className="text-gray-500">Loading customers...</div>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full">
//                     <thead className="bg-gray-50 border-b">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added On</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mail</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {customers.length === 0 ? (
//                         <tr>
//                           <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
//                             No customers found
//                           </td>
//                         </tr>
//                       ) : (
//                         customers.map((c) => (
//                           <tr key={c.id} className="hover:bg-gray-50">
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-md font-medium">
//                                 {c.id}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-3">
//                                 {c.avatar || c.profile_picture ? (
//                                   <img src={c.avatar || c.profile_picture} alt="" className="w-8 h-8 rounded-full object-cover" />
//                                 ) : (
//                                   <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
//                                     <User size={16} className="text-gray-500" />
//                                   </div>
//                                 )}
//                                 <span className="text-sm font-medium text-gray-900">{c.name}</span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.phone}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-2">
//                                 {c.gender === "Male" ? (
//                                   <Mars size={16} className="w-4 h-4 text-black" />
//                                 ) : (
//                                   <Venus size={16} className="w-4 h-4 text-black" />
//                                 )}
//                                 <span className="text-sm text-gray-900">{c.gender}</span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-2">
//                                 <Calendar size={14} className="text-gray-400" />
//                                 <span className="text-sm text-gray-900">{formatDate(c.created_at || c.addedOn)}</span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-[220px] truncate">
//                               {c.email || c.mail}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles(c.status)}`}>
//                                 {c.status}
//                               </span>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add Customer Modal */}
//       <AddCustomerModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
//     </div>
//   );
// };

// export default Customers;







// import React, { useEffect, useRef, useState } from "react";
// import {
//   Search,
//   Users,
//   UserCheck,
//   Building2,
//   LayoutGrid,
//   MoreVertical,
//   X,
//   Plus,
//   Calendar,
//   User,
//   Mars,
//   Venus,
//   Briefcase,
//   ChevronDown,
//   LogOut,
// } from "lucide-react";
// import logo from "../assets/logo.png";
// import API from "../api/api";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "../store/authSlice";
// import { useNavigate } from "react-router-dom";

// const Customers = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const sidebarRef = useRef(null);
//   const closeBtnRef = useRef(null);
//   const searchInputRef = useRef(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Update the fetchCustomers function in your component
  
//    // Update the fetchCustomers function in your component
// const fetchCustomers = async (params = {}) => {
//   setLoading(true);
//   try {
//     const queryParams = new URLSearchParams();
//     if (params.search) queryParams.append('search', params.search);
//     if (params.from_date) queryParams.append('from_date', params.from_date);
//     if (params.to_date) queryParams.append('to_date', params.to_date);
    
//     const response = await API.get(`customers/?${queryParams.toString()}`);
//     setCustomers(response.data.results || response.data);
//   } catch (error) {
//     console.error("Failed to fetch customers:", error);
//     if (error.response?.status === 401) {
//       // Token might be expired, let the interceptor handle it
//       console.log("Authentication failed, redirecting to login...");
//     }
//     setCustomers([]);
//   } finally {
//     setLoading(false);
//   }
// };


//   const handleSearch = (value) => {
//     setSearchTerm(value);
//     fetchCustomers({ search: value, from_date: fromDate, to_date: toDate });
//   };

//   const handleApplyFilter = () => {
//     fetchCustomers({ search: searchTerm, from_date: fromDate, to_date: toDate });
//   };

//   const handleLogout = () => {
//     dispatch(logoutUser({ navigate }));
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const statusStyles = (status) => {
//     if (status === "New") return "bg-green-50 text-green-600 ring-green-100";
//     if (status === "Converted") return "bg-red-50 text-red-600 ring-red-100";
//     if (status === "In Progress") return "bg-amber-50 text-amber-700 ring-amber-100";
//     return "bg-gray-100 text-gray-600 ring-gray-200";
//   };

//   const NavItem = ({ active, icon: Icon, label }) => (
//     <button
//       type="button"
//       className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-md ${
//         active ? "bg-white text-[#0B1A50] font-medium" : "text-white/80 hover:bg-white/10"
//       }`}
//     >
//       <Icon size={18} className="shrink-0" />
//       <span className="text-sm truncate">{label}</span>
//     </button>
//   );

//   const AddCustomerModal = ({ isOpen, onClose }) => {
//     const [fileName, setFileName] = useState("Image012.png");
//     const [form, setForm] = useState({
//       fullName: "",
//       gender: "Male",
//       dob: "",
//       phone: "",
//       mail: "",
//     });
//     const [uploading, setUploading] = useState(false);

//     if (!isOpen) return null;

//     const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//     const handleSubmit = async () => {
//       setUploading(true);
//       try {
//         const customerData = {
//           name: form.fullName,
//           gender: form.gender,
//           date_of_birth: form.dob,
//           phone: form.phone,
//           email: form.mail,
//           status: "New"
//         };

//         await API.post("customers/", customerData);
//         fetchCustomers();
//         onClose();
//         setForm({
//           fullName: "",
//           gender: "Male",
//           dob: "",
//           phone: "",
//           mail: "",
//         });
//       } catch (error) {
//         console.error("Failed to add customer:", error);
//       } finally {
//         setUploading(false);
//       }
//     };

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//         <div className="w-full max-w-4xl rounded-2xl bg-white">
//           <div className="px-6 sm:px-10 pt-8 pb-6">
//             <h2 className="mb-8 text-2xl font-semibold text-gray-900">Add Customer</h2>

//             {/* Grid Layout */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//               {/* Full Name */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Full Name</label>
//                 <input
//                   name="fullName"
//                   placeholder="Full Name"
//                   value={form.fullName}
//                   onChange={onChange}
//                   className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                 />
//               </div>

//               {/* Upload Profile Picture */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Upload Profile Picture</label>
//                 <div className="flex items-stretch overflow-hidden rounded-xl">
//                   <label className="cursor-pointer bg-gray-200 px-4 py-3 text-gray-900">
//                     <input
//                       type="file"
//                       className="hidden"
//                       onChange={(e) => {
//                         const f = e.target.files?.[0];
//                         if (f) setFileName(f.name);
//                       }}
//                     />
//                     Choose File
//                   </label>
//                   <div className="flex-1 bg-gray-100 px-4 py-3 text-gray-700 truncate">
//                     {fileName}
//                   </div>
//                   <button
//                     type="button"
//                     className="rounded-r-xl bg-[#0B1A50] px-5 py-3 text-white hover:bg-[#0A1748]"
//                   >
//                     Upload
//                   </button>
//                 </div>
//               </div>

//               {/* Gender */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Gender</label>
//                 <div className="relative">
//                   <select
//                     name="gender"
//                     value={form.gender}
//                     onChange={onChange}
//                     className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 pr-10 text-gray-900 outline-none"
//                   >
//                     <option>Male</option>
//                     <option>Female</option>
//                   </select>
//                   <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
//                 </div>
//               </div>

//               {/* Date of Birth */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Date of Birth</label>
//                 <input
//                   name="dob"
//                   type="date"
//                   placeholder="DD/MM/YYYY"
//                   value={form.dob}
//                   onChange={onChange}
//                   className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                 />
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Phone</label>
//                 <div className="flex items-stretch rounded-xl bg-gray-100">
//                   <div className="flex items-center gap-2 rounded-l-xl px-3">
//                     {/* India flag stripes */}
//                     <span className="inline-block h-4 w-6 overflow-hidden rounded-[2px]">
//                       <span className="block h-1/3 w-full bg-orange-500" />
//                       <span className="block h-1/3 w-full bg-white" />
//                       <span className="block h-1/3 w-full bg-green-600" />
//                     </span>
//                     <span className="text-sm font-medium text-gray-900">+91</span>
//                   </div>
//                   <input
//                     name="phone"
//                     placeholder="Phone"
//                     value={form.phone}
//                     onChange={onChange}
//                     className="min-w-0 flex-1 rounded-r-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                   />
//                 </div>
//               </div>

//               {/* Mail */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Mail</label>
//                 <input
//                   name="mail"
//                   type="email"
//                   placeholder="Mail"
//                   value={form.mail}
//                   onChange={onChange}
//                   className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                 />
//               </div>
//             </div>

//             {/* Footer Buttons */}
//             <div className="mt-10 flex w-full items-center justify-end gap-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="rounded-xl bg-[#E9E9F1] px-8 py-3 text-[15px] font-semibold text-[#0B1A50] hover:bg-[#E1E1EE] transition"
//                 disabled={uploading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 className="rounded-xl bg-[#0B1A50] px-8 py-3 text-[15px] font-semibold text-white hover:bg-[#0A1748] transition disabled:opacity-50"
//                 disabled={uploading}
//               >
//                 {uploading ? "Adding..." : "Add Customer"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   useEffect(() => {
//     if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
//   }, [searchOpen]);

//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") {
//         if (showAddModal) setShowAddModal(false);
//         else if (searchOpen) setSearchOpen(false);
//         else setSidebarOpen(false);
//       }
//       if (e.key === "Tab" && sidebarOpen) {
//         const focusables = sidebarRef.current?.querySelectorAll(
//           'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//         );
//         if (!focusables?.length) return;
//         const first = focusables[0];
//         const last = focusables[focusables.length - 1];
//         if (e.shiftKey && document.activeElement === first) {
//           e.preventDefault();
//           last.focus();
//         } else if (!e.shiftKey && document.activeElement === last) {
//           e.preventDefault();
//           first.focus();
//         }
//       }
//     };
//     document.addEventListener("keydown", onKey);

//     const onResize = () => {
//       setSidebarOpen(window.innerWidth >= 768);
//     };
//     window.addEventListener("resize", onResize);
//     if (sidebarOpen) setTimeout(() => closeBtnRef.current?.focus(), 50);
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       window.removeEventListener("resize", onResize);
//     };
//   }, [sidebarOpen, searchOpen, showAddModal]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB');
//   };

//   return (
//     <div className="h-screen bg-[#F6F8FC] flex overflow-hidden">
//       {sidebarOpen && (
//         <aside
//           ref={sidebarRef}
//           className="fixed inset-y-0 left-0 md:relative w-64 bg-[#0B1A50] text-white z-50 flex flex-col"
//           aria-hidden={false}
//         >
//           <div className="h-16 flex items-center justify-between gap-3 px-4 border-b border-white/10">
//             <img src={logo} alt="Company Logo" className="h-8 w-auto object-contain" />
//             <button
//               ref={closeBtnRef}
//               type="button"
//               className="md:hidden p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
//               onClick={() => setSidebarOpen(false)}
//               aria-label="Close sidebar"
//             >
//               <X size={18} />
//             </button>
//           </div>
//           <nav className="flex-1 mt-2 px-3 space-y-1 pb-6 overflow-y-auto">
//             <NavItem icon={User} label="Dashboard" />
//             <NavItem icon={Users} label="Managers" />
//             <NavItem icon={LayoutGrid} label="Staff Management" />
//             <NavItem active icon={Briefcase} label="Customers" />
//             <NavItem icon={Building2} label="Departments" />
//           </nav>
//         </aside>
//       )}

//       {sidebarOpen && window.innerWidth < 768 && (
//         <button
//           type="button"
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setSidebarOpen(false)}
//           aria-label="Close overlay"
//         />
//       )}

//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         <header className="h-16 bg-white flex items-center justify-between px-4 md:px-6 border-b border-gray-100 flex-shrink-0">
//           <div className="flex items-center gap-3">
//             <button
//               className="p-2 rounded-md hover:bg-gray-50 flex flex-col justify-center items-center gap-1.5"
//               onClick={() => setSidebarOpen((prev) => !prev)}
//               aria-label="Toggle sidebar"
//             >
//               <span className="block w-6 h-0.5 bg-[#2C2C74] rounded"></span>
//               <span className="block w-4 h-0.5 bg-[#2C2C74] rounded self-end"></span>
//               <span className="block w-6 h-0.5 bg-[#2C2C74] rounded"></span>
//             </button>
//             <h1 className="text-base sm:text-[17px] font-semibold text-gray-900">Customers</h1>
//           </div>

//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="relative">
//               {searchOpen ? (
//                 <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200 w-48 sm:w-56 lg:w-72">
//                   <Search size={16} className="text-gray-400 shrink-0" />
//                   <input
//                     ref={searchInputRef}
//                     placeholder="Search"
//                     value={searchTerm}
//                     onChange={(e) => handleSearch(e.target.value)}
//                     className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
//                     onBlur={() => setSearchOpen(false)}
//                   />
//                 </div>
//               ) : (
//                 <button
//                   className="p-2 rounded-md hover:bg-gray-50"
//                   onClick={() => setSearchOpen(true)}
//                   aria-label="Open search"
//                 >
//                   <Search size={18} className="text-gray-600" />
//                 </button>
//               )}
//             </div>

//             <div className="hidden sm:block text-right text-[11px] sm:text-xs leading-tight">
//               <div className="font-medium text-gray-900 truncate max-w-[120px]">John Mathew</div>
//               <div className="text-gray-500">Admin</div>
//             </div>
//             <img
//               alt="avatar"
//               className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
//               src={`https://api.dicebear.com/7.x/identicon/svg?seed=john`}
//             />
//             <button 
//               onClick={handleLogout}
//               className="p-2 rounded-md hover:bg-gray-50"
//               aria-label="Logout"
//             >
//               <LogOut size={18} className="text-gray-600" />
//             </button>
//             <button className="p-2 rounded-md hover:bg-gray-50">
//               <MoreVertical size={18} />
//             </button>
//           </div>
//         </header>

//         <div className="flex-1 overflow-auto">
//           <div className="p-4 md:p-6">
//             {/* Add Customer Button */}
//             <div className="flex justify-end mb-6">
//               <button 
//                 onClick={() => setShowAddModal(true)}
//                 className="bg-[#0B1A50] hover:bg-[#0A1748] text-white font-medium flex items-center gap-2 px-5 py-2 rounded-lg text-sm shadow-sm"
//               >
//                 <Plus size={16} />
//                 Add Customer
//               </button>
//             </div>

//             {/* Filters */}
//             <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 mb-6">
//               <div className="flex items-center gap-4 flex-wrap">
//                 <div className="flex-1" />
//                 <div className="w-full sm:w-[320px]">
//                   <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
//                     <Search size={16} className="text-gray-400 mr-3 shrink-0" />
//                     <input 
//                       type="text" 
//                       placeholder="Search" 
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="bg-transparent outline-none text-sm w-full" 
//                     />
//                   </div>
//                 </div>
//                 <div className="flex-1 flex justify-end items-center gap-3 min-w-[260px]">
//                   <div className="hidden sm:flex items-center gap-3">
//                     <span className="text-sm text-gray-600">From</span>
//                     <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
//                       <Calendar size={14} className="text-gray-400 mr-2" />
//                       <input
//                         type="date"
//                         value={fromDate}
//                         onChange={(e) => setFromDate(e.target.value)}
//                         className="bg-transparent text-sm outline-none"
//                       />
//                     </div>
//                     <span className="text-sm text-gray-600">To</span>
//                     <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
//                       <Calendar size={14} className="text-gray-400 mr-2" />
//                       <input
//                         type="date"
//                         value={toDate}
//                         onChange={(e) => setToDate(e.target.value)}
//                         className="bg-transparent text-sm outline-none"
//                       />
//                     </div>
//                   </div>
//                   <button 
//                     onClick={handleApplyFilter}
//                     className="bg-[#0B1A50] hover:bg-[#0A1748] text-white font-medium px-5 py-2 rounded-lg text-sm"
//                   >
//                     Apply
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Table */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               {loading ? (
//                 <div className="flex items-center justify-center h-64">
//                   <div className="text-gray-500">Loading customers...</div>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full">
//                     <thead className="bg-gray-50 border-b">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added On</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mail</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {customers.length === 0 ? (
//                         <tr>
//                           <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
//                             No customers found
//                           </td>
//                         </tr>
//                       ) : (
//                         customers.map((c) => (
//                           <tr key={c.id} className="hover:bg-gray-50">
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-md font-medium">
//                                 {c.id}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-3">
//                                 {c.avatar || c.profile_picture ? (
//                                   <img src={c.avatar || c.profile_picture} alt="" className="w-8 h-8 rounded-full object-cover" />
//                                 ) : (
//                                   <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
//                                     <User size={16} className="text-gray-500" />
//                                   </div>
//                                 )}
//                                 <span className="text-sm font-medium text-gray-900">{c.name}</span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.phone}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-2">
//                                 {c.gender === "Male" ? (
//                                   <Mars size={16} className="w-4 h-4 text-black" />
//                                 ) : (
//                                   <Venus size={16} className="w-4 h-4 text-black" />
//                                 )}
//                                 <span className="text-sm text-gray-900">{c.gender}</span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-2">
//                                 <Calendar size={14} className="text-gray-400" />
//                                 <span className="text-sm text-gray-900">{formatDate(c.created_at || c.addedOn)}</span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-[220px] truncate">
//                               {c.email || c.mail}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles(c.status)}`}>
//                                 {c.status}
//                               </span>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add Customer Modal */}
//       <AddCustomerModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
//     </div>
//   );
// };

// export default Customers;











// import React, { useEffect, useRef, useState } from "react";
// import {
//   Search,
//   Users,
//   UserCheck,
//   Building2,
//   LayoutGrid,
//   MoreVertical,
//   X,
//   Plus,
//   Calendar,
//   User,
//   Mars,
//   Venus,
//   Briefcase,
//   ChevronDown,
//   LogOut,
//   Edit2,
//   Trash2,
// } from "lucide-react";
// import logo from "../assets/logo.png";
// import API from "../api/api";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "../store/authSlice";
// import { useNavigate } from "react-router-dom";

// const Customers = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingCustomer, setEditingCustomer] = useState(null);
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const sidebarRef = useRef(null);
//   const closeBtnRef = useRef(null);
//   const searchInputRef = useRef(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const fetchCustomers = async (params = {}) => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams();
//       if (params.search) queryParams.append('search', params.search);
//       if (params.from_date) queryParams.append('from_date', params.from_date);
//       if (params.to_date) queryParams.append('to_date', params.to_date);
      
//       const response = await API.get(`customers/?${queryParams.toString()}`);
//       setCustomers(response.data.results || response.data);
//     } catch (error) {
//       console.error("Failed to fetch customers:", error);
//       if (error.response?.status === 401) {
//         console.log("Authentication failed, redirecting to login...");
//       }
//       setCustomers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (value) => {
//     setSearchTerm(value);
//     fetchCustomers({ search: value, from_date: fromDate, to_date: toDate });
//   };

//   const handleApplyFilter = () => {
//     fetchCustomers({ search: searchTerm, from_date: fromDate, to_date: toDate });
//   };

//   const handleLogout = () => {
//     dispatch(logoutUser({ navigate }));
//   };

//   const handleEdit = (customer) => {
//     setEditingCustomer(customer);
//     setShowEditModal(true);
//   };

//   const handleDelete = async (customerId) => {
//     if (window.confirm('Are you sure you want to delete this customer?')) {
//       try {
//         await API.delete(`customers/${customerId}/`);
//         fetchCustomers();
//       } catch (error) {
//         console.error("Failed to delete customer:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const statusStyles = (status) => {
//     if (status === "New") return "bg-green-50 text-green-600 ring-green-100";
//     if (status === "Converted") return "bg-red-50 text-red-600 ring-red-100";
//     if (status === "In Progress") return "bg-amber-50 text-amber-700 ring-amber-100";
//     if (status === "Contacted") return "bg-blue-50 text-blue-600 ring-blue-100";
//     return "bg-gray-100 text-gray-600 ring-gray-200";
//   };


  

//   const NavItem = ({ active, icon: Icon, label }) => (
//     <button
//       type="button"
//       className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-md ${
//         active ? "bg-white text-[#0B1A50] font-medium" : "text-white/80 hover:bg-white/10"
//       }`}
//     >
//       <Icon size={18} className="shrink-0" />
//       <span className="text-sm truncate">{label}</span>
//     </button>
//   );

//   const CustomerModal = ({ isOpen, onClose, customer = null }) => {
//     const [fileName, setFileName] = useState("No file chosen");
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [form, setForm] = useState({
//       fullName: "",
//       gender: "Male",
//       dob: "",
//       phone: "",
//       mail: "",
//       status: "New"
//     });
//     const [uploading, setUploading] = useState(false);
//     const isEditing = Boolean(customer);

//     useEffect(() => {
//       if (customer) {
//         setForm({
//           fullName: customer.name || "",
//           gender: customer.gender || "Male",
//           dob: customer.date_of_birth || "",
//           phone: customer.phone || "",
//           mail: customer.email || "",
//           status: customer.status || "New"
//         });
//       } else {
//         setForm({
//           fullName: "",
//           gender: "Male",
//           dob: "",
//           phone: "",
//           mail: "",
//           status: "New"
//         });
//       }
//       setFileName("No file chosen");
//       setSelectedFile(null);
//     }, [customer, isOpen]);

//     if (!isOpen) return null;

//     const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//     const handleFileChange = (e) => {
//       const file = e.target.files?.[0];
//       if (file) {
//         setFileName(file.name);
//         setSelectedFile(file);
//       }
//     };

//     const handleSubmit = async () => {
//       setUploading(true);
//       try {
//         const formData = new FormData();
//         formData.append('name', form.fullName);
//         formData.append('gender', form.gender);
//         formData.append('date_of_birth', form.dob);
//         formData.append('phone', form.phone);
//         formData.append('email', form.mail);
//         formData.append('status', form.status);
        
//         if (selectedFile) {
//           formData.append('profile_picture', selectedFile);
//         }

//         if (isEditing) {
//           await API.patch(`customers/${customer.id}/`, formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });
//         } else {
//           await API.post("customers/", formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });
//         }

//         fetchCustomers();
//         onClose();
//       } catch (error) {
//         console.error(`Failed to ${isEditing ? 'update' : 'add'} customer:`, error);
//       } finally {
//         setUploading(false);
//       }
//     };

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//         <div className="w-full max-w-4xl rounded-2xl bg-white">
//           <div className="px-6 sm:px-10 pt-8 pb-6">
//             <h2 className="mb-8 text-2xl font-semibold text-gray-900">
//               {isEditing ? 'Edit Customer' : 'Add Customer'}
//             </h2>

//             {/* Grid Layout */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//               {/* Full Name */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Full Name</label>
//                 <input
//                   name="fullName"
//                   placeholder="Full Name"
//                   value={form.fullName}
//                   onChange={onChange}
//                   className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                 />
//               </div>

//               {/* Upload Profile Picture */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Upload Profile Picture</label>
//                 <div className="flex items-stretch overflow-hidden rounded-xl">
//                   <label className="cursor-pointer bg-gray-200 px-4 py-3 text-gray-900">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleFileChange}
//                     />
//                     Choose File
//                   </label>
//                   <div className="flex-1 bg-gray-100 px-4 py-3 text-gray-700 truncate">
//                     {fileName}
//                   </div>
//                   <button
//                     type="button"
//                     className="rounded-r-xl bg-[#0B1A50] px-5 py-3 text-white hover:bg-[#0A1748]"
//                   >
//                     Upload
//                   </button>
//                 </div>
//               </div>

//               {/* Gender */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Gender</label>
//                 <div className="relative">
//                   <select
//                     name="gender"
//                     value={form.gender}
//                     onChange={onChange}
//                     className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 pr-10 text-gray-900 outline-none"
//                   >
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                   <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
//                 </div>
//               </div>

//               {/* Date of Birth */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Date of Birth</label>
//                 <input
//                   name="dob"
//                   type="date"
//                   value={form.dob}
//                   onChange={onChange}
//                   className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                 />
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Phone</label>
//                 <div className="flex items-stretch rounded-xl bg-gray-100">
//                   <div className="flex items-center gap-2 rounded-l-xl px-3">
//                     <span className="inline-block h-4 w-6 overflow-hidden rounded-[2px]">
//                       <span className="block h-1/3 w-full bg-orange-500" />
//                       <span className="block h-1/3 w-full bg-white" />
//                       <span className="block h-1/3 w-full bg-green-600" />
//                     </span>
//                     <span className="text-sm font-medium text-gray-900">+91</span>
//                   </div>
//                   <input
//                     name="phone"
//                     placeholder="Phone"
//                     value={form.phone}
//                     onChange={onChange}
//                     className="min-w-0 flex-1 rounded-r-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                   />
//                 </div>
//               </div>

//               {/* Mail */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Mail</label>
//                 <input
//                   name="mail"
//                   type="email"
//                   placeholder="Mail"
//                   value={form.mail}
//                   onChange={onChange}
//                   className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                 />
//               </div>

//               {/* Status - Only show in edit mode */}
//               {isEditing && (
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-gray-900">Status</label>
//                   <div className="relative">
//                     <select
//                       name="status"
//                       value={form.status}
//                       onChange={onChange}
//                       className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 pr-10 text-gray-900 outline-none"
//                     >
//                       <option value="New">New</option>
//                       <option value="Contacted">Contacted</option>
//                       <option value="In Progress">In Progress</option>
//                       <option value="Converted">Converted</option>
//                     </select>
//                     <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Footer Buttons */}
//             <div className="mt-10 flex w-full items-center justify-end gap-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="rounded-xl bg-[#E9E9F1] px-8 py-3 text-[15px] font-semibold text-[#0B1A50] hover:bg-[#E1E1EE] transition"
//                 disabled={uploading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 className="rounded-xl bg-[#0B1A50] px-8 py-3 text-[15px] font-semibold text-white hover:bg-[#0A1748] transition disabled:opacity-50"
//                 disabled={uploading}
//               >
//                 {uploading ? (isEditing ? "Updating..." : "Adding...") : (isEditing ? "Update Customer" : "Add Customer")}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
   


//   useEffect(() => {
//     if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
//   }, [searchOpen]);

//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") {
//         if (showAddModal) setShowAddModal(false);
//         else if (showEditModal) setShowEditModal(false);
//         else if (searchOpen) setSearchOpen(false);
//         else setSidebarOpen(false);
//       }
//       if (e.key === "Tab" && sidebarOpen) {
//         const focusables = sidebarRef.current?.querySelectorAll(
//           'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//         );
//         if (!focusables?.length) return;
//         const first = focusables[0];
//         const last = focusables[focusables.length - 1];
//         if (e.shiftKey && document.activeElement === first) {
//           e.preventDefault();
//           last.focus();
//         } else if (!e.shiftKey && document.activeElement === last) {
//           e.preventDefault();
//           first.focus();
//         }
//       }
//     };
//     document.addEventListener("keydown", onKey);

//     const onResize = () => {
//       setSidebarOpen(window.innerWidth >= 768);
//     };
//     window.addEventListener("resize", onResize);
//     if (sidebarOpen) setTimeout(() => closeBtnRef.current?.focus(), 50);
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       window.removeEventListener("resize", onResize);
//     };
//   }, [sidebarOpen, searchOpen, showAddModal, showEditModal]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB');
//   };

//   return (
//     <div className="h-screen bg-[#F6F8FC] flex overflow-hidden">
//       {sidebarOpen && (
//         <aside
//           ref={sidebarRef}
//           className="fixed inset-y-0 left-0 md:relative w-64 bg-[#0B1A50] text-white z-50 flex flex-col"
//           aria-hidden={false}
//         >
//           <div className="h-16 flex items-center justify-between gap-3 px-4 border-b border-white/10">
//             <img src={logo} alt="Company Logo" className="h-8 w-auto object-contain" />
//             <button
//               ref={closeBtnRef}
//               type="button"
//               className="md:hidden p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
//               onClick={() => setSidebarOpen(false)}
//               aria-label="Close sidebar"
//             >
//               <X size={18} />
//             </button>
//           </div>
//           <nav className="flex-1 mt-2 px-3 space-y-1 pb-6 overflow-y-auto">
//             <NavItem icon={User} label="Dashboard" />
//             <NavItem icon={Users} label="Managers" />
//             <NavItem icon={LayoutGrid} label="Staff Management" />
//             <NavItem active icon={Briefcase} label="Customers" />
//             <NavItem icon={Building2} label="Departments" />
//           </nav>
//         </aside>
//       )}

//       {sidebarOpen && window.innerWidth < 768 && (
//         <button
//           type="button"
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setSidebarOpen(false)}
//           aria-label="Close overlay"
//         />
//       )}

//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         <header className="h-16 bg-white flex items-center justify-between px-4 md:px-6 border-b border-gray-100 flex-shrink-0">
//           <div className="flex items-center gap-3">
//             <button
//               className="p-2 rounded-md hover:bg-gray-50 flex flex-col justify-center items-center gap-1.5"
//               onClick={() => setSidebarOpen((prev) => !prev)}
//               aria-label="Toggle sidebar"
//             >
//               <span className="block w-6 h-0.5 bg-[#2C2C74] rounded"></span>
//               <span className="block w-4 h-0.5 bg-[#2C2C74] rounded self-end"></span>
//               <span className="block w-6 h-0.5 bg-[#2C2C74] rounded"></span>
//             </button>
//             <h1 className="text-base sm:text-[17px] font-semibold text-gray-900">Customers</h1>
//           </div>

//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="relative">
//               {searchOpen ? (
//                 <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200 w-48 sm:w-56 lg:w-72">
//                   <Search size={16} className="text-gray-400 shrink-0" />
//                   <input
//                     ref={searchInputRef}
//                     placeholder="Search"
//                     value={searchTerm}
//                     onChange={(e) => handleSearch(e.target.value)}
//                     className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
//                     onBlur={() => setSearchOpen(false)}
//                   />
//                 </div>
//               ) : (
//                 <button
//                   className="p-2 rounded-md hover:bg-gray-50"
//                   onClick={() => setSearchOpen(true)}
//                   aria-label="Open search"
//                 >
//                   <Search size={18} className="text-gray-600" />
//                 </button>
//               )}
//             </div>

//             <div className="hidden sm:block text-right text-[11px] sm:text-xs leading-tight">
//               <div className="font-medium text-gray-900 truncate max-w-[120px]">John Mathew</div>
//               <div className="text-gray-500">Admin</div>
//             </div>
//             <img
//               alt="avatar"
//               className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
//               src={`https://api.dicebear.com/7.x/identicon/svg?seed=john`}
//             />
//             <button 
//               onClick={handleLogout}
//               className="p-2 rounded-md hover:bg-gray-50"
//               aria-label="Logout"
//             >
//               <LogOut size={18} className="text-gray-600" />
//             </button>
//             <button className="p-2 rounded-md hover:bg-gray-50">
//               <MoreVertical size={18} />
//             </button>
//           </div>
//         </header>

//         <div className="flex-1 overflow-auto">
//           <div className="p-4 md:p-6">
//             {/* Add Customer Button */}
//             <div className="flex justify-end mb-6">
//               <button 
//                 onClick={() => setShowAddModal(true)}
//                 className="bg-[#0B1A50] hover:bg-[#0A1748] text-white font-medium flex items-center gap-2 px-5 py-2 rounded-lg text-sm shadow-sm"
//               >
//                 <Plus size={16} />
//                 Add Customer
//               </button>
//             </div>

//             {/* Filters */}
//             <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 mb-6">
//               <div className="flex items-center gap-4 flex-wrap">
//                 <div className="flex-1" />
//                 <div className="w-full sm:w-[320px]">
//                   <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
//                     <Search size={16} className="text-gray-400 mr-3 shrink-0" />
//                     <input 
//                       type="text" 
//                       placeholder="Search" 
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="bg-transparent outline-none text-sm w-full" 
//                     />
//                   </div>
//                 </div>
//                 <div className="flex-1 flex justify-end items-center gap-3 min-w-[260px]">
//                   <div className="hidden sm:flex items-center gap-3">
//                     <span className="text-sm text-gray-600">From</span>
//                     <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
//                       <Calendar size={14} className="text-gray-400 mr-2" />
//                       <input
//                         type="date"
//                         value={fromDate}
//                         onChange={(e) => setFromDate(e.target.value)}
//                         className="bg-transparent text-sm outline-none"
//                       />
//                     </div>
//                     <span className="text-sm text-gray-600">To</span>
//                     <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
//                       <Calendar size={14} className="text-gray-400 mr-2" />
//                       <input
//                         type="date"
//                         value={toDate}
//                         onChange={(e) => setToDate(e.target.value)}
//                         className="bg-transparent text-sm outline-none"
//                       />
//                     </div>
//                   </div>
//                   <button 
//                     onClick={handleApplyFilter}
//                     className="bg-[#0B1A50] hover:bg-[#0A1748] text-white font-medium px-5 py-2 rounded-lg text-sm"
//                   >
//                     Apply
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Table */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               {loading ? (
//                 <div className="flex items-center justify-center h-64">
//                   <div className="text-gray-500">Loading customers...</div>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full">
//                     <thead className="bg-gray-50 border-b">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added On</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mail</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {customers.length === 0 ? (
//                         <tr>
//                           <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
//                             No customers found
//                           </td>
//                         </tr>
//                       ) : (
//                         customers.map((c) => (
//                           <tr key={c.id} className="hover:bg-gray-50">
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-md font-medium">
//                                 {c.customer_id || c.id}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-3">
//                                 {c.profile_picture_url || c.profile_picture ? (
//                                   <img 
//                                     src={c.profile_picture_url || c.profile_picture} 
//                                     alt="" 
//                                     className="w-8 h-8 rounded-full object-cover"
//                                     onError={(e) => {
//                                       e.target.style.display = 'none';
//                                       e.target.nextSibling.style.display = 'flex';
//                                     }}
//                                   />
//                                 ) : null}
//                                 <div className={`w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ${c.profile_picture_url || c.profile_picture ? 'hidden' : ''}`}>
//                                   <User size={16} className="text-gray-500" />
//                                 </div>
//                                 <span className="text-sm font-medium text-gray-900">{c.name}</span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.phone}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-2">
//                                 {c.gender === "Male" ? (
//                                   <Mars size={16} className="w-4 h-4 text-black" />
//                                 ) : (
//                                   <Venus size={16} className="w-4 h-4 text-black" />
//                                 )}
//                                 <span className="text-sm text-gray-900">{c.gender}</span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-2">
//                                 <Calendar size={14} className="text-gray-400" />
//                                 <span className="text-sm text-gray-900">{formatDate(c.created_at || c.added_date)}</span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-[220px] truncate">
//                               {c.email}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles(c.status)}`}>
//                                 {c.status}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-2">
//                                 <button
//                                   onClick={() => handleEdit(c)}
//                                   className="p-2 rounded-md hover:bg-gray-50 text-gray-600 hover:text-gray-900"
//                                   title="Edit customer"
//                                 >
//                                   <Edit2 size={16} />
//                                 </button>
//                                 <button
//                                   onClick={() => handleDelete(c.id)}
//                                   className="p-2 rounded-md hover:bg-gray-50 text-gray-600 hover:text-red-600"
//                                   title="Delete customer"
//                                 >
//                                   <Trash2 size={16} />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add Customer Modal */}
//       <CustomerModal 
//         isOpen={showAddModal} 
//         onClose={() => setShowAddModal(false)} 
//       />
      
//       {/* Edit Customer Modal */}
//       <CustomerModal 
//         isOpen={showEditModal} 
//         onClose={() => {
//           setShowEditModal(false);
//           setEditingCustomer(null);
//         }} 
//         customer={editingCustomer}
//       />
//     </div>
//   );
// };

// export default Customers;



// import React, { useEffect, useRef, useState } from "react";
// import {
//   Search,
//   Users,
//   UserCheck,
//   Building2,
//   LayoutGrid,
//   MoreVertical,
//   X,
//   Plus,
//   Calendar,
//   User,
//   Mars,
//   Venus,
//   Briefcase,
//   ChevronDown,
//   LogOut,
//   Edit2,
//   Trash2,
// } from "lucide-react";
// import logo from "../assets/logo.png";
// import API from "../api/api";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "../store/authSlice";
// import { useNavigate } from "react-router-dom";

// const Customers = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingCustomer, setEditingCustomer] = useState(null);
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const sidebarRef = useRef(null);
//   const closeBtnRef = useRef(null);
//   const searchInputRef = useRef(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Get current user from Redux store - updated selector
//   const user = useSelector((state) => state.auth.user);
//   const authState = useSelector((state) => state.auth);

//   // Debug logging to see what's in the store
//   useEffect(() => {
//     console.log("Auth state:", authState);
//     console.log("User data:", user);
//   }, [authState, user]);

//   const fetchCustomers = async (params = {}) => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams();
//       if (params.search) queryParams.append('search', params.search);
//       if (params.from_date) queryParams.append('from_date', params.from_date);
//       if (params.to_date) queryParams.append('to_date', params.to_date);
      
//       const response = await API.get(`customers/?${queryParams.toString()}`);
//       setCustomers(response.data.results || response.data);
//     } catch (error) {
//       console.error("Failed to fetch customers:", error);
//       if (error.response?.status === 401) {
//         console.log("Authentication failed, redirecting to login...");
//       }
//       setCustomers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (value) => {
//     setSearchTerm(value);
//     fetchCustomers({ search: value, from_date: fromDate, to_date: toDate });
//   };

//   const handleApplyFilter = () => {
//     fetchCustomers({ search: searchTerm, from_date: fromDate, to_date: toDate });
//   };

//   const handleLogout = () => {
//     dispatch(logoutUser({ navigate }));
//   };

//   const handleEdit = (customer) => {
//     setEditingCustomer(customer);
//     setShowEditModal(true);
//   };

//   const handleDelete = async (customerId) => {
//     if (window.confirm('Are you sure you want to delete this customer?')) {
//       try {
//         await API.delete(`customers/${customerId}/`);
//         fetchCustomers();
//       } catch (error) {
//         console.error("Failed to delete customer:", error);
//         if (error.response?.status === 404) {
//           alert('Customer not found. It may have already been deleted.');
//           fetchCustomers();
//         } else {
//           alert('Failed to delete customer. Please try again.');
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   // Fixed statusStyles function - updated to use yellow for In Progress
//   const statusStyles = (status) => {
//     if (!status) return "bg-gray-100 text-gray-600 ring-gray-200";
    
//     const normalizedStatus = status.toLowerCase().replace(/_/g, ' ').trim();
    
//     if (normalizedStatus === "new") return "bg-green-50 text-green-600 ring-green-100";
//     if (normalizedStatus === "converted") return "bg-red-50 text-red-600 ring-red-100"; 
//     if (normalizedStatus === "in progress") return "bg-yellow-50 text-yellow-600 ring-yellow-100";
//     if (normalizedStatus === "contacted") return "bg-blue-50 text-blue-600 ring-blue-100";
    
//     return "bg-gray-100 text-gray-600 ring-gray-200";
//   };

//   // Enhanced function to get user display name
//   const getUserDisplayName = () => {
//     console.log("Getting display name for user:", user);
    
//     if (!user) {
//       console.log("No user found, returning Guest");
//       return "Guest";
//     }
    
//     // Try different possible field combinations
//     const firstName = user.first_name || user.firstName || "";
//     const lastName = user.last_name || user.lastName || "";
//     const fullName = `${firstName} ${lastName}`.trim();
    
//     if (fullName) {
//       console.log("Using full name:", fullName);
//       return fullName;
//     }
    
//     // Fallback to username or email
//     const fallback = user.username || user.email || user.name || "User";
//     console.log("Using fallback:", fallback);
//     return fallback;
//   };

//   // Enhanced function to get user role
//   const getUserRole = () => {
//     if (!user) return "Guest";
    
//     const role = user.role || user.userRole || "User";
//     // Capitalize first letter
//     return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
//   };

//   const NavItem = ({ active, icon: Icon, label }) => (
//     <button
//       type="button"
//       className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-md ${
//         active ? "bg-white text-[#0B1A50] font-medium" : "text-white/80 hover:bg-white/10"
//       }`}
//     >
//       <Icon size={18} className="shrink-0" />
//       <span className="text-sm truncate">{label}</span>
//     </button>
//   );

//   const CustomerModal = ({ isOpen, onClose, customer = null }) => {
//     const [fileName, setFileName] = useState("No file chosen");
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [form, setForm] = useState({
//       fullName: "",
//       gender: "Male",
//       dob: "",
//       phone: "",
//       mail: "",
//       status: "New"
//     });
//     const [uploading, setUploading] = useState(false);
//     const isEditing = Boolean(customer);

//     useEffect(() => {
//       if (customer) {
//         setForm({
//           fullName: customer.name || "",
//           gender: customer.gender || "Male",
//           dob: customer.date_of_birth || "",
//           phone: customer.phone || "",
//           mail: customer.email || "",
//           status: customer.status || "New"
//         });
//       } else {
//         setForm({
//           fullName: "",
//           gender: "Male",
//           dob: "",
//           phone: "",
//           mail: "",
//           status: "New"
//         });
//       }
//       setFileName("No file chosen");
//       setSelectedFile(null);
//     }, [customer, isOpen]);

//     if (!isOpen) return null;

//     const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//     const handleFileChange = (e) => {
//       const file = e.target.files?.[0];
//       if (file) {
//         setFileName(file.name);
//         setSelectedFile(file);
//       }
//     };

//     const handleSubmit = async () => {
//       setUploading(true);
//       try {
//         const formData = new FormData();
//         formData.append('name', form.fullName);
//         formData.append('gender', form.gender);
//         formData.append('date_of_birth', form.dob);
//         formData.append('phone', form.phone);
//         formData.append('email', form.mail);
//         formData.append('status', form.status);
        
//         if (selectedFile) {
//           formData.append('profile_picture', selectedFile);
//         }

//         if (isEditing) {
//           await API.patch(`customers/${customer.id}/`, formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });
//         } else {
//           await API.post("customers/", formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });
//         }

//         fetchCustomers();
//         onClose();
//       } catch (error) {
//         console.error(`Failed to ${isEditing ? 'update' : 'add'} customer:`, error);
//         alert(`Failed to ${isEditing ? 'update' : 'add'} customer. Please try again.`);
//       } finally {
//         setUploading(false);
//       }
//     };

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//         <div className="w-full max-w-4xl rounded-2xl bg-white">
//           <div className="px-6 sm:px-10 pt-8 pb-6">
//             <h2 className="mb-8 text-2xl font-semibold text-gray-900">
//               {isEditing ? 'Edit Customer' : 'Add Customer'}
//             </h2>

//             {/* Grid Layout */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//               {/* Full Name */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Full Name</label>
//                 <input
//                   name="fullName"
//                   placeholder="Full Name"
//                   value={form.fullName}
//                   onChange={onChange}
//                   className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                 />
//               </div>

//               {/* Upload Profile Picture */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Upload Profile Picture</label>
//                 <div className="flex items-stretch overflow-hidden rounded-xl">
//                   <label className="cursor-pointer bg-gray-200 px-4 py-3 text-gray-900">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleFileChange}
//                     />
//                     Choose File
//                   </label>
//                   <div className="flex-1 bg-gray-100 px-4 py-3 text-gray-700 truncate">
//                     {fileName}
//                   </div>
//                   <button
//                     type="button"
//                     className="rounded-r-xl bg-[#0B1A50] px-5 py-3 text-white hover:bg-[#0A1748]"
//                   >
//                     Upload
//                   </button>
//                 </div>
//               </div>

//               {/* Gender */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Gender</label>
//                 <div className="relative">
//                   <select
//                     name="gender"
//                     value={form.gender}
//                     onChange={onChange}
//                     className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 pr-10 text-gray-900 outline-none"
//                   >
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                   <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
//                 </div>
//               </div>

//               {/* Date of Birth */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Date of Birth</label>
//                 <input
//                   name="dob"
//                   type="date"
//                   value={form.dob}
//                   onChange={onChange}
//                   className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                 />
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Phone</label>
//                 <div className="flex items-stretch rounded-xl bg-gray-100">
//                   <div className="flex items-center gap-2 rounded-l-xl px-3">
//                     <span className="inline-block h-4 w-6 overflow-hidden rounded-[2px]">
//                       <span className="block h-1/3 w-full bg-orange-500" />
//                       <span className="block h-1/3 w-full bg-white" />
//                       <span className="block h-1/3 w-full bg-green-600" />
//                     </span>
//                     <span className="text-sm font-medium text-gray-900">+91</span>
//                   </div>
//                   <input
//                     name="phone"
//                     placeholder="Phone"
//                     value={form.phone}
//                     onChange={onChange}
//                     className="min-w-0 flex-1 rounded-r-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                   />
//                 </div>
//               </div>

//               {/* Mail */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-900">Mail</label>
//                 <input
//                   name="mail"
//                   type="email"
//                   placeholder="Mail"
//                   value={form.mail}
//                   onChange={onChange}
//                   className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
//                 />
//               </div>

//               {/* Status - Only show in edit mode with corrected options */}
//               {isEditing && (
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-gray-900">Status</label>
//                   <div className="relative">
//                     <select
//                       name="status"
//                       value={form.status}
//                       onChange={onChange}
//                       className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 pr-10 text-gray-900 outline-none"
//                     >
//                       <option value="New">New</option>
//                       <option value="In Progress">In Progress</option>
//                       <option value="Converted">Converted</option>
//                     </select>
//                     <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Footer Buttons */}
//             <div className="mt-10 flex w-full items-center justify-end gap-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="rounded-xl bg-[#E9E9F1] px-8 py-3 text-[15px] font-semibold text-[#0B1A50] hover:bg-[#E1E1EE] transition"
//                 disabled={uploading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 className="rounded-xl bg-[#0B1A50] px-8 py-3 text-[15px] font-semibold text-white hover:bg-[#0A1748] transition disabled:opacity-50"
//                 disabled={uploading}
//               >
//                 {uploading ? (isEditing ? "Updating..." : "Adding...") : (isEditing ? "Update Customer" : "Add Customer")}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   useEffect(() => {
//     if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
//   }, [searchOpen]);

//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") {
//         if (showAddModal) setShowAddModal(false);
//         else if (showEditModal) setShowEditModal(false);
//         else if (searchOpen) setSearchOpen(false);
//         else setSidebarOpen(false);
//       }
//       if (e.key === "Tab" && sidebarOpen) {
//         const focusables = sidebarRef.current?.querySelectorAll(
//           'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//         );
//         if (!focusables?.length) return;
//         const first = focusables[0];
//         const last = focusables[focusables.length - 1];
//         if (e.shiftKey && document.activeElement === first) {
//           e.preventDefault();
//           last.focus();
//         } else if (!e.shiftKey && document.activeElement === last) {
//           e.preventDefault();
//           first.focus();
//         }
//       }
//     };
//     document.addEventListener("keydown", onKey);

//     const onResize = () => {
//       setSidebarOpen(window.innerWidth >= 768);
//     };
//     window.addEventListener("resize", onResize);
//     if (sidebarOpen) setTimeout(() => closeBtnRef.current?.focus(), 50);
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       window.removeEventListener("resize", onResize);
//     };
//   }, [sidebarOpen, searchOpen, showAddModal, showEditModal]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB');
//   };

//   return (
//     <div className="h-screen bg-[#F6F8FC] flex overflow-hidden">
//       {sidebarOpen && (
//         <aside
//           ref={sidebarRef}
//           className="fixed inset-y-0 left-0 md:relative w-64 bg-[#0B1A50] text-white z-50 flex flex-col"
//           aria-hidden={false}
//         >
//           <div className="h-16 flex items-center justify-between gap-3 px-4 border-b border-white/10">
//             <img src={logo} alt="Company Logo" className="h-8 w-auto object-contain" />
//             <button
//               ref={closeBtnRef}
//               type="button"
//               className="md:hidden p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
//               onClick={() => setSidebarOpen(false)}
//               aria-label="Close sidebar"
//             >
//               <X size={18} />
//             </button>
//           </div>
//           <nav className="flex-1 mt-2 px-3 space-y-1 pb-6 overflow-y-auto">
//             <NavItem icon={User} label="Dashboard" />
//             <NavItem icon={Users} label="Managers" />
//             <NavItem icon={LayoutGrid} label="Staff Management" />
//             <NavItem active icon={Briefcase} label="Customers" />
//             <NavItem icon={Building2} label="Departments" />
//           </nav>
//         </aside>
//       )}

//       {sidebarOpen && window.innerWidth < 768 && (
//         <button
//           type="button"
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setSidebarOpen(false)}
//           aria-label="Close overlay"
//         />
//       )}

//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         <header className="h-16 bg-white flex items-center justify-between px-4 md:px-6 border-b border-gray-100 flex-shrink-0">
//           <div className="flex items-center gap-3">
//             <button
//               className="p-2 rounded-md hover:bg-gray-50 flex flex-col justify-center items-center gap-1.5"
//               onClick={() => setSidebarOpen((prev) => !prev)}
//               aria-label="Toggle sidebar"
//             >
//               <span className="block w-6 h-0.5 bg-[#2C2C74] rounded"></span>
//               <span className="block w-4 h-0.5 bg-[#2C2C74] rounded self-end"></span>
//               <span className="block w-6 h-0.5 bg-[#2C2C74] rounded"></span>
//             </button>
//             <h1 className="text-base sm:text-[17px] font-semibold text-gray-900">Customers</h1>
//           </div>

//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="relative">
//               {searchOpen ? (
//                 <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200 w-48 sm:w-56 lg:w-72">
//                   <Search size={16} className="text-gray-400 shrink-0" />
//                   <input
//                     ref={searchInputRef}
//                     placeholder="Search"
//                     value={searchTerm}
//                     onChange={(e) => handleSearch(e.target.value)}
//                     className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
//                     onBlur={() => setSearchOpen(false)}
//                   />
//                 </div>
//               ) : (
//                 <button
//                   className="p-2 rounded-md hover:bg-gray-50"
//                   onClick={() => setSearchOpen(true)}
//                   aria-label="Open search"
//                 >
//                   <Search size={18} className="text-gray-600" />
//                 </button>
//               )}
//             </div>

//             {/* Updated to show logged-in user's name dynamically with enhanced debugging */}
//             <div className="hidden sm:block text-right text-[11px] sm:text-xs leading-tight">
//               <div className="font-medium text-gray-900 truncate max-w-[120px]" title={getUserDisplayName()}>
//                 {getUserDisplayName()}
//               </div>
//               <div className="text-gray-500 capitalize" title={getUserRole()}>
//                 {getUserRole()}
//               </div>
//             </div>
//             <img
//               alt="avatar"
//               className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
//               src={user?.profile_picture || user?.profilePicture || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(getUserDisplayName())}`}
//             />
//             <button 
//               onClick={handleLogout}
//               className="p-2 rounded-md hover:bg-gray-50"
//               aria-label="Logout"
//             >
//               <LogOut size={18} className="text-gray-600" />
//             </button>
//             <button className="p-2 rounded-md hover:bg-gray-50">
//               <MoreVertical size={18} />
//             </button>
//           </div>
//         </header>

//         <div className="flex-1 overflow-auto">
//           <div className="p-4 md:p-6">
//             {/* Add Customer Button */}
//             <div className="flex justify-end mb-6">
//               <button 
//                 onClick={() => setShowAddModal(true)}
//                 className="bg-[#0B1A50] hover:bg-[#0A1748] text-white font-medium flex items-center gap-2 px-5 py-2 rounded-lg text-sm shadow-sm"
//               >
//                 <Plus size={16} />
//                 Add Customer
//               </button>
//             </div>

//             {/* Filters */}
//             <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 mb-6">
//               <div className="flex items-center gap-4 flex-wrap">
//                 <div className="flex-1" />
//                 <div className="w-full sm:w-[320px]">
//                   <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
//                     <Search size={16} className="text-gray-400 mr-3 shrink-0" />
//                     <input 
//                       type="text" 
//                       placeholder="Search" 
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="bg-transparent outline-none text-sm w-full" 
//                     />
//                   </div>
//                 </div>
//                 <div className="flex-1 flex justify-end items-center gap-3 min-w-[260px]">
//                   <div className="hidden sm:flex items-center gap-3">
//                     <span className="text-sm text-gray-600">From</span>
//                     <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
//                       <Calendar size={14} className="text-gray-400 mr-2" />
//                       <input
//                         type="date"
//                         value={fromDate}
//                         onChange={(e) => setFromDate(e.target.value)}
//                         className="bg-transparent text-sm outline-none"
//                       />
//                     </div>
//                     <span className="text-sm text-gray-600">To</span>
//                     <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
//                       <Calendar size={14} className="text-gray-400 mr-2" />
//                       <input
//                         type="date"
//                         value={toDate}
//                         onChange={(e) => setToDate(e.target.value)}
//                         className="bg-transparent text-sm outline-none"
//                       />
//                     </div>
//                   </div>
//                   <button 
//                     onClick={handleApplyFilter}
//                     className="bg-[#0B1A50] hover:bg-[#0A1748] text-white font-medium px-5 py-2 rounded-lg text-sm"
//                   >
//                     Apply
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Table */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               {loading ? (
//                 <div className="flex items-center justify-center h-64">
//                   <div className="text-gray-500">Loading customers...</div>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full">
//                     <thead className="bg-gray-50 border-b">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added On</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mail</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {customers.length === 0 ? (
//                         <tr>
//                           <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
//                             No customers found
//                           </td>
//                         </tr>
//                       ) : (
//                         customers.map((c) => (
//                           <tr key={c.id} className="hover:bg-gray-50">
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-md font-medium">
//                                 {c.customer_id || c.id}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-3">
//                                 {c.profile_picture_url || c.profile_picture ? (
//                                   <img 
//                                     src={c.profile_picture_url || c.profile_picture} 
//                                     alt="" 
//                                     className="w-8 h-8 rounded-full object-cover"
//                                     onError={(e) => {
//                                       e.target.style.display = 'none';
//                                       e.target.nextSibling.style.display = 'flex';
//                                     }}
//                                   />
//                                 ) : null}
//                                 <div className={`w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ${c.profile_picture_url || c.profile_picture ? 'hidden' : ''}`}>
//                                   <User size={16} className="text-gray-500" />
//                                 </div>
//                                 <span className="text-sm font-medium text-gray-900">{c.name}</span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.phone}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-2">
//                                 {c.gender === "Male" ? (
//                                   <Mars size={16} className="w-4 h-4 text-black" />
//                                 ) : (
//                                   <Venus size={16} className="w-4 h-4 text-black" />
//                                 )}
//                                 <span className="text-sm text-gray-900">{c.gender}</span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-2">
//                                 <Calendar size={14} className="text-gray-400" />
//                                 <span className="text-sm text-gray-900">{formatDate(c.created_at || c.added_date)}</span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-[220px] truncate">
//                               {c.email}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles(c.status)}`}>
//                                 {c.status}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-2">
//                                 <button
//                                   onClick={() => handleEdit(c)}
//                                   className="p-2 rounded-md hover:bg-gray-50 text-gray-600 hover:text-gray-900"
//                                   title="Edit customer"
//                                 >
//                                   <Edit2 size={16} />
//                                 </button>
//                                 <button
//                                   onClick={() => handleDelete(c.id)}
//                                   className="p-2 rounded-md hover:bg-gray-50 text-gray-600 hover:text-red-600"
//                                   title="Delete customer"
//                                 >
//                                   <Trash2 size={16} />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add Customer Modal */}
//       <CustomerModal 
//         isOpen={showAddModal} 
//         onClose={() => setShowAddModal(false)} 
//       />
      
//       {/* Edit Customer Modal */}
//       <CustomerModal 
//         isOpen={showEditModal} 
//         onClose={() => {
//           setShowEditModal(false);
//           setEditingCustomer(null);
//         }} 
//         customer={editingCustomer}
//       />
//     </div>
//   );
// };

// export default Customers;


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
  Mars,
  Venus,
  Briefcase,
  ChevronDown,
  LogOut,
  Edit2,
  Trash2,
} from "lucide-react";
import logo from "../assets/logo.png";
import API from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { useNavigate, NavLink } from "react-router-dom"; // Added NavLink import

const Customers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const sidebarRef = useRef(null);
  const closeBtnRef = useRef(null);
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get current user from Redux store - updated selector
  const user = useSelector((state) => state.auth.user);
  const authState = useSelector((state) => state.auth);

  // Debug logging to see what's in the store
  useEffect(() => {
    console.log("Auth state:", authState);
    console.log("User data:", user);
  }, [authState, user]);

  const fetchCustomers = async (params = {}) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (params.search) queryParams.append('search', params.search);
      if (params.from_date) queryParams.append('from_date', params.from_date);
      if (params.to_date) queryParams.append('to_date', params.to_date);
      
      const response = await API.get(`customers/?${queryParams.toString()}`);
      setCustomers(response.data.results || response.data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      if (error.response?.status === 401) {
        console.log("Authentication failed, redirecting to login...");
      }
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    fetchCustomers({ search: value, from_date: fromDate, to_date: toDate });
  };

  const handleApplyFilter = () => {
    fetchCustomers({ search: searchTerm, from_date: fromDate, to_date: toDate });
  };

  const handleLogout = () => {
    dispatch(logoutUser({ navigate }));
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setShowEditModal(true);
  };

  const handleDelete = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await API.delete(`customers/${customerId}/`);
        fetchCustomers();
      } catch (error) {
        console.error("Failed to delete customer:", error);
        if (error.response?.status === 404) {
          alert('Customer not found. It may have already been deleted.');
          fetchCustomers();
        } else {
          alert('Failed to delete customer. Please try again.');
        }
      }
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fixed statusStyles function - updated to use yellow for In Progress
  const statusStyles = (status) => {
    if (!status) return "bg-gray-100 text-gray-600 ring-gray-200";
    
    const normalizedStatus = status.toLowerCase().replace(/_/g, ' ').trim();
    
    if (normalizedStatus === "new") return "bg-green-50 text-green-600 ring-green-100";
    if (normalizedStatus === "converted") return "bg-red-50 text-red-600 ring-red-100"; 
    if (normalizedStatus === "in progress") return "bg-yellow-50 text-yellow-600 ring-yellow-100";
    if (normalizedStatus === "contacted") return "bg-blue-50 text-blue-600 ring-blue-100";
    
    return "bg-gray-100 text-gray-600 ring-gray-200";
  };

  // Enhanced function to get user display name
  const getUserDisplayName = () => {
    console.log("Getting display name for user:", user);
    
    if (!user) {
      console.log("No user found, returning Guest");
      return "Guest";
    }
    
    // Try different possible field combinations
    const firstName = user.first_name || user.firstName || "";
    const lastName = user.last_name || user.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim();
    
    if (fullName) {
      console.log("Using full name:", fullName);
      return fullName;
    }
    
    // Fallback to username or email
    const fallback = user.username || user.email || user.name || "User";
    console.log("Using fallback:", fallback);
    return fallback;
  };

  // Enhanced function to get user role
  const getUserRole = () => {
    if (!user) return "Guest";
    
    const role = user.role || user.userRole || "User";
    // Capitalize first letter
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
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

  const CustomerModal = ({ isOpen, onClose, customer = null }) => {
    const [fileName, setFileName] = useState("No file chosen");
    const [selectedFile, setSelectedFile] = useState(null);
    const [form, setForm] = useState({
      fullName: "",
      gender: "Male",
      dob: "",
      phone: "",
      mail: "",
      status: "New"
    });
    const [uploading, setUploading] = useState(false);
    const isEditing = Boolean(customer);

    useEffect(() => {
      if (customer) {
        setForm({
          fullName: customer.name || "",
          gender: customer.gender || "Male",
          dob: customer.date_of_birth || "",
          phone: customer.phone || "",
          mail: customer.email || "",
          status: customer.status || "New"
        });
      } else {
        setForm({
          fullName: "",
          gender: "Male",
          dob: "",
          phone: "",
          mail: "",
          status: "New"
        });
      }
      setFileName("No file chosen");
      setSelectedFile(null);
    }, [customer, isOpen]);

    if (!isOpen) return null;

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        setFileName(file.name);
        setSelectedFile(file);
      }
    };

    const handleSubmit = async () => {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('name', form.fullName);
        formData.append('gender', form.gender);
        formData.append('date_of_birth', form.dob);
        formData.append('phone', form.phone);
        formData.append('email', form.mail);
        formData.append('status', form.status);
        
        if (selectedFile) {
          formData.append('profile_picture', selectedFile);
        }

        if (isEditing) {
          await API.patch(`customers/${customer.id}/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          await API.post("customers/", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }

        fetchCustomers();
        onClose();
      } catch (error) {
        console.error(`Failed to ${isEditing ? 'update' : 'add'} customer:`, error);
        alert(`Failed to ${isEditing ? 'update' : 'add'} customer. Please try again.`);
      } finally {
        setUploading(false);
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-4xl rounded-2xl bg-white">
          <div className="px-6 sm:px-10 pt-8 pb-6">
            <h2 className="mb-8 text-2xl font-semibold text-gray-900">
              {isEditing ? 'Edit Customer' : 'Add Customer'}
            </h2>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">Full Name</label>
                <input
                  name="fullName"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={onChange}
                  className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
                />
              </div>

              {/* Upload Profile Picture */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">Upload Profile Picture</label>
                <div className="flex items-stretch overflow-hidden rounded-xl">
                  <label className="cursor-pointer bg-gray-200 px-4 py-3 text-gray-900">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    Choose File
                  </label>
                  <div className="flex-1 bg-gray-100 px-4 py-3 text-gray-700 truncate">
                    {fileName}
                  </div>
                  <button
                    type="button"
                    className="rounded-r-xl bg-[#0B1A50] px-5 py-3 text-white hover:bg-[#0A1748]"
                  >
                    Upload
                  </button>
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">Gender</label>
                <div className="relative">
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={onChange}
                    className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 pr-10 text-gray-900 outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">Date of Birth</label>
                <input
                  name="dob"
                  type="date"
                  value={form.dob}
                  onChange={onChange}
                  className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">Phone</label>
                <div className="flex items-stretch rounded-xl bg-gray-100">
                  <div className="flex items-center gap-2 rounded-l-xl px-3">
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
                  className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
                />
              </div>

              {/* Status - Only show in edit mode with corrected options */}
              {isEditing && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">Status</label>
                  <div className="relative">
                    <select
                      name="status"
                      value={form.status}
                      onChange={onChange}
                      className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 pr-10 text-gray-900 outline-none"
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Converted">Converted</option>
                    </select>
                    <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
                  </div>
                </div>
              )}
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
                type="button"
                onClick={handleSubmit}
                className="rounded-xl bg-[#0B1A50] px-8 py-3 text-[15px] font-semibold text-white hover:bg-[#0A1748] transition disabled:opacity-50"
                disabled={uploading}
              >
                {uploading ? (isEditing ? "Updating..." : "Adding...") : (isEditing ? "Update Customer" : "Add Customer")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (showAddModal) setShowAddModal(false);
        else if (showEditModal) setShowEditModal(false);
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
  }, [sidebarOpen, searchOpen, showAddModal, showEditModal]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

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
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Toggle sidebar"
            >
              <span className="block w-6 h-0.5 bg-[#2C2C74] rounded"></span>
              <span className="block w-4 h-0.5 bg-[#2C2C74] rounded self-end"></span>
              <span className="block w-6 h-0.5 bg-[#2C2C74] rounded"></span>
            </button>
            <h1 className="text-base sm:text-[17px] font-semibold text-gray-900">Customers</h1>
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

            {/* Updated to show logged-in user's name dynamically with enhanced debugging */}
            <div className="hidden sm:block text-right text-[11px] sm:text-xs leading-tight">
              <div className="font-medium text-gray-900 truncate max-w-[120px]" title={getUserDisplayName()}>
                {getUserDisplayName()}
              </div>
              <div className="text-gray-500 capitalize" title={getUserRole()}>
                {getUserRole()}
              </div>
            </div>
            <img
              alt="avatar"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
              src={user?.profile_picture || user?.profilePicture || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(getUserDisplayName())}`}
            />
            <button 
              onClick={handleLogout}
              className="p-2 rounded-md hover:bg-gray-50"
              aria-label="Logout"
            >
              <LogOut size={18} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-50">
              <MoreVertical size={18} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            {/* Add Customer Button */}
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-[#0B1A50] hover:bg-[#0A1748] text-white font-medium flex items-center gap-2 px-5 py-2 rounded-lg text-sm shadow-sm"
              >
                <Plus size={16} />
                Add Customer
              </button>
            </div>

            {/* Filters */}
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

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-gray-500">Loading customers...</div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added On</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mail</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {customers.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                            No customers found
                          </td>
                        </tr>
                      ) : (
                        customers.map((c) => (
                          <tr key={c.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-md font-medium">
                                {c.customer_id || c.id}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                {c.profile_picture_url || c.profile_picture ? (
                                  <img 
                                    src={c.profile_picture_url || c.profile_picture} 
                                    alt="" 
                                    className="w-8 h-8 rounded-full object-cover"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.nextSibling.style.display = 'flex';
                                    }}
                                  />
                                ) : null}
                                <div className={`w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ${c.profile_picture_url || c.profile_picture ? 'hidden' : ''}`}>
                                  <User size={16} className="text-gray-500" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">{c.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                {c.gender === "Male" ? (
                                  <Mars size={16} className="w-4 h-4 text-black" />
                                ) : (
                                  <Venus size={16} className="w-4 h-4 text-black" />
                                )}
                                <span className="text-sm text-gray-900">{c.gender}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-gray-400" />
                                <span className="text-sm text-gray-900">{formatDate(c.created_at || c.added_date)}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-[220px] truncate">
                              {c.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles(c.status)}`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEdit(c)}
                                  className="p-2 rounded-md hover:bg-gray-50 text-gray-600 hover:text-gray-900"
                                  title="Edit customer"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={() => handleDelete(c.id)}
                                  className="p-2 rounded-md hover:bg-gray-50 text-gray-600 hover:text-red-600"
                                  title="Delete customer"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
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

      {/* Add Customer Modal */}
      <CustomerModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
      
      {/* Edit Customer Modal */}
      <CustomerModal 
        isOpen={showEditModal} 
        onClose={() => {
          setShowEditModal(false);
          setEditingCustomer(null);
        }} 
        customer={editingCustomer}
      />
    </div>
  );
};

export default Customers;
