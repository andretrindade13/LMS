import { cookies } from "next/headers";
import {redirect} from "next/navigation";


export default async function ProtectedLayout({children}: {children: React.ReactNode}) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token-lms')?.value;
    if(!token) {
        redirect('/login');
    }
    return <>{children}</>
}