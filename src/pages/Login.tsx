import { loginUser } from '@/api/mutations/login';
import { signupUser } from '@/api/mutations/signup';
import { Button } from '@/components/ui/button';
import RVForm from '@/components/ui/form';
import { FromInput } from '@/components/ui/form-input';
import useCustomMutation from '@/hooks/useMutation';
import { IUser } from '@/shared/types';
import { useSessionStore } from '@/store/user-store';
import { useForm } from '@rvf/react';
import { withZod } from '@rvf/zod';
import { useNavigate } from 'react-router';

import * as z from 'zod';

const Login = () => {
	const setUser = useSessionStore(state => state.setUser)
	const validator = withZod(
		z.object({
			email: z.string().min(1).email(),
			password: z.string().min(6),
		})
	);
	const nav = useNavigate()
	const mutation = useCustomMutation(loginUser);

	const handleLogin = async (userData: IUser) => {
		return await mutation.mutateAsync(userData);
	};


	const form = useForm({
		validator,
		handleSubmit: async (data) => {
			return handleLogin({ email: data.email, password: data.password, provider: 'local' });
		},

		onSubmitSuccess: async (data) => {
			const user = { email: data.email, provider: 'local' }
			setUser(user, data.refreshToken)
			return nav('/')
		}
	});
	return (
		<RVForm form={form} className='w-full max-w-md bg-white rounded-lg gap-4 flex flex-col'>
			<FromInput
				className="focus-visible:outline-none"
				scope={form.scope('email')}
				label={'Email'}
				islabelvisible={true}
				placeholder="Email"
				name="Email" />
			<FromInput
				className="focus-visible:outline-none"
				scope={form.scope('password')}
				label={'Password'}
				islabelvisible={true}
				type='password'
				placeholder="Password"
				name="Password" />
			<Button type="submit" disabled={form.formState.isSubmitting}>Login</Button>
		</RVForm>
	);
}

export default Login;