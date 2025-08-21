import LoginLayout from '@/layouts/LoginLayout';
import Input from '@/components/ui/Form';
import { Head } from '@inertiajs/react';
function Login() {
    return (
        <>
        <Head>
            <title>Login</title>
        </Head>
            <LoginLayout>
                <div className="flex h-full flex-col items-center justify-center">
                    <img className="h-[35%] mb-2" src="../../images/Avon.svg" alt="Avon" />
                    <Input />
                </div>
            </LoginLayout>
        </>
    );
}

export default Login;
