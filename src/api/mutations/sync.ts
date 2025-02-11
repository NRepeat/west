const BASE_URL = 'http://localhost:3000';
export const sync = async ({ activeSession, newSession }: { activeSession: string, newSession: string }) => {

	const newLocal = `${BASE_URL}/session/sync`;
	const response = await fetch(newLocal, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ activeSessionId: activeSession, sessionId: newSession }),
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const data = await response.json();
	console.log('data', data)
	return data

}