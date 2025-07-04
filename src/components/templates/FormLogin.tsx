import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/react.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "@/utils/Schema";
import { login } from "@/service/authApi";

const FormLogin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await login(data);
      localStorage.setItem("token", result.data.token);
      reset();
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <main className="flex items-center justify-center min-h-screen px-4 overflow-x-hidden lg:px-0">
      <Card className="flex flex-col w-full max-w-3xl gap-6">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-4xl font-bold text-neutral-900">
                  Selamat Datang
                </h1>
                <p className="text-base font-normal text-muted-foreground text-balance">
                  Masuk ke akun kamu
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username..."
                  required
                  {...register("username")}
                />
                {errors.username && (
                  <span className="text-xs text-red-500">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password..."
                  required
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-xs text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                variant={"destructive"}
              >
                {isSubmitting ? "Loading..." : "Masuk"}
              </Button>

              <div className="text-sm text-center">
                Belum punya akun?
                <Link to={"/register"} className="underline underline-offset-4">
                  {" "}
                  Daftar
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-white md:block">
            <Link to={"/"}>
              <img
                src={Logo}
                alt="Image"
                className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
              />
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default FormLogin;
