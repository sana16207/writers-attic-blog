import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Join — Writers Attic" }] }),
  component: SignupPage,
});

function SignupPage() {
  const { signup, login, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (user) navigate({ to: "/" }); }, [user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-ink">
        <Link to="/" className="block text-center font-display text-3xl text-coffee">
          Writers <span className="italic text-gold-deep">Attic</span>
        </Link>
        <p className="mt-2 text-center font-type text-[11px] uppercase tracking-[0.4em] text-coffee/60">
          ❦ Pull up a chair ❦
        </p>

        <div className="manuscript mt-8 p-10">
          <div className="text-center">
            <p className="font-type text-[10px] uppercase tracking-[0.4em] text-coffee/60">By Invitation of the House</p>
            <h1 className="mt-2 font-display text-3xl text-coffee">Join the Society</h1>
            <p className="mt-1 font-body italic text-sm text-muted-foreground">A name, an email, a password. That's all.</p>
            <div className="chapter-rule my-6 mx-auto max-w-[12rem]">
              <span className="ornament text-sm">❦</span>
            </div>
          </div>
          <AuthForm
            mode="signup"
            onSubmit={async ({ name, email, password }) => {
              await signup(name!, email, password);
              try { await login(email, password); } catch {}
              navigate({ to: "/" });
            }}
          />
          <p className="mt-6 text-center font-body text-sm text-muted-foreground">
            Already a member? <Link to="/login" className="text-gold-deep hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
