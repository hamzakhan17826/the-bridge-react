import { Helmet } from 'react-helmet-async';
import { Heart, Users, Sparkles, Award, Globe, Quote } from 'lucide-react';

const AboutUs = () => {
  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder & Lead Medium',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      bio: 'With over 15 years of experience connecting souls with their loved ones, Sarah founded The Bridge to create a safe, supportive community for spiritual growth.',
      specialties: ['Mediumship', 'Spiritual Guidance', 'Community Building'],
    },
    {
      name: 'Marcus Johnson',
      role: 'Development Coach',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Marcus specializes in helping developing mediums build confidence and refine their abilities through structured training and mentorship.',
      specialties: [
        'Medium Development',
        'Mentorship',
        'Workshop Facilitation',
      ],
    },
    {
      name: 'Elena Rodriguez',
      role: 'Community Manager',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Elena ensures every member feels welcomed and supported, fostering meaningful connections within our spiritual community.',
      specialties: [
        'Community Support',
        'Event Coordination',
        'Member Relations',
      ],
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description:
        'We approach every interaction with deep empathy and understanding, recognizing the sacred nature of each spiritual journey.',
    },
    {
      icon: Users,
      title: 'Community',
      description:
        'Building bridges between souls, we create a supportive network where everyone can grow, learn, and heal together.',
    },
    {
      icon: Sparkles,
      title: 'Authenticity',
      description:
        'We honor genuine spiritual experiences and encourage authentic expression of beliefs and abilities.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description:
        'Committed to the highest standards of ethical practice and professional development in mediumship and spiritual services.',
    },
  ];

  const milestones = [
    {
      year: '2018',
      event: 'The Bridge founded with vision to connect spiritual seekers',
    },
    {
      year: '2019',
      event: 'First annual spiritual conference with 200+ attendees',
    },
    {
      year: '2020',
      event: 'Launched online platform during global challenges',
    },
    {
      year: '2021',
      event: 'Expanded to international community with 10,000+ members',
    },
    { year: '2022', event: 'Introduced professional development programs' },
    {
      year: '2023',
      event: 'Celebrated 50,000+ successful readings and connections',
    },
    { year: '2024', event: 'Launched comprehensive membership platform' },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - The Bridge</title>
        <meta
          name="description"
          content="Learn about The Bridge's mission to connect souls, foster spiritual growth, and build a supportive community for mediums and spiritual seekers worldwide."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-primary-900 via-secondary-900 to-indigo-900 text-white py-20 md:py-28">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-poppins font-medium text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              About The Bridge
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins text-white leading-tight mb-4">
              Connecting Souls,{' '}
              <span className="bg-linear-to-r bg-clip-text">
                Building Bridges
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-lato max-w-3xl mx-auto mb-8">
              Since 2018, The Bridge has been a beacon for spiritual seekers,
              providing authentic mediumship services, community support, and
              professional development opportunities.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg md:text-xl text-gray-600 font-lato leading-relaxed mb-8">
                To create a safe, supportive, and authentic space where
                spiritual seekers can connect with their loved ones, develop
                their gifts, and grow within a compassionate community. We
                believe that everyone has the ability to connect with the
                spiritual realm, and our mission is to provide the guidance,
                resources, and community needed to make that connection
                meaningful and healing.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-linear-to-r from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                    Global Community
                  </h3>
                  <p className="text-gray-600 font-lato">
                    Connecting spiritual seekers from around the world
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-linear-to-r from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                    Healing Connections
                  </h3>
                  <p className="text-gray-600 font-lato">
                    Facilitating meaningful connections with loved ones
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-linear-to-r from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                    Professional Excellence
                  </h3>
                  <p className="text-gray-600 font-lato">
                    Maintaining the highest standards in mediumship
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-6">
                    Our Story
                  </h2>
                  <div className="space-y-6 text-gray-600 font-lato leading-relaxed">
                    <p>
                      The Bridge was born from a simple yet profound belief:
                      that the connection between the physical and spiritual
                      worlds should be accessible to everyone. Our founder,
                      Sarah Mitchell, experienced her first spiritual connection
                      at a young age and spent years developing her abilities
                      while searching for a community that truly understood the
                      sacred nature of this work.
                    </p>
                    <p>
                      What she found was a fragmented spiritual landscape filled
                      with skepticism, misinformation, and isolation. In 2018,
                      Sarah decided to change this by creating The Bridge – a
                      platform where authenticity, compassion, and professional
                      excellence would be the foundation of everything we do.
                    </p>
                    <p>
                      Today, The Bridge stands as a testament to what happens
                      when spiritual seekers come together with purpose,
                      integrity, and love. We've helped thousands find peace,
                      connection, and purpose through our services and
                      community.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-linear-to-br from-primary-100 to-secondary-100 rounded-3xl p-8 shadow-lg">
                    <Quote className="w-12 h-12 text-primary-500 mb-6" />
                    <blockquote className="text-xl font-lato italic text-gray-700 mb-6">
                      "The Bridge isn't just a platform – it's a movement. It's
                      about creating genuine connections that heal, inspire, and
                      transform lives. Every reading, every workshop, every
                      conversation brings us closer to our shared purpose:
                      bridging the gap between worlds."
                    </blockquote>
                    <cite className="text-primary-600 font-poppins font-semibold">
                      — Sarah Mitchell, Founder
                    </cite>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 font-lato max-w-3xl mx-auto">
                These principles guide everything we do and shape the community
                we've built together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 bg-linear-to-r from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 font-lato leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 font-lato max-w-3xl mx-auto">
                Dedicated professionals committed to supporting your spiritual
                journey with expertise, compassion, and integrity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-square bg-linear-to-br from-primary-100 to-secondary-100 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 font-lato text-sm leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-poppins font-semibold text-gray-700 uppercase tracking-wide">
                        Specialties
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-gray-600 font-lato max-w-3xl mx-auto">
                Key milestones that have shaped The Bridge into the community it
                is today.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-6">
                    <div className="shrink-0 w-16 h-16 bg-linear-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-white font-poppins font-bold">
                      {milestone.year}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 font-lato leading-relaxed">
                        {milestone.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-linear-to-r from-primary-50 to-secondary-50">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <Sparkles className="w-12 h-12 text-primary-500 mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
                Join Our Community
              </h2>
              <p className="text-lg text-gray-600 font-lato mb-8 max-w-2xl mx-auto">
                Ready to begin your spiritual journey? Join thousands of seekers
                who have found connection, healing, and purpose through The
                Bridge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-poppins font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Users className="w-5 h-5" />
                  Become a Member
                </button>
                <button className="inline-flex items-center gap-3 px-8 py-4 border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white font-poppins font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105">
                  <Heart className="w-5 h-5" />
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
