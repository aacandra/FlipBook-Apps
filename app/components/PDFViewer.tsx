"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PDFViewerProps {
  url: string;
}

export default function PDFViewer({ url }: PDFViewerProps) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.open(url, '_blank')}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="flex justify-center border rounded-lg p-4 bg-white h-[800px]">
          <iframe
            src={`${url}#toolbar=0`}
            className="w-full h-full"
            title="PDF Viewer"
          />
        </div>
      </Card>
    </div>
  );
}