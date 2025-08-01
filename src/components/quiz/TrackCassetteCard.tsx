import Image from 'next/image';
import { Button, PlayIcon, PauseIcon } from '@/components/common';
import type { Track, Album } from '@/types';
import styles from './TrackCassetteCard.module.css';

interface TrackCassetteCardProps {
  track: Track;
  album: Album;
  artistName: string;
  startTime: number;
  onPlay: (track: Track, startTime: number) => void;
  onStop: () => void;
  isPlaying?: boolean;
}

export const TrackCassetteCard: React.FC<TrackCassetteCardProps> = ({
  track,
  album,
  artistName,
  startTime,
  onPlay,
  onStop,
  isPlaying = false,
}) => {
  const handleClick = () => {
    if (isPlaying) {
      onStop();
    } else {
      onPlay(track, startTime);
    }
  };

  return (
    <div className={styles.cassetteCard}>
      <div className={styles.albumJacket}>
        <Image
          src={album.jacketUrl}
          alt={`${album.name}のジャケット`}
          className={styles.jacketImage}
          width={200}
          height={200}
          priority={false}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-album.svg';
          }}
        />
      </div>
      <div className={styles.trackInfo}>
        <h4 className={styles.trackTitle}>{track.title}</h4>
        <p className={styles.albumName}>{album.name}</p>
        <p className={styles.artistName}>{artistName}</p>
      </div>
      <div className={styles.playButton}>
        <Button variant="primary" size="small" onClick={handleClick}>
          {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
        </Button>
      </div>
    </div>
  );
};
