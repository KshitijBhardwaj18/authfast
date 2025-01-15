import CardWrapper from "@/components/cardwrapper";
import SignInForm from "@/components/signinform";
export default function SignIn() {
  return (
    <div className="bg-black h-full flex flex-col justify-center items-center">
      <CardWrapper>
          <div>
               <SignInForm/>
          </div>
     
      </CardWrapper>
    </div>
  );
}
