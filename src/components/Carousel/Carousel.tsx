import React, { FC } from 'react';
import './Carousel.css';
import ImageGallery, { ReactImageGalleryProps } from 'react-image-gallery';

interface CarouselProps {
  photos: { id?: string; original: string; thumbnail?: string }[];
  currentPhoto?: number;
  showNav?: boolean;
}

export const Carousel: FC<CarouselProps> = ({
  photos,
  currentPhoto,
  showNav,
}) => {
  const config: ReactImageGalleryProps = {
    items: photos,
    showThumbnails: photos[0].thumbnail ? true : false,
    slideInterval: 10000,
    startIndex: currentPhoto ?? 0,
    lazyLoad: false,
    showNav: showNav ?? true,
    showFullscreenButton: false,
    showPlayButton: false,
    autoPlay: false,
  };

  return <ImageGallery {...config} />;
};
