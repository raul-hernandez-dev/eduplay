import CourseCard from './CourseCard';
import CourseSearch from './CourseSearch';
import { useTranslation } from 'react-i18next';

const CourseGrid = ({ courses, search, onSearch }) => {
  const { t } = useTranslation('home');

  return (
    <section className="space-y-8">
      {/* Search container */}
      <div className="flex justify-center">
        <CourseSearch
          value={search}
          onChange={onSearch}
        />
      </div>

      {/* Grid */}
      {courses.length === 0 ? (
        <p className="text-center opacity-70">
          {t('no_results')}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CourseGrid;
