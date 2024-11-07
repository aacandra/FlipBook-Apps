"use client";

import React, { createContext, useContext, useState } from 'react';

export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  pdfUrl?: string;
}

interface BookContextType {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>([
    { 
      id: 1, 
      title: "The Great Gatsby", 
      author: "F. Scott Fitzgerald",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800",
      pdfUrl: "/sample.pdf"
    },
    { 
      id: 2, 
      title: "To Kill a Mockingbird", 
      author: "Harper Lee",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800",
      pdfUrl: "/sample.pdf"
    },
    { 
      id: 3, 
      title: "1984", 
      author: "George Orwell",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800",
      pdfUrl: "/sample.pdf"
    },
  ]);

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}