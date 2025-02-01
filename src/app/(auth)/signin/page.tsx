import AuthForm from "@/components/AuthForm";

const SignIn = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full md:max-w-3xl">
                <AuthForm  formType="signin"/>
            </div>
        </div>
    );
};

export default SignIn;
