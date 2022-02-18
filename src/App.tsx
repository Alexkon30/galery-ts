import React, { useState, useEffect, useMemo } from 'react';
import Photo from './Photo';
import {
  Container,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  Grid,
  Modal,
  Typography
} from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import { GlobalContext } from './Context';

//http://jsonplaceholder.typicode.com/photos

export interface IPhoto {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

function App() {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [sort, setSort] = useState<number | string | null>('');
  const [page, setPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPhotoInModal, setCurrentPhotoInModal] = useState<IPhoto>({
    albumId: 0,
    id: 0,
    thumbnailUrl: '',
    title: '',
    url: ''
  })

  const photosOnPage = 21;

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((json) => setPhotos(json));
  }, []);

  const resultPhotos = useMemo<IPhoto[]>(() => {
    let result: IPhoto[] = JSON.parse(JSON.stringify(photos));

    if (sort !== '') result = result.filter((photo) => photo.albumId === sort);

    return result.filter(
      (photo, index) =>
        index < page * photosOnPage && index >= (page - 1) * photosOnPage
    );
  }, [photos, sort, page]);

  const albumIds = [...Array(101).keys()].filter((item) => item !== 0);

  return (
    <GlobalContext.Provider value={{ photos, setPhotos }}>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          mt: 2
        }}
      >
        {/* album selector */}
        <FormControl
          sx={{
            width: '30%',
          }}
        >
          <InputLabel id='select-label'>Album Id</InputLabel>
          <Select
            labelId='select-label'
            value={sort}
            label='Album Id'
            onChange={(event) => {
              setPage(1);
              setSort(event.target.value);
            }}
          >
            <MenuItem value={''}>without sort</MenuItem>
            {albumIds.map((id) => (
              <MenuItem value={id} key={id}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* end album selector */}

        <Grid
          container
          sx={{
            bgcolor: '#cfe8fc',
          }}
        >
          {resultPhotos.map((photo) => (
            <Photo key={photo.id} photo={photo} setIsOpen={setIsOpen} setCurrentPhotoInModal={setCurrentPhotoInModal}/>
          ))}
        </Grid>

        {/* page selector */}
        <Box sx={{ m: 2, display: 'flex', gap: 2 }}>
          <Button
            variant='outlined'
            disabled={page < 2}
            onClick={() => setPage(prevPage => prevPage - 1)}
          >
            <ArrowCircleLeftIcon />
          </Button>
          <Typography variant='h6' sx={{
            p: '0 20px',
            border: '1px solid lightblue',
            borderRadius: '4px'
          }}>{page}</Typography>
          <Button
            variant='outlined'
            disabled={
              sort !== ''
                ? photos.filter((photo) => photo.albumId === sort).length / photosOnPage < page
                : photos.length / photosOnPage <= page
            }
            onClick={() => setPage(prevPage => prevPage + 1)}
          >
            <ArrowCircleRightIcon />
          </Button>
        </Box>
        {/* end page selector */}

        {/* modal view */}
        <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6">
            {currentPhotoInModal.title}
          </Typography>
          <img src={currentPhotoInModal.url} alt={currentPhotoInModal.title} style={{
            height: '80vh'
          }}/>
        </Box>
      </Modal>
        {/* end modal */}


      </Container>
    </GlobalContext.Provider>
  );
}

export default App;
