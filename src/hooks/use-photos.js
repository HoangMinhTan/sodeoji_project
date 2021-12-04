import { useState, useEffect } from 'react';
import { getPhotosUpdate } from '../services/firebase';

export default function usePhotos(user) {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function getTimelinePhotos() {
      if (user?.following?.length > 0) {
        const followedUserPhotos = await getPhotosUpdate(user.userId, user.following);
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }
    
    getTimelinePhotos();
  }, [user?.userId, user?.following]);

  return { photos };
}