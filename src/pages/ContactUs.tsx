'use client';

import { useState } from 'react';
import { submitContactForm } from '../services/contact-us';
import { toast } from 'react-toastify';
import SubmitButton from '../components/ui/SubmitButton';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('subject', formData.subject);
    data.append('message', formData.message);

    const result = await submitContactForm(data);

    if (result.success) {
      toast.success(result.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      toast.error(result.errors?.join(', ') || result.message);
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact The Bridge</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Reach out to our community of mediums and spiritual seekers. Whether
            you&apos;re seeking guidance, booking a reading, or joining our
            events, we&apos;re here to bridge the gap between the physical and
            spiritual worlds.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex">
                <div className="w-1/2">
                  <div className="bg-linear-to-br from-purple-500 to-blue-500 p-10 text-white h-full">
                    <h3 className="mb-6 text-2xl font-bold text-white">
                      Get in touch
                    </h3>
                    <p className="mb-6 text-white">
                      We&apos;d love to hear from you. Please fill out the form
                      or contact us using the information below.
                    </p>
                    <div className="flex items-center mb-6 transition-transform duration-300 hover:translate-x-2">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                        <MapPin className="text-white" />
                      </div>
                      <div>
                        <h6 className="mb-0 font-medium text-white">Address</h6>
                        <p className="mb-0 text-white">
                          123 Spiritual Way
                          <br />
                          Metaphysical City, MC 12345
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mb-6 transition-transform duration-300 hover:translate-x-2">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                        <Phone className="text-white" />
                      </div>
                      <div>
                        <h6 className="mb-0 font-medium text-white">Phone</h6>
                        <p className="mb-0 text-white">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-6 transition-transform duration-300 hover:translate-x-2">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                        <Mail className="text-white" />
                      </div>
                      <div>
                        <h6 className="mb-0 font-medium text-white">Email</h6>
                        <p className="mb-0 text-white">hello@thebridge.com</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <h6 className="mb-3 font-medium text-white">Follow Us</h6>
                      <a
                        href="#"
                        className="w-9 h-9 bg-white rounded-full inline-flex items-center justify-center mr-2 transition-all duration-300 hover:bg-purple-500 hover:text-white hover:-translate-y-1"
                      >
                        <Facebook />
                      </a>
                      <a
                        href="#"
                        className="w-9 h-9 bg-white rounded-full inline-flex items-center justify-center mr-2 transition-all duration-300 hover:bg-purple-500 hover:text-white hover:-translate-y-1"
                      >
                        <Twitter />
                      </a>
                      <a
                        href="#"
                        className="w-9 h-9 bg-white rounded-full inline-flex items-center justify-center mr-2 transition-all duration-300 hover:bg-purple-500 hover:text-white hover:-translate-y-1"
                      >
                        <Linkedin />
                      </a>
                      <a
                        href="#"
                        className="w-9 h-9 bg-white rounded-full inline-flex items-center justify-center mr-2 transition-all duration-300 hover:bg-purple-500 hover:text-white hover:-translate-y-1"
                      >
                        <Instagram />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="p-10 border border-gray-200 rounded-tr-2xl rounded-br-2xl">
                    <h3 className="mb-6 text-2xl font-bold">
                      Send us a message
                    </h3>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label className="font-medium mb-2 block">Name</label>
                        <input
                          type="text"
                          name="name"
                          className="w-full rounded-lg px-4 py-3 border-2 border-gray-200 transition-all duration-300 focus:border-purple-400 focus:outline-none"
                          placeholder="John Doe"
                          required
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="font-medium mb-2 block">Email</label>
                        <input
                          type="email"
                          name="email"
                          className="w-full rounded-lg px-4 py-3 border-2 border-gray-200 transition-all duration-300 focus:border-purple-400 focus:outline-none"
                          placeholder="john@example.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="font-medium mb-2 block">
                          Subject
                        </label>
                        <select
                          name="subject"
                          className="w-full rounded-lg px-4 py-3 border-2 border-gray-200 transition-all duration-300 focus:border-purple-400 focus:outline-none"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                        >
                          <option value="">How can we help?</option>
                          <option value="General Question">
                            General Question
                          </option>
                          <option value="Questions About an Event">
                            Questions About an Event
                          </option>
                          <option value="Questions About a Private Reading">
                            Questions About a Private Reading
                          </option>
                          <option value="Questions About Membership">
                            Questions About Membership
                          </option>
                          <option value="Becoming a Presenter">
                            Becoming a Presenter
                          </option>
                          <option value="Technical Issue">
                            Technical Issue
                          </option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="mb-6">
                        <label className="font-medium mb-2 block">
                          Message
                        </label>
                        <textarea
                          name="message"
                          className="w-full h-32 rounded-lg px-4 py-3 border-2 border-gray-200 transition-all duration-300 focus:border-purple-400 focus:outline-none resize-none"
                          placeholder="Your message here..."
                          required
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>
                      <SubmitButton text="Submit" disabled={isSubmitting} />
                    </form>
                    <div className="h-48 rounded-lg overflow-hidden mt-4">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=-139.61425781250003%2C19.269665296502332%2C-66.22558593750001%2C50.764259357116465&amp;layer=mapnik"
                      ></iframe>
                      <br />
                      <small>
                        <a href="https://www.openstreetmap.org/?#map=5/36.60/-102.92">
                          View Larger Map
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
