import { LoginForm } from "../components/loginForm";


export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted ">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
