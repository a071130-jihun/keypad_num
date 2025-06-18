'use client';

import { useParams } from 'next/navigation';
import Keypad from '@/components/Keypad';

export default function DynamicKeypadPage() {
  const params = useParams();
  const pageId = params.id as string;

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ marginBottom: '20px', fontSize: '2rem' }}>Page {pageId}</h1>
      <Keypad pageId={pageId} />
    </main>
  );
}