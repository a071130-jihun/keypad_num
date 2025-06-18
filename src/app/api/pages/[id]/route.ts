import { NextRequest, NextResponse } from 'next/server';

// In-memory storage (replace with database in production)
const pageData = new Map<string, string>();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: pageId } = await params;
  const number = pageData.get(pageId) || '';
  
  return NextResponse.json({ pageId, number });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: pageId } = await params;
  const { number } = await request.json();
  
  pageData.set(pageId, number);
  
  return NextResponse.json({ pageId, number, success: true });
}