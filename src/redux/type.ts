export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type Course = {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  lessonsCount: number;
  previewImageLink: string;
  rating: number;
  meta: {
    fullCourseProductId?: string;
    fullCourseProductFamily?: string;
    slug: string;
    skills?: string[];
    courseVideoPreview: {
      link: string;
      duration: number;
      previewImageLink: string;
    };
  };
  lessons: [
    {
      id: string;
      title: string;
      duration: number;
      order: number;
      type: string;
      status?: string;
      link: string;
      previewImageLink: string;
      meta?: string;
    },
  ];
  containsLockedLessons: boolean;
};
