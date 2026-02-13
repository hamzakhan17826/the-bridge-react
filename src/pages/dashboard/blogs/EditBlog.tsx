import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogPost, useUpdateBlogPost } from '../../../hooks/useBlog';
import BlogForm, {
  type BlogFormValues,
} from '../../../components/dashboard/blogs/BlogForm';
import { Loader2 } from 'lucide-react';

const EditBlog = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading, error } = useBlogPost(slug || '');
  const updateBlogMutation = useUpdateBlogPost();

  const defaultValues = useMemo<BlogFormValues>(() => {
    if (!post)
      return { title: '', description: '', content: '', slug: '', tagIds: [] };
    return {
      title: post.title,
      description: post.description,
      content: post.content,
      slug: post.slug,
      tagIds: post.tags.map((t) => t.id),
    };
  }, [post]);

  const onSubmit = async (values: BlogFormValues, imageFile: File | null) => {
    if (!post) return;

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

    await updateBlogMutation.mutateAsync(
      { id: post.id, formData },
      {
        onSuccess: (data: any) => {
          if (data.result) {
            navigate('/dashboard/blogs');
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

  if (error || !post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Blog post not found</h2>
        <p className="text-muted-foreground">
          The blog post you're trying to edit doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Edit Blog Post | The Bridge</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Blog Post</h1>
          <p className="text-muted-foreground">
            Update your spiritual article details and message.
          </p>
        </div>

        <BlogForm
          defaultValues={defaultValues}
          initialImageUrl={post.imageUrl}
          isSubmitting={updateBlogMutation.isPending}
          submitLabel={
            updateBlogMutation.isPending ? 'Updating...' : 'Update Post'
          }
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default EditBlog;
