import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#696969" }}
    >
      {/* Ambient gold glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,146,42,0.08) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#C9922A",
            colorBackground: "#161616",
            colorNeutral: "#888888",
            borderRadius: "14px",
            fontFamily: "var(--font-inter, sans-serif)",
            fontSize: "15px",
          },
          elements: {
            card: {
              background: "#161616",
              border: "1px solid rgba(201,146,42,0.2)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            },
            headerTitle: { color: "#F2EFE8", fontWeight: "700" },
            headerSubtitle: { color: "#999999" },
            socialButtonsBlockButton: {
              background: "#222222",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#F2EFE8",
            },
            socialButtonsBlockButtonText: { color: "#F2EFE8" },
            dividerLine: { background: "rgba(255,255,255,0.08)" },
            dividerText: { color: "#666666" },
            formFieldLabel: { color: "#AAAAAA" },
            formFieldInput: {
              background: "#222222",
              border: "1px solid rgba(201,146,42,0.25)",
              color: "#F2EFE8",
            },
            formButtonPrimary: {
              background: "linear-gradient(135deg, #C9922A, #D4A03A)",
              color: "#FFFFFF",
              fontWeight: "700",
            },
            footerActionLink: { color: "#C9922A" },
            identityPreviewText: { color: "#F2EFE8" },
            formResendCodeLink: { color: "#C9922A" },
          },
        }}
      />
    </div>
  );
}
