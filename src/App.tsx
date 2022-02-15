import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Photo from './Photo';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

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
  const [sort, setSort] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((json) => setPhotos(json));
  }, []);

  const result = useMemo(() => {

  }, [photos])

  return (
      <Container maxWidth='lg'>
        <Box sx={{ bgcolor: '#cfe8fc'}}>
          {photos.map(photo => <Photo photo={photo} key={photo.id}/>)}
        </Box>
      </Container>
  );
}

export default App;
