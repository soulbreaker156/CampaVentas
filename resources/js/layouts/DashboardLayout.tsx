import Navegacion from '@/components/ui/navegacion';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className=" bg-[#FDEAF2] min-h-screen ">
            <Navegacion />

            <main>
                <div className="flex items-center justify-center gap-3 h-">
                    <div className=" min-h-screen my-5  sm:w-[80%] w-[100%] rounded-2xl bg-white p-4 shadow-[50px_15px_20px_rgba(0,0,0,0.25)]">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
