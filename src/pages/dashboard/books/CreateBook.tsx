import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useCreateBook } from '../../../hooks/useBook';
import BookForm, {
  type BookFormValues,
} from '../../../components/dashboard/books/BookForm';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
  const navigate = useNavigate();
  const createBookMutation = useCreateBook();
  const [resetKey, setResetKey] = useState(0);

  const defaultValues = useMemo<BookFormValues>(
    () => ({
      title: '',
      description: '',
      content: '',
      slug: '',
      tagIds: [],
    }),
    []
  );

  const onSubmit = async (values: BookFormValues, imageFile: File | null) => {
    const formData = new FormData();
    formData.append('Title', values.title.trim());
    formData.append('Description', values.description.trim());
    formData.append('Content', values.content.trim());
    formData.append('Slug', values.slug.trim());

    if (imageFile) {
      formData.append('Image', imageFile);
    }

    (values.tagIds ?? []).forEach((tagId) => {
      formData.append('TagIds', String(tagId));
    });

    await createBookMutation.mutateAsync(formData, {
      onSuccess: (data) => {
        if (data.result) {
          setResetKey((prev) => prev + 1);
          navigate('/dashboard/books');
        }
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Create Book | The Bridge</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Book</h1>
          <p className="text-muted-foreground">
            Write a new book to share with the community.
          </p>
        </div>

        <BookForm
          defaultValues={defaultValues}
          requireImage
          resetKey={resetKey}
          isSubmitting={createBookMutation.isPending}
          submitLabel={
            createBookMutation.isPending ? 'Publishing...' : 'Publish Book'
          }
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default CreateBook;
