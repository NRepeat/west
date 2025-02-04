import { IUser } from '@/shared/types';
const BASE_URL = 'http://localhost:3000';

export const loginUser = async (newUser: IUser) => {
	const newLocal = `${BASE_URL}/auth/login`;
	const response = await fetch(newLocal, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newUser),
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const data = response.json();
	return data
};

