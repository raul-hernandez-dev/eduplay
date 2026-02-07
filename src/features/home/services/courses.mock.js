export const Courses = [
    {
        id: "course-001",
        slug: "react-basico-zero",
        authors: "Juan Pérez",
        image: "https://picsum.photos/400/300?react",
        duration: 12,
        students: 320,
        rating: 4.8,
        price: {
            amount: 190,
            currency: "MXN"
        },
        lastUpdated: "2026-02-01",
        tags: [
            {
                key: "react",
                translations: {
                    es: "React",
                    en: "React"
                }
            },
            {
                key: "frontend",
                translations: {
                    es: "Frontend",
                    en: "Frontend"
                }
            },
            {
                key: "javascript",
                translations: {
                    es: "JavaScript",
                    en: "JavaScript"
                }
            }
        ],
        translations: {
            es: {
                title: "React desde Cero",
                description: "Aprende los fundamentos de la biblioteca más popular de JavaScript. Componentes, hooks y manejo de estado.",
                category: "Programación",
                level: "Básico"
            },
            en: {
                title: "React from Scratch",
                description: "Learn the fundamentals of the most popular JavaScript library. Components, hooks, and state management.",
                category: "Programming",
                level: "Beginner"
            }
        }
    },
    {
        id: "course-002",
        slug: "mastering-tailwind-4",
        authors: "Ana López",
        image: "https://picsum.photos/400/300?tailwind",
        duration: 8.5,
        students: 1250,
        rating: 4.9,
        price: {
            amount: 1199,
            currency: "MXN"
        },
        lastUpdated: "2026-01-20",
        tags: [
            {
                key: "css",
                translations: {
                    es: "CSS",
                    en: "CSS"
                }
            },
            {
                key: "tailwind",
                translations: {
                    es: "Tailwind",
                    en: "Tailwind"
                }
            },
            {
                key: "design",
                translations: {
                    es: "Design ",
                    en: "Diseño"
                }
            }
        ],
        translations: {
            es: {
                title: "Mastering Tailwind CSS 4.0",
                description: "Lleva tus habilidades de diseño al siguiente nivel con las nuevas funciones de Tailwind 4.0 y diseño responsivo.",
                category: "Diseño Web",
                level: "Intermedio"
            },
            en: {
                title: "Mastering Tailwind CSS 4.0",
                description: "Take your design skills to the next level with the new features of Tailwind 4.0 and responsive design.",
                category: "Web Design",
                level: "Intermediate"
            }
        }
    }
];
