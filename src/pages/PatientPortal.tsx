import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import type { PatientRecord, MedicalReport, Appointment } from "../context/AppContext";
import {
  LayoutDashboard,
  FileText,
  Clock,
  Brain,
  Upload,
  Calendar,
  Contact,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronRight,
  Plus,
  Shield,
  Activity,
  FileUp,
  Heart,
  TrendingUp,
  QrCode,
  CheckCircle,
  Eye,
  Menu,
  X,
  PlusCircle,
  XCircle,
  AlertTriangle,
  Info,
  Sparkles
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";

export const PatientPortal: React.FC = () => {
  const { user, logout, patients, appointments, addAppointment, uploadPatientReport, toggleRecordSharing, sharedPermissions, doctors, updatePatientVitals } = useApp();
  const navigate = useNavigate();

  // Redirect if not logged in or role mismatch
  React.useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else if (user.role !== "patient") {
      navigate("/doctor");
    }
  }, [user, navigate]);

  const patientId = user?.patientId || "";
  const patient = patients.find(p => p.id === patientId);

  // Layout Tab selection: "dashboard" | "records" | "timeline" | "ai" | "upload" | "appointments" | "emergency" | "notifications" | "profile" | "settings"
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Local notifications list (mock)
  const [notifications, setNotifications] = useState([
    { id: 1, type: "info", text: "Dr. Elizabeth Vance updated your cardiology prescription.", date: "Today, 10:45 AM", read: false },
    { id: 2, type: "warning", text: "Consent request: Dr. Alexander Thorne has requested access to view your medical timeline.", date: "Yesterday", read: true },
    { id: 3, type: "success", text: "Routine CBC blood panel uploaded successfully via Lab Link.", date: "Aug 2, 2026", read: true }
  ]);

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center space-y-4">
          <Activity className="animate-spin text-cyan-400" size={44} />
          <span className="font-bold">Accessing Secure Health Records...</span>
        </div>
      </div>
    );
  }

  // Sidebar Menu Array
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "records", label: "My Medical Records", icon: <FileText size={20} /> },
    { id: "timeline", label: "Medical Timeline", icon: <Clock size={20} /> },
    { id: "ai", label: "AI Health Summary", icon: <Brain size={20} /> },
    { id: "upload", label: "Upload Records", icon: <Upload size={20} /> },
    { id: "appointments", label: "Appointments", icon: <Calendar size={20} /> },
    { id: "emergency", label: "Emergency Card", icon: <Contact size={20} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={20} />, badge: notifications.filter(n => !n.read).length },
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> }
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-200 transition-colors duration-300">
      {/* Mobile Sidebar Hamburger Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 shadow-md focus:outline-none"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 border-r border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 glass-premium transform transition-transform duration-300 lg:translate-x-0 lg:static lg:flex lg:flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-900/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <Activity size={18} />
            </div>
            <span className="font-extrabold text-lg text-slate-900 dark:text-white">
              MediLynk <span className="text-cyan-500">AI</span>
            </span>
          </div>
          <span className="ml-auto text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-md border border-emerald-500/20">
            PATIENT
          </span>
        </div>

        {/* User preview inside sidebar */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-extrabold">
              {patient.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold truncate text-slate-900 dark:text-white">{patient.name}</p>
              <p className="text-xs font-semibold text-slate-400 truncate">{patient.id}</p>
            </div>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto no-scrollbar">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 group relative ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/5 text-cyan-600 dark:text-cyan-400 border-l-4 border-cyan-500"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <span className={`mr-3 ${activeTab === item.id ? "text-cyan-500" : "text-slate-400 group-hover:text-slate-500"}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.badge ? (
                <span className="ml-auto w-5 h-5 rounded-full bg-cyan-600 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        {/* Footer actions inside sidebar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-900/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 text-sm font-bold transition-colors duration-200 rounded-xl hover:bg-rose-500/5"
          >
            <LogOut size={20} className="mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN VIEW AREA */}
      <main className="flex-1 flex flex-col min-w-0 relative p-4 sm:p-8 lg:p-10 pt-20 lg:pt-10 overflow-y-auto no-scrollbar">
        {/* Dynamic Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-slate-200/50 dark:border-slate-800/40 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {menuItems.find(m => m.id === activeTab)?.label}
            </h1>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-1">
              Secure Digital Portal / {patient.name}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick security state indicator */}
            <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold shadow-inner">
              <Shield size={14} className="animate-pulse" />
              <span>E2EE Connection Encrypted</span>
            </div>
          </div>
        </div>

        {/* TAB CONTENTS */}
        <div className="flex-1">
          {activeTab === "dashboard" && (
            <DashboardTab
              patient={patient}
              appointments={appointments}
              setActiveTab={setActiveTab}
              notifications={notifications}
            />
          )}
          {activeTab === "records" && <RecordsTab patient={patient} updatePatientVitals={updatePatientVitals} />}
          {activeTab === "timeline" && <TimelineTab patient={patient} />}
          {activeTab === "ai" && <AiTab patient={patient} />}
          {activeTab === "upload" && <UploadTab patient={patient} uploadPatientReport={uploadPatientReport} />}
          {activeTab === "appointments" && (
            <AppointmentsTab
              patient={patient}
              appointments={appointments}
              addAppointment={addAppointment}
              doctors={doctors}
            />
          )}
          {activeTab === "emergency" && <EmergencyTab patient={patient} />}
          {activeTab === "notifications" && (
            <NotificationsTab
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}
          {activeTab === "profile" && <ProfileTab patient={patient} updatePatientVitals={updatePatientVitals} />}
          {activeTab === "settings" && (
            <SettingsTab
              patient={patient}
              doctors={doctors}
              toggleRecordSharing={toggleRecordSharing}
              sharedPermissions={sharedPermissions}
            />
          )}
        </div>
      </main>
    </div>
  );
};

// -------------------------------------------------------------
// SUB-TAB COMPONENT: DASHBOARD
// -------------------------------------------------------------
interface DashboardTabProps {
  patient: PatientRecord;
  appointments: Appointment[];
  setActiveTab: (tab: string) => void;
  notifications: any[];
}

const DashboardTab: React.FC<DashboardTabProps> = ({ patient, appointments, setActiveTab, notifications: _notifications }) => {
  // Filter appointments for this patient
  const patientAppts = appointments
    .filter(a => a.patientId === patient.id && a.status === "Scheduled")
    .slice(0, 2);

  // Mock vitals logs for charting
  const bpData = [
    { date: "Mar", systolic: 132, diastolic: 86 },
    { date: "Apr", systolic: 130, diastolic: 84 },
    { date: "May", systolic: 128, diastolic: 82 },
    { date: "Jun", systolic: 131, diastolic: 85 },
    { date: "Jul", systolic: 127, diastolic: 81 },
    { date: "Aug", systolic: 128, diastolic: 82 }
  ];

  const hrData = [
    { date: "Week 1", rate: 68 },
    { date: "Week 2", rate: 72 },
    { date: "Week 3", rate: 66 },
    { date: "Week 4", rate: 64 },
    { date: "Week 5", rate: 65 },
    { date: "Week 6", rate: 64 }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Card & Vitals Quick Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Welcome greeting card */}
        <div className="md:col-span-2 glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              Hello, {patient.name}!
              <span className="animate-bounce">👋</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm leading-relaxed max-w-lg font-medium">
              You are accessing your lifetime medical health vault. All records are secured under active E2EE schemas. Use the options below for quick management.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-900/60 pt-4 mt-6 text-xs font-bold uppercase text-slate-400 tracking-wider">
            <div>
              <p className="text-[10px] text-slate-400">Blood Group</p>
              <p className="text-base font-extrabold text-cyan-500 mt-0.5">{patient.bloodGroup}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Patient ID</p>
              <p className="text-base font-extrabold text-blue-500 mt-0.5">{patient.id}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Allergies</p>
              <p className="text-base font-extrabold text-rose-500 mt-0.5 truncate max-w-[100px]">
                {patient.allergies[0] || "None"} {patient.allergies.length > 1 ? `+${patient.allergies.length - 1}` : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Vitals Summary Stats */}
        <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Health Goals</span>
            <Activity className="text-emerald-500" size={20} />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span>Vitals Stability</span>
                <span className="text-emerald-500">92%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "92%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span>Record Compliance</span>
                <span className="text-cyan-500">100%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: "100%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span>AI Health Index</span>
                <span className="text-blue-500">Optimal</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "85%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Upload Documents", icon: <FileUp size={20} />, color: "text-cyan-500 border-cyan-500/20 bg-cyan-500/5", tab: "upload" },
          { label: "AI Translation Card", icon: <Brain size={20} />, color: "text-blue-500 border-blue-500/20 bg-blue-500/5", tab: "ai" },
          { label: "View Health Timeline", icon: <Clock size={20} />, color: "text-emerald-500 border-emerald-500/20 bg-emerald-500/5", tab: "timeline" },
          { label: "Digital Wallet ID", icon: <Contact size={20} />, color: "text-purple-500 border-purple-500/20 bg-purple-500/5", tab: "emergency" }
        ].map((act, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(act.tab)}
            className={`flex flex-col items-center justify-center p-5 rounded-2xl border ${act.color} hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-center font-bold text-sm space-y-3`}
          >
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              {act.icon}
            </div>
            <span>{act.label}</span>
          </button>
        ))}
      </div>

      {/* Charts & Interactive Widgets */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Blood Pressure chart */}
        <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Blood Pressure Analytics</h3>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Systolic & Diastolic historical readings (mmHg)</p>
            </div>
            <TrendingUp size={20} className="text-cyan-500" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bpData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSys" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDia" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.05)" />
                <XAxis dataKey="date" stroke="rgba(156, 163, 175, 0.4)" fontSize={11} tickLine={false} />
                <YAxis domain={[60, 150]} stroke="rgba(156, 163, 175, 0.4)" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", color: "#fff", fontSize: "12px" }} />
                <Area type="monotone" dataKey="systolic" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorSys)" name="Systolic" />
                <Area type="monotone" dataKey="diastolic" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorDia)" name="Diastolic" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Heart Rate Vitals */}
        <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Heart Rate Log</h3>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Average weekly resting heart rate (bpm)</p>
            </div>
            <Heart size={20} className="text-rose-500 animate-pulse" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hrData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.05)" />
                <XAxis dataKey="date" stroke="rgba(156, 163, 175, 0.4)" fontSize={11} tickLine={false} />
                <YAxis domain={[50, 90]} stroke="rgba(156, 163, 175, 0.4)" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", color: "#fff", fontSize: "12px" }} />
                <Bar dataKey="rate" fill="#10b981" radius={[4, 4, 0, 0]} barSize={25} name="BPM" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Appointments & Recent Records Widgets */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Appointments Widget */}
        <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Upcoming Consultations</h3>
              <button onClick={() => setActiveTab("appointments")} className="text-xs text-cyan-500 hover:underline font-bold">
                View All
              </button>
            </div>

            {patientAppts.length === 0 ? (
              <div className="py-6 text-center text-slate-400 text-xs font-semibold flex flex-col items-center space-y-2">
                <Calendar size={24} className="text-slate-600" />
                <span>No active consultations booked.</span>
              </div>
            ) : (
              <div className="space-y-3.5">
                {patientAppts.map((appt) => (
                  <div key={appt.id} className="p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800/40 bg-slate-100/30 dark:bg-slate-900/30">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{appt.doctorName}</span>
                      <span className="text-[10px] font-extrabold uppercase bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded border border-cyan-500/20">
                        {appt.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-semibold mt-1">{appt.reason}</p>
                    <p className="text-xs text-slate-400 font-bold mt-2 flex items-center gap-1">
                      <Clock size={12} className="text-cyan-500" /> Date: {appt.date}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveTab("appointments")}
            className="w-full mt-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center space-x-1.5"
          >
            <PlusCircle size={14} />
            <span>Book New Appointment</span>
          </button>
        </div>

        {/* Recent timeline events */}
        <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Clinical Timeline Events</h3>
            <button onClick={() => setActiveTab("timeline")} className="text-xs text-cyan-500 hover:underline font-bold">
              Full Timeline
            </button>
          </div>

          {patient.timeline.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs font-semibold flex flex-col items-center space-y-2">
              <Clock size={24} className="text-slate-600" />
              <span>Timeline is currently empty.</span>
            </div>
          ) : (
            <div className="space-y-4">
              {patient.timeline.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  onClick={() => setActiveTab("timeline")}
                  className="p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/40 bg-slate-100/30 dark:bg-slate-900/30 hover:bg-slate-100/60 dark:hover:bg-slate-900/60 cursor-pointer flex justify-between items-center transition-colors group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-400">{event.date}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      <span className="text-xs font-extrabold text-cyan-500 truncate">{event.doctorName}</span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1.5 truncate">
                      {event.diagnosis}
                    </h4>
                  </div>
                  <ChevronRight size={18} className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// SUB-TAB COMPONENT: MEDICAL RECORDS
// -------------------------------------------------------------
interface RecordsTabProps {
  patient: PatientRecord;
  updatePatientVitals: (patientId: string, updatedVitals: any) => void;
}

const RecordsTab: React.FC<RecordsTabProps> = ({ patient, updatePatientVitals }) => {
  const [subTab, setSubTab] = useState<string>("summary");

  // Dynamic state for adding current medication/allergies inside profile
  const [newMed, setNewMed] = useState("");
  const [newAllergy, setNewAllergy] = useState("");

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMed.trim()) return;
    const list = [...patient.currentMedications, newMed.trim()];
    updatePatientVitals(patient.id, { currentMedications: list });
    setNewMed("");
  };

  const handleAddAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAllergy.trim()) return;
    const list = [...patient.allergies, newAllergy.trim()];
    updatePatientVitals(patient.id, { allergies: list });
    setNewAllergy("");
  };

  return (
    <div className="space-y-6">
      {/* Tab select bar */}
      <div className="flex border-b border-slate-200 dark:border-slate-800/80 overflow-x-auto no-scrollbar pb-1 gap-2">
        {[
          { id: "summary", label: "Overview" },
          { id: "meds", label: "Medications & Allergies" },
          { id: "history", label: "Chronology & Surgery" },
          { id: "docs", label: "All Diagnostic Files" }
        ].map(st => (
          <button
            key={st.id}
            onClick={() => setSubTab(st.id)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all duration-200 ${
              subTab === st.id
                ? "border-cyan-500 text-cyan-500"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {subTab === "summary" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4">
              Demographics & Vitals
            </h3>
            <div className="space-y-3.5 text-sm font-semibold">
              <div className="flex justify-between">
                <span className="text-slate-400">Full Name</span>
                <span className="text-slate-900 dark:text-slate-200">{patient.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Age / Gender</span>
                <span className="text-slate-900 dark:text-slate-200">{patient.age} years / {patient.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Blood Group</span>
                <span className="text-cyan-500 font-extrabold">{patient.bloodGroup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contact Email</span>
                <span className="text-slate-900 dark:text-slate-200">{patient.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone Number</span>
                <span className="text-slate-900 dark:text-slate-200">{patient.phone}</span>
              </div>
            </div>
          </div>

          <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4">
              Active Medical Log Summary
            </h3>
            <p className="text-xs font-semibold text-slate-400 leading-relaxed mb-4">
              {patient.medicalHistory}
            </p>
            <div className="space-y-2 text-xs font-semibold">
              <div className="flex justify-between">
                <span className="text-slate-400">Chronic Issues</span>
                <span className="text-rose-400">{patient.chronicDiseases.join(", ") || "None"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Active Surgeries</span>
                <span className="text-slate-300">{patient.surgeries.join(", ") || "None"}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === "meds" && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Medications */}
          <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4">
              Current Medications
            </h3>

            <ul className="space-y-2.5 mb-6">
              {patient.currentMedications.map((med, i) => (
                <li key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/20 dark:bg-slate-900/20 text-xs font-bold">
                  <span className="text-slate-300">{med}</span>
                  <button
                    onClick={() => {
                      const list = patient.currentMedications.filter((_, idx) => idx !== i);
                      updatePatientVitals(patient.id, { currentMedications: list });
                    }}
                    className="text-rose-400 hover:text-rose-500 text-xs"
                  >
                    <XCircle size={15} />
                  </button>
                </li>
              ))}
              {patient.currentMedications.length === 0 && (
                <p className="text-slate-500 text-xs font-semibold italic">No active prescriptions listed.</p>
              )}
            </ul>

            <form onSubmit={handleAddMed} className="flex space-x-2">
              <input
                type="text"
                value={newMed}
                onChange={(e) => setNewMed(e.target.value)}
                placeholder="Add medication (e.g. Aspirin 81mg)"
                className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950/20 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
              />
              <button
                type="submit"
                className="p-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors shadow-md"
              >
                <Plus size={16} />
              </button>
            </form>
          </div>

          {/* Allergies */}
          <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4">
              Allergies & Contraindications
            </h3>

            <ul className="space-y-2.5 mb-6">
              {patient.allergies.map((alg, i) => (
                <li key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/20 dark:bg-slate-900/20 text-xs font-bold">
                  <span className="text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle size={14} />
                    {alg}
                  </span>
                  <button
                    onClick={() => {
                      const list = patient.allergies.filter((_, idx) => idx !== i);
                      updatePatientVitals(patient.id, { allergies: list });
                    }}
                    className="text-rose-400 hover:text-rose-500 text-xs"
                  >
                    <XCircle size={15} />
                  </button>
                </li>
              ))}
              {patient.allergies.length === 0 && (
                <p className="text-slate-500 text-xs font-semibold italic">No known active allergies listed.</p>
              )}
            </ul>

            <form onSubmit={handleAddAllergy} className="flex space-x-2">
              <input
                type="text"
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                placeholder="Add allergen (e.g. Shellfish)"
                className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950/20 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
              />
              <button
                type="submit"
                className="p-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors shadow-md"
              >
                <Plus size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {subTab === "history" && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Surgeries */}
          <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4">
              Historical Surgeries
            </h3>
            <ul className="space-y-3">
              {patient.surgeries.map((s, i) => (
                <li key={i} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/10 dark:bg-slate-900/10 text-xs font-bold">
                  <CheckCircle size={14} className="text-emerald-500" />
                  <span className="text-slate-300">{s}</span>
                </li>
              ))}
              {patient.surgeries.length === 0 && (
                <p className="text-slate-500 text-xs font-semibold italic">No surgical events logged.</p>
              )}
            </ul>
          </div>

          {/* Vaccinations */}
          <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4">
              Immunizations & Vaccinations
            </h3>
            <ul className="space-y-3">
              {patient.vaccinations.map((v, i) => (
                <li key={i} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/10 dark:bg-slate-900/10 text-xs font-bold">
                  <CheckCircle size={14} className="text-cyan-500" />
                  <span className="text-slate-300">{v}</span>
                </li>
              ))}
              {patient.vaccinations.length === 0 && (
                <p className="text-slate-500 text-xs font-semibold italic">No immunization logs found.</p>
              )}
            </ul>
          </div>
        </div>
      )}

      {subTab === "docs" && (
        <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4">
            Clinical Diagnostic Folders
          </h3>

          {/* Aggregate list of files from timeline events */}
          {(() => {
            const allFiles: MedicalReport[] = [];
            patient.timeline.forEach(event => {
              if (event.reports) {
                allFiles.push(...event.reports);
              }
            });

            if (allFiles.length === 0) {
              return (
                <div className="py-12 text-center text-slate-500 text-xs font-semibold flex flex-col items-center space-y-2">
                  <FileText size={32} className="text-slate-700" />
                  <span>No uploaded reports or files in clinical record folders.</span>
                </div>
              );
            }

            return (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {allFiles.map(file => (
                  <div key={file.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/20 dark:bg-slate-900/20 hover:border-cyan-500/40 transition-colors flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-200 truncate max-w-[150px]" title={file.name}>
                        {file.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">
                        {file.category} • {file.type}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">
                        Size: {file.size}
                      </p>
                    </div>
                    <button
                      onClick={() => alert(`Simulated Download of: ${file.name}`)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-cyan-500 hover:bg-cyan-500/5 shadow-sm"
                    >
                      <Eye size={14} />
                    </button>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// SUB-TAB COMPONENT: MEDICAL TIMELINE
// -------------------------------------------------------------
interface TimelineTabProps {
  patient: PatientRecord;
}

const TimelineTab: React.FC<TimelineTabProps> = ({ patient }) => {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  return (
    <div className="glass-premium p-6 sm:p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {patient.timeline.length === 0 ? (
        <div className="py-12 text-center text-slate-400 font-semibold flex flex-col items-center space-y-2">
          <Clock size={32} className="text-slate-600" />
          <span>Timeline is currently empty. Doctor consultation notes will appear here.</span>
        </div>
      ) : (
        <div className="relative border-l border-slate-200 dark:border-slate-800/80 ml-4 md:ml-6 pl-6 md:pl-8 space-y-8 py-4">
          {patient.timeline.map((event) => {
            const isExpanded = expandedEvent === event.id;
            return (
              <div key={event.id} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] md:-left-[41px] top-1 w-5 h-5 rounded-full border-4 border-slate-50 dark:border-[#020617] bg-cyan-500 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-cyan-500/20 z-10" />

                <div className="glass p-5 rounded-xl border border-slate-200/50 dark:border-slate-800/40 relative hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-3">
                    <div>
                      <span className="text-xs font-bold text-slate-400">{event.date}</span>
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                        {event.diagnosis}
                      </h4>
                    </div>
                    <span className="text-xs font-extrabold text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 w-fit">
                      {event.doctorName}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                    {event.notes}
                  </p>

                  {/* Expansion action */}
                  <button
                    onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                    className="mt-3 text-xs text-cyan-400 hover:text-cyan-500 font-bold flex items-center gap-1.5"
                  >
                    <span>{isExpanded ? "Collapse Details" : "View Prescription & Attachments"}</span>
                    <ChevronRight size={13} className={`transform transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </button>

                  {isExpanded && (
                    <div className="border-t border-slate-100 dark:border-slate-900/60 pt-4 mt-4 space-y-4">
                      {/* Prescription info */}
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Active Treatment Prescription</span>
                        <p className="text-xs font-extrabold text-emerald-400 mt-1 bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-lg">
                          {event.prescription || "No active prescriptions."}
                        </p>
                      </div>

                      {/* File reports */}
                      {event.reports && event.reports.length > 0 && (
                        <div>
                          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Clinical Attachments</span>
                          <div className="grid sm:grid-cols-2 gap-3 mt-1.5">
                            {event.reports.map(file => (
                              <div key={file.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-900/30 flex items-center justify-between text-xs">
                                <div>
                                  <p className="font-extrabold truncate max-w-[130px]">{file.name}</p>
                                  <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">{file.category} ({file.size})</p>
                                </div>
                                <button
                                  onClick={() => alert(`Opening ${file.name}`)}
                                  className="text-cyan-400 hover:underline font-bold"
                                >
                                  Open
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// SUB-TAB COMPONENT: AI SUMMARY
// -------------------------------------------------------------
interface AiTabProps {
  patient: PatientRecord;
}

const AiTab: React.FC<AiTabProps> = ({ patient }) => {
  // Aggregate clinical reports count
  const allReports: MedicalReport[] = [];
  patient.timeline.forEach(e => e.reports && allReports.push(...e.reports));

  const glossary = [
    { term: "Auscultation", trans: "Listening to the internal sounds of the body, usually using a stethoscope (e.g. listening to lungs or heart)." },
    { term: "Spirometry", trans: "A diagnostic test that measures how much air you can breathe in and out, and how fast you can blow it out." },
    { term: "Arthroscopy", trans: "A minimally invasive surgical procedure on a joint in which an examination or treatment is performed using an endoscope." },
    { term: "Exacerbation", trans: "A sudden worsening or flare-up of symptoms of a chronic disease, like asthma or COPD." }
  ];

  return (
    <div className="space-y-6">
      {/* AI banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/20 relative overflow-hidden flex items-start gap-4">
        <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-md flex-shrink-0 animate-pulse">
          <Brain size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            MediLynk AI Clinical Summarizer
            <span className="text-[10px] font-extrabold uppercase bg-cyan-500 text-white px-2 py-0.5 rounded shadow">Active</span>
          </h3>
          <p className="text-xs text-slate-400 font-semibold leading-relaxed mt-1 max-w-2xl">
            This module parses all active timeline records, surgery clinical histories, and laboratory folders of the patient. The generated dashboard abstracts diagnoses to assist clinical understanding.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Core health summary card */}
        <div className="md:col-span-2 glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 relative">
          <h4 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4 flex items-center gap-2">
            <Activity className="text-cyan-500" size={18} />
            Overall Health Summary
          </h4>
          <div className="space-y-4 text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
            <p>
              Based on the parsed record history of <strong className="text-white">{patient.name}</strong>, the patient presents a child-onset history of <strong className="text-rose-400">Mild Asthma</strong> and a recent diagnosis of <strong className="text-rose-400">Hypertension</strong> (diagnosed 2024). Vitals show optimal systemic management with current therapeutic regimes.
            </p>
            <p>
              The pulmonary function remains stable with active montelukast and as-needed albuterol controllers. The peak expiratory flow was last recorded at <strong className="text-cyan-400">88% of baseline</strong>, which falls into the green zone of respiratory index.
            </p>
            <p>
              The musculoskeletal history indicates surgical repair via <strong className="text-white">Right Knee Arthroscopy in 2021</strong>, with postoperative follow-ups confirming full recovery of joint mobility and no residual infection markers.
            </p>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between">
          <div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4 flex items-center gap-2">
              <Sparkles className="text-emerald-400 animate-spin" style={{ animationDuration: "4s" }} size={16} />
              AI Recommendations
            </h4>
            <ul className="space-y-3.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Maintain daily Lisinopril adherence for blood pressure management.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Utilize Albuterol inhaler 15 minutes before intense physical workouts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Retest metabolic panel and thyroid parameters within 6 months.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Translation tool */}
        <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
          <h4 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4 flex items-center gap-2">
            <Info className="text-blue-500" size={18} />
            Medical Term Translator
          </h4>
          <div className="space-y-4">
            {glossary.map((g, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-900/20 text-xs font-semibold">
                <p className="font-extrabold text-cyan-400">{g.term}</p>
                <p className="text-slate-400 mt-1 leading-relaxed">{g.trans}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Observations and historical highlights */}
        <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
          <h4 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4 flex items-center gap-2">
            <Activity className="text-emerald-500" size={18} />
            Key Clinical Indicators
          </h4>

          <div className="space-y-4 text-xs font-bold">
            <div className="flex justify-between items-center p-3.5 rounded-xl bg-slate-100/30 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/40">
              <div>
                <p className="text-slate-400 text-[10px] uppercase">Cardiovascular</p>
                <p className="text-sm font-extrabold text-slate-200 mt-0.5">BP: 128/82 mmHg</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Optimal</span>
            </div>
            <div className="flex justify-between items-center p-3.5 rounded-xl bg-slate-100/30 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/40">
              <div>
                <p className="text-slate-400 text-[10px] uppercase">Pulmonary Index</p>
                <p className="text-sm font-extrabold text-slate-200 mt-0.5">Peak Flow: 88%</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Normal</span>
            </div>
            <div className="flex justify-between items-center p-3.5 rounded-xl bg-slate-100/30 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/40">
              <div>
                <p className="text-slate-400 text-[10px] uppercase">Endocrine status</p>
                <p className="text-sm font-extrabold text-slate-200 mt-0.5">Thyroid Levels</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">Stable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// SUB-TAB COMPONENT: UPLOAD RECORDS
// -------------------------------------------------------------
interface UploadTabProps {
  patient: PatientRecord;
  uploadPatientReport: (patientId: string, report: Omit<MedicalReport, "id" | "date">) => void;
}

const UploadTab: React.FC<UploadTabProps> = ({ patient, uploadPatientReport }) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileCategory, setFileCategory] = useState<"Blood Test" | "Prescription" | "X-ray" | "MRI/CT Scan" | "Vaccination" | "Other">("Blood Test");
  
  // Upload flow states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedName, setUploadedName] = useState("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startUploadMock(e.dataTransfer.files[0].name, e.dataTransfer.files[0].size);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      startUploadMock(e.target.files[0].name, e.target.files[0].size);
    }
  };

  const startUploadMock = (filename: string, bytesSize: number) => {
    setIsUploading(true);
    setUploadSuccess(false);
    setUploadProgress(5);
    setUploadedName(filename);

    const sizeStr = bytesSize > 1024 * 1024
      ? `${(bytesSize / (1024 * 1024)).toFixed(1)} MB`
      : `${(bytesSize / 1024).toFixed(0)} KB`;

    // Simulated upload intervals
    let prog = 5;
    const interval = setInterval(() => {
      prog += Math.floor(Math.random() * 20) + 10;
      if (prog >= 100) {
        prog = 100;
        setUploadProgress(100);
        clearInterval(interval);
        
        // Finalize state
        setIsUploading(false);
        setUploadSuccess(true);
        // Dispatch to global store context
        uploadPatientReport(patient.id, {
          name: filename,
          type: filename.split(".").pop()?.toUpperCase() || "PDF",
          size: sizeStr,
          category: fileCategory
        });
      } else {
        setUploadProgress(prog);
      }
    }, 250);
  };

  return (
    <div className="glass-premium p-6 sm:p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 relative">
      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <label className="block text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-2">
            Select Document Category
          </label>
          <select
            value={fileCategory}
            onChange={(e) => setFileCategory(e.target.value as any)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 text-xs text-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="Blood Test">Blood Test Reports</option>
            <option value="Prescription">Doctors Prescriptions</option>
            <option value="X-ray">Radiological X-Rays</option>
            <option value="MRI/CT Scan">MRI / CT Scan Diagnostics</option>
            <option value="Vaccination">Vaccination Certificates</option>
            <option value="Other">Other Clinical Documentations</option>
          </select>
        </div>

        {/* Drag and Drop Container */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all ${
            dragActive
              ? "border-cyan-500 bg-cyan-500/5 scale-[0.99]"
              : "border-slate-200 dark:border-slate-800 bg-slate-100/5 dark:bg-slate-950/5 hover:border-slate-400 dark:hover:border-slate-700"
          }`}
        >
          <div className="p-4 bg-cyan-500/10 text-cyan-500 rounded-2xl mb-4">
            <Upload size={32} className="animate-bounce" style={{ animationDuration: "2.5s" }} />
          </div>

          <p className="text-sm font-extrabold text-slate-900 dark:text-white">
            Drag & drop your medical document here
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
            Supports PDF, JPG, PNG up to 15 MB
          </p>

          <div className="relative mt-6">
            <input
              type="file"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button
              type="button"
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md"
            >
              Browse Files
            </button>
          </div>
        </div>

        {/* Upload Status Card */}
        {isUploading && (
          <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-950/20">
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-slate-300 truncate max-w-[200px]">{uploadedName}</span>
              <span className="text-cyan-500">{uploadProgress}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div className="h-full bg-cyan-500 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-2">Uploading to secure health ledger...</p>
          </div>
        )}

        {/* Success Alert */}
        {uploadSuccess && (
          <div className="p-4 border border-emerald-500/20 bg-emerald-500/10 rounded-2xl flex items-center space-x-3 text-xs text-emerald-400 font-bold">
            <CheckCircle size={20} className="flex-shrink-0" />
            <div>
              <p>Record Uploaded Successfully!</p>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">File: {uploadedName}. Registered in patient clinical ledger.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// SUB-TAB COMPONENT: APPOINTMENTS
// -------------------------------------------------------------
interface AppointmentsTabProps {
  patient: PatientRecord;
  appointments: Appointment[];
  doctors: any[];
  addAppointment: (appt: Omit<Appointment, "id" | "status">) => void;
}

const AppointmentsTab: React.FC<AppointmentsTabProps> = ({ patient, appointments, doctors, addAppointment }) => {
  const patientAppts = appointments.filter(a => a.patientId === patient.id);

  // Form states for booking
  const [docId, setDocId] = useState(doctors[0]?.id || "");
  const [apptDate, setApptDate] = useState("");
  const [apptTime, setApptTime] = useState("10:00 AM");
  const [apptReason, setApptReason] = useState("");

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apptDate || !apptReason) {
      alert("Please complete the form requirements.");
      return;
    }
    const selectedDoc = doctors.find(d => d.id === docId);
    addAppointment({
      patientId: patient.id,
      patientName: patient.name,
      doctorId: docId,
      doctorName: selectedDoc ? selectedDoc.name : "Dr. Consultant",
      date: apptDate,
      time: apptTime,
      reason: apptReason
    });
    // Clear
    setApptDate("");
    setApptReason("");
    alert("Appointment scheduled successfully!");
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Book form */}
      <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 lg:col-span-1">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4 flex items-center gap-1.5">
          <PlusCircle size={16} className="text-cyan-500" /> Book Consultation
        </h3>

        <form onSubmit={handleBook} className="space-y-4">
          <div>
            <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1">Consulting Doctor</label>
            <select
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-950/20 text-xs text-white"
            >
              {doctors.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1">Date</label>
              <input
                type="date"
                required
                value={apptDate}
                onChange={(e) => setApptDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-950/20 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1">Time Slot</label>
              <select
                value={apptTime}
                onChange={(e) => setApptTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-950/20 text-xs text-white"
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="01:30 PM">01:30 PM</option>
                <option value="03:00 PM">03:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1">Reason for Visit</label>
            <textarea
              rows={3}
              required
              value={apptReason}
              onChange={(e) => setApptReason(e.target.value)}
              placeholder="e.g. Hypertension checkup, routine spirometry follow up..."
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-950/20 text-xs text-white placeholder-slate-700"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md"
          >
            Confirm Appointment
          </button>
        </form>
      </div>

      {/* List booked */}
      <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 lg:col-span-2">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4">
          Scheduled Health Consultations
        </h3>

        {patientAppts.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs font-semibold flex flex-col items-center space-y-2">
            <Calendar size={32} className="text-slate-600" />
            <span>No appointments found. Use the book form to schedule a slot.</span>
          </div>
        ) : (
          <div className="space-y-4">
            {patientAppts.map((appt) => (
              <div key={appt.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900/20 flex justify-between items-start">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-200">{appt.doctorName}</h4>
                  <p className="text-xs text-slate-400 font-semibold mt-1">{appt.reason}</p>
                  <div className="flex items-center space-x-3 mt-3 text-[10px] text-slate-400 font-semibold">
                    <span className="flex items-center gap-1"><Clock size={11} className="text-cyan-500" /> {appt.date} ({appt.time})</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <span>ID: {appt.id}</span>
                  </div>
                </div>

                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded border ${
                  appt.status === "Scheduled"
                    ? "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
                    : appt.status === "Completed"
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                }`}>
                  {appt.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// SUB-TAB COMPONENT: EMERGENCY CARD
// -------------------------------------------------------------
interface EmergencyTabProps {
  patient: PatientRecord;
}

const EmergencyTab: React.FC<EmergencyTabProps> = ({ patient }) => {
  return (
    <div className="max-w-md mx-auto space-y-8">
      {/* Wallet-style Digital ID Card */}
      <div className="relative group perspective-1000">
        <div className="w-full h-64 rounded-3xl bg-gradient-to-br from-rose-600 via-rose-700 to-slate-950 p-6 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden glow-rose border border-rose-500/30 transform transition-transform group-hover:scale-[1.01] duration-300">
          {/* Hologram/Glass gloss shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-30 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Card Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-white/15 text-white rounded-lg">
                <Activity size={18} />
              </div>
              <span className="font-extrabold text-sm tracking-widest uppercase">MediLynk EMERGENCY</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-extrabold bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/25">
                VITALS PASS
              </span>
            </div>
          </div>

          {/* Name & Blood Group */}
          <div>
            <p className="text-[9px] text-rose-300 font-extrabold uppercase tracking-widest">PATIENT HOLDER</p>
            <h3 className="text-2xl font-extrabold tracking-tight mt-0.5">{patient.name}</h3>
            <p className="text-xs text-rose-200 mt-1 font-semibold truncate max-w-[280px]">
              Conditions: {patient.chronicDiseases.join(", ") || "None"}
            </p>
          </div>

          {/* Details Row */}
          <div className="flex justify-between items-end border-t border-white/15 pt-4">
            <div>
              <p className="text-[8px] text-rose-300 font-extrabold uppercase tracking-widest">BLOOD GROUP</p>
              <p className="text-lg font-black text-white mt-0.5">{patient.bloodGroup}</p>
            </div>
            <div>
              <p className="text-[8px] text-rose-300 font-extrabold uppercase tracking-widest">ALLERGIES</p>
              <p className="text-xs font-black text-rose-200 mt-1 truncate max-w-[120px]">
                {patient.allergies.join(", ") || "None"}
              </p>
            </div>
            <div>
              {/* QR Icon representing scanner */}
              <div className="p-2 bg-white rounded-lg shadow-md text-slate-900">
                <QrCode size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auxiliary emergency details */}
      <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 space-y-4">
        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-900/60 pb-2 flex items-center gap-1.5">
          <Info size={14} className="text-rose-500" />
          Emergency Personnel Guideline
        </h4>
        <div className="space-y-3.5 text-xs font-semibold">
          <div className="flex justify-between">
            <span className="text-slate-400">Emergency Contact</span>
            <span className="text-slate-200">Sarah's Medical Delegate</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Phone Contact</span>
            <span className="text-cyan-500 font-bold">{patient.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Authorized Physician</span>
            <span className="text-slate-200">Dr. Elizabeth Vance (Cardio)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// SUB-TAB COMPONENT: NOTIFICATIONS
// -------------------------------------------------------------
interface NotificationsTabProps {
  notifications: any[];
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({ notifications, setNotifications }) => {
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClear = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Active Alerts & Alerts Log</h3>
        <button
          onClick={handleMarkAllRead}
          className="text-xs text-cyan-500 hover:underline font-bold"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`p-4 rounded-xl border flex items-start justify-between transition-colors ${
              n.read
                ? "border-slate-200 dark:border-slate-800 bg-slate-900/10"
                : "border-cyan-500/25 bg-cyan-500/5"
            }`}
          >
            <div className="flex items-start space-x-3 min-w-0">
              <span className="mt-0.5">
                {n.type === "info" && <Info size={16} className="text-cyan-500" />}
                {n.type === "warning" && <AlertTriangle size={16} className="text-amber-500" />}
                {n.type === "success" && <CheckCircle size={16} className="text-emerald-500" />}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-300 leading-relaxed">{n.text}</p>
                <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">{n.date}</p>
              </div>
            </div>

            <button
              onClick={() => handleClear(n.id)}
              className="text-slate-500 hover:text-rose-400 p-1"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {notifications.length === 0 && (
          <p className="py-8 text-center text-slate-500 text-xs font-semibold italic">No notifications logs available.</p>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// SUB-TAB COMPONENT: PROFILE
// -------------------------------------------------------------
interface ProfileTabProps {
  patient: PatientRecord;
  updatePatientVitals: (patientId: string, updatedVitals: any) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ patient, updatePatientVitals }) => {
  const [editName, setEditName] = useState(patient.name);
  const [editPhone, setEditPhone] = useState(patient.phone);
  const [editAge, setEditAge] = useState(patient.age);
  const [editGender, setEditGender] = useState(patient.gender);
  const [editHistory, setEditHistory] = useState(patient.medicalHistory);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updatePatientVitals(patient.id, {
      name: editName,
      phone: editPhone,
      age: Number(editAge),
      gender: editGender,
      medicalHistory: editHistory
    });
    alert("Profile saved successfully!");
  };

  return (
    <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 max-w-2xl mx-auto">
      <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-6">
        Update Profile Details
      </h3>

      <form onSubmit={handleUpdate} className="space-y-4 text-xs font-bold">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-4.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950/20 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Phone Number</label>
            <input
              type="text"
              required
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              className="w-full px-4.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950/20 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">Age</label>
            <input
              type="number"
              required
              value={editAge}
              onChange={(e) => setEditAge(Number(e.target.value))}
              className="w-full px-4.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950/20 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Gender</label>
            <select
              value={editGender}
              onChange={(e) => setEditGender(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950/20 text-slate-300"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Lifetime Medical History Synopsis</label>
          <textarea
            rows={4}
            value={editHistory}
            onChange={(e) => setEditHistory(e.target.value)}
            className="w-full px-4.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950/20 text-white placeholder-slate-600 font-semibold"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold rounded-xl shadow-md"
        >
          Save Profile Changes
        </button>
      </form>
    </div>
  );
};

// -------------------------------------------------------------
// SUB-TAB COMPONENT: SETTINGS (AND SECURITY CONSENT)
// -------------------------------------------------------------
interface SettingsTabProps {
  patient: PatientRecord;
  doctors: any[];
  toggleRecordSharing: (patientId: string, doctorId: string) => void;
  sharedPermissions: { [patientId: string]: string[] };
}

const SettingsTab: React.FC<SettingsTabProps> = ({ patient, doctors, toggleRecordSharing, sharedPermissions }) => {
  const allowedDocs = sharedPermissions[patient.id] || [];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Encryption keys */}
      <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4 flex items-center gap-1.5">
          <Shield size={16} className="text-cyan-500" />
          E2EE Key Vault
        </h3>
        <p className="text-xs text-slate-400 font-semibold leading-relaxed mb-4">
          Your health record is encrypted locally before being stored in the cloud. Below is your active simulated decryption master key.
        </p>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[10px] break-all text-emerald-400 select-all select-none">
          AES-256-GCM-KEY::4a98b7f0c112d3e4f5a6b7c8d9e0f1a2::256bit_active_hash
        </div>
      </div>

      {/* Record sharing consent controller */}
      <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-2 flex items-center gap-1.5">
          <Contact size={16} className="text-cyan-500" /> Doctor Consent Manager
        </h3>
        <p className="text-xs text-slate-400 font-semibold leading-relaxed mb-6">
          Toggle doctor authorization keys. Authorized doctors can see your clinical records, upload files to your folder, and edit consultation logs.
        </p>

        <div className="space-y-4">
          {doctors.map(doc => {
            const hasAccess = allowedDocs.includes(doc.id);
            return (
              <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900/10">
                <div>
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-200">{doc.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase">{doc.specialty}</p>
                </div>

                <button
                  onClick={() => {
                    toggleRecordSharing(patient.id, doc.id);
                    alert(`${doc.name} access: ${hasAccess ? "REVOKED" : "AUTHORIZED"}`);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    hasAccess
                      ? "bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500/20"
                      : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20"
                  }`}
                >
                  {hasAccess ? "Revoke Access" : "Authorize Access"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
