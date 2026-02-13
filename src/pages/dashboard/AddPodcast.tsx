import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { validateSecurity } from '@/lib/security';
import { Upload, X, Play, Image as ImageIcon } from 'lucide-react';
import {
  Button,
  Input,
  Textarea,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from '../../components/ui';
import Select from 'react-select';
import { type PodcastFormData } from '../../types/podcast';

const AddPodcast = () => {
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExternal, setIsExternal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PodcastFormData>();

  const tagOptions = [
    { value: 'spirituality', label: 'Spirituality' },
    { value: 'mediumship', label: 'Mediumship' },
    { value: 'energy-healing', label: 'Energy Healing' },
    { value: 'intuition', label: 'Intuition' },
    { value: 'motivation', label: 'Motivation' },
  ];

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioPreview(url);

      // Auto-calculate duration
      const audio = new Audio(url);
      audio.onloadedmetadata = () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        setValue(
          'duration',
          `${minutes}:${seconds.toString().padStart(2, '0')}`
        );
      };
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const onSubmit = async (data: PodcastFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('isExternal', isExternal.toString());
      formData.append('duration', data.duration);
      formData.append('tags', JSON.stringify(data.tags));
      formData.append('publishDate', data.publishDate);

      if (isExternal) {
        formData.append('audioUrl', data.audioUrl);
      } else {
        formData.append('audioFile', data.audioFile[0]);
      }

      if (data.imageFile[0]) formData.append('imageFile', data.imageFile[0]);

      // TODO: API call to backend
      console.log('Submitting podcast:', Object.fromEntries(formData));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert('Podcast added successfully!');
    } catch (error) {
      console.error('Error adding podcast:', error);
      alert('Failed to add podcast');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Podcast - The Bridge Admin</title>
        <meta
          name="description"
          content="Add a new podcast episode by uploading an audio file or providing an external link."
        />
      </Helmet>

      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold">Add New Podcast</h1>
          <p className="text-muted-foreground">
            Upload an audio file and add details for your podcast episode.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the title and description for your podcast episode.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  {...register('title', {
                    required: 'Title is required',
                    validate: validateSecurity,
                  })}
                  placeholder="Enter podcast title"
                  className="mt-1"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  {...register('description', {
                    required: 'Description is required',
                    minLength: {
                      value: 10,
                      message: 'Description must be at least 10 characters',
                    },
                    validate: validateSecurity,
                  })}
                  placeholder="Enter podcast description"
                  rows={4}
                  className="mt-1"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audio Source</CardTitle>
              <CardDescription>
                Choose how to provide the audio for your podcast.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Audio Source Selection */}
              <div>
                <Label className="text-sm font-medium">Audio Source *</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="upload"
                      name="audioSource"
                      checked={!isExternal}
                      onChange={() => setIsExternal(false)}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <Label htmlFor="upload" className="text-sm">
                      Upload Audio File
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="external"
                      name="audioSource"
                      checked={isExternal}
                      onChange={() => setIsExternal(true)}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <Label htmlFor="external" className="text-sm">
                      External Link (YouTube, Spotify, etc.)
                    </Label>
                  </div>
                </div>
              </div>

              {/* Audio File Upload or URL Input */}
              {!isExternal ? (
                <div>
                  <Label className="text-sm font-medium">Audio File *</Label>
                  <div className="mt-1">
                    <input
                      type="file"
                      accept="audio/*"
                      {...register('audioFile', {
                        required: !isExternal && 'Audio file is required',
                        validate: {
                          fileSize: (files) => {
                            if (files && files[0]?.size > 100 * 1024 * 1024) {
                              return 'File size must be less than 100MB';
                            }
                            return true;
                          },
                          fileType: (files) => {
                            const allowedTypes = [
                              'audio/mpeg',
                              'audio/wav',
                              'audio/mp4',
                            ];
                            if (
                              files &&
                              !allowedTypes.includes(files[0]?.type)
                            ) {
                              return 'Only MP3, WAV, or M4A files are allowed';
                            }
                            return true;
                          },
                        },
                      })}
                      onChange={handleAudioChange}
                      className="hidden"
                      id="audioFile"
                    />
                    <label
                      htmlFor="audioFile"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload audio file (MP3, WAV, M4A)
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Max 100MB</p>
                      </div>
                    </label>
                    {audioPreview && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <Play className="w-5 h-5 text-primary-600" />
                          <div>
                            <p className="text-sm font-medium">Audio Preview</p>
                            <audio
                              controls
                              src={audioPreview}
                              className="mt-2 w-full max-w-md"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => setAudioPreview(null)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.audioFile && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.audioFile.message}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <Label htmlFor="audioUrl">Audio URL *</Label>
                  <Input
                    id="audioUrl"
                    {...register('audioUrl', {
                      required: isExternal && 'Audio URL is required',
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message:
                          'Please enter a valid URL starting with http:// or https://',
                      },
                    })}
                    placeholder="https://youtube.com/watch?v=... or https://spotify.com/..."
                    className="mt-1"
                  />
                  {errors.audioUrl && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.audioUrl.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the URL of the external audio source
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thumbnail Image</CardTitle>
              <CardDescription>
                Upload a thumbnail image for your podcast episode.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Image File */}
              <div>
                <Label className="text-sm font-medium">Thumbnail Image</Label>
                <div className="mt-1">
                  <input
                    type="file"
                    accept="image/*"
                    {...register('imageFile', {
                      validate: {
                        fileSize: (files) => {
                          if (files[0]?.size > 5 * 1024 * 1024) {
                            return 'Image size must be less than 5MB';
                          }
                          return true;
                        },
                        fileType: (files) => {
                          const allowedTypes = [
                            'image/jpeg',
                            'image/png',
                            'image/webp',
                          ];
                          if (
                            files[0] &&
                            !allowedTypes.includes(files[0]?.type)
                          ) {
                            return 'Only JPG, PNG, or WebP images are allowed';
                          }
                          return true;
                        },
                      },
                    })}
                    onChange={handleImageChange}
                    className="hidden"
                    id="imageFile"
                  />
                  <label
                    htmlFor="imageFile"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors"
                  >
                    <div className="text-center">
                      <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload thumbnail image
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG, WebP (Max 5MB)
                      </p>
                    </div>
                  </label>
                  {imagePreview && (
                    <div className="mt-4 flex items-center gap-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                {errors.imageFile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.imageFile.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
              <CardDescription>
                Provide additional information about your podcast.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Duration */}
              <div>
                <Label htmlFor="duration">Duration {!isExternal && '*'}</Label>
                <Input
                  id="duration"
                  {...register('duration', {
                    required:
                      !isExternal && 'Duration is required for uploaded files',
                  })}
                  placeholder="e.g., 45:30"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {isExternal
                    ? 'Optional for external links'
                    : 'Auto-filled from audio file, or enter manually (MM:SS)'}
                </p>
              </div>

              {/* Tags */}
              <div>
                <Label>Tags</Label>
                <Select
                  isMulti
                  options={tagOptions}
                  onChange={(selected) =>
                    setValue(
                      'tags',
                      selected.map((s) => s.value)
                    )
                  }
                  className="mt-1"
                  placeholder="Select tags..."
                />
              </div>

              {/* Publish Date */}
              <div>
                <Label htmlFor="publishDate">Publish Date</Label>
                <Input
                  id="publishDate"
                  type="date"
                  {...register('publishDate')}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty for immediate publish
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="btn">
              {isSubmitting ? 'Adding Podcast...' : 'Add Podcast'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPodcast;
