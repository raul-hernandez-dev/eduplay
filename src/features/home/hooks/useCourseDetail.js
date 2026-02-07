import { useMemo } from 'react';
import { CourseDetails } from '../services/courses.detail.mock';
import { useLanguage } from '../../../contexts/LanguageContext';


export const useCourseDetail = (courseIdOrSlug) => {
  const { language } = useLanguage();

  const course = useMemo(() => {
    if (!courseIdOrSlug) return null;

    return CourseDetails.find(
      c => c.id === courseIdOrSlug || c.slug === courseIdOrSlug
    );
  }, [courseIdOrSlug]);

  const content = useMemo(() => {
    if (!course) return null;
    return course.translations?.[language] || null;
  }, [course, language]);

  return {
    course,   
    content,  
    language
  };
};
