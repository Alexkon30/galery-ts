import React from 'react';
import { IPhoto } from './App';
import { Grid, Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useGlobalContext } from './Context';


type PhotoProps = {
  photo: IPhoto;
};

const Photo = ({ photo }: PhotoProps) => {

  const {photos, setPhotos} = useGlobalContext();

  const deletePhoto = (id: number) => {
    fetch(`http://jsonplaceholder.typicode.com/photos/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) setPhotos(photos.filter(photo => photo.id !== id))
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
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: '30px',
        position: 'relative',
        ':hover': {
          boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
        },
      }}
    >
      <Box
        sx={{
          ':hover': {
            cursor: 'pointer',
          },
        }}
      >
        <img src={photo.thumbnailUrl} alt={photo.title} />
      </Box>

      <CancelIcon
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          ':hover': {
            cursor: 'pointer',
            transform: 'scale(1.2)',
            color: 'blue',
          },
        }}
        onClick={() => deletePhoto(photo.id)}
      />
    </Grid>
  );
};

export default Photo;
