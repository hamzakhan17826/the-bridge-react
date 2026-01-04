import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  Share2,
  Heart,
  MessageCircle,
} from 'lucide-react';
import { Button } from '../components/ui';
import type { BlogItem } from '../types/types';

const BlogPost = () => {
  // Always show the same blog post regardless of slug
  const blog: BlogItem = {
    id: 1,
    title: 'The Complete Guide to Spirit Communication',
    excerpt:
      'Master the art of spirit communication with this comprehensive guide covering techniques, ethics, and real-world applications for connecting with loved ones in spirit.',
    content: `
      <h2>Introduction to Spirit Communication</h2>
      <p>In a world where science and spirituality often seem at odds, the practice of spirit communication offers a bridge between the seen and unseen realms. For thousands of years, humans have sought ways to connect with those who have passed beyond the physical veil. This comprehensive guide will explore the various methods, techniques, and ethical considerations involved in spirit communication, providing you with practical tools to develop your own abilities.</p>

      <h2>Understanding the Spirit World</h2>
      <p>Before diving into communication techniques, it's essential to understand the nature of the spirit world. Contrary to popular media portrayals, the afterlife is not a single, uniform experience. Different spiritual traditions describe various realms or planes of existence, each with its own characteristics and purposes.</p>
      <p>Modern research in consciousness studies suggests that our awareness may continue beyond physical death. Near-death experiences, past-life memories, and mediumistic communications all point to consciousness as something that transcends the physical body. Understanding this fundamental truth is the first step toward effective spirit communication.</p>

      <h2>Developing Your Intuitive Abilities</h2>
      <p>Spirit communication relies heavily on our natural intuitive faculties. These abilities are not supernatural gifts reserved for a select few, but natural human capacities that can be developed through practice and dedication.</p>
      <p>Clairvoyance involves receiving information through visual impressions. This might manifest as seeing images, symbols, or even full scenes in your mind's eye. Practice by closing your eyes and describing what you "see" in a quiet room. Keep a journal of these impressions and look for patterns over time.</p>
      <p>Clairaudient experiences involve hearing voices, sounds, or messages that others cannot perceive. These might come as whispers, clear voices, or even musical tones. Many people first experience clairaudience as hearing their name called when alone.</p>
      <p>This is perhaps the most common intuitive ability, involving physical sensations or emotional feelings that provide information. You might feel a sudden chill, warmth, pressure, or emotional state that doesn't belong to you. Pay attention to these bodily sensations as they often carry important messages.</p>
      <p>Sometimes called "intuitive knowing," this ability manifests as sudden insights or knowledge that seems to come from nowhere. You might suddenly "know" something about a person or situation without logical explanation.</p>

      <div style="text-align: center; margin: 2rem 0;">
        <img src="/images/podcasts/carousel/2.jpg" alt="Spirit Communication Meditation" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);" />
        <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">Meditation practice for developing spiritual awareness</p>
      </div>

      <h2>Creating a Sacred Space</h2>
      <p>The environment plays a crucial role in spirit communication. Creating a dedicated sacred space helps focus your intention and creates a welcoming atmosphere for spiritual visitors.</p>
      <p>Choose a quiet, comfortable space where you won't be interrupted. Cleanse the area with sage, palo santo, or simply by setting clear intentions. Include items that have personal spiritual significance – candles, crystals, photographs of loved ones, or religious symbols.</p>
      <p>Before beginning any communication session, take time to center yourself. Practice deep breathing, meditation, or prayer to quiet your mind and open your heart. Set clear intentions for the communication and establish boundaries for what you will and won't accept.</p>

      <h2>Basic Communication Techniques</h2>
      <p>There are several proven methods for initiating contact with spirits. Each has its own advantages and requires different levels of skill and experience.</p>
      <p>Begin with a simple meditation practice. Sit comfortably, close your eyes, and focus on your breath. When you feel centered, ask your spirit guides or loved ones to make their presence known. For automatic writing, keep a pen and paper handy and allow your hand to write freely without conscious control.</p>
      <p>A pendulum can be an excellent tool for yes/no questions. Hold a weighted object (like a crystal or ring) on a string and establish which movements mean "yes," "no," or "unclear." This method is particularly useful for beginners as it provides clear, unambiguous answers.</p>
      <p>While controversial, Ouija boards and similar tools can be effective when used responsibly. Always work with a partner, set clear intentions, and never use them as games. These tools simply provide a physical means for spirits to move energy in ways we can perceive.</p>

      <h2>Advanced Techniques for Experienced Practitioners</h2>
      <p>As your abilities develop, you may wish to explore more sophisticated methods of communication.</p>
      <p>In trance mediumship, the medium allows a spirit to temporarily influence their consciousness and speak through them. This requires significant trust and practice, and should only be attempted under the guidance of experienced mentors.</p>
      <p>Physical mediumship involves the manifestation of physical phenomena, such as materializations, levitations, or apports. This is extremely rare and requires years of dedicated practice and purification.</p>

      <h2>Ethical Considerations</h2>
      <p>Spirit communication carries significant ethical responsibilities. Always approach this work with integrity, compassion, and respect.</p>
      <p>Never attempt to contact spirits against their will or yours. Spirits, like the living, have the right to privacy and choice. Always ask permission before attempting contact.</p>
      <p>Not all spirits have benevolent intentions. Learn to protect your energy through prayer, visualization, or protective rituals. Imagine yourself surrounded by white light or call upon spiritual guides for protection.</p>
      <p>If you choose to offer spirit communication services professionally, maintain clear boundaries. Avoid giving medical, legal, or financial advice through spirit communication, and always encourage clients to seek appropriate professional help.</p>

      <h2>Common Challenges and Solutions</h2>
      <p>Spirit communication is not always straightforward. Here are some common challenges and how to address them.</p>
      <p>Many people struggle with self-doubt when beginning this practice. Keep a detailed journal of your experiences and look for patterns. Share your experiences with trusted friends or mentors who can provide validation.</p>
      <p>It can be difficult to know if a message comes from spirit or your own imagination. Look for specific, verifiable details that you couldn't have known through normal means. Cross-reference information with multiple sources when possible.</p>
      <p>Occasionally, you may encounter spirits with negative intentions. In such cases, firmly but kindly ask them to leave. Use prayers, protective symbols, or call upon spiritual guides for assistance. If problems persist, seek help from experienced practitioners.</p>

      <h2>The Role of Mediums in Modern Society</h2>
      <p>Professional mediums play an important role in helping people cope with grief and find spiritual guidance. However, the field is largely unregulated, making it important to choose practitioners wisely.</p>
      <p>Look for mediums who are transparent about their methods, maintain ethical standards, and don't make unrealistic promises. Check for professional affiliations and read reviews from previous clients.</p>
      <p>While mainstream science has been slow to accept mediumship, numerous studies have validated the abilities of gifted mediums. Research from institutions like the University of Virginia and the Windbridge Institute provides compelling evidence that some people can indeed obtain accurate information from non-physical sources.</p>

      <h2>Spirit Communication and Grief Healing</h2>
      <p>One of the most valuable applications of spirit communication is in helping people process grief and loss.</p>
      <p>Studies show that mediumship readings can significantly reduce grief symptoms and improve quality of life for bereaved individuals. The knowledge that consciousness continues after death can provide profound comfort and peace.</p>
      <p>Spirit communication should complement, not replace, traditional grief counseling. Many therapists now incorporate spiritual perspectives into their practice, recognizing the importance of addressing spiritual needs alongside emotional ones.</p>

      <h2>The Future of Spirit Communication</h2>
      <p>As our understanding of consciousness evolves, spirit communication may become more accepted and integrated into mainstream society.</p>
      <p>New technologies, from advanced EEG devices to AI-assisted analysis, may help us better understand and validate spirit communication experiences. Some researchers are exploring ways to create more reliable communication interfaces between the physical and spiritual realms.</p>
      <p>As society becomes more open to spiritual perspectives, spirit communication may find its place alongside traditional religious and scientific worldviews, offering a more holistic understanding of human experience.</p>

      <h2>Final Thoughts</h2>
      <p>Spirit communication is a deeply personal journey that requires patience, practice, and an open heart. Whether you're seeking to connect with lost loved ones, develop your spiritual abilities, or simply explore the mysteries of consciousness, remember that you are not alone in this exploration.</p>
      <p>The spirits around us are always ready to offer guidance, love, and wisdom. By developing our abilities and maintaining ethical standards, we can create meaningful connections that bridge the gap between the worlds. Approach this work with reverence, respect, and a genuine desire to serve both the living and the departed.</p>
      <p>Your journey into spirit communication is unique, and the most important teacher you'll ever have is your own experience. Trust your intuition, keep learning, and remain open to the infinite possibilities that await when we dare to reach beyond the veil.</p>
    `,
    author: 'Sarah Johnson',
    date: 'Dec 20, 2024',
    readTime: '12 min read',
    category: 'Spirit Communication',
    image: '/images/podcasts/carousel/1.jpg',
    slug: 'complete-guide-spirit-communication',
  };

  // Get related posts (same category, excluding current)
  const relatedPosts = [
    {
      id: 2,
      title: 'Signs Your Loved Ones Are Trying to Contact You',
      excerpt:
        'Recognize the common signs and symbols that indicate your departed loved ones are reaching out.',
      image: '/images/podcasts/carousel/2.jpg',
      slug: 'signs-loved-ones-contact',
      author: 'Emma Rodriguez',
      readTime: '6 min read',
    },
    {
      id: 3,
      title: 'The Science Behind Mediumship',
      excerpt:
        'Explore scientific studies that validate mediumistic experiences and spirit communication.',
      image: '/images/podcasts/carousel/3.jpg',
      slug: 'science-behind-mediumship',
      author: 'Dr. Michael Chen',
      readTime: '8 min read',
    },
    {
      id: 4,
      title: 'Energy Healing Techniques',
      excerpt:
        'Discover ancient wisdom and modern practices for balancing your energy systems.',
      image: '/images/podcasts/carousel/4.jpg',
      slug: 'energy-healing-techniques',
      author: 'Lisa Park',
      readTime: '7 min read',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{blog.title} - The Bridge</title>
        <meta name="description" content={blog.excerpt} />
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-poppins font-medium text-sm mb-6">
                {blog.category}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-poppins text-white leading-tight mb-6">
                {blog.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 font-lato mb-8 max-w-3xl mx-auto">
                {blog.excerpt}
              </p>

              {/* Author and Meta */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readTime}</span>
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
              <div className="mb-12">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>

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
                    Published on {blog.date}
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
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                  <User className="w-8 h-8 text-primary-600" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                    About {blog.author}
                  </h3>
                  <p className="text-gray-600 font-lato">
                    {blog.author} is a dedicated spiritual practitioner and
                    writer with years of experience in mediumship and spiritual
                    guidance. They are passionate about helping others connect
                    with their spiritual path and find meaning in their journey.
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
                            src={relatedBlog.image}
                            alt={relatedBlog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
                            {relatedBlog.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {relatedBlog.excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <User className="w-3 h-3" />
                            <span>{relatedBlog.author}</span>
                            <span>•</span>
                            <Clock className="w-3 h-3" />
                            <span>{relatedBlog.readTime}</span>
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
