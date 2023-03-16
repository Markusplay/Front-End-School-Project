import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";

import CourseCard from "@/components/common/ui/CourseCard/CourseCard";

import styles from "./MainPage.module.scss";

const Main = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [courses, setCourses] = useState([
    {
      id: 0,
      title: "",
      url: "",
      description: "",
      image: "",
      lessons: [],
      skills: [],
      rating: 0,
      video: "",
    },
    {
      id: 1,
      title: "1",
      url: "1",
      description: "1",
      image: "1",
      lessons: ["as", "as"],
      skills: ["as", "as"],
      rating: 1,
      video: "",
    },
    {
      id: 1,
      title: "1",
      url: "1",
      description: "1",
      image: "1",
      lessons: ["as", "as"],
      skills: ["as", "as"],
      rating: 1,
      video: "",
    },
    {
      id: 1,
      title: "1",
      url: "1",
      description: "1",
      image: "1",
      lessons: ["as", "as"],
      skills: ["as", "as"],
      rating: 1,
      video: "",
    },
    {
      id: 1,
      title: "1",
      url: "1",
      description: "1",
      image: "1",
      lessons: ["as", "as"],
      skills: ["as", "as"],
      rating: 1,
      video: "",
    },
    {
      id: 1,
      title: "1",
      url: "1",
      description: "1",
      image: "1",
      lessons: ["as", "as"],
      skills: ["as", "as"],
      rating: 1,
      video: "",
    },
    {
      id: 1,
      title: "1",
      url: "1",
      description: "1",
      image: "1",
      lessons: ["as", "as"],
      skills: ["as", "as"],
      rating: 1,
      video: "",
    },
    {
      id: 1,
      title: "1",
      url: "1",
      description: "1",
      image: "1",
      lessons: ["as", "as"],
      skills: ["as", "as"],
      rating: 1,
      video: "",
    },
    {
      id: 1,
      title: "1",
      url: "1",
      description: "1",
      image: "1",
      lessons: ["as", "as"],
      skills: ["as", "as"],
      rating: 1,
      video: "",
    },
    {
      id: 1,
      title: "1",
      url: "1",
      description: "1",
      image: "1",
      lessons: ["as", "as"],
      skills: ["as", "as"],
      rating: 1,
      video: "",
    },
  ]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("https://api.example.com/courses");
  //     const data = await response.json();
  //     setCourses(data);
  //   };
  //   fetchData();
  // }, []);
  const coursesPerPage = 10;
  const pagesVisited = pageNumber * coursesPerPage;
  const pageCount = Math.ceil(courses?.length / coursesPerPage);
  const displayCourses = courses
    .slice(pagesVisited, pagesVisited + coursesPerPage)
    .map((course) => (
      <CourseCard
        key={course?.id}
        title={course?.title}
        description={course?.description}
        image={course?.image}
        lessons={course?.lessons}
        skills={course?.skills}
        rating={course?.rating}
        video={course?.video}
      />
    ));
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };
  return (
    <div className={styles["main-container"]}>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Explore Our Courses
      </h1>
      <div className={styles["courses-container"]}>{displayCourses}</div>
      {/* <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"previous-page"}
        nextLinkClassName={"next-page"}
        disabledClassName={"pagination-disabled"}
        activeClassName={"pagination-active"}
      /> */}
    </div>
  );
};

export default Main;
