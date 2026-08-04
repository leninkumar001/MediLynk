import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import {
  Activity,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ShieldCheck,
  Stethoscope,
  ChevronLeft,
  ArrowRight
} from "lucide-react";

// Zod Validation Schemas
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["patient", "doctor"])
});

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["patient", "doctor"]),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  // Patient details
  age: z.string().optional(),
  gender: z.string().optional(),
  bloodGroup: z.string().optional(),
  // Doctor details
  specialty: z.string().optional()
});

type SignInFields = z.infer<typeof signInSchema>;
type SignUpFields = z.infer<typeof signUpSchema>;

export const AuthPage: React.FC = () => {
  const { login, signUp } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSignUpInit = searchParams.get("signup") === "true";

  // Auth Card Sub-states: "signin" | "signup" | "forgot" | "verify"
  const [authMode, setAuthMode] = useState<"signin" | "signup" | "forgot" | "verify">(
    isSignUpInit ? "signup" : "signin"
  );
  
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // Form hooks
  const {
    register: registerSignIn,
    handleSubmit: handleSignInSubmit,
    formState: { errors: signInErrors }
  } = useForm<SignInFields>({
    resolver: zodResolver(signInSchema),
    defaultValues: { role: "patient" }
  });

  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
    watch: watchSignUp
  } = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { role: "patient", gender: "Male", bloodGroup: "O-Positive" }
  });

  const currentSignUpRole = watchSignUp("role");

  // Handlers
  const onSignIn = (data: SignInFields) => {
    setAuthError(null);
    const success = login(data.email, data.role);
    if (success) {
      if (data.role === "patient") {
        navigate("/patient");
      } else {
        navigate("/doctor");
      }
    } else {
      setAuthError(
        `Account not found. Use mock email: ${
          data.role === "patient"
            ? "sarah.connor@sky.net"
            : "elizabeth.vance@medilynk.ai"
        }`
      );
    }
  };

  const onSignUp = (data: SignUpFields) => {
    setAuthError(null);
    signUp(data.name, data.email, data.role, {
      phone: data.phone,
      age: data.age,
      gender: data.gender,
      bloodGroup: data.bloodGroup,
      specialty: data.specialty
    });
    setAuthMode("verify");
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes("@")) {
      setAuthError("Please enter a valid email address");
      return;
    }
    setAuthError(null);
    // Proceed to verification UI
    setAuthMode("verify");
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length < 4) {
      setAuthError("Enter a valid code");
      return;
    }
    setAuthError(null);
    alert("Verification successful!");
    // Navigate based on selected signup role
    if (role === "patient") {
      navigate("/patient");
    } else {
      navigate("/doctor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 grid-bg relative px-4 py-12 text-slate-100 overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-lg z-10">
        {/* Header Branding */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center justify-center space-x-3 mb-8 cursor-pointer select-none"
        >
          <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-md">
            <Activity size={24} />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white">
            MediLynk <span className="text-cyan-400">AI</span>
          </span>
        </div>

        {/* Auth Box Card */}
        <div className="glass-premium border border-white/5 dark:border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            {/* SIGN IN VIEW */}
            {authMode === "signin" && (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-sm text-slate-400 mb-6 font-semibold">
                  Access your secure lifelong digital medical file.
                </p>

                {/* Role Switcher */}
                <div className="grid grid-cols-2 p-1 bg-slate-950/80 rounded-xl mb-6 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setRole("patient")}
                    className={`py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                      role === "patient"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Patient
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("doctor")}
                    className={`py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                      role === "doctor"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Doctor
                  </button>
                </div>

                {authError && (
                  <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold rounded-lg leading-relaxed">
                    {authError}
                  </div>
                )}

                {/* Sign In Form */}
                <form onSubmit={handleSignInSubmit(onSignIn)} className="space-y-4">
                  {/* Pass role via hidden inputs synced with state */}
                  <input type="hidden" value={role} {...registerSignIn("role")} />

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 text-slate-500" size={18} />
                      <input
                        type="email"
                        {...registerSignIn("email")}
                        placeholder={role === "patient" ? "sarah.connor@sky.net" : "elizabeth.vance@medilynk.ai"}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-950/50 text-sm text-white placeholder-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                      />
                    </div>
                    {signInErrors.email && (
                      <p className="text-xs text-rose-400 font-semibold mt-1">{signInErrors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setAuthMode("forgot")}
                        className="text-xs text-cyan-400 hover:underline font-bold"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 text-slate-500" size={18} />
                      <input
                        type={showPassword ? "text" : "password"}
                        {...registerSignIn("password")}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-800 bg-slate-950/50 text-sm text-white placeholder-slate-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {signInErrors.password && (
                      <p className="text-xs text-rose-400 font-semibold mt-1">{signInErrors.password.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold rounded-xl shadow-md hover:from-cyan-600 hover:to-blue-700 active:scale-[0.98] transition-all duration-300 text-sm flex items-center justify-center space-x-2"
                  >
                    <span>Sign In</span>
                    <ArrowRight size={16} />
                  </button>
                </form>

                <div className="mt-8 text-center text-xs text-slate-400 font-semibold">
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      setAuthError(null);
                      setAuthMode("signup");
                    }}
                    className="text-cyan-400 hover:underline font-bold"
                  >
                    Create Account
                  </button>
                </div>
              </motion.div>
            )}

            {/* SIGN UP VIEW */}
            {authMode === "signup" && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-sm text-slate-400 mb-6 font-semibold">
                  Register and initialize your medical directory.
                </p>

                {authError && (
                  <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold rounded-lg">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleSignUpSubmit(onSignUp)} className="space-y-4">
                  {/* Account Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 text-slate-500" size={16} />
                        <input
                          type="text"
                          {...registerSignUp("name")}
                          placeholder="John Doe"
                          className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-800 bg-slate-950/50 text-xs text-white placeholder-slate-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                      </div>
                      {signUpErrors.name && (
                        <p className="text-[10px] text-rose-400 font-semibold mt-1">{signUpErrors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1">
                        Role Selection
                      </label>
                      <select
                        {...registerSignUp("role")}
                        onChange={(e) => setRole(e.target.value as "patient" | "doctor")}
                        className="w-full px-3 py-3 rounded-xl border border-slate-800 bg-slate-950/90 text-xs text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                      >
                        <option value="patient">Patient (Data Owner)</option>
                        <option value="doctor">Doctor (Consultant)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-slate-500" size={16} />
                        <input
                          type="email"
                          {...registerSignUp("email")}
                          placeholder="john.doe@example.com"
                          className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-800 bg-slate-950/50 text-xs text-white placeholder-slate-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                      </div>
                      {signUpErrors.email && (
                        <p className="text-[10px] text-rose-400 font-semibold mt-1">{signUpErrors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 text-slate-500" size={16} />
                        <input
                          type="text"
                          {...registerSignUp("phone")}
                          placeholder="+1 (555) 012-3456"
                          className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-800 bg-slate-950/50 text-xs text-white placeholder-slate-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                      </div>
                      {signUpErrors.phone && (
                        <p className="text-[10px] text-rose-400 font-semibold mt-1">{signUpErrors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1">
                      Create Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 text-slate-500" size={16} />
                      <input
                        type={showPassword ? "text" : "password"}
                        {...registerSignUp("password")}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-10 py-3 rounded-xl border border-slate-800 bg-slate-950/50 text-xs text-white placeholder-slate-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {signUpErrors.password && (
                      <p className="text-[10px] text-rose-400 font-semibold mt-1">{signUpErrors.password.message}</p>
                    )}
                  </div>

                  {/* DYNAMIC REGISTRATION FIELD GROUPS */}
                  <div className="border-t border-slate-800/80 pt-4 mt-2">
                    {currentSignUpRole === "patient" ? (
                      <div className="space-y-4">
                        <p className="text-xs text-cyan-400 font-bold tracking-wide flex items-center gap-1.5">
                          <ShieldCheck size={14} /> Personal Vitals & Metadata
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                              Age
                            </label>
                            <input
                              type="number"
                              {...registerSignUp("age")}
                              placeholder="25"
                              className="w-full px-3 py-2 rounded-lg border border-slate-800 bg-slate-950/50 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                              Gender
                            </label>
                            <select
                              {...registerSignUp("gender")}
                              className="w-full px-2 py-2 rounded-lg border border-slate-800 bg-slate-950/90 text-xs text-slate-300"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                              Blood Group
                            </label>
                            <select
                              {...registerSignUp("bloodGroup")}
                              className="w-full px-2 py-2 rounded-lg border border-slate-800 bg-slate-950/90 text-xs text-slate-300"
                            >
                              <option value="O-Positive">O+</option>
                              <option value="O-Negative">O-</option>
                              <option value="A-Positive">A+</option>
                              <option value="A-Negative">A-</option>
                              <option value="B-Positive">B+</option>
                              <option value="B-Negative">B-</option>
                              <option value="AB-Positive">AB+</option>
                              <option value="AB-Negative">AB-</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-xs text-cyan-400 font-bold tracking-wide flex items-center gap-1.5">
                          <Stethoscope size={14} /> Medical Specialty Detail
                        </p>
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                            Area of Specialty
                          </label>
                          <input
                            type="text"
                            {...registerSignUp("specialty")}
                            placeholder="Cardiology, General Medicine, Pediatrics..."
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950/50 text-xs text-white placeholder-slate-700"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold rounded-xl shadow-md hover:from-cyan-600 hover:to-blue-700 active:scale-[0.98] transition-all duration-300 text-sm flex items-center justify-center space-x-2"
                  >
                    <span>Register Account</span>
                    <ArrowRight size={16} />
                  </button>
                </form>

                <div className="mt-8 text-center text-xs text-slate-400 font-semibold">
                  Already registered?{" "}
                  <button
                    onClick={() => {
                      setAuthError(null);
                      setAuthMode("signin");
                    }}
                    className="text-cyan-400 hover:underline font-bold"
                  >
                    Sign In here
                  </button>
                </div>
              </motion.div>
            )}

            {/* FORGOT PASSWORD VIEW */}
            {authMode === "forgot" && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => {
                    setAuthError(null);
                    setAuthMode("signin");
                  }}
                  className="flex items-center text-xs text-slate-400 hover:text-white font-bold mb-6 gap-1"
                >
                  <ChevronLeft size={16} /> Back to Sign In
                </button>

                <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
                <p className="text-sm text-slate-400 mb-6 font-semibold">
                  Enter your email address to receive a secure recovery code.
                </p>

                {authError && (
                  <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold rounded-lg">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 text-slate-500" size={18} />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="yourname@domain.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-950/50 text-sm text-white placeholder-slate-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold rounded-xl shadow-md hover:from-cyan-600 hover:to-blue-700 active:scale-[0.98] transition-all duration-300 text-sm"
                  >
                    Send Recovery Code
                  </button>
                </form>
              </motion.div>
            )}

            {/* EMAIL VERIFICATION / CODE ENTRY VIEW */}
            {authMode === "verify" && (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-2">Verify Account</h2>
                <p className="text-sm text-slate-400 mb-6 font-semibold">
                  A verification code has been dispatched. Enter it below to authorize.
                </p>

                {authError && (
                  <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold rounded-lg">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleVerifySubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-2 text-center">
                      4-Digit Security Code
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      required
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="1234"
                      className="w-32 mx-auto text-center px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/50 text-2xl font-extrabold text-white tracking-widest focus:ring-2 focus:ring-cyan-500 focus:outline-none block"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold rounded-xl shadow-md hover:from-cyan-600 hover:to-blue-700 active:scale-[0.98] transition-all duration-300 text-sm"
                  >
                    Verify & Authenticate
                  </button>
                </form>

                <div className="mt-8 text-center text-xs text-slate-400 font-semibold">
                  Didn't receive the email?{" "}
                  <button
                    onClick={() => {
                      alert("Code resent successfully!");
                    }}
                    className="text-cyan-400 hover:underline font-bold"
                  >
                    Resend Code
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
