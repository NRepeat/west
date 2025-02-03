import { useMutation, UseMutationResult } from "@tanstack/react-query";


type MutationFn<TData, TVariables> = (variables: TVariables) => Promise<TData>;

const useCustomMutation = <TData, TVariables>(
	mutationFn: MutationFn<TData, TVariables>
): UseMutationResult<TData, unknown, TVariables> => {
	return useMutation({
		mutationFn,

	});
};

export default useCustomMutation;