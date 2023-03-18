import React from 'react';
import { useRef, useState } from 'react';
import { Button } from '@mui/material';
import Hls from 'hls.js';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './CourseCard.module.scss';
interface CourseCardProps {
  id: string;
  tags: string[];
  title: string;
  description: string;
  image: string;
  launchDate?: string;
  lessonsCount: number;
  containsLockedLessons: boolean;
  skills?: string[];
  rating: number;
  video?: string;
  slug: string;
  videoPreviewLink: string;
  videoPreviewDuration?: number;
  videoPreviewImageLink?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  tags,
  title,
  description,
  image,
  lessonsCount,
  skills,
  rating,
  videoPreviewLink,
  videoPreviewImageLink,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleMouseEnter = () => {
    setIsPlaying(true);
    const video = videoRef.current;
    if (video && videoPreviewImageLink) {
      const hls = new Hls();
      hls.loadSource(videoPreviewLink);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  };
  return (
    <div>
      <div className={styles.courseCard}>
        <img src={`${image}/cover.webp`} className={styles.courseImg}></img>
        <video
          className={styles.courseVideo}
          ref={videoRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          poster={videoPreviewImageLink + '/cover.webp'}
          muted
        />
        <div className={styles.courseInfo}>
          <div className={styles.title}>{title}</div>
          <div>
            {tags.map((tag, index) => (
              <b className={styles.tag} key={index}>
                {tag}
              </b>
            ))}
          </div>
          <div className={styles.description}>{description}</div>
          <div className={styles.lessons}>
            Amount of Lessons: <strong>{lessonsCount}</strong>
          </div>
          {skills && (
            <div className={styles.skills}>
              Skills:
              {skills?.map((skill, index) => (
                <i className={styles.skill} key={index}>
                  {skill}
                </i>
              ))}
            </div>
          )}
        </div>
        <div className={styles.tagRating}>
          <Link href={`/preview-courses/${id}`} className={styles.button}>
            <Button
              variant="contained"
              color="error"
              style={{ width: '200px', marginTop: '20px' }}
            >
              Explore
            </Button>
          </Link>
          <div className={styles.rating}>
            ⭐Rating: <strong>{rating}/5</strong>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
