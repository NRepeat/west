import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useSessionStore } from '@/store/user-store';
import Cookie from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
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

			if (!state.userSession) {

				const response = await fetch('http://localhost:3000/session/create')
				const data = await response.json()
				if (state.cart?.items && state.cart.items.length > 0) {
					await fetch('http://localhost:3000/session/sync/cart', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							activeSessionId: data.uuid,
							cartId: state.cart.id
						}),
					})
				}
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				state.createSession({ uid: data.uuid, cartId: data.cartId })
				return data
			}
		},
		enabled: state.userSession?.cartId ? false : true
	})
	useEffect(() => {
		const userCookie = Cookie.get('user');
		if (userCookie) {
			const user = JSON.parse(userCookie)
			state.setUser(user)
			state.createSession({ cartId: user.cartId, uid: user.sessionId })
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