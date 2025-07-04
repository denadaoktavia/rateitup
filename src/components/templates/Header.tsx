import Logo from "@/assets/react.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, []);

  return (
    <header className="w-full h-20 mx-auto overflow-hidden border-b bg-background">
      <nav className="flex items-center justify-between w-full h-full px-4 py-2">
        <div className="flex items-center gap-5">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-8 h-8" />
          </Link>
          <h1 className="text-lg font-semibold text-white">App Rating It</h1>
        </div>
        <div className="flex items-center gap-4">
          {isLogin ? (
            <Link to="/profile">
              <Button
                type="submit"
                size={"lg"}
                className="w-28"
                variant={"secondary"}
              >
                Profile
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button
                  type="submit"
                  size={"lg"}
                  className="w-28"
                  variant={"secondary"}
                >
                  Masuk
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button
                  type="submit"
                  size={"lg"}
                  className="w-28"
                  variant={"default"}
                >
                  Daftar
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
