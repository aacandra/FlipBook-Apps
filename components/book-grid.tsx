"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { useBooks } from "@/contexts/BookContext";

export default function BookGrid() {
  const { books } = useBooks();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <Link key={book.id} href={`/reader/${book.id}`}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <AspectRatio ratio={3/4}>
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </AspectRatio>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="line-clamp-1">{book.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">{book.author}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}