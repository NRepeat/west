import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useSessionStore } from '@/store/user-store';
import Cookie from 'js-cookie';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
	useQuery({
		queryKey: ['getSession'], queryFn: async () => {
			const response = await fetch('http://localhost:3000/session/create')
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json()
			if (!state.userSession) {
				state.createSession({ uid: data.uuid, cartId: data.cartId })
			}
			return data
		},
		enabled: state.userSession?.cartId ? false : true
	})
	useEffect(() => {
		const user = Cookie.get('user');
		if (user) {
			state.setUser(JSON.parse(user))
		}

	}, [])

	return (
		<SessionContext.Provider
			value={{ isAuthenticated: state.user !== null }}
		>
			{children}
		</SessionContext.Provider>
	);
};