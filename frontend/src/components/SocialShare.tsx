import React from 'react';
import { Share2, Facebook, Twitter, Linkedin, Mail, Link2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
  url,
  title = 'Wise Wave - Career Guidance Platform',
  description = 'Get expert career guidance and admission support for your educational journey',
  className = ''
}) => {
  const { toast } = useToast();

  // Get current page URL if not provided
  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:text-blue-600',
      bgColor: 'bg-blue-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:text-sky-500',
      bgColor: 'bg-sky-500'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:text-blue-700',
      bgColor: 'bg-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:text-green-600',
      bgColor: 'bg-green-600'
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: 'hover:text-gray-600',
      bgColor: 'bg-gray-600'
    }
  ];

  const handleShare = (platformUrl: string, platformName: string) => {
    window.open(platformUrl, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied!",
        description: "The blog post link has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy link to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <Share2 className="h-5 w-5 text-gray-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">Share this article</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {shareLinks.map((platform) => {
          const IconComponent = platform.icon;
          return (
            <button
              key={platform.name}
              onClick={() => handleShare(platform.url, platform.name)}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${platform.bgColor} text-white transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300`}
              aria-label={`Share on ${platform.name}`}
              title={`Share on ${platform.name}`}
            >
              <IconComponent className="h-5 w-5" />
            </button>
          );
        })}

        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
          aria-label="Copy link"
          title="Copy link"
        >
          <Link2 className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500 text-center">
          Help others discover this valuable content
        </p>
      </div>
    </div>
  );
};

export default SocialShare;