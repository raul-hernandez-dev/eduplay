// src/pages/public/LandingPage/LandingPage.jsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Award, 
  Briefcase, 
  Clock, 
  Users,
  CheckCircle,
  Globe,
  TrendingUp,
  Shield,
  ArrowRight,
  Star,
  Calendar
} from 'lucide-react';
import Button from '../../../components/ui/Button/Button';
import Card, { CardBody } from '../../../components/ui/Card/Card';

const LandingPage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: t('landing.features.certified'),
      description: t('landing.features.certifiedDesc'),
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: t('landing.features.career'),
      description: t('landing.features.careerDesc'),
      color: 'from-purple-500 to-pink-400'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('landing.features.flexible'),
      description: t('landing.features.flexibleDesc'),
      color: 'from-green-500 to-emerald-400'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('landing.features.experts'),
      description: t('landing.features.expertsDesc'),
      color: 'from-orange-500 to-yellow-400'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('landing.features.global'),
      description: t('landing.features.globalDesc'),
      color: 'from-red-500 to-rose-400'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t('landing.features.growth'),
      description: t('landing.features.growthDesc'),
      color: 'from-indigo-500 to-violet-400'
    }
  ];

  const categories = [
    { 
      name: 'programming', 
      courses: 45,
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'business', 
      courses: 32,
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'languages', 
      courses: 28,
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      name: 'design', 
      courses: 24,
      gradient: 'from-orange-500 to-yellow-500'
    },
    { 
      name: 'data', 
      courses: 36,
      gradient: 'from-red-500 to-rose-500'
    },
    { 
      name: 'marketing', 
      courses: 29,
      gradient: 'from-indigo-500 to-violet-500'
    }
  ];

  const testimonials = [
    {
      name: 'María González',
      role: 'Desarrolladora Senior',
      company: 'TechCorp',
      content: 'Los cursos de programación me ayudaron a conseguir mi actual posición. Certificaciones reconocidas internacionalmente.',
      avatar: 'MG',
      rating: 5
    },
    {
      name: 'Carlos Ruiz',
      role: 'Project Manager',
      company: 'Global Solutions',
      content: 'La especialización en gestión de proyectos transformó mi carrera. Material actualizado y profesores expertos.',
      avatar: 'CR',
      rating: 5
    },
    {
      name: 'Ana Torres',
      role: 'Data Analyst',
      company: 'DataInsights',
      content: 'Completé el programa de análisis de datos y en 3 meses ya tenía ofertas laborales. Inversión que vale cada centavo.',
      avatar: 'AT',
      rating: 5
    }
  ];

  const certificationPartners = [
    { name: 'Microsoft', logo: 'MS' },
    { name: 'Google', logo: 'GO' },
    { name: 'AWS', logo: 'AWS' },
    { name: 'Cisco', logo: 'CS' },
    { name: 'IBM', logo: 'IBM' },
    { name: 'Oracle', logo: 'OR' }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-6">
                <Shield className="w-4 h-4 mr-2" />
                {t('landing.hero.badge')}
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="block text-gray-900 dark:text-white">
                  {t('landing.hero.title1')}
                </span>
                <span className="block bg-gradient-to-r from-edu-blue to-edu-purple bg-clip-text text-transparent">
                  {t('landing.hero.title2')}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t('landing.hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="large" className="group">
                    {t('landing.hero.ctaPrimary')}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button variant="outline" size="large">
                    {t('landing.hero.ctaSecondary')}
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">150+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('landing.hero.courses')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">98%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('landing.hero.satisfaction')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('landing.hero.instructors')}</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <Card className="relative overflow-hidden border-0 shadow-2xl">
                <CardBody className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Curso Destacado
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Desarrollo Full Stack con Certificación
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold">4.9</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>180 horas</span>
                      <span className="mx-2">•</span>
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Certificado incluido</span>
                    </div>
                    
                    <div className="pt-4 border-t dark:border-gray-700">
                      <ul className="space-y-3">
                        {[
                          'HTML5, CSS3 y JavaScript avanzado',
                          'React y Node.js profesional',
                          'Bases de datos SQL y NoSQL',
                          'Despliegue en la nube (AWS/Azure)',
                          'Proyecto final con revisión experta'
                        ].map((item, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-6 flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">$299</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Pago único</div>
                        </div>
                        <Link to="/register">
                          <Button>
                            {t('landing.hero.viewCourse')}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wider">
            {t('landing.partners.title')}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {certificationPartners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                {partner.logo}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('landing.categories.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('landing.categories.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hoverable className="h-full">
                <CardBody className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                        {t(`landing.categories.${category.name}`)}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {category.courses} {t('landing.categories.courses')}
                      </p>
                    </div>
                    <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${category.gradient} opacity-10`} />
                  </div>
                  
                  <div className="mt-6">
                    <Link
                      to={`/courses/${category.name}`}
                      className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500"
                    >
                      {t('landing.categories.explore')}
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('landing.features.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('landing.features.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hoverable className="h-full">
                <CardBody className="p-8">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('landing.testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('landing.testimonials.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hoverable>
                <CardBody className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-edu-blue to-edu-purple flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-white overflow-hidden">
            <CardBody className="p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    {t('landing.cta.title')}
                  </h2>
                  <p className="text-gray-300 mb-6">
                    {t('landing.cta.subtitle')}
                  </p>
                  <ul className="space-y-3">
                    {[1, 2, 3].map((item) => (
                      <li key={item} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        {t(`landing.cta.benefit${item}`)}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center flex-col md:m-auto">
                  <Link to="/register">
                    <Button size="large" className="text-gray-900 hover:bg-gray-100 mb-4">
                      {t('landing.cta.button')}
                    </Button>
                  </Link>
                  <p className="text-sm text-gray-300">
                    {t('landing.cta.noCreditCard')}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;