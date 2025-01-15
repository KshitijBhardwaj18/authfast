import ResetPasswordForm from "@/components/resetPasswordForm";
import CardWrapper from "@/components/cardwrapper";

export default function ResetPage() {
  return (
    <div className="bg-black flex items-center justify-center h-screen">
      <CardWrapper>
        <div>
          <ResetPasswordForm />
        </div>
      </CardWrapper>
    </div>
  );
}
