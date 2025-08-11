import { NextRequest, NextResponse } from "next/server";

const delay =  (amount = 750) =>  new Promise(resolve => setTimeout(resolve, amount))
export async function POST(req: NextRequest) {
    await delay()
    const data = await req.json();
    console.log(data)
    return NextResponse.json({ ok: true })
}