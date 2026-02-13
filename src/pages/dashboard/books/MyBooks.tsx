import { Link } from 'react-router-dom';
import { useBooks, useDeleteBook } from '../../../hooks/useBook';
import { useAuthUser } from '../../../hooks/useAuthUser';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Loader2, Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';

export default function MyBooks() {
  const { user, isAdmin } = useAuthUser();
  const { data: books, isLoading, error } = useBooks();
  const deleteBookMutation = useDeleteBook();

  const myBooks =
    books?.filter((b) => isAdmin || b.authorId === user?.userId) || [];

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await deleteBookMutation.mutateAsync(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Book Management</h1>
          <p className="text-muted-foreground">
            {isAdmin
              ? 'Manage all books on the platform'
              : 'Manage your spiritual books'}
          </p>
        </div>
        <Link to="/dashboard/books/create">
          <Button className="btn">
            <Plus className="w-4 h-4 mr-2" />
            Create New Book
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Books</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin mr-2" />
              <span>Loading books...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-destructive">
              <p>Failed to load books.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Preview</TableHead>
                    <TableHead>Title</TableHead>
                    {isAdmin && <TableHead>Author</TableHead>}
                    <TableHead>Tags</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>
                        <img
                          src={
                            book.imageUrl || '/images/podcasts/carousel/1.jpg'
                          }
                          alt=""
                          className="w-12 h-12 rounded object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium max-w-xs truncate">
                        {book.title}
                      </TableCell>
                      {isAdmin && <TableCell>{book.authorName}</TableCell>}
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {book.tags.slice(0, 2).map((t) => (
                            <Badge
                              key={t.id}
                              variant="secondary"
                              className="text-[10px]"
                            >
                              {t.name}
                            </Badge>
                          ))}
                          {book.tags.length > 2 && (
                            <Badge variant="secondary" className="text-[10px]">
                              +{book.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(book.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Link to={`/books/${book.slug}`} target="_blank">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link to={`/dashboard/books/${book.slug}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(book.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {myBooks.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={isAdmin ? 6 : 5}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No books found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
