"use client";

import BookGrid from "@/components/book-grid";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <BookOpen className="h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl font-bold tracking-tight">Digital Library</h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Discover and read your favorite books in our carefully curated collection
          </p>
          <Button size="lg" className="mt-6">
            Browse Collection
          </Button>
        </div>
        <BookGrid />
      </section>
    </div>
  );
}