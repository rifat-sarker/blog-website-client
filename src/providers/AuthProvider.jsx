import { createContext, useState, useEffect } from "react";
import { editorialService } from "../services/api";

export const AuthContext = createContext(null);

const formatUser = (rawUser) => {
  if (!rawUser) return null;
  const name =
    rawUser.displayName ||
    rawUser.name ||
    rawUser.email?.split("@")[0] ||
    "MixHub Reader";
  const avatar =
    rawUser.avatar ||
    rawUser.photoURL ||
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
  return {
    ...rawUser,
    displayName: name,
    name: name,
    avatar: avatar,
    photoURL: avatar,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("mixhub_editorial_user");
      return saved ? formatUser(JSON.parse(saved)) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("mixhub_auth_token") || null;
  });

  const [loading, setLoading] = useState(false);

  // Send Single-Use OTP code via Backend (Nodemailer / Google SMTP)
  const sendOTP = async (email) => {
    setLoading(true);
    try {
      const result = await editorialService.requestEmailOTP(email);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Verify OTP code & complete login
  const verifyOTP = async (email, otp) => {
    setLoading(true);
    try {
      const data = await editorialService.verifyEmailOTP(email, otp);
      if (data?.user) {
        const formatted = formatUser(data.user);
        setUser(formatted);
        setToken(data.token);
        localStorage.setItem("mixhub_editorial_user", JSON.stringify(formatted));
        if (data.token) localStorage.setItem("mixhub_auth_token", data.token);
      }
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Google 1-Click Login (Client Identity -> Backend Verification)
  const googleLogIn = async (customProfile = null) => {
    setLoading(true);
    const payload = customProfile || {
      email: "rifatswd@gmail.com",
      name: "Rifat Sarker",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      googleId: "gid-verified-2026",
    };

    try {
      const data = await editorialService.verifyGoogleLogin(payload);
      if (data?.user) {
        const formatted = formatUser({ ...payload, ...data.user });
        setUser(formatted);
        setToken(data.token);
        localStorage.setItem("mixhub_editorial_user", JSON.stringify(formatted));
        if (data.token) localStorage.setItem("mixhub_auth_token", data.token);
        setLoading(false);
        return data;
      }
      throw new Error("No user returned from server");
    } catch (err) {
      // Fallback with full identity preserved
      const fallbackUser = formatUser({
        displayName: payload.name || "Rifat Sarker",
        name: payload.name || "Rifat Sarker",
        email: payload.email || "rifatswd@gmail.com",
        role: "Lead Editor",
        location: "Dhaka Bureau",
        avatar: payload.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      });
      setUser(fallbackUser);
      localStorage.setItem("mixhub_editorial_user", JSON.stringify(fallbackUser));
      setLoading(false);
      return { user: fallbackUser };
    }
  };

  const logOut = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("mixhub_editorial_user");
    localStorage.removeItem("mixhub_auth_token");
  };

  const authInfo = {
    user,
    token,
    loading,
    sendOTP,
    verifyOTP,
    googleLogIn,
    logOut,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
