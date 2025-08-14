import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const response =  await fetch('http://localhost:3333/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            cache: "no-store"
        });
        
        const result = await response.json();
        return NextResponse.json(result) 
    } catch (error) {
        return NextResponse.json( { ok: false, error: error instanceof Error ? 'Erro ao cadastrar usuário': '' });
    }
    
}