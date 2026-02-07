export const CourseDetails = [
    {
        "id": "course-001",
        "slug": "react-basico-zero",
        "authors": "Juan Pérez",
        "image": "https://picsum.photos/800/450?react",
        "previewVideoUrl": "https://www.youtube.com/embed/yIr_1CasXkM",
        "duration": 12,
        "students": 320,
        "rating": 4.8,
        "lastUpdated": "2026-02-01",
        "price": { "amount": 190, "currency": "MXN" },
        "tags": ["React", "JavaScript", "Frontend"],
        "translations": {
            "es": {
                "title": "React desde Cero",
                "subtitle": "La guía definitiva para dominar los fundamentos de React.",
                "description": "Aprende los fundamentos de la biblioteca más popular de JavaScript. Componentes, hooks y manejo de estado de forma profesional.",
                "category": "Programación",
                "level": "Básico",
                "requirements": ["HTML y CSS intermedio", "JavaScript básico (ES6+)"],
                "learningGoals": [
                    "Comprender el Virtual DOM y el ciclo de vida",
                    "Crear componentes reutilizables y escalables",
                    "Manejar el estado global y local con Hooks"
                ]
            },
            "en": {
                "title": "React from Scratch",
                "subtitle": "The definitive guide to mastering React fundamentals.",
                "description": "Learn the fundamentals of the most popular JavaScript library. Components, hooks, and state management in a professional way.",
                "category": "Programming",
                "level": "Beginner",
                "requirements": ["Intermediate HTML & CSS", "Basic JavaScript (ES6+)"],
                "learningGoals": [
                    "Understand Virtual DOM and lifecycle",
                    "Create reusable and scalable components",
                    "Manage global and local state with Hooks"
                ]
            }
        },
        "curriculum": [
            {
                "id": "r-sec-1",
                "translations": {
                    "es": { "title": "Módulo 1: Introducción y Entorno" },
                    "en": { "title": "Module 1: Introduction & Environment" }
                },
                "lessons": [
                    {
                        "id": "r-les-1",
                        "duration": "10:20",
                        "isPreview": true,
                        "previewVideoUrl": "https://www.youtube.com/embed/8AheVHDG0zg",
                        "translations": { "es": { "title": "¿Por qué React?" }, "en": { "title": "Why React?" } }
                    },
                    {
                        "id": "r-les-2",
                        "duration": "15:45",
                        "isPreview": false,
                        "translations": { "es": { "title": "Instalación y Vite" }, "en": { "title": "Installation & Vite" } }
                    }
                ]
            },
            {
                "id": "r-sec-2",
                "translations": {
                    "es": { "title": "Módulo 2: JSX y Componentes" },
                    "en": { "title": "Module 2: JSX & Components" }
                },
                "lessons": [
                    {
                        "id": "r-les-3",
                        "duration": "22:10",
                        "isPreview": false,
                        "translations": { "es": { "title": "Props y Composición" }, "en": { "title": "Props & Composition" } }
                    },
                    {
                        "id": "r-les-4",
                        "duration": "18:30",
                        "isPreview": false,
                        "translations": { "es": { "title": "Renderizado Condicional" }, "en": { "title": "Conditional Rendering" } }
                    }
                ]
            },
            {
                "id": "r-sec-3",
                "translations": {
                    "es": { "title": "Módulo 3: Hooks Esenciales" },
                    "en": { "title": "Module 3: Essential Hooks" }
                },
                "lessons": [
                    {
                        "id": "r-les-5",
                        "duration": "25:00",
                        "isPreview": false,
                        "translations": { "es": { "title": "useState en profundidad" }, "en": { "title": "Deep dive into useState" } }
                    },
                    {
                        "id": "r-les-6",
                        "duration": "30:15",
                        "isPreview": false,
                        "translations": { "es": { "title": "useEffect y Sincronización" }, "en": { "title": "useEffect & Synchronization" } }
                    }
                ]
            }
        ]
    },
    {
        "id": "course-002",
        "slug": "mastering-tailwind-4",
        "authors": "Alex Griffith",
        "image": "https://picsum.photos/800/450?tailwind",
        "previewVideoUrl": "https://www.youtube.com/embed/R5EXap3vNDA",
        "duration": 14.5,
        "students": 1250,
        "rating": 4.9,
        "lastUpdated": "2026-01-20",
        "price": { "amount": 1199, "currency": "MXN" },
        "tags": ["CSS", "Frontend", "Tailwind"],
        "translations": {
            "es": {
                "title": "Mastering Tailwind CSS 4.0",
                "subtitle": "Domina el diseño moderno con el motor más rápido de la web.",
                "description": "Desde los fundamentos de la utilidad hasta la creación de sistemas de diseño complejos y animaciones de alto rendimiento.",
                "category": "Diseño Web",
                "level": "Intermedio",
                "requirements": ["Conocimientos básicos de HTML", "Nociones de CSS"],
                "learningGoals": [
                    "Dominar el nuevo motor de compilación de Tailwind 4",
                    "Crear layouts responsivos complejos sin escribir CSS personalizado",
                    "Implementar animaciones avanzadas mediante clases de utilidad"
                ]
            },
            "en": {
                "title": "Mastering Tailwind CSS 4.0",
                "subtitle": "Master modern design with the fastest engine on the web.",
                "description": "From utility fundamentals to building complex design systems and high-performance animations.",
                "category": "Web Design",
                "level": "Intermediate",
                "requirements": ["Basic HTML knowledge", "CSS basics"],
                "learningGoals": [
                    "Master the new Tailwind 4 compilation engine",
                    "Create complex responsive layouts without custom CSS",
                    "Implement advanced animations using utility classes"
                ]
            }
        },
        "curriculum": [
            {
                "id": "t-sec-1",
                "translations": {
                    "es": { "title": "Módulo 1: Tailwind 4 Core" },
                    "en": { "title": "Module 1: Tailwind 4 Core" }
                },
                "lessons": [
                    {
                        "id": "t-les-1",
                        "duration": "08:45",
                        "isPreview": true,
                        "previewVideoUrl": "https://www.youtube.com/embed/BQ3vlKEvs0Q",
                        "translations": { "es": { "title": "Instalación Zero-Config" }, "en": { "title": "Zero-Config Setup" } }
                    },
                    {
                        "id": "t-les-2",
                        "duration": "12:30",
                        "isPreview": false,
                        "translations": { "es": { "title": "El nuevo motor Rust" }, "en": { "title": "The new Rust engine" } }
                    }
                ]
            },
            {
                "id": "t-sec-2",
                "translations": {
                    "es": { "title": "Módulo 2: Layouts y Flexbox" },
                    "en": { "title": "Module 2: Layouts & Flexbox" }
                },
                "lessons": [
                    {
                        "id": "t-les-3",
                        "duration": "18:20",
                        "isPreview": false,
                        "translations": { "es": { "title": "Contenedores Dinámicos" }, "en": { "title": "Dynamic Containers" } }
                    },
                    {
                        "id": "t-les-4",
                        "duration": "15:10",
                        "isPreview": false,
                        "translations": { "es": { "title": "Grid Avanzado" }, "en": { "title": "Advanced Grid" } }
                    }
                ]
            },
            {
                "id": "t-sec-3",
                "translations": {
                    "es": { "title": "Módulo 3: Personalización y Temas" },
                    "en": { "title": "Module 3: Customization & Themes" }
                },
                "lessons": [
                    {
                        "id": "t-les-5",
                        "duration": "20:00",
                        "isPreview": false,
                        "translations": { "es": { "title": "Variables CSS Dinámicas" }, "en": { "title": "Dynamic CSS Variables" } }
                    },
                    {
                        "id": "t-les-6",
                        "duration": "22:45",
                        "isPreview": false,
                        "translations": { "es": { "title": "Modo Oscuro Pro" }, "en": { "title": "Pro Dark Mode" } }
                    }
                ]
            }
        ]
    }
];