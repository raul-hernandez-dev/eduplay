import { useMemo, useState } from 'react';
import { Courses } from '../services/courses.mock';
import { useLanguage } from '../../../contexts/LanguageContext';

export const useCourses = () => {
  const { language } = useLanguage();
  const [search, setSearch] = useState('');

  const filteredCourses = useMemo(() => {
    if (!search.trim()) return Courses;

    const term = search.toLowerCase().trim();

    return Courses.filter(course => {
      const translation = course.translations[language];
      if (!translation) return false;

      const titleMatch =
        translation.title.toLowerCase().includes(term);

      const categoryMatch =
        translation.category.toLowerCase().includes(term);

      const tagsMatch =
        course.tags?.some(tag =>
          tag.translations?.[language]
            ?.toLowerCase()
            .includes(term)
        );

      return titleMatch || categoryMatch || tagsMatch;
    });
  }, [search, language]);

  return {
    courses: filteredCourses,
    search,
    setSearch,
    total: filteredCourses.length
  };
};
