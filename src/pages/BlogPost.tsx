import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  User,
  Calendar,
  Share2,
  Heart,
  MessageCircle,
  Loader2,
} from 'lucide-react';
import { Button } from '../components/ui';
import { useBlog, useBlogs } from '../hooks/useBlog';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: blog, isLoading, error } = useBlog(slug || '');
  const { data: allBlogs = [] } = useBlogs();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Post Not Found
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          The article you are looking for might have been moved or deleted.
        </p>
        <Link to="/blogs">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Button>
        </Link>
      </div>
    );
  }

  // Get related posts (same tag, excluding current)
  const relatedPosts = allBlogs
    .filter(
      (b) =>
        b.id !== blog.id &&
        b.tags.some((t) => blog.tags.some((bt) => bt.id === t.id))
    )
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{blog.title} - The Bridge</title>
        <meta name="description" content={blog.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Back Navigation */}
        <section className="py-4 bg-white border-b border-gray-200">
          <div className="container mx-auto px-6">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-primary-900 to-secondary-900 text-white py-16">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {blog.tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-poppins font-medium text-sm"
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-poppins text-white leading-tight mb-6">
                {blog.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 font-lato mb-8 max-w-3xl mx-auto">
                {blog.description}
              </p>

              {/* Author and Meta */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.authorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <article className="max-w-4xl mx-auto">
              {/* Featured Image */}
              {blog.imageUrl && (
                <div className="mb-12">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-auto max-h-150 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              )}

              {/* Content */}
              <div
                className="prose prose-lg max-w-none font-lato text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4 mr-2" />
                      Like
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500">
                    Published on {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Author Bio */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col justify-items-center md:justify-items-start md:flex-row items-center gap-6 p-6 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                  {blog.authorProfilePic ? (
                    <img
                      src={blog.authorProfilePic}
                      alt={blog.authorName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-primary-600" />
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                    About {blog.authorName}
                  </h3>
                  <p className="text-gray-600 font-lato">
                    {blog.authorName} is a dedicated spiritual practitioner and
                    writer on The Bridge community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-8 text-center">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedBlog) => (
                    <Link
                      key={relatedBlog.id}
                      to={`/blogs/${relatedBlog.slug}`}
                    >
                      <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={
                              relatedBlog.imageUrl ||
                              '/images/podcasts/carousel/1.jpg'
                            }
                            alt={relatedBlog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
                            {relatedBlog.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {relatedBlog.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <User className="w-3 h-3" />
                            <span>{relatedBlog.authorName}</span>
                            <span>•</span>
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(
                                relatedBlog.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Comments Section (Placeholder) */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircle className="w-6 h-6 text-primary-600" />
                  <h3 className="text-xl font-poppins font-semibold text-gray-900">
                    Comments
                  </h3>
                </div>
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Comments feature coming soon. We'd love to hear your
                    thoughts!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPost;
