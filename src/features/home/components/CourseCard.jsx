import { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import CourseDetail from './CourseDetail';
import Button from '../../../components/ui/Button';

const CourseCard = ({ course }) => {
  const { language } = useLanguage();
  const { t } = useTranslation('home');
  const [open, setOpen] = useState(false);

  const content = course.translations?.[language];

  if (!content) return null;

  return (
    <>
      <article className="bg-surface hover:bg-surface-hover rounded-xl overflow-hidden shadow transition flex flex-col">
        
        {/* IMAGE */}
        <img
          src={course.image}
          alt={content.title}
          className="w-full h-40 object-cover"
        />

        {/* BODY */}
        <div className="p-4 flex flex-col flex-grow">

          {/* TAGS */}
          <div className="flex flex-wrap gap-1">
            {course.tags.map(tag => (
              <span
                key={tag.key}
                className="text-xs px-2 py-0.5 rounded bg-surface-hover"
              >
                {tag.translations[language]}
              </span>
            ))}
          </div>

          {/* CONTENT */}
          <div className="mt-3 space-y-2">
            <h3 className="text-lg font-semibold line-clamp-2">
              {content.title}
            </h3>

            <p className="text-sm opacity-80 line-clamp-3">
              {content.description}
            </p>

            <div className="text-xs flex flex-wrap gap-2 pt-2">
              <span className="text-primary font-medium">
                {content.category}
              </span>
              <span>• {content.level}</span>
            </div>
          </div>

          {/* META */}
          <div className="flex justify-between items-center text-xs opacity-70 pt-3">
            <span>
              ⭐ {course.rating} · {course.students} {t('students')}
            </span>
            <span>
              {t('duration', { hours: course.duration })}
            </span>
          </div>

          {/* PUSH BUTTON TO BOTTOM */}
          <div className="flex-grow" />

          {/* ACTION */}
          <Button
            onClick={() => setOpen(true)}
            className="mt-4 w-full"
          >
            {t('view_course')}
          </Button>
        </div>
      </article>

      {/* MODAL DETAIL */}
      {open && (
        <CourseDetail
          courseId={course.id}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default CourseCard;
