import React, { createContext, useContext, useState, useEffect } from "react";

// Types
export interface MedicalReport {
  id: string;
  name: string;
  type: string; // "PDF" | "Image" | "Scan" etc.
  size: string;
  date: string;
  category: "Blood Test" | "Prescription" | "X-ray" | "MRI/CT Scan" | "Vaccination" | "Other";
}

export interface TimelineEvent {
  id: string;
  date: string;
  doctorName: string;
  diagnosis: string;
  prescription: string;
  notes: string;
  reports?: MedicalReport[];
}

export interface PatientRecord {
  id: string; // PT-XXXX
  name: string;
  phone: string;
  email: string;
  age: number;
  gender: string;
  bloodGroup: string;
  allergies: string[];
  chronicDiseases: string[];
  surgeries: string[];
  vaccinations: string[];
  currentMedications: string[];
  medicalHistory: string;
  timeline: TimelineEvent[];
}

export interface Doctor {
  id: string; // DOC-XXXX
  name: string;
  specialty: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "patient" | "doctor";
  patientId?: string; // Links to PatientRecord if role is patient
  doctorId?: string;  // Links to Doctor if role is doctor
}

interface AppContextType {
  user: User | null;
  theme: "light" | "dark";
  patients: PatientRecord[];
  doctors: Doctor[];
  appointments: Appointment[];
  sharedPermissions: { [patientId: string]: string[] }; // patientId -> array of doctorIds
  login: (email: string, role: "patient" | "doctor") => boolean;
  logout: () => void;
  signUp: (name: string, email: string, role: "patient" | "doctor", extraInfo?: any) => void;
  toggleTheme: () => void;
  addConsultationNote: (patientId: string, doctorId: string, event: Omit<TimelineEvent, "id">) => void;
  uploadPatientReport: (patientId: string, report: Omit<MedicalReport, "id" | "date">) => void;
  toggleRecordSharing: (patientId: string, doctorId: string) => void;
  addAppointment: (appointment: Omit<Appointment, "id" | "status">) => void;
  updateAppointmentStatus: (appointmentId: string, status: "Scheduled" | "Completed" | "Cancelled") => void;
  updatePatientVitals: (patientId: string, updatedVitals: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial high-fidelity Mock Data
const INITIAL_DOCTORS: Doctor[] = [
  { id: "DOC-209", name: "Dr. Elizabeth Vance", specialty: "Cardiology", email: "elizabeth.vance@medilynk.ai", phone: "+1 (555) 432-1098" },
  { id: "DOC-404", name: "Dr. Alexander Thorne", specialty: "Pulmonology", email: "alexander.thorne@medilynk.ai", phone: "+1 (555) 876-5432" },
  { id: "DOC-501", name: "Dr. Marcus Brody", specialty: "General Medicine", email: "marcus.brody@medilynk.ai", phone: "+1 (555) 234-5678" }
];

const INITIAL_PATIENTS: PatientRecord[] = [
  {
    id: "PT-8809",
    name: "Sarah Connor",
    phone: "+1 (555) 019-2834",
    email: "sarah.connor@sky.net",
    age: 34,
    gender: "Female",
    bloodGroup: "O-Negative",
    allergies: ["Penicillin", "Sulfa Drugs", "Peanuts"],
    chronicDiseases: ["Mild Asthma", "Hypertension"],
    surgeries: ["Appendectomy (2018)", "Right Knee Arthroscopy (2021)"],
    vaccinations: ["COVID-19 Booster (2024)", "Tetanus Toxoid (2023)", "Influenza (2025)"],
    currentMedications: ["Albuterol HFA (as needed)", "Cetirizine 10mg (daily)", "Lisinopril 10mg (daily)"],
    medicalHistory: "Sarah Connor is a 34-year-old female with a childhood history of mild asthma. Diagnosed with mild hypertension in 2024. Active runner who trains regularly. Underwent an appendectomy in 2018 and physical therapy for a knee tear in 2021.",
    timeline: [
      {
        id: "EV-101",
        date: "2026-05-15",
        doctorName: "Dr. Elizabeth Vance (Cardiology)",
        diagnosis: "Routine Hypertension Review",
        prescription: "Lisinopril 10mg - 1 tablet daily in the morning.",
        notes: "Blood pressure recorded at 128/82. Heart rate: 64 bpm. Patient reports consistent adherence. Encouraged to continue low-sodium dietary habits.",
        reports: []
      },
      {
        id: "EV-102",
        date: "2026-02-10",
        doctorName: "Dr. Alexander Thorne (Pulmonology)",
        diagnosis: "Allergy-Induced Asthma Exacerbation",
        prescription: "Albuterol Inhaler - 2 puffs every 4-6 hours as needed. Montelukast 10mg nightly.",
        notes: "Lungs are clear on auscultation. Peak expiratory flow measured at 88% of personal baseline. Symptoms triggered by high seasonal pollen count.",
        reports: [
          { id: "REP-001", name: "Spirometry Pulmonary Test.pdf", type: "PDF", size: "1.2 MB", date: "2026-02-10", category: "Blood Test" }
        ]
      },
      {
        id: "EV-103",
        date: "2025-11-04",
        doctorName: "Dr. Marcus Brody (General Medicine)",
        diagnosis: "Post-surgery Knee Follow-up",
        prescription: "Continue physical therapy routine for 4 more weeks.",
        notes: "Knee incision site fully healed without signs of infection. Range of motion improved to 125 degrees. Minimal discomfort during weight-bearing.",
        reports: [
          { id: "REP-002", name: "Right Knee MRI Scan.jpg", type: "Image", size: "3.4 MB", date: "2025-10-15", category: "MRI/CT Scan" }
        ]
      }
    ]
  },
  {
    id: "PT-4402",
    name: "David Lightman",
    phone: "+1 (555) 382-9011",
    email: "david.lightman@wopr.org",
    age: 23,
    gender: "Male",
    bloodGroup: "A-Positive",
    allergies: ["Shellfish", "Aspirin"],
    chronicDiseases: ["None"],
    surgeries: ["None"],
    vaccinations: ["COVID-19 mRNA (2024)", "Meningococcal conjugate (2022)"],
    currentMedications: ["Vitamin D3 2000 IU (daily)"],
    medicalHistory: "David Lightman is a 23-year-old male student. In excellent health with no systemic diseases, chronic complaints, or surgeries. Mild seasonal allergies to pollen and shellfish.",
    timeline: [
      {
        id: "EV-201",
        date: "2026-06-20",
        doctorName: "Dr. Marcus Brody (General Medicine)",
        diagnosis: "Annual Wellness Examination",
        prescription: "Daily Vitamin D3 supplements.",
        notes: "Vitals normal. Blood pressure: 118/74, Heart rate: 70 bpm. Metabolic panel is clean. Urged patient to stay hydrated and active.",
        reports: [
          { id: "REP-003", name: "Complete Blood Count Panel.pdf", type: "PDF", size: "780 KB", date: "2026-06-20", category: "Blood Test" }
        ]
      }
    ]
  },
  {
    id: "PT-7721",
    name: "Elena Rostova",
    phone: "+1 (555) 762-9081",
    email: "elena.rostova@thered.com",
    age: 29,
    gender: "Female",
    bloodGroup: "B-Positive",
    allergies: ["Sulfa Antibiotics", "Latex"],
    chronicDiseases: ["Hypothyroidism"],
    surgeries: ["Tonsillectomy (2007)"],
    vaccinations: ["Hepatitis B (2023)", "Influenza (2025)", "Tdap (2024)"],
    currentMedications: ["Levothyroxine 75mcg (daily, fasting)"],
    medicalHistory: "Elena Rostova is a 29-year-old female diagnosed with primary hypothyroidism in 2023. Compliant with Levothyroxine treatment. Surgical history includes a childhood tonsillectomy.",
    timeline: [
      {
        id: "EV-301",
        date: "2026-04-12",
        doctorName: "Dr. Marcus Brody (General Medicine)",
        diagnosis: "Thyroid Panel Follow-up",
        prescription: "Levothyroxine 75mcg - dosage remains unchanged.",
        notes: "TSH levels are stabilized within normal limits (2.1 uIU/mL). Symptoms of fatigue and dry skin have completely resolved. Retest in 12 months.",
        reports: [
          { id: "REP-004", name: "Thyroid T3-T4-TSH Panel.pdf", type: "PDF", size: "640 KB", date: "2026-04-08", category: "Blood Test" }
        ]
      }
    ]
  }
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: "APP-001", patientId: "PT-8809", patientName: "Sarah Connor", doctorId: "DOC-209", doctorName: "Dr. Elizabeth Vance", date: "2026-08-10", time: "10:30 AM", reason: "Follow-up Cardiology Vitals Check", status: "Scheduled" },
  { id: "APP-002", patientId: "PT-8809", patientName: "Sarah Connor", doctorId: "DOC-404", doctorName: "Dr. Alexander Thorne", date: "2026-08-18", time: "02:15 PM", reason: "Asthma Controller Therapy Review", status: "Scheduled" },
  { id: "APP-003", patientId: "PT-4402", patientName: "David Lightman", doctorId: "DOC-501", doctorName: "Dr. Marcus Brody", date: "2026-08-12", time: "09:00 AM", reason: "Allergy Consultation & Skin Test", status: "Scheduled" }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme State
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("medilynk_theme");
    return (saved as "light" | "dark") || "dark"; // Default to premium dark mode
  });

  // User State
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("medilynk_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Mock Database State
  const [patients, setPatients] = useState<PatientRecord[]>(() => {
    const saved = localStorage.getItem("medilynk_patients");
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });

  const [doctors] = useState<Doctor[]>(INITIAL_DOCTORS);

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem("medilynk_appointments");
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  // Shared Permissions State (Patient shares with Doctor)
  const [sharedPermissions, setSharedPermissions] = useState<{ [patientId: string]: string[] }>(() => {
    const saved = localStorage.getItem("medilynk_permissions");
    if (saved) return JSON.parse(saved);
    
    // Initial permission: Sarah Connor shares with Vance (Cardio) and Thorne (Pulmon)
    // David shares with Brody
    return {
      "PT-8809": ["DOC-209", "DOC-404"],
      "PT-4402": ["DOC-501"],
      "PT-7721": ["DOC-501"]
    };
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("medilynk_patients", JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem("medilynk_appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("medilynk_permissions", JSON.stringify(sharedPermissions));
  }, [sharedPermissions]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("medilynk_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("medilynk_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("medilynk_theme", theme);
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Auth Operations
  const login = (email: string, role: "patient" | "doctor"): boolean => {
    if (role === "patient") {
      const match = patients.find(p => p.email.toLowerCase() === email.toLowerCase());
      if (match) {
        setUser({ id: match.id, name: match.name, email: match.email, role: "patient", patientId: match.id });
        return true;
      }
    } else {
      const match = doctors.find(d => d.email.toLowerCase() === email.toLowerCase());
      if (match) {
        setUser({ id: match.id, name: match.name, email: match.email, role: "doctor", doctorId: match.id });
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const signUp = (name: string, email: string, role: "patient" | "doctor", extraInfo?: any) => {
    if (role === "patient") {
      const newId = `PT-${Math.floor(1000 + Math.random() * 9000)}`;
      const newPatient: PatientRecord = {
        id: newId,
        name,
        email,
        phone: extraInfo?.phone || "+1 (555) 000-0000",
        age: Number(extraInfo?.age) || 30,
        gender: extraInfo?.gender || "Other",
        bloodGroup: extraInfo?.bloodGroup || "O-Positive",
        allergies: extraInfo?.allergies ? extraInfo.allergies.split(",").map((s: string) => s.trim()) : [],
        chronicDiseases: extraInfo?.chronicDiseases ? extraInfo.chronicDiseases.split(",").map((s: string) => s.trim()) : [],
        surgeries: [],
        vaccinations: [],
        currentMedications: [],
        medicalHistory: `New patient account created on ${new Date().toLocaleDateString()}.`,
        timeline: []
      };
      setPatients(prev => [...prev, newPatient]);
      setUser({ id: newId, name, email, role: "patient", patientId: newId });
    } else {
      const newId = `DOC-${Math.floor(100 + Math.random() * 900)}`;
      const newDoc: Doctor = {
        id: newId,
        name: `Dr. ${name}`,
        specialty: extraInfo?.specialty || "General Medicine",
        email,
        phone: extraInfo?.phone || "+1 (555) 000-0000"
      };
      // For doctors, they are added to the list
      doctors.push(newDoc); // mutate static list (simulated)
      setUser({ id: newId, name: `Dr. ${name}`, email, role: "doctor", doctorId: newId });
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  // Clinical Operations (Doctor Actions)
  const addConsultationNote = (patientId: string, doctorId: string, event: Omit<TimelineEvent, "id">) => {
    const doc = doctors.find(d => d.id === doctorId);
    const newEvent: TimelineEvent = {
      ...event,
      id: `EV-${Math.floor(100 + Math.random() * 900)}`,
      doctorName: doc ? `${doc.name} (${doc.specialty})` : "Dr. Consultation"
    };

    setPatients(prev =>
      prev.map(pat => {
        if (pat.id === patientId) {
          // Check if medication is updated or diagnosis added to chronics
          const medications = event.prescription ? [...pat.currentMedications] : pat.currentMedications;
          return {
            ...pat,
            currentMedications: medications,
            timeline: [newEvent, ...pat.timeline] // Newest first
          };
        }
        return pat;
      })
    );
  };

  // Patient Actions (Upload)
  const uploadPatientReport = (patientId: string, report: Omit<MedicalReport, "id" | "date">) => {
    const newReport: MedicalReport = {
      ...report,
      id: `REP-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split("T")[0]
    };

    setPatients(prev =>
      prev.map(pat => {
        if (pat.id === patientId) {
          // Also append to the most recent timeline event if it matches, or create a virtual upload timeline event
          const newEvent: TimelineEvent = {
            id: `EV-UP-${Math.floor(100 + Math.random() * 900)}`,
            date: newReport.date,
            doctorName: "Patient Portal Upload",
            diagnosis: `File Uploaded: ${newReport.category}`,
            prescription: "N/A",
            notes: `Patient uploaded medical record file: ${newReport.name}.`,
            reports: [newReport]
          };
          return {
            ...pat,
            timeline: [newEvent, ...pat.timeline]
          };
        }
        return pat;
      })
    );
  };

  // Toggle Doctor's record viewing permissions (Patient controlled)
  const toggleRecordSharing = (patientId: string, doctorId: string) => {
    setSharedPermissions(prev => {
      const doctorsList = prev[patientId] || [];
      const updated = doctorsList.includes(doctorId)
        ? doctorsList.filter(id => id !== doctorId)
        : [...doctorsList, doctorId];
      return { ...prev, [patientId]: updated };
    });
  };

  // Appointments
  const addAppointment = (appt: Omit<Appointment, "id" | "status">) => {
    const newAppt: Appointment = {
      ...appt,
      id: `APP-${Math.floor(100 + Math.random() * 900)}`,
      status: "Scheduled"
    };
    setAppointments(prev => [...prev, newAppt]);
  };

  const updateAppointmentStatus = (id: string, status: "Scheduled" | "Completed" | "Cancelled") => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status } : a))
    );
  };

  const updatePatientVitals = (patientId: string, updatedVitals: any) => {
    // For modifying chronic diseases, allergies, etc. from patient profile
    setPatients(prev =>
      prev.map(p => {
        if (p.id === patientId) {
          return {
            ...p,
            ...updatedVitals
          };
        }
        return p;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        theme,
        patients,
        doctors,
        appointments,
        sharedPermissions,
        login,
        logout,
        signUp,
        toggleTheme,
        addConsultationNote,
        uploadPatientReport,
        toggleRecordSharing,
        addAppointment,
        updateAppointmentStatus,
        updatePatientVitals
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
