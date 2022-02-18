import React from 'react';
import { IPhoto } from './App';
import { Grid, Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useGlobalContext } from './Context';

type PhotoProps = {
  photo: IPhoto;
  setIsOpen: (value: boolean) => void;
  setCurrentPhotoInModal: (newPhoto: IPhoto) => void;
};

const Photo = ({ photo, setIsOpen, setCurrentPhotoInModal }: PhotoProps) => {
  const { photos, setPhotos } = useGlobalContext();

  const deletePhoto = (id: number) => {
    fetch(`http://jsonplaceholder.typicode.com/photos/${id}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) setPhotos(photos.filter((photo) => photo.id !== id));
    });
  };

  return (
    <Grid
      item
      lg={3}
      md={4}
      sm={6}
      xs={12}
      key={photo.id}
      sx={style.cardContainer}
    >
      <Box sx={style.imageContainer}>
        <img
          src={photo.thumbnailUrl}
          alt={photo.title}
          onClick={() => {
            setIsOpen(true);
            setCurrentPhotoInModal(photo);
          }}
        />
      </Box>
      <CancelIcon sx={style.cancelIcon} onClick={() => deletePhoto(photo.id)} />
    </Grid>
  );
};

export default Photo;

const style = {
  cancelIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    ':hover': {
      cursor: 'pointer',
      transform: 'scale(1.2)',
      color: 'blue',
    },
  },
  imageContainer: {
    ':hover': {
      cursor: 'pointer',
    },
  },
  cardContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: '30px',
    position: 'relative',
    ':hover': {
      boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
    },
  },
};
