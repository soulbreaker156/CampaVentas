import Navegacion from '@/components/ui/navegacion';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen bg-[#FDEAF2]">
            <Navegacion />

            <main>
                <div className="flex items-center justify-center gap-3">
                    <div className="h-min-[80vh] my-5 h-[80vh] w-[150vh] rounded-2xl bg-white p-4 shadow-[50px_15px_20px_rgba(0,0,0,0.25)]">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
