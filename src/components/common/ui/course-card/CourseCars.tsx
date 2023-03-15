import React, { useState } from "react";
interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  lessons: string[];
  skills: string[];
  rating: number;
  video: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  image,
  lessons,
  skills,
  rating,
  video,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsPlaying(true);
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
  };

  return (
    <div
      className="course-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={image} alt={title} />
      {isPlaying && <video src={video} autoPlay loop muted />}
      <div className="course-info">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>Number of Lessons: {lessons}</p>
        <p>Skills Learned: {skills}</p>
        <p>Rating: {rating}/5</p>
      </div>
    </div>
  );
};

export default CourseCard;
