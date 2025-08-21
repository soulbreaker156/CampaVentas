export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
       <>
       <div className="flex justify-center items-center h-screen bg-[#FFBDEA]">
            <div className="bg-[#383438]/30 w-[28%] h-[65%] rounded-[9px]">
                {children}
            </div>
        </div>
       </>
    );
}
