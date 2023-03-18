import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';

import CourseCard from '@/components/common/ui/CourseCard/CourseCard';
import { useAppDispatch, useAppSelector } from '@/hooks/useSelector';
import { fetchCourses } from '@/redux/courses/asyncActions';
import { selectDetails } from '@/redux/courses/selectors';

import styles from './MainPage.module.scss';

const MainPage = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);
  const courses = useAppSelector(selectDetails)
    .slice()
    .sort(
      (a, b) =>
        new Date(a.launchDate).valueOf() - new Date(b.launchDate).valueOf(),
    );
  const coursesPerPage = 10;
  const pagesVisited = pageNumber * coursesPerPage;
  const pageCount = Math.ceil(courses?.length / coursesPerPage);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPageNumber(value - 1);
  };
  if (!courses) {
    return <div>Loading</div>;
  }

  const displayCourses = courses
    .slice(pagesVisited, pagesVisited + coursesPerPage)
    .map(course => (
      <CourseCard
        id={course.id}
        key={course.id}
        title={course.title}
        description={course.description}
        image={course.previewImageLink}
        lessonsCount={course.lessonsCount}
        slug={course.meta.slug}
        skills={course.meta.skills}
        rating={course.rating}
        video={course.meta.courseVideoPreview?.link}
        tags={course.tags}
        containsLockedLessons={false}
        videoPreviewLink={course.meta.courseVideoPreview?.link}
        videoPreviewDuration={course.meta.courseVideoPreview?.duration}
        videoPreviewImageLink={course.meta.courseVideoPreview?.previewImageLink}
      />
    ));
  return (
    <div className={styles.mainContainer}>
      <div className={styles.coursesContainer}>{displayCourses}</div>
      <div className={styles.paginate}>
        <Pagination
          count={pageCount}
          page={pageNumber + 1}
          onChange={handleChangePage}
          color="primary"
        />
      </div>
    </div>
  );
};

export default MainPage;
