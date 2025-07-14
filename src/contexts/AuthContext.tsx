import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string) => string | true;
}

const USERS_KEY = 'bolt_users';
const USER_KEY = 'bolt_logged_in_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredUsers(): Record<string, string> {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : {};
}

function setStoredUsers(users: Record<string, string>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function validateUsername(username: string): string | true {
  if (!username) return 'Username is required.';
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
    return 'Username must be 3-20 characters and only contain letters, numbers, and underscores.';
  }
  return true;
}

function validatePassword(password: string): string | true {
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter.';
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter.';
  if (!/[0-9]/.test(password)) return 'Password must contain a number.';
  if (!/[^a-zA-Z0-9]/.test(password)) return 'Password must contain a special character.';
  return true;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(USER_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (username: string, password: string) => {
    const users = getStoredUsers();
    if (users[username] && users[username] === password) {
      const userObj = { username };
      setUser(userObj);
      localStorage.setItem(USER_KEY, JSON.stringify(userObj));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  const register = (username: string, password: string) => {
    const usernameValid = validateUsername(username);
    if (usernameValid !== true) return usernameValid;
    const passwordValid = validatePassword(password);
    if (passwordValid !== true) return passwordValid;
    const users = getStoredUsers();
    if (users[username]) return 'Username already exists.';
    users[username] = password;
    setStoredUsers(users);
    // Auto-login after registration
    const userObj = { username };
    setUser(userObj);
    localStorage.setItem(USER_KEY, JSON.stringify(userObj));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}; 