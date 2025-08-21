import Navegacion from "@/components/ui/navegacion";
import Footer from "@/components/ui/Footer";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className=" h-screen bg-[#FDEAF2]">
            <Navegacion />
            <main>
                {children}
            </main>
        </div>
    );
}