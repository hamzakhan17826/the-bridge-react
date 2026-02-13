import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useCreateBlogPost } from '../../../hooks/useBlog';
import BlogForm, {
  type BlogFormValues,
} from '../../../components/dashboard/blogs/BlogForm';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const navigate = useNavigate();
  const createBlogMutation = useCreateBlogPost();
  const [resetKey, setResetKey] = useState(0);

  const defaultValues = useMemo<BlogFormValues>(
    () => ({
      title: '',
      description: '',
      content: '',
      slug: '',
      tagIds: [],
    }),
    []
  );

  const onSubmit = async (values: BlogFormValues, imageFile: File | null) => {
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

    await createBlogMutation.mutateAsync(formData, {
      onSuccess: (data) => {
        if (data.result) {
          setResetKey((prev) => prev + 1);
          navigate('/dashboard/blogs');
        }
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Create Blog Post | The Bridge</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Blog Post</h1>
          <p className="text-muted-foreground">
            Share your thoughts and spiritual insights with the community.
          </p>
        </div>

        <BlogForm
          defaultValues={defaultValues}
          requireImage
          resetKey={resetKey}
          isSubmitting={createBlogMutation.isPending}
          submitLabel={
            createBlogMutation.isPending ? 'Publishing...' : 'Publish Post'
          }
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default CreateBlog;
