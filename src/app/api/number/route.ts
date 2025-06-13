import { NextResponse } from 'next/server';

let savedNumber = '';

export async function POST(request: Request) {
  try {
    const { number } = await request.json();
    savedNumber = number;
    return NextResponse.json({ success: true, number: savedNumber });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to save number' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ number: savedNumber });
}