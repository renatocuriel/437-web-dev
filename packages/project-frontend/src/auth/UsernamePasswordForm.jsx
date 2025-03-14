import { useActionState } from "react";

export function UsernamePasswordForm({ onSubmit }) {
    const [result, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            const username = formData.get("username");
            const password = formData.get("password");

            if (!username || !password) {
                return {
                    type: "error",
                    message: "Please fill in your username and password.",
                };
            }

            console.log("Submitting to backend:", { username, password });

            const submitResult = await onSubmit({ username, password });

            return submitResult;
        },
        null
    );

    return (
        <div>
            {result && (
                <p className={`text-center mb-2 ${result.type === "error" ? "text-red-500" : "text-green-500"}`}>
                    {result.message}
                </p>
            )}
            {isPending && <p className="text-center text-blue-500">Submitting...</p>}

            <form action={submitAction} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        autoComplete="username"
                        className="w-full p-2 border rounded-lg dark:bg-gray-800 border-highlight"
                        disabled={isPending} 
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        autoComplete="current-password"
                        className="w-full p-2 border rounded-lg dark:bg-gray-800 border-highlight"
                        disabled={isPending} 
                    />
                </div>

                <button type="submit" className="btn-primary w-full" disabled={isPending}>
                    Submit
                </button>
            </form>
        </div>
    );
}
