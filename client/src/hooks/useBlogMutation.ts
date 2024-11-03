import {
    useMutation,
    useQueryClient,
    MutationFunction,
    UseMutationOptions,
} from "@tanstack/react-query";

export function useBlogMutation<TData = any, TVariables = any>(
    mutationKey: string[],
    mutationFn: MutationFunction<TData, TVariables>,
    options?: UseMutationOptions<TData, Error, TVariables>
) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey,
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        ...options,
    });
}