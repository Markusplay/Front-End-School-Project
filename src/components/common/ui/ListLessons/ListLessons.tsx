import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

import styles from './ListLessons.module.scss';

export interface ListLessonsProps {
  title: string;
  previewImageLink: string;
  setCurrentLesson: React.Dispatch<React.SetStateAction<number>>;
  currentLesson: number;
  disabled: boolean;
  order: number;
  duration: number;
}

const ListLessons: React.FC<ListLessonsProps> = ({
  duration,
  currentLesson,
  setCurrentLesson,
  title = 'video',
  disabled,
  previewImageLink,
  order,
}) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;
  return (
    <div className={styles.list}>
      <div>
        {minutes}:{seconds}
      </div>
      {!disabled && (
        <video
          className={styles.video}
          poster={previewImageLink ? previewImageLink : './not-found.png'}
        ></video>
      )}
      <Button
        className={styles.button}
        disabled={disabled}
        onClick={() => {
          setCurrentLesson(order - 1);
          window.scrollTo(0, 0);
        }}
      >
        <p className={styles.title}>{title}</p>
      </Button>
    </div>
  );
};

export default ListLessons;
