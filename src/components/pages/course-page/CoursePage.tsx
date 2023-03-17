// import { useQuery } from 'react-query';
// import { useDispatch } from 'react-redux';
// import PageLayout from '@/components/common/layout/page-layout';
// import { AlertColor } from '@/components/common/ui/alert';
// import Breadcrumbs from '@/components/common/ui/breadcrumbs';
// import Loader from '@/components/common/ui/loader';
// import PersonalTeacherCard from '@/components/pages/personal-teacher-page/personal-teacher-card';
// import PersonalTeacherTabs from '@/components/pages/personal-teacher-page/personal-teacher-tabs';
// import { TeacherAPI } from '@/lib/api/teacher/TeacherAPI';
// import { showAlert } from '@/redux/reducers/alert.reducer';

import { useRouter } from 'next/router';

import styles from './CoursePage.module.scss';

const CoursePage = () => {
  const router = useRouter();
  const courseId = router.query.courseId;
  //   const { isLoading, isError, data } = useQuery(
  //     ['teacher', teacherId],
  //     () => TeacherAPI.get(teacherId),
  //     {
  //       refetchOnWindowFocus: false,
  //       retry: false,
  //     },
  //   );
  //   const { data: subjecktsData } = useQuery(
  //     ['teacherSubjects', teacherId],
  //     () => TeacherAPI.getTeacherSubjects(teacherId),
  //     {
  //       refetchOnWindowFocus: false,
  //       retry: false,
  //     },
  //   );
  //   const dispatch = useDispatch();
  //   if (isError) {
  //     dispatch(
  //       showAlert({
  //         color: AlertColor.ERROR,
  //         title: 'Куди ти лізеш, цієї людини не існує',
  //       }),
  //     );
  //     setTimeout(() => {
  //       void router.push('/teachers');
  //     }, 3000);
  //   }
  return (
    <div>
      <h1>{courseId}</h1>
      {/* <PageLayout description={'Сторінка викладача'}>
        <div className={styles['personal-teacher-page']}>
          {isLoading ? (
            <div className={styles['personal-teacher-page-content']}>
              <div className={styles['loader']}>
                <Loader></Loader>
              </div>
            </div>
          ) : (
            !isError && (
              <div className={styles['personal-teacher-page-content']}>
                <Breadcrumbs
                  className={styles['breadcrumbs']}
                  items={[
                    {
                      label: 'Головна',
                      href: '/',
                    },
                    { label: 'Викладачі', href: '/teachers' },
                    {
                      label: `${
                        data.lastName +
                        ' ' +
                        data.firstName +
                        ' ' +
                        data.middleName
                      }`,
                      href: `/teachers/${teacherId}`,
                    },
                  ]}
                />
                <div className={styles['card-wrapper']}>
                  <PersonalTeacherCard {...data} />
                </div>
                <div className={styles['tabs']}>
                  <PersonalTeacherTabs id={data.id} {...subjecktsData} />
                </div>
              </div>
            )
          )}
        </div>
      </PageLayout> */}
    </div>
  );
};
export default CoursePage;
