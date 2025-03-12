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

            // 🔗 Call the `onSubmit` function passed from RegisterPage/LoginPage
            const submitResult = await onSubmit({ username, password });

            return submitResult; // This will be displayed as the error message if needed
        },
        null // Initial state
    );

    return (
        <>
            {result && (
                <p style={{ color: result.type === "error" ? "red" : "green" }}>
                    {result.message}
                </p>
            )}
            {isPending && <p style={{ color: "blue" }}>Submitting...</p>}

            <form action={submitAction}>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" autoComplete="username" disabled={isPending} />

                <br />

                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" autoComplete="current-password" disabled={isPending} />

                <br />

                <button type="submit" disabled={isPending}>Submit</button>
            </form>
        </>
    );
}
