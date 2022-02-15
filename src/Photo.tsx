import React from 'react'
import { IPhoto } from './App'

type PhotoProps = {
  photo: IPhoto
}

const Photo = ({photo} : PhotoProps) => {
  return (
    <div>{photo.id}</div>
  )
}

export default Photo
