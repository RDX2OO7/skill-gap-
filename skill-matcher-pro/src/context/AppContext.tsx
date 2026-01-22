import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserSkill, mockUserSkills, mockDSAProgress, companyTypes, roles } from '@/lib/mockData';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface AppState {
  selectedCompany: string | null;
  selectedRole: string | null;
  userSkills: UserSkill[];
  dsaProgress: typeof mockDSAProgress;
  demoMode: boolean;
  darkMode: boolean;
  user: User | null;
  authLoading: boolean;
}

interface AppContextType extends AppState {
  setSelectedCompany: (id: string | null) => void;
  setSelectedRole: (id: string | null) => void;
  setUserSkills: (skills: UserSkill[]) => void;
  updateSkill: (skillId: string, level: number) => void;
  addSkill: (skill: UserSkill) => void;
  toggleDemoMode: () => void;
  toggleDarkMode: () => void;
  loadDemoData: () => void;
  completeDSATopic: (topicId: string) => void;
  setUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    selectedCompany: null,
    selectedRole: null,
    userSkills: [],
    dsaProgress: { completed: [], inProgress: [], notStarted: [] },
    demoMode: false,
    darkMode: true, // Default to dark mode
    user: null,
    authLoading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState(prev => ({ ...prev, user, authLoading: false }));
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const setSelectedCompany = (id: string | null) => {
    setState((prev) => ({ ...prev, selectedCompany: id }));
  };

  const setSelectedRole = (id: string | null) => {
    setState((prev) => ({ ...prev, selectedRole: id }));
  };

  const setUserSkills = (skills: UserSkill[]) => {
    setState((prev) => ({ ...prev, userSkills: skills }));
  };

  const updateSkill = (skillId: string, level: number) => {
    setState((prev) => ({
      ...prev,
      userSkills: prev.userSkills.map((s) =>
        s.skillId === skillId ? { ...s, level } : s
      ),
    }));
  };

  const addSkill = (skill: UserSkill) => {
    setState((prev) => ({
      ...prev,
      userSkills: [...prev.userSkills.filter((s) => s.skillId !== skill.skillId), skill],
    }));
  };

  const completeDSATopic = (topicId: string) => {
    setState((prev) => ({
      ...prev,
      dsaProgress: {
        completed: [...prev.dsaProgress.completed, topicId],
        inProgress: prev.dsaProgress.inProgress.filter((t) => t !== topicId),
        notStarted: prev.dsaProgress.notStarted.filter((t) => t !== topicId),
      },
    }));
  };

  const toggleDemoMode = () => {
    setState((prev) => {
      const newDemoMode = !prev.demoMode;
      if (newDemoMode) {
        return {
          ...prev,
          demoMode: true,
          selectedCompany: companyTypes[0].id,
          selectedRole: roles[0].id,
          userSkills: mockUserSkills,
          dsaProgress: mockDSAProgress,
        };
      }
      return {
        ...prev,
        demoMode: false,
        selectedCompany: null,
        selectedRole: null,
        userSkills: [],
        dsaProgress: { completed: [], inProgress: [], notStarted: [] },
      };
    });
  };

  const toggleDarkMode = () => {
    setState((prev) => {
      const newDarkMode = !prev.darkMode;
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { ...prev, darkMode: newDarkMode };
    });
  };

  const loadDemoData = () => {
    setState((prev) => ({
      ...prev,
      selectedCompany: companyTypes[0].id,
      selectedRole: roles[0].id,
      userSkills: mockUserSkills,
      dsaProgress: mockDSAProgress,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setSelectedCompany,
        setSelectedRole,
        setUserSkills,
        updateSkill,
        addSkill,
        toggleDemoMode,
        toggleDarkMode,
        loadDemoData,
        completeDSATopic,
        setUser: (user) => setState(prev => ({ ...prev, user })),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
