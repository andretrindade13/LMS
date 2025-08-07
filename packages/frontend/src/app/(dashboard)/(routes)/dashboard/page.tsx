'use client'

import { AuthContext } from "@/app/context/AuthContext";
import { useContext } from "react";
import Image from "next/image";

export default function Dashboard() {
    const { user } = useContext(AuthContext);
  return (
    <div className="font-sans flex justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div>
            <h1 className="text-2xl font-bold">Bem-vindo, {user?.name || "Usuário"}</h1>
            {user?.avatar_url && (
                <Image
                    src={user.avatar_url}
                    alt="Avatar"
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full mt-4"
                />
            )}

        </div>
        <div><h1>Dashboard</h1></div>
    </div>
  );
}