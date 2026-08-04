import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#020810" }}
    >
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#1B6BDE",
            colorBackground: "#0A1628",
            borderRadius: "12px",
          },
          elements: {
            card: "border border-blue-900/30 shadow-2xl",
            formButtonPrimary: "bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90",
          },
        }}
      />
    </div>
  );
}
