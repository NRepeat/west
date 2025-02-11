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

const Signup = () => {
	const setUser = useSessionStore(state => state.setUser)
	const validator = withZod(
		z.object({
			email: z.string().min(1).email(),
			password: z.string().min(6),
			confirmPassword: z.string().min(6)
		}).refine(data => data.password === data.confirmPassword, {
			message: "Passwords don't match",
			path: ["confirmPassword"],
		}),
	);
	const nav = useNavigate()
	const mutation = useCustomMutation(signupUser);

	const handleRegister = async (userData: IUser) => {
		return await mutation.mutateAsync(userData);
	};


	const form = useForm({
		validator,
		handleSubmit: async (data) => {
			return handleRegister({ email: data.email, password: data.password, provider: 'local' });
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
			<FromInput
				className="focus-visible:outline-none"
				scope={form.scope('confirmPassword')}
				label={'Confirm Password'}
				islabelvisible={true}
				type='password'
				placeholder="Confirm Password"
				name="Confirm Password" />
			<Button type="submit" disabled={form.formState.isSubmitting}>Sign Up</Button>
		</RVForm>
	);
}

export default Signup;