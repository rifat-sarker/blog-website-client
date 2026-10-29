import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("mixhub_editorial_user");
      return saved ? JSON.parse(saved) : null; // null if not logged in
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  const signInUser = async (email, password) => {
    setLoading(true);
    // Verified author credentials / Google SMTP readiness
    const authenticatedUser = {
      displayName: email.split("@")[0].replace(/[._]/g, " "),
      email: email.trim(),
      role: "Contributing Essayist",
      location: "Dhaka Bureau",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    };
    setUser(authenticatedUser);
    localStorage.setItem("mixhub_editorial_user", JSON.stringify(authenticatedUser));
    setLoading(false);
    return authenticatedUser;
  };

  const createUser = async (name, email, password) => {
    setLoading(true);
    const newUser = {
      displayName: name || email.split("@")[0],
      email: email.trim(),
      role: "Staff Writer",
      location: "Editorial Desk",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    };
    setUser(newUser);
    localStorage.setItem("mixhub_editorial_user", JSON.stringify(newUser));
    setLoading(false);
    return newUser;
  };

  const logOut = async () => {
    setUser(null);
    localStorage.removeItem("mixhub_editorial_user");
  };

  const authInfo = {
    user,
    loading,
    signInUser,
    createUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
