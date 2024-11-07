"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Plus, Trash, X, Save, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useBooks } from "@/contexts/BookContext";

export default function AdminPage() {
  const { toast } = useToast();
  const { books, setBooks } = useBooks();

  const [editingBook, setEditingBook] = useState<(typeof books)[0] | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    author: "",
    cover: "",
    pdfUrl: ""
  });
  
  const [newBookForm, setNewBookForm] = useState({
    title: "",
    author: "",
    cover: "",
    pdfUrl: ""
  });

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      // In a real app, you would upload to a server/storage here
      const pdfUrl = URL.createObjectURL(file);
      
      if (isEdit) {
        setEditForm(prev => ({ ...prev, pdfUrl }));
      } else {
        setNewBookForm(prev => ({ ...prev, pdfUrl }));
      }
      
      toast({
        title: "Success",
        description: "PDF uploaded successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Please upload a valid PDF file",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      
      if (isEdit) {
        setEditForm(prev => ({ ...prev, cover: imageUrl }));
      } else {
        setNewBookForm(prev => ({ ...prev, cover: imageUrl }));
      }
      
      toast({
        title: "Success",
        description: "Cover image uploaded successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Please upload a valid image file",
        variant: "destructive",
      });
    }
  };

  const startEditing = (book: (typeof books)[0]) => {
    setEditingBook(book);
    setEditForm({
      title: book.title,
      author: book.author,
      cover: book.cover,
      pdfUrl: book.pdfUrl || ""
    });
  };

  const cancelEditing = () => {
    setEditingBook(null);
    setEditForm({
      title: "",
      author: "",
      cover: "",
      pdfUrl: ""
    });
  };

  const saveEdit = (id: number) => {
    if (!editForm.title || !editForm.author) {
      toast({
        title: "Error",
        description: "Title and author are required",
        variant: "destructive"
      });
      return;
    }

    setBooks(books.map(book => 
      book.id === id 
        ? { 
            ...book, 
            title: editForm.title, 
            author: editForm.author, 
            cover: editForm.cover || book.cover,
            pdfUrl: editForm.pdfUrl || book.pdfUrl
          }
        : book
    ));
    
    toast({
      title: "Success",
      description: "Book updated successfully",
    });
    cancelEditing();
  };

  const deleteBook = (id: number) => {
    setBooks(books.filter(book => book.id !== id));
    toast({
      title: "Success",
      description: "Book deleted successfully",
    });
  };

  const addNewBook = () => {
    if (!newBookForm.title || !newBookForm.author) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newBook = {
      id: Math.max(0, ...books.map(b => b.id)) + 1,
      title: newBookForm.title,
      author: newBookForm.author,
      cover: newBookForm.cover || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800",
      pdfUrl: newBookForm.pdfUrl
    };

    setBooks([...books, newBook]);
    setNewBookForm({
      title: "",
      author: "",
      cover: "",
      pdfUrl: ""
    });

    toast({
      title: "Success",
      description: "New book added successfully",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Add New Book</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="newTitle">Title</Label>
              <Input 
                type="text" 
                id="newTitle" 
                value={newBookForm.title}
                onChange={(e) => setNewBookForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter book title" 
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="newAuthor">Author</Label>
              <Input 
                type="text" 
                id="newAuthor" 
                value={newBookForm.author}
                onChange={(e) => setNewBookForm(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Enter author name" 
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="newCover">Cover Image</Label>
              <div className="flex gap-4 items-start">
                {newBookForm.cover && (
                  <div className="relative w-24 h-32">
                    <Image
                      src={newBookForm.cover}
                      alt="Book cover preview"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    id="newCover"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                    className="mb-2"
                  />
                </div>
              </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="newPdf">PDF File</Label>
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <Input
                    type="file"
                    id="newPdf"
                    accept=".pdf"
                    onChange={(e) => handlePdfUpload(e)}
                    className="mb-2"
                  />
                </div>
                {newBookForm.pdfUrl && (
                  <FileText className="h-5 w-5 text-green-500" />
                )}
              </div>
            </div>
            <Button className="mt-4" onClick={addNewBook}>
              <Plus className="mr-2 h-4 w-4" /> Add Book
            </Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Manage Books</h2>
        <div className="grid gap-4">
          {books.map((book) => (
            <Card key={book.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex gap-4">
                  <div className="relative w-24 h-32 flex-shrink-0">
                    <Image
                      src={editingBook?.id === book.id ? editForm.cover || book.cover : book.cover}
                      alt={book.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  {editingBook?.id === book.id ? (
                    <div className="flex-1 space-y-4">
                      <div>
                        <Label htmlFor={`edit-title-${book.id}`}>Title</Label>
                        <Input
                          id={`edit-title-${book.id}`}
                          value={editForm.title}
                          onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Book title"
                          className="mb-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`edit-author-${book.id}`}>Author</Label>
                        <Input
                          id={`edit-author-${book.id}`}
                          value={editForm.author}
                          onChange={(e) => setEditForm(prev => ({ ...prev, author: e.target.value }))}
                          placeholder="Author name"
                          className="mb-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`edit-cover-${book.id}`}>Cover Image</Label>
                        <Input
                          id={`edit-cover-${book.id}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, true)}
                          className="mb-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`edit-pdf-${book.id}`}>PDF File</Label>
                        <div className="flex gap-4 items-center">
                          <Input
                            id={`edit-pdf-${book.id}`}
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handlePdfUpload(e, true)}
                          />
                          {(editForm.pdfUrl || book.pdfUrl) && (
                            <FileText className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-semibold">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      {book.pdfUrl && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          <span>PDF Available</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  {editingBook?.id === book.id ? (
                    <>
                      <Button 
                        variant="default"
                        onClick={() => saveEdit(book.id)}
                        className="gap-2"
                      >
                        <Save className="h-4 w-4" />
                        Save
                      </Button>
                      <Button 
                        variant="ghost"
                        onClick={cancelEditing}
                        className="gap-2"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline"
                        onClick={() => startEditing(book)}
                        className="gap-2"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive"
                        onClick={() => deleteBook(book.id)}
                        className="gap-2"
                      >
                        <Trash className="h-4 w-4" />
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}