import { Quote, Heart } from 'lucide-react';

interface Testimonial {
  text: string;
  name: string;
  link: string;
  platform: string;
  image: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100">
      {/* Quote icon */}
      <div className="absolute -top-3 -left-3 w-12 h-12 bg-linear-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
        <Quote className="w-6 h-6 text-white" />
      </div>

      {/* Testimonial text */}
      <p className="text-gray-700 font-lato leading-relaxed mb-6 pt-4 italic">
        "{testimonial.text}"
      </p>

      {/* User info */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="rounded-full w-12 h-12 object-cover border-2 border-purple-200 group-hover:border-purple-400 transition-colors"
            width={48}
            height={48}
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1">
          <h5 className="mb-1">
            <a
              href={testimonial.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700 hover:text-purple-800 font-poppins font-semibold transition-colors"
            >
              {testimonial.name}
            </a>
          </h5>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-medium">
              <Heart className="w-3 h-3" />
              {testimonial.platform}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
