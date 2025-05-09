import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: "ta7chatlk" }, { status: 200 });
}
