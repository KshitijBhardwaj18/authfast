import SignUpForm from "@/components/signupform";
import CardWrapper from "@/components/cardwrapper";



export default function SignUpPage() {
  
  return (
    <div className="bg-black h-full flex items-center justify-center">
      <CardWrapper>
        <div>
          <SignUpForm />
        </div>
      </CardWrapper>
    </div>
  );
}
