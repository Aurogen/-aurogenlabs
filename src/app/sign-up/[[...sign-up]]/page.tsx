import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#F5F4F0" }}
    >
      {/* Ambient blue glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(22,38,74,0.07) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#16264A",
            colorBackground: "#FFFFFF",
            colorNeutral: "#6E6E73",
            borderRadius: "14px",
            fontFamily: "var(--font-dm-sans, sans-serif)",
            fontSize: "15px",
          },
          elements: {
            card: {
              background: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
            },
            headerTitle: { color: "#1D1D1F", fontWeight: "700" },
            headerSubtitle: { color: "#6E6E73" },
            socialButtonsBlockButton: {
              background: "#F5F4F0",
              border: "1px solid rgba(0,0,0,0.08)",
              color: "#1D1D1F",
            },
            socialButtonsBlockButtonText: { color: "#1D1D1F" },
            dividerLine: { background: "rgba(0,0,0,0.08)" },
            dividerText: { color: "#9E9EA8" },
            formFieldLabel: { color: "#6E6E73" },
            formFieldInput: {
              background: "#F5F4F0",
              border: "1px solid rgba(0,0,0,0.1)",
              color: "#1D1D1F",
            },
            formButtonPrimary: {
              background: "#111111",
              color: "#FFFFFF",
              fontWeight: "700",
            },
            footerActionLink: { color: "#16264A" },
            identityPreviewText: { color: "#1D1D1F" },
            formResendCodeLink: { color: "#16264A" },
          },
        }}
      />
    </div>
  );
}
