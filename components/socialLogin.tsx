import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa"
import { LoginViaProvider } from "@/actions/loginViaProvider";


const SocialLogin = () => {
    const Login = (provider: string) => {
        LoginViaProvider(provider);
    }
    return (
        <div className="flex flex-row gap-2 bg-white">
        <Button
          variant="outline"
          className="w-full"
          size="lg"
          onClick={() => Login("google")}
        >
          <FcGoogle />
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={() => Login("github")}
        >
          <FaGithub />
        </Button>
      </div>
    )
}

export default SocialLogin;