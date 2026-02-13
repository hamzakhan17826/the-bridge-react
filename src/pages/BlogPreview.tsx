import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  MessageSquare,
  Loader2,
  AlertCircle,
  Tag,
} from 'lucide-react';
import { Button } from '../components/ui';
import { useBlogPost } from '../hooks/useBlog';

const BlogPreview = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Opening blog post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">
          Oops! Blog not found
        </h2>
        <p className="text-gray-600 text-center max-w-md mb-8">
          The blog post you're looking for doesn't exist or may have been moved.
        </p>
        <Link to="/blogs">
          <Button>Back to Blogs</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - The Bridge</title>
        <meta name="description" content={post.description.substring(0, 160)} />
      </Helmet>

      <main className="min-h-screen bg-gray-50 pb-20">
        {/* Progress Bar (Visual only for now) */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div className="h-full bg-primary-600 w-1/3"></div>
        </div>

        {/* Feature Image Header */}
        <div className="relative h-[60vh] min-h-100 w-full overflow-hidden">
          <img
            src={post.imageUrl || '/images/podcasts/carousel/1.jpg'}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

          {/* Header Content */}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-4xl mx-auto px-6 pb-12 w-full text-white">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-primary-200 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all blogs
              </Link>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 bg-primary-600 text-xs font-semibold rounded-full uppercase tracking-wider"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl text-white md:text-5xl lg:text-6xl font-poppins font-bold leading-tight mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-primary-100">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center border-2 border-white/20">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium text-lg">
                    By {post.authorName || 'System'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 opacity-70" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Main Content */}
            <article className="lg:col-span-8 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="p-8 md:p-12 lg:p-16">
                {/* Intro summary */}
                <div className="text-xl leading-relaxed text-gray-600 font-medium italic border-l-4 border-secondary-400 pl-6 mb-10">
                  {post.description}
                </div>

                {/* Body html content */}
                <div
                  className="prose prose-lg prose-primary max-w-none text-gray-700
                    prose-headings:font-poppins prose-headings:font-bold prose-headings:text-gray-900
                    prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-2xl prose-img:shadow-lg
                    prose-blockquote:border-primary-200 prose-blockquote:bg-primary-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Footer info */}
                <div className="mt-16 pt-10 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag.id}
                        to={`/blogs?tag=${tag.name}`}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                      >
                        <Tag className="w-4 h-4" />
                        {tag.name}
                      </Link>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-primary-600"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-primary-600"
                    >
                      <Bookmark className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Author Card */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-linear-to-tr from-primary-100 to-secondary-100 flex items-center justify-center border-2 border-white">
                    <User className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-gray-900">
                      {post.authorName || 'System'}
                    </h4>
                    <p className="text-sm text-gray-500">Regular Contributor</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Exploring spirituality and building bridges between worlds
                  through insightful writing and mediumship.
                </p>
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </div>

              {/* Newsletter or CTA */}
              <div className="bg-linear-to-br from-primary-600 to-primary-800 p-8 rounded-3xl shadow-lg text-white">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl text-white font-poppins font-bold mb-4">
                  Join the Discussion
                </h4>
                <p className="text-primary-100 text-sm mb-8 leading-relaxed">
                  Subscribe to our weekly newsletter to get the latest spiritual
                  insights delivered straight to your inbox.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-primary-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <Button className="w-full bg-secondary-400 hover:bg-secondary-500 text-gray-900 border-none">
                    Subscribe
                  </Button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogPreview;
