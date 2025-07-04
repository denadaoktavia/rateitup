import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/react.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterForm } from "@/utils/Schema";
import { registerAccount } from "@/service/authApi";

const FormRegister = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerAccount(data);
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Register failed", error);
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
                  Daftar Akun
                </h1>
                <p className="text-base font-normal text-muted-foreground text-balance">
                  Silahkan daftar akun di sini
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name..."
                  required
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-xs text-red-500">
                    {errors.name.message}
                  </span>
                )}
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
                {isSubmitting ? "Loading..." : "Daftar"}
              </Button>

              <div className="text-sm text-center">
                Sudah punya akun?
                <Link to={"/login"} className="underline underline-offset-4">
                  {" "}
                  Masuk
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

export default FormRegister;
