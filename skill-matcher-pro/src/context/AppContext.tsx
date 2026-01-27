import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserSkill, mockDSAProgress, companyTypes, roles, mockUserSkills } from '@/lib/mockData';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { defaultDomains, SkillDomain } from '@/lib/skillDomains';
import { toast } from 'sonner';

interface AppState {
  selectedCompany: string | null;
  selectedRole: string | null;
  userSkills: UserSkill[];
  userDomains: SkillDomain[];
  dsaProgress: typeof mockDSAProgress;
  demoMode: boolean;
  darkMode: boolean;
  user: User | null;
  authLoading: boolean;
  dataLoading: boolean;
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
  updateDomains: (domains: SkillDomain[]) => void;
  saveUserData: (data: Partial<AppState>) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    selectedCompany: null,
    selectedRole: null,
    userSkills: [],
    userDomains: defaultDomains,
    dsaProgress: { completed: [], inProgress: [], notStarted: [] },
    demoMode: false,
    darkMode: true,
    user: null,
    authLoading: true,
    dataLoading: false,
  });

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setState(prev => ({ ...prev, user, authLoading: false }));

      if (user) {
        // Fetch user data from Firestore
        await fetchUserData(user.uid);
      } else {
        // Reset to default state on logout
        setState(prev => ({
          ...prev,
          userSkills: [],
          userDomains: defaultDomains,
          selectedCompany: null,
          selectedRole: null,
          dsaProgress: { completed: [], inProgress: [], notStarted: [] },
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid: string) => {
    setState(prev => ({ ...prev, dataLoading: true }));
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setState(prev => ({
          ...prev,
          userSkills: data.userSkills || [],
          userDomains: data.userDomains || defaultDomains,
          dsaProgress: data.dsaProgress || { completed: [], inProgress: [], notStarted: [] },
          selectedCompany: data.selectedCompany || null,
          selectedRole: data.selectedRole || null,
        }));
      } else {
        // New user: data will be created on first save
        console.log("New user detected, using defaults.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load your profile data.");
    } finally {
      setState(prev => ({ ...prev, dataLoading: false }));
    }
  };

  const saveUserData = async (updates: Partial<AppState>) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const dataToSave = {
        userSkills: updates.userSkills !== undefined ? updates.userSkills : state.userSkills,
        userDomains: updates.userDomains !== undefined ? updates.userDomains : state.userDomains,
        dsaProgress: updates.dsaProgress !== undefined ? updates.dsaProgress : state.dsaProgress,
        selectedCompany: updates.selectedCompany !== undefined ? updates.selectedCompany : state.selectedCompany,
        selectedRole: updates.selectedRole !== undefined ? updates.selectedRole : state.selectedRole,
        lastUpdated: new Date().toISOString()
      };

      await setDoc(userRef, dataToSave, { merge: true });
    } catch (error) {
      console.error("Error saving user data:", error);
      // We don't always want to toast on every background save to avoid spam
    }
  };

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const setSelectedCompany = (id: string | null) => {
    setState((prev) => ({ ...prev, selectedCompany: id }));
    saveUserData({ selectedCompany: id });
  };

  const setSelectedRole = (id: string | null) => {
    setState((prev) => ({ ...prev, selectedRole: id }));
    saveUserData({ selectedRole: id });
  };

  const setUserSkills = (skills: UserSkill[]) => {
    setState((prev) => ({ ...prev, userSkills: skills }));
    saveUserData({ userSkills: skills });
  };

  const updateDomains = (domains: SkillDomain[]) => {
    setState(prev => ({ ...prev, userDomains: domains }));
    saveUserData({ userDomains: domains });
  };

  const updateSkill = (skillId: string, level: number) => {
    setState((prev) => {
      const newSkills = prev.userSkills.map((s) =>
        s.skillId === skillId ? { ...s, level } : s
      );
      saveUserData({ userSkills: newSkills });
      return { ...prev, userSkills: newSkills };
    });
  };

  const addSkill = (skill: UserSkill) => {
    setState((prev) => {
      const newSkills = [...prev.userSkills.filter((s) => s.skillId !== skill.skillId), skill];
      saveUserData({ userSkills: newSkills });
      return { ...prev, userSkills: newSkills };
    });
  };

  const completeDSATopic = (topicId: string) => {
    setState((prev) => {
      const newProgress = {
        completed: [...prev.dsaProgress.completed, topicId],
        inProgress: prev.dsaProgress.inProgress.filter((t) => t !== topicId),
        notStarted: prev.dsaProgress.notStarted.filter((t) => t !== topicId),
      };
      saveUserData({ dsaProgress: newProgress });
      return { ...prev, dsaProgress: newProgress };
    });
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
        updateDomains,
        saveUserData,
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
