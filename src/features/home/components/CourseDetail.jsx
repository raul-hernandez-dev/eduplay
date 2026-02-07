import { useState } from 'react';
import { useCourseDetail } from '../hooks/useCourseDetail';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/ui/Button';

import {
  FiX,
  FiPlayCircle,
  FiLock,
  FiClock,
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle
} from 'react-icons/fi';

const CourseDetail = ({ courseId, onClose }) => {
  const { course, content } = useCourseDetail(courseId);
  const { language } = useLanguage();
  const { t } = useTranslation('home');

  const [activeVideo, setActiveVideo] = useState(null);

  const currentVideo = activeVideo ?? course.previewVideoUrl;

  const [openSections, setOpenSections] = useState({});

  if (!course || !content) return null;

  const toggleSection = (id) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-xl">

        {/* =========================
            VIDEO
        ========================== */}
        <div className="relative">
          <iframe
            key={currentVideo} 
            src={currentVideo}
            title={content.title}
            className="w-full h-64"
            allowFullScreen
          />

          {/* Close */}
          <button
            onClick={onClose}
            aria-label={t('close')}
            className="absolute top-3 right-3 bg-black/70 text-white rounded-full p-2"
          >
            <FiX size={18} />
          </button>

          {/* Back to general preview */}
          {activeVideo && (
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full hover:bg-black/90"
            >
              {t('general_preview')}
            </button>
          )}
        </div>


        <div className="p-6 space-y-8">

          {/* HEADER */}
          <header>
            <h2 className="text-3xl font-bold">
              {content.title}
            </h2>
            <p className="opacity-80">
              {content.subtitle}
            </p>
          </header>

          {/* META */}
          <div className="flex flex-wrap gap-4 text-sm opacity-80">
            <span>⭐ {course.rating}</span>
            <span>{course.students} {t('students')}</span>
            <span>{course.duration} h</span>
          </div>

          {/* GOALS */}
          <section>
            <h3 className="font-semibold mb-3">
              {t('what_you_learn')}
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm">
              {content.learningGoals.map(goal => (
                <li key={goal} className="flex gap-2">
                  <FiCheckCircle className="text-primary mt-0.5" />
                  {goal}
                </li>
              ))}
            </ul>
          </section>

          {/* REQUIREMENTS */}
          <section>
            <h3 className="font-semibold mb-2">
              {t('requirements')}
            </h3>
            <ul className="list-disc pl-5 text-sm opacity-80">
              {content.requirements.map(req => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </section>

          {/* =========================
              CURRICULUM
          ========================== */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">
              {t('curriculum')}
            </h3>

            {course.curriculum.map((section, index) => {
              const isOpen = openSections[section.id];

              return (
                <div
                  key={section.id}
                  className="border border-surface-hover rounded-lg overflow-hidden"
                >
                  {/* MODULE HEADER */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex justify-between items-center px-4 py-3 bg-surface-hover font-medium"
                  >
                    <span>
                      {t('module')} {index + 1}:{' '}
                      {section.translations[language].title}
                    </span>
                    {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </button>

                  {/* LESSONS */}
                  {isOpen && (
                    <ul className="divide-y divide-surface-hover">
                      {section.lessons.map(lesson => {
                        const isPreview = lesson.isPreview;

                        return (
                          <li
                            key={lesson.id}
                            className="flex justify-between items-center px-4 py-3 text-sm"
                          >
                            <div className="flex items-center gap-3">
                              {isPreview ? (
                                <FiPlayCircle className="text-primary" />
                              ) : (
                                <FiLock className="opacity-50" />
                              )}

                              <span className={!isPreview ? 'opacity-60' : ''}>
                                {lesson.translations[language].title}
                              </span>

                              {isPreview && (
                                <span className="text-xs text-primary">
                                  {t('preview')}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1 opacity-60">
                                <FiClock />
                                {lesson.duration}
                              </span>

                              {isPreview && lesson.previewVideoUrl && (
                                <button
                                  onClick={() =>
                                    setActiveVideo(lesson.previewVideoUrl)
                                  }
                                  className="text-xs text-primary hover:underline"
                                >
                                  {t('lesson_preview')}
                                </button>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </section>

          {/* FOOTER */}
          <footer className="flex justify-between items-center pt-6 border-t border-surface-hover">
            <span className="text-2xl font-bold text-primary">
              ${course.price.amount} {course.price.currency}
            </span>
            <Button>
              {t('enroll_now')}
            </Button>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
