import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import type { PatientRecord, Doctor } from "../context/AppContext";
import {
  LayoutDashboard,
  Search,
  FolderLock,
  FilePlus,
  Calendar,
  User,
  LogOut,
  ChevronRight,
  Shield,
  Activity,
  Lock,
  Brain,
  AlertCircle,
  Menu,
  X
} from "lucide-react";

export const DoctorPortal: React.FC = () => {
  const { user, logout, patients, appointments, doctors, sharedPermissions, addConsultationNote } = useApp();
  const navigate = useNavigate();

  // Redirect if not logged in or role mismatch
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else if (user.role !== "doctor") {
      navigate("/patient");
    }
  }, [user, navigate]);

  const doctorId = user?.doctorId || "";
  const currentDoctor = doctors.find(d => d.id === doctorId);

  // Portal view states: "dashboard" | "search" | "shared" | "profile" | "patient-view"
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Currently viewed patient in "patient-view"
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  // Search query state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<PatientRecord[]>(patients);

  // Consultation note form states
  const [noteDiagnosis, setNoteDiagnosis] = useState("");
  const [notePrescription, setNotePrescription] = useState("");
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    setFilteredPatients(patients);
  }, [patients]);

  if (!currentDoctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center space-y-4">
          <Activity className="animate-spin text-cyan-400" size={44} />
          <span className="font-bold">Accessing Secure Doctor Portal...</span>
        </div>
      </div>
    );
  }

  // Handle patient lookup
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredPatients(patients);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matches = patients.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        p.email.toLowerCase().includes(q)
    );
    setFilteredPatients(matches);
  };

  const handlePatientSelect = (pId: string) => {
    setSelectedPatientId(pId);
    setActiveTab("patient-view");
    // Clear forms
    setNoteDiagnosis("");
    setNotePrescription("");
    setNoteText("");
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId) return;
    if (!noteDiagnosis || !noteText) {
      alert("Please complete the required diagnosis and note fields.");
      return;
    }

    addConsultationNote(selectedPatientId, currentDoctor.id, {
      date: new Date().toISOString().split("T")[0],
      doctorName: currentDoctor.name,
      diagnosis: noteDiagnosis,
      prescription: notePrescription || "None",
      notes: noteText,
      reports: []
    });

    // Clear Form
    setNoteDiagnosis("");
    setNotePrescription("");
    setNoteText("");
    alert("Consultation log appended to medical timeline!");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Doctors Appointments list
  const doctorAppts = appointments.filter(
    a => a.doctorId === currentDoctor.id && a.status === "Scheduled"
  );

  // Doctors Shared Records count
  const sharedRecordPatients = patients.filter(
    p => (sharedPermissions[p.id] || []).includes(currentDoctor.id)
  );

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
          <span className="ml-auto text-[10px] font-extrabold uppercase bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded-md border border-cyan-500/20">
            DOCTOR
          </span>
        </div>

        {/* User preview inside sidebar */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-extrabold">
              DR
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold truncate text-slate-900 dark:text-white">{currentDoctor.name}</p>
              <p className="text-xs font-semibold text-slate-400 truncate">{currentDoctor.specialty}</p>
            </div>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto no-scrollbar">
          {[
            { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
            { id: "search", label: "Search Patients", icon: <Search size={20} /> },
            { id: "shared", label: "Shared Records", icon: <FolderLock size={20} />, badge: sharedRecordPatients.length },
            { id: "profile", label: "Doctor Profile", icon: <User size={20} /> }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 group relative ${
                activeTab === item.id && activeTab !== "patient-view"
                  ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/5 text-cyan-600 dark:text-cyan-400 border-l-4 border-cyan-500"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <span className={`mr-3 ${activeTab === item.id && activeTab !== "patient-view" ? "text-cyan-500" : "text-slate-400 group-hover:text-slate-500"}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.badge ? (
                <span className="ml-auto w-5 h-5 rounded-full bg-cyan-600 text-white text-[10px] font-bold flex items-center justify-center">
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
              {activeTab === "patient-view"
                ? "Patient Secure File Viewer"
                : activeTab === "shared"
                ? "Secure Shared Record Index"
                : activeTab === "search"
                ? "Global Patient Finder"
                : "Clinical Dashboard"}
            </h1>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-1">
              MediLynk AI Clinician Suite / {currentDoctor.name}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold shadow-inner">
              <Shield size={14} />
              <span>Clinician Session Active</span>
            </div>
          </div>
        </div>

        {/* Dynamic Views */}
        <div className="flex-1">
          {activeTab === "dashboard" && (
            <DashboardTab
              currentDoctor={currentDoctor}
              doctorAppts={doctorAppts}
              sharedRecordPatients={sharedRecordPatients}
              handlePatientSelect={handlePatientSelect}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "search" && (
            <SearchTab
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              filteredPatients={filteredPatients}
              handlePatientSelect={handlePatientSelect}
            />
          )}

          {activeTab === "shared" && (
            <SharedTab
              sharedRecordPatients={sharedRecordPatients}
              handlePatientSelect={handlePatientSelect}
            />
          )}

          {activeTab === "profile" && (
            <ProfileTab currentDoctor={currentDoctor} />
          )}

          {activeTab === "patient-view" && selectedPatientId && (
            <PatientViewTab
              patientId={selectedPatientId}
              patients={patients}
              currentDoctor={currentDoctor}
              sharedPermissions={sharedPermissions}
              handleAddNote={handleAddNote}
              noteDiagnosis={noteDiagnosis}
              setNoteDiagnosis={setNoteDiagnosis}
              notePrescription={notePrescription}
              setNotePrescription={setNotePrescription}
              noteText={noteText}
              setNoteText={setNoteText}
            />
          )}
        </div>
      </main>
    </div>
  );
};

// -------------------------------------------------------------
// SUB-TAB COMPONENT: CLINICAL DASHBOARD
// -------------------------------------------------------------
interface DashboardTabProps {
  currentDoctor: Doctor;
  doctorAppts: any[];
  sharedRecordPatients: PatientRecord[];
  handlePatientSelect: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

const DashboardTab: React.FC<DashboardTabProps> = ({
  currentDoctor,
  doctorAppts,
  sharedRecordPatients,
  handlePatientSelect,
  setActiveTab
}) => {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Clinician Desk: {currentDoctor.name}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm leading-relaxed max-w-2xl font-medium">
            You are operating under patient-delegated clinical authorization rules. Patients control access permissions. Select a patient from your appointments or search list to access their health history.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 border-t border-slate-100 dark:border-slate-900/60 pt-4 mt-6 text-xs font-bold uppercase text-slate-400 tracking-wider">
          <div>
            <p className="text-[10px] text-slate-400">Consultation Specialty</p>
            <p className="text-base font-extrabold text-cyan-500 mt-0.5">{currentDoctor.specialty}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400">Shared Patient Files</p>
            <p className="text-base font-extrabold text-blue-500 mt-0.5">{sharedRecordPatients.length} Active</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400">Scheduled Today</p>
            <p className="text-base font-extrabold text-emerald-500 mt-0.5">{doctorAppts.length} Appointments</p>
          </div>
        </div>
      </div>

      {/* Appointment lists & Patient lookup shortcuts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Appointments List */}
        <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4">
              Consultation Schedule
            </h3>

            {doctorAppts.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs font-semibold flex flex-col items-center space-y-2">
                <Calendar size={24} className="text-slate-700" />
                <span>No consultations booked for today.</span>
              </div>
            ) : (
              <div className="space-y-3">
                {doctorAppts.map(appt => (
                  <div
                    key={appt.id}
                    onClick={() => handlePatientSelect(appt.patientId)}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900/30 hover:border-cyan-500/45 cursor-pointer transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-extrabold text-xs text-slate-200">{appt.patientName}</span>
                      <span className="text-[9px] font-extrabold uppercase bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
                        {appt.time}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1 truncate">{appt.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveTab("search")}
            className="w-full mt-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md"
          >
            Find Patient Record
          </button>
        </div>

        {/* Recently Shared Patient records */}
        <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 lg:col-span-2">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4">
            Patient Health Records Under Your Consent
          </h3>

          {sharedRecordPatients.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs font-semibold flex flex-col items-center space-y-2">
              <FolderLock size={32} className="text-slate-700" />
              <span>No patients have shared records with you yet.</span>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {sharedRecordPatients.map(pat => (
                <div
                  key={pat.id}
                  onClick={() => handlePatientSelect(pat.id)}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/20 dark:bg-slate-900/20 hover:border-cyan-500/40 cursor-pointer flex justify-between items-center transition-all group"
                >
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-200 truncate">{pat.name}</h4>
                    <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase">ID: {pat.id} • {pat.bloodGroup}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
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
// SUB-TAB COMPONENT: SEARCH PATIENTS
// -------------------------------------------------------------
interface SearchTabProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  filteredPatients: PatientRecord[];
  handlePatientSelect: (id: string) => void;
}

const SearchTab: React.FC<SearchTabProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  filteredPatients,
  handlePatientSelect
}) => {
  return (
    <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 space-y-6">
      {/* Search Input block */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 text-slate-500" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Patient Name, Patient ID (e.g. PT-8809), Phone, or Email..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950/20 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-cyan-500 text-white font-extrabold text-sm rounded-xl shadow-md hover:bg-cyan-600 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Grid Results */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Patient Records Database</h4>

        {filteredPatients.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs font-semibold flex flex-col items-center space-y-2">
            <AlertCircle size={28} className="text-slate-700" />
            <span>No patients match your search parameter.</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredPatients.map(pat => (
              <div
                key={pat.id}
                onClick={() => handlePatientSelect(pat.id)}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/10 dark:bg-slate-900/10 hover:border-cyan-500/40 cursor-pointer flex justify-between items-center transition-all group"
              >
                <div className="min-w-0">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-200 truncate">{pat.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">
                    ID: {pat.id} • {pat.age} yrs • Blood: {pat.bloodGroup}
                  </p>
                  <p className="text-[9px] text-slate-400 font-semibold mt-0.5">{pat.email}</p>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// SUB-TAB COMPONENT: SHARED RECORDS INDEX
// -------------------------------------------------------------
interface SharedTabProps {
  sharedRecordPatients: PatientRecord[];
  handlePatientSelect: (id: string) => void;
}

const SharedTab: React.FC<SharedTabProps> = ({ sharedRecordPatients, handlePatientSelect }) => {
  return (
    <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
      <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-6">
        Patient Folders Shared With Your Credentials
      </h3>

      {sharedRecordPatients.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-xs font-semibold flex flex-col items-center space-y-2">
          <FolderLock size={32} className="text-slate-700" />
          <span>You currently do not have access to any patient health folders. Use search page to locate patient details.</span>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {sharedRecordPatients.map(pat => (
            <div
              key={pat.id}
              onClick={() => handlePatientSelect(pat.id)}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/10 dark:bg-slate-900/10 hover:border-cyan-500/40 cursor-pointer flex justify-between items-center transition-all group"
            >
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-200">{pat.name}</h4>
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">ID: {pat.id} • {pat.bloodGroup}</p>
                <div className="flex items-center space-x-2 mt-2 px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold w-fit">
                  <Shield size={10} />
                  <span>CONSENT ACTIVE</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// SUB-TAB COMPONENT: PATIENT RECORD VIEW (DOCTOR)
// -------------------------------------------------------------
interface PatientViewTabProps {
  patientId: string;
  patients: PatientRecord[];
  currentDoctor: Doctor;
  sharedPermissions: { [patientId: string]: string[] };
  handleAddNote: (e: React.FormEvent) => void;
  noteDiagnosis: string;
  setNoteDiagnosis: (s: string) => void;
  notePrescription: string;
  setNotePrescription: (s: string) => void;
  noteText: string;
  setNoteText: (s: string) => void;
}

const PatientViewTab: React.FC<PatientViewTabProps> = ({
  patientId,
  patients,
  currentDoctor,
  sharedPermissions,
  handleAddNote,
  noteDiagnosis,
  setNoteDiagnosis,
  notePrescription,
  setNotePrescription,
  noteText,
  setNoteText
}) => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) return null;

  // Consent Access Security Check
  const doctorId = currentDoctor.id;
  const isShared = (sharedPermissions[patient.id] || []).includes(doctorId);

  return (
    <div className="space-y-6">
      {/* Consent state ribbon */}
      {!isShared && (
        <div className="p-6 border border-rose-500/20 bg-rose-500/10 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
          <Lock size={36} className="text-rose-400 animate-bounce" style={{ animationDuration: "3s" }} />
          <h3 className="font-extrabold text-sm text-slate-100">Access Restricted: Consent Key Required</h3>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            You do not possess valid decryption credentials for patient <strong className="text-white">{patient.name}</strong>. Ask the patient to toggle authorization for <strong>{currentDoctor.name}</strong> under settings.
          </p>
          <button
            onClick={() => alert(`Simulated Access Request Sent to: ${patient.name}`)}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md"
          >
            Request Access Credentials
          </button>
        </div>
      )}

      {isShared && (
        <div className="space-y-8">
          {/* Patient Header Box */}
          <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 grid sm:grid-cols-4 gap-6 text-xs font-bold uppercase text-slate-400 tracking-wider">
            <div>
              <p className="text-[10px]">Patient Name</p>
              <p className="text-sm font-extrabold text-slate-100 mt-1">{patient.name}</p>
            </div>
            <div>
              <p className="text-[10px]">Age / Gender</p>
              <p className="text-sm font-extrabold text-slate-100 mt-1">{patient.age} / {patient.gender}</p>
            </div>
            <div>
              <p className="text-[10px]">Blood Group</p>
              <p className="text-sm font-extrabold text-cyan-400 mt-1">{patient.bloodGroup}</p>
            </div>
            <div>
              <p className="text-[10px]">Allergies</p>
              <p className="text-sm font-extrabold text-rose-400 mt-1 truncate">
                {patient.allergies.join(", ") || "None"}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Consultation Note Editor */}
            <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 lg:col-span-1 h-fit">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4 flex items-center gap-1.5">
                <FilePlus size={16} className="text-cyan-500" /> Log Clinical Consultation
              </h3>

              <form onSubmit={handleAddNote} className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block text-slate-400 mb-1">Diagnosis</label>
                  <input
                    type="text"
                    required
                    value={noteDiagnosis}
                    onChange={(e) => setNoteDiagnosis(e.target.value)}
                    placeholder="e.g. Mild Hypertension follow-up"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-950/20 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Prescription</label>
                  <input
                    type="text"
                    value={notePrescription}
                    onChange={(e) => setNotePrescription(e.target.value)}
                    placeholder="e.g. Lisinopril 10mg daily"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-950/20 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Consultation Notes</label>
                  <textarea
                    rows={4}
                    required
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Describe clinical observations, vitals readouts, and advice..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-950/20 text-white placeholder-slate-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold rounded-xl shadow-md"
                >
                  Save Consultation Log
                </button>
              </form>
            </div>

            {/* Read Only Records/Timeline */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI summary view */}
              <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4 flex items-center gap-1.5">
                  <Brain className="text-cyan-500" size={18} />
                  AI Summary Insights
                </h3>
                <p className="text-xs font-semibold text-slate-400 leading-relaxed">
                  {patient.medicalHistory}
                </p>
                <div className="mt-3.5 space-y-2 text-xs font-semibold">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Chronic Conditions</span>
                    <span className="text-rose-400 font-extrabold">{patient.chronicDiseases.join(", ") || "None"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Active Medications</span>
                    <span className="text-emerald-400 font-extrabold">{patient.currentMedications.join(", ") || "None"}</span>
                  </div>
                </div>
              </div>

              {/* Patient Timeline */}
              <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/60 pb-3 mb-4">
                  Patient Timeline Record
                </h3>

                <div className="space-y-4">
                  {patient.timeline.map((event) => (
                    <div key={event.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900/10">
                      <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800/60">
                        <div>
                          <span className="text-[10px] font-bold text-slate-500">{event.date}</span>
                          <h4 className="font-extrabold text-xs text-slate-200 mt-0.5">{event.diagnosis}</h4>
                        </div>
                        <span className="text-[9px] font-extrabold uppercase bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                          {event.doctorName}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-semibold leading-relaxed">{event.notes}</p>
                      
                      {event.prescription && (
                        <div className="mt-3 p-2 bg-emerald-500/5 border border-emerald-500/10 rounded text-[11px] font-bold text-emerald-400">
                          Prescription: {event.prescription}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// SUB-TAB COMPONENT: DOCTOR PROFILE
// -------------------------------------------------------------
const ProfileTab: React.FC<{ currentDoctor: Doctor }> = ({ currentDoctor }) => {
  return (
    <div className="glass-premium p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 max-w-md mx-auto space-y-6">
      <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-800/60">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-extrabold text-2xl">
          DR
        </div>
        <h3 className="text-xl font-extrabold text-slate-100">{currentDoctor.name}</h3>
        <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{currentDoctor.specialty}</p>
      </div>

      <div className="space-y-4 text-xs font-semibold">
        <div className="flex justify-between">
          <span className="text-slate-400">Consultant Email</span>
          <span className="text-slate-200">{currentDoctor.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Phone Number</span>
          <span className="text-slate-200">{currentDoctor.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Provider ID</span>
          <span className="text-slate-200">{currentDoctor.id}</span>
        </div>
      </div>
    </div>
  );
};
