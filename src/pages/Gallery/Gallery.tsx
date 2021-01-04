import React, { FC, useEffect, useMemo, useState } from 'react';

import style from './Gallery.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Title } from '../../components/Title/Title';
import { CustomModal } from '../../components/CustomModal/CustomModal';
import { Carousel } from '../../components/Carousel/Carousel';
import { PageSvc } from '../../services/PageSvc';
import Grid from '@material-ui/core/Grid';

type TImageProps = {
  url: string;
  title: string;
};

const Image: FC<TImageProps> = ({ url, title }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <img
        src={url}
        alt={title}
        title={title}
        className={loaded ? `${style.Image} ${style.Loaded}` : `${style.Image}`}
        onLoad={() => {
          setLoaded(true);
        }}
      />

      {!loaded && <CircularProgress className={style.Spinner} />}
    </>
  );
};

export const Gallery: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState<{ images: TImageProps[]; thumbnails: TImageProps[] | null }>();

  useEffect(() => {
    (async () => {
      const data = await PageSvc.getGalleryImagesUrl();
      setImages(data);
    })();
  }, []);

  const gallery = useMemo(() => {
    if (images?.thumbnails) {
      return images?.thumbnails.map((thumbnail, index) => (
        <div
          key={`thumbnail-${index}`}
          className={style.Box}
          onClick={() => {
            setCurrentIndex(index);
            setVisible(true);
          }}
        >
          <Image {...thumbnail} />
        </div>
      ));
    } else {
      return <></>;
    }
  }, [images?.thumbnails]);

  const photos = useMemo(() => {
    if (images?.images) {
      return images?.images.map((image, index) => ({
        original: `${image.url}`,
        originalAlt: `image_${index}`,
        originalClass: 'image',
      }));
    } else {
      return [];
    }
  }, [images?.images]);

  const closeFunction = () => {
    setVisible(false);
  };

  return (
    <>
      <Grid item xs={12} justify="center" container>
        <Title title="Gallery" />
      </Grid>

      <div className={style.GalleryWall}>{gallery}</div>
      <CustomModal visible={visible} closeFunction={closeFunction}>
        {<Carousel photos={photos} currentPhoto={currentIndex} />}
      </CustomModal>
    </>
  );
};
