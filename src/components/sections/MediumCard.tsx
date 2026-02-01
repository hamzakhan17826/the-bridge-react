import { Star, Video, Award, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage, Button, Badge } from '../ui';

function MediumCard({ medium }: { medium: any }) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const getAvailabilityBadge = (status: any) => {
    switch (status) {
      case 'available':
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 border-green-200"
          >
            Available
          </Badge>
        );
      case 'upcoming-events':
        return (
          <Badge
            variant="default"
            className="bg-secondary-100 text-secondary-800 border-secondary-200"
          >
            Upcoming Events
          </Badge>
        );
      case 'guest-medium':
        return (
          <Badge
            variant="default"
            className="bg-primary-100 text-primary-800 border-primary-200"
          >
            Guest Medium
          </Badge>
        );
      case 'busy':
        return (
          <Badge
            variant="secondary"
            className="bg-gray-100 text-gray-800 border-gray-200"
          >
            Busy
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 relative overflow-hidden ">
      {/* Availability Badge */}
      <div className="absolute top-4 right-4 z-10">
        {getAvailabilityBadge(medium.availabilityStatus)}
      </div>

      {/* Circular Headshot with enhanced glow */}
      <div className="flex justify-center mb-6 relative">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary-400/20 to-secondary-400/20 blur-lg scale-125"></div>
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary-500/10 to-secondary-500/10 blur-md scale-110"></div>
          <Avatar className="w-24 h-24 border-4 border-white shadow-lg relative z-10">
            <AvatarImage src={medium.photoUrl} alt={medium.name} />
            <AvatarFallback className="text-xl font-semibold bg-linear-to-r from-primary-100 to-secondary-100">
              {medium.name
                .split(' ')
                .map((any) => any[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Name and Specialty */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{medium.name}</h3>
        <p className="text-sm font-medium text-primary-600 mb-2">
          {medium.specialty}
        </p>
        <p className="text-sm text-gray-600 italic">"{medium.tagline}"</p>
      </div>

      {/* Experience and Video Count */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Award className="w-4 h-4 text-primary-500" />
          <span>{medium.experienceInYears}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Video className="w-4 h-4 text-secondary-500" />
          <span>{medium.totalVideos} videos</span>
        </div>
      </div>

      {/* Focus Areas */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1 justify-center">
          {medium.focus.slice(0, 3).map((any, index) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-1">
              {any}
            </Badge>
          ))}
        </div>
      </div>

      {/* Next Event */}
      {/* {medium.nextEvent && (
        <div className="bg-primary-50 rounded-lg p-3 mb-4 border border-primary-100">
          <div className="flex items-center gap-2 text-sm text-primary-700 mb-1">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">Next Event</span>
          </div>
          <p className="text-xs text-primary-600 mb-1">
            {medium.nextEvent.title}
          </p>
          <div className="flex items-center gap-1 text-xs text-primary-500">
            <Clock className="w-3 h-3" />
            <span>
              {medium.nextEvent.date} • {medium.nextEvent.time}
            </span>
          </div>
        </div>
      )} */}

      {/* Star Rating */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="flex items-center gap-0.5">
          {renderStars(medium.averageRating)}
        </div>
        <span className="text-sm text-gray-600 font-medium">
          {medium.averageRating} ({medium.totalReviews} reviews)
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 w-full justify-center">
        <Button
          asChild
          variant="outline"
          size="sm"
          className=" border-primary-200 hover:bg-primary-50 hover:border-primary-300"
        >
          <Link
            to={`/mediums/${medium.slug}`}
            className="flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            View Profile
          </Link>
        </Button>

        {medium.isBookingEnabled && (
          <Button
            asChild
            size="sm"
            className="text-white bg-linear-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
          >
            <Link to={`/book/${medium.slug}`}>Book Session</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default MediumCard;
