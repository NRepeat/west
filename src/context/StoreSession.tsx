import React, { createContext, useContext, ReactNode } from 'react';
import { useSessionStore } from '@/store/user-store';

interface SessionContextProps {

	isAuthenticated: boolean;
}

export const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const useSession = (): SessionContextProps => {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error('useSession must be used within a SessionProvider');
	}
	return context;
};

interface SessionProviderProps {
	children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
	const state = useSessionStore((state) => state);


	return (
		<SessionContext.Provider
			value={{ isAuthenticated: state.user !== null }}
		>
			{children}
		</SessionContext.Provider>
	);
};