import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useBook, useUpdateBook } from '../../../hooks/useBook';
import BookForm, {
  type BookFormValues,
} from '../../../components/dashboard/books/BookForm';
import { Loader2 } from 'lucide-react';

const EditBook = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading, error } = useBook(slug || '');
  const updateBookMutation = useUpdateBook();

  const defaultValues = useMemo<BookFormValues>(() => {
    if (!book)
      return {
        title: '',
        description: '',
        content: '',
        slug: '',
        tagIds: [],
        language: 'English',
        edition: '',
        publisher: '',
        pagesCount: undefined,
        format: 'PDF',
        fileUrl: '',
        readingTime: '',
      };
    return {
      title: book.title,
      description: book.description,
      content: book.content,
      slug: book.slug,
      tagIds: book.tags.map((t) => t.id),
      language: book.language || 'English',
      edition: book.edition || '',
      publisher: book.publisher || '',
      pagesCount: book.pagesCount,
      format: book.format || 'PDF',
      fileUrl: book.fileUrl || '',
      readingTime: book.readingTime || '',
    };
  }, [book]);

  const onSubmit = async (values: BookFormValues, imageFile: File | null) => {
    if (!book) return;

    const formData = new FormData();
    formData.append('Title', values.title.trim());
    formData.append('Description', values.description.trim());
    formData.append('Content', values.content.trim());
    formData.append('Slug', values.slug.trim());

    if (values.language) formData.append('Language', values.language);
    if (values.edition) formData.append('Edition', values.edition);
    if (values.publisher) formData.append('Publisher', values.publisher);
    if (values.pagesCount)
      formData.append('PagesCount', String(values.pagesCount));
    if (values.format) formData.append('Format', values.format);
    if (values.fileUrl) formData.append('FileUrl', values.fileUrl);
    if (values.readingTime) formData.append('ReadingTime', values.readingTime);

    if (imageFile) {
      formData.append('Image', imageFile);
    }

    (values.tagIds ?? []).forEach((tagId) => {
      formData.append('TagIds', String(tagId));
    });

    await updateBookMutation.mutateAsync(
      { id: book.id, formData },
      {
        onSuccess: (data) => {
          if (data.result) {
            navigate('/dashboard/books');
          }
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Book not found</h2>
        <p className="text-muted-foreground">
          The book you're trying to edit doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Edit Book | The Bridge</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Book</h1>
          <p className="text-muted-foreground">
            Update your book details and content.
          </p>
        </div>

        <BookForm
          defaultValues={defaultValues}
          initialImageUrl={book.imageUrl}
          isSubmitting={updateBookMutation.isPending}
          submitLabel={
            updateBookMutation.isPending ? 'Updating...' : 'Update Book'
          }
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default EditBook;
