import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { useRouter } from 'next/router';

import ListLessons from '@/components/common/ui/ListLessons';
import { useAppDispatch, useAppSelector } from '@/hooks/useSelector';
import { fetchLessons } from '@/redux/lessons/asyncActions';
import { selectDetails } from '@/redux/lessons/selectors';

import styles from './CoursePage.module.scss';

const CoursePage = () => {
  const router = useRouter();
  const [currentLesson, setCurrentLesson] = useState(0);
  const courseId = router.query.courseId as string;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      fetchLessons({
        id: courseId,
      }),
    );
  }, [courseId, dispatch]);
  const lessons = useAppSelector(selectDetails);
  let sortedLessons;
  if (lessons) {
    sortedLessons = lessons.lessons.slice().sort((a, b) => a.order - b.order);
  }
  const poster = sortedLessons?.[currentLesson].previewImageLink
    ? `${sortedLessons?.[currentLesson].previewImageLink}/lesson-${sortedLessons?.[currentLesson].order}.webp`
    : './not-found.png';
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = videoRef.current;
  if (video && sortedLessons?.[currentLesson].previewImageLink) {
    const hls = new Hls();
    if (!sortedLessons?.[currentLesson].link) {
      router.push('/404');
      return;
    }
    hls.loadSource(sortedLessons?.[currentLesson].link || '');
    hls.attachMedia(video);
  }
  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <p>{lessons?.title}</p>
      </div>
      <div className={styles['video-and-video-list']}>
        <div className={styles.video}>
          <p>{sortedLessons?.[currentLesson].title}</p>
          <video
            style={{ width: '1066.66px', height: '600px' }}
            controls={true}
            poster={poster}
            ref={videoRef}
          ></video>
        </div>
        <div className={styles.videosList}>
          {sortedLessons?.map((lesson, index) => (
            <ListLessons
              duration={lesson.duration}
              currentLesson={currentLesson}
              setCurrentLesson={setCurrentLesson}
              order={lesson.order}
              key={index}
              title={lesson.title}
              disabled={lesson.status !== 'unlocked'}
              previewImageLink={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
