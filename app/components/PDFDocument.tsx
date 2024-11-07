"use client";

import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

interface PDFDocumentProps {
  url: string;
  pageNumber: number;
  onLoadSuccess: ({ numPages }: { numPages: number }) => void;
}

export default function PDFDocument({ url, pageNumber, onLoadSuccess }: PDFDocumentProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Document
      file={url}
      onLoadSuccess={onLoadSuccess}
      loading={
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
      error={
        <div className="flex items-center justify-center h-96 text-destructive">
          Failed to load PDF. Please try again later.
        </div>
      }
    >
      <Page
        pageNumber={pageNumber}
        renderTextLayer={true}
        renderAnnotationLayer={true}
        className="shadow-lg"
      />
    </Document>
  );
}