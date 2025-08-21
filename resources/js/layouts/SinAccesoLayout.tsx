export default function SinAccesoLayout({children}: {children:React.ReactNode}){
    return(
        <div className="bg-black h-screen w-full text-white">
            {children}
        </div>
    );
}