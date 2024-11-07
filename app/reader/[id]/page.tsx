"use client";

import { useBooks } from '@/contexts/BookContext';
import PDFViewer from '@/app/components/PDFViewer';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';

export default function PDFReaderPage() {
  const params = useParams();
  const { books } = useBooks();
  const book = books.find(b => b.id === Number(params.id));

  if (!book?.pdfUrl) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-6">
          <h1 className="text-xl font-semibold">PDF not available</h1>
          <p className="text-muted-foreground mt-2">This book does not have an associated PDF file.</p>
        </Card>
      </div>
    );
  }
  
  return <PDFViewer url={book.pdfUrl} />;
}