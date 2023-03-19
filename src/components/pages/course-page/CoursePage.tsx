import { useEffect, useRef, useState } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Hls from 'hls.js';
import { useRouter } from 'next/router';

import ListLessons from '@/components/common/ui/ListLessons';
import { useAppDispatch, useAppSelector } from '@/hooks/useSelect';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = videoRef.current;
  let sortedLessons;
  if (lessons) {
    sortedLessons = lessons.lessons.slice().sort((a, b) => a.order - b.order);
  }
  const poster = sortedLessons?.[currentLesson]?.previewImageLink
    ? `${sortedLessons?.[currentLesson]?.previewImageLink}/lesson-${sortedLessons?.[currentLesson]?.order}.webp`
    : './not-found.png';
  useEffect(() => {
    const handleKeyDown = (event: {
      key: string;
      preventDefault: () => void;
    }) => {
      if (event.key === '1' && videoRef.current?.playbackRate) {
        event.preventDefault();
        if (videoRef.current.playbackRate < 2) {
          videoRef.current.playbackRate += 0.1;
        }
      } else if (event.key === '0' && videoRef.current?.playbackRate) {
        event.preventDefault();
        if (videoRef.current.playbackRate > 0.5) {
          videoRef.current.playbackRate -= 0.1;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (video && sortedLessons?.[currentLesson].previewImageLink) {
    const hls = new Hls();
    if (!sortedLessons?.[currentLesson].link) {
      router.push('/404');
    }
    hls.loadSource(sortedLessons?.[currentLesson].link || '');
    hls.attachMedia(video);
  }
  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <p>{lessons?.title}</p>
      </div>
      <div className={styles.videoList}>
        <div className={styles.video}>
          <h3 className={styles.subTitle}>
            Lesson: {sortedLessons?.[currentLesson]?.title}
          </h3>
          <video
            className={styles.myVideo}
            controls={true}
            poster={poster}
            ref={videoRef}
          ></video>
          <div className={styles.courseInfo}>
            <div>
              <h6>*To speed up the video, press 1</h6>
              <h6>*To slow down the video, press 0</h6>
            </div>
            <div>
              <h6 className={styles.date}>
                <CalendarTodayIcon />
                Launch date:
                {lessons?.launchDate
                  ? new Date(lessons?.launchDate).toLocaleDateString('en-GB')
                  : 'No date available'}{' '}
              </h6>
            </div>
          </div>
        </div>
        <div className={styles.videosList}>
          <h4 className={styles.content}>Lessons:</h4>
          {sortedLessons?.map((lesson, index) => (
            <ListLessons
              duration={lesson.duration}
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
