import AuthForm from '@/components/AuthForm';

export default function SignUp() {
    return (
      <div className="flex flex-col items-center justify-center">
      <div className="w-full md:max-w-3xl">
          <AuthForm  formType="signup"/>
      </div>
  </div>
    );
}
