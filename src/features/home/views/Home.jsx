import CourseGrid from '../components/CourseGrid';
import { useCourses } from '../hooks/useCourses';

const Home = () => {
  const { courses, search, setSearch } = useCourses();

  return (
    <CourseGrid
      courses={courses}
      search={search}
      onSearch={setSearch}
    />
  );
};

export default Home;
