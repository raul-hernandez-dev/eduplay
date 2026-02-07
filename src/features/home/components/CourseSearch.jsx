import { FiSearch } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const CourseSearch = ({ value, onChange }) => {
  const { t } = useTranslation('home');

  return (
    <div className="relative w-full max-w-md">
      {/* Icono */}
      <FiSearch
        className="
          absolute left-3 top-1/2 -translate-y-1/2
          text-app-fg/60
          pointer-events-none
        "
        size={18}
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('search_placeholder')}
        className="
          w-full
          pl-10 pr-4 py-3
          rounded-xl
          bg-surface
          text-app-fg
          border border-surface-hover
          shadow-sm
          transition
          focus:outline-none
          focus:ring-2 focus:ring-primary
          focus:border-primary
        "
      />
    </div>
  );
};

export default CourseSearch;
