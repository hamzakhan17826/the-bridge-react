import { Link } from 'react-router-dom';
import { useBlogPosts, useDeleteBlogPost } from '../../../hooks/useBlog';
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

export default function MyBlogs() {
  const { user, isAdmin } = useAuthUser();
  const { data: posts, isLoading, error } = useBlogPosts();
  const deleteBlogPostMutation = useDeleteBlogPost();

  const myPosts =
    posts?.filter((p) => isAdmin || p.authorId === user?.userId) || [];

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      await deleteBlogPostMutation.mutateAsync(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">
            {isAdmin
              ? 'Manage all blog posts on the platform'
              : 'Manage your spiritual articles'}
          </p>
        </div>
        <Link to="/dashboard/blogs/create">
          <Button className="btn">
            <Plus className="w-4 h-4 mr-2" />
            Create New Post
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin mr-2" />
              <span>Loading posts...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-destructive">
              <p>Failed to load posts.</p>
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
                  {myPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <img
                          src={
                            post.imageUrl || '/images/podcasts/carousel/1.jpg'
                          }
                          alt=""
                          className="w-12 h-12 rounded object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium max-w-xs truncate">
                        {post.title}
                      </TableCell>
                      {isAdmin && <TableCell>{post.authorName}</TableCell>}
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((t) => (
                            <Badge
                              key={t.id}
                              variant="secondary"
                              className="text-[10px]"
                            >
                              {t.name}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge variant="secondary" className="text-[10px]">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Link to={`/blogs/${post.slug}`} target="_blank">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link to={`/dashboard/blogs/${post.slug}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {myPosts.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={isAdmin ? 6 : 5}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No blog posts found.
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
