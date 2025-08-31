# Evaluación Frontend - Next.js & React

## 🎯 Objetivo
Evaluar las habilidades técnicas y teóricas de desarrollo frontend utilizando tecnologías modernas.

## 🛠️ Stack Tecnológico Requerido
- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS** (recomendado)
- **shadcn/ui** (recomendado)
- **Despliegue en Vercel**

---

## 📋 Caso Práctico: Dashboard de Películas

### Descripción del Proyecto
Desarrollar una aplicación web que permita explorar películas utilizando la API pública de **The Movie Database (TMDB)**. La aplicación debe incluir funcionalidades de búsqueda, filtrado y visualización detallada de películas.

### 🔗 API a Utilizar
- **TMDB API**: https://developers.themoviedb.org/3
- Necesitarás registrarte para obtener una API key gratuita
- Documentación: https://developers.themoviedb.org/3/getting-started/introduction

### ✅ Funcionalidades Requeridas

#### Páginas Obligatorias
1. **Página Principal** (`/`)
   - Lista de películas populares
   - Barra de búsqueda
   - Filtros por género
   - Paginación

2. **Detalle de Película** (`/movie/[id]`)
   - Información completa de la película
   - Reparto principal
   - Tráiler (si está disponible)
   - Películas similares

3. **Búsqueda** (`/search`)
   - Resultados de búsqueda
   - Filtros avanzados
   - Estado de carga y errores

#### Funcionalidades Técnicas
- **Rutas Dinámicas**: Implementar `/movie/[id]` para mostrar detalles
- **Server Components**: Utilizar cuando sea apropiado
- **Client Components**: Para interactividad (búsqueda, filtros)
- **Loading States**: Implementar skeletons o spinners
- **Error Handling**: Manejo de errores de API y estados 404
- **Responsive Design**: Funcional en móvil y desktop
- **SEO**: Metadatos dinámicos para cada película

### 🎨 Requerimientos de UI/UX
- Diseño limpio y moderno
- Uso de shadcn/ui para componentes (recomendado)
- Implementar modo oscuro/claro (opcional)
- Transiciones suaves entre páginas
- Estados de carga atractivos

### 🚀 Extras (Opcionales)
- Implementar favoritos (usando localStorage)
- Filtros avanzados (año, rating, duración)
- Infinite scroll en lugar de paginación
- Compartir película en redes sociales
- PWA capabilities

### 📦 Entregables
1. **Código fuente** en repositorio GitHub
2. **Aplicación desplegada** en Vercel
3. **README** con:
   - Instrucciones de instalación
   - Descripción de decisiones técnicas
   - Screenshots de la aplicación
   - URL de la aplicación en vivo

### ⏱️ Tiempo Límite
**12 horas máximo** 
- Setup inicial y estructura: 2 horas
- Página principal: 4 horas
- Página de detalle: 3 horas
- Styling y responsive: 2 horas
- Despliegue: 1 hora

### 🎯 Enfoque de Desarrollo Recomendado
1. **Horas 1-2**: Setup del proyecto, configuración básica, estructura de carpetas
2. **Horas 3-6**: Página principal con grid de películas y búsqueda básica
3. **Horas 7-9**: Página de detalle con ruta dinámica
4. **Horas 10-11**: Responsive design y polish básico
5. **Hora 12**: Despliegue en Vercel y documentación

### 🔍 Criterios de Evaluación
- **Funcionalidad core completada** (30%)
- **Implementación correcta de Next.js App Router** (25%)
- **Uso de TypeScript** (20%)
- **Despliegue exitoso** (15%)
- **Código limpio y organizado** (10%)

---

### 📝 Preguntas Técnicas Fundamentales

### React Fundamentals (6 preguntas)

**1. ¿Cuál es la diferencia entre `useState` y `useEffect`? Proporciona un ejemplo de cada uno.**

**2. ¿Qué hace React.memo() y cuándo lo usarías?**

**3. ¿Cómo pasarías datos entre componentes padre e hijo en React?**

**4. ¿Cuál es la diferencia entre un componente controlado y no controlado?**

**5. ¿Qué son las keys en React y por qué son importantes?**

**6. Explica qué hace `useCallback` con un ejemplo práctico.**

### Next.js Específico (6 preguntas)

**7. ¿Cuál es la diferencia principal entre Server Components y Client Components?**

**8. ¿Cómo crear una ruta dinámica `/product/[id]` en App Router?**

**9. ¿Qué son los archivos `loading.tsx` y `error.tsx` en App Router?**

**10. ¿Cómo hacer fetch de datos en un Server Component?**

**11. ¿Cuándo y por qué usarías "use client" en un componente?**

**12. ¿Cómo desplegar una aplicación Next.js en Vercel?**

### TypeScript & Best Practices (6 preguntas)

**13. ¿Cómo definirías tipos para las props de un componente React?**

**14. ¿Cuál es la diferencia entre `interface` y `type` en TypeScript?**

**15. ¿Qué estrategias usarías para hacer tu aplicación responsive con Tailwind?**

**16. ¿Cómo manejarías errores de API en una aplicación Next.js?**

**17. ¿Qué es el prop drilling y cómo lo evitarías?**

**18. Menciona 3 buenas prácticas para optimizar el rendimiento en React.**

---

## 🎯 Rúbrica de Evaluación

### Proyecto Práctico (70%)
| Criterio | Excelente (4) | Bueno (3) | Regular (2) | Deficiente (1) |
|----------|---------------|-----------|-------------|----------------|
| **Arquitectura** | Código bien organizado, patrones claros, separación de responsabilidades | Estructura clara con pequeñas mejoras posibles | Organización básica pero funcional | Código desorganizado, difícil de seguir |
| **Next.js Implementation** | Uso avanzado de App Router, Server/Client Components apropiados | Implementación correcta de funcionalidades principales | Uso básico pero correcto de Next.js | Implementación incorrecta o incomplete |
| **TypeScript** | Tipado estricto, tipos custom, manejo de errores | Tipado correcto en la mayoría de casos | Tipado básico pero funcional | Muchos `any` o errores de tipos |
| **UI/UX** | Diseño pulido, responsive, excelente UX | Diseño atractivo y funcional | Diseño básico pero usable | Diseño pobre o no responsive |

### Preguntas Teóricas (30%)
- **Conceptos Fundamentales**: 40% del peso
- **Patrones y Arquitectura**: 35% del peso  
- **Optimización y Performance**: 25% del peso

---

## 📋 Checklist de Entrega

### Antes de la Evaluación
- [ ] Enviar el caso práctico con al menos 5 días de anticipación
- [ ] Proporcionar API key de TMDB o instrucciones para obtenerla
- [ ] Clarificar tiempo límite y criterios de evaluación

### Durante la Revisión
- [ ] Verificar funcionamiento en producción
- [ ] Revisar código en GitHub
- [ ] Evaluar arquitectura y patrones utilizados
- [ ] Comprobar implementación de TypeScript
- [ ] Analizar decisiones técnicas en el README

### Entrevista Técnica
- [ ] Preguntas sobre decisiones tomadas en el proyecto
- [ ] Conceptos teóricos fundamentales
- [ ] Discusión sobre optimizaciones posibles
- [ ] Escalabilidad y mantenimiento del código

---

## 💡 Consejos para Candidatos

### Para el Proyecto
- Inicia con un MVP funcional y luego agrega features
- Documenta tus decisiones técnicas en el README
- Implementa manejo de errores desde el principio
- Enfócate en la experiencia del usuario
- No olvides hacer commits frecuentes con mensajes claros

### Para las Preguntas
- Proporciona ejemplos de código cuando sea posible
- Explica no solo el "qué" sino también el "por qué"
- Si no sabes algo, sé honesto y explica cómo lo investigarías
- Relaciona conceptos teóricos con ejemplos prácticos

---

## 🔗 Recursos Útiles
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [TMDB API Documentation](https://developers.themoviedb.org/3)

---

**Tiempo estimado total de evaluación: 12 horas**
- Proyecto práctico: 12 horas máximo
=======
# Movies Dashboard 🎬

Una aplicación web moderna para explorar películas utilizando The Movie Database (TMDB) API, construida con Next.js 15, TypeScript, Tailwind CSS y shadcn/ui.

## ✨ Características

- **Explorar Películas**: Navega por películas populares, mejor valoradas y próximos estrenos
- **Búsqueda Avanzada**: Busca películas por título con resultados en tiempo real
- **Filtros por Género**: Filtra películas por categorías específicas
- **Detalles Completos**: Información detallada de cada película incluyendo reparto, tráiler y películas similares
- **Diseño Responsivo**: Optimizado para dispositivos móviles y desktop
- **Modo Oscuro/Claro**: Soporte completo para temas
- **SEO Optimizado**: Metadatos dinámicos para cada película

## 🚀 Tecnologías

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Estilos**: Tailwind CSS v4, shadcn/ui
- **API**: The Movie Database (TMDB) API
- **Iconos**: Lucide React
- **Despliegue**: Vercel Ready

## 📋 Requisitos Previos

- Node.js 18.17 o superior
- npm, yarn o pnpm
- Cuenta en [TMDB](https://www.themoviedb.org/) para obtener API key

## 🛠️ Configuración

### 1. Clonar el repositorio

\`\`\`bash
git clone <tu-repositorio>
cd movies-dashboard
\`\`\`

### 2. Instalar dependencias

\`\`\`bash
npm install
# o
yarn install
# o
pnpm install
\`\`\`

### 3. Configurar variables de entorno

1. Crea un archivo \`.env.local\` en la raíz del proyecto
2. Obtén tu API key de TMDB:
   - Ve a [TMDB](https://www.themoviedb.org/)
   - Crea una cuenta o inicia sesión
   - Ve a tu perfil > Configuración > API
   - Solicita una API key (es gratuita)
3. Agrega tu API key al archivo \`.env.local\`:

\`\`\`env
NEXT_PUBLIC_TMDB_API_KEY=tu_api_key_aqui
\`\`\`

### 4. Ejecutar en desarrollo

\`\`\`bash
npm run dev
# o
yarn dev
# o
pnpm dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

\`\`\`
movies-dashboard/
├── app/                          # App Router de Next.js 15
│   ├── globals.css              # Estilos globales
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página de inicio
│   ├── movie/
│   │   └── [id]/
│   │       ├── page.tsx         # Página de detalle de película
│   │       └── not-found.tsx    # Página 404 personalizada
│   └── search/
│       └── page.tsx             # Página de búsqueda
├── components/                   # Componentes reutilizables
│   ├── ui/                      # Componentes de shadcn/ui
│   ├── movie-card.tsx           # Tarjeta de película
│   ├── movies-grid.tsx          # Grid de películas
│   ├── search-bar.tsx           # Barra de búsqueda
│   ├── navbar.tsx               # Navegación
│   ├── theme-toggle.tsx         # Selector de tema
│   └── loading-skeletons.tsx    # Estados de carga
├── lib/                         # Utilidades y configuración
│   ├── types.ts                 # Tipos TypeScript
│   ├── tmdb.ts                  # API de TMDB
│   └── utils.ts                 # Utilidades generales
└── public/                      # Archivos estáticos
    └── placeholder-movie.svg    # Imagen placeholder
\`\`\`

## 🎯 Páginas Principales

### Página Principal (\`/\`)
- Lista de películas populares
- Filtros por género
- Navegación paginada
- Búsqueda rápida

### Detalle de Película (\`/movie/[id]\`)
- Información completa de la película
- Reparto principal
- Tráiler embebido (YouTube)
- Películas similares
- Metadatos SEO dinámicos

### Búsqueda (\`/search\`)
- Resultados de búsqueda en tiempo real
- Filtros avanzados
- Paginación de resultados
- Estados de error y carga

## 🔧 Comandos Disponibles

\`\`\`bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción

# Código
npm run lint         # Ejecuta ESLint
\`\`\`

## 🚀 Despliegue en Vercel

1. Haz push de tu código a GitHub
2. Conecta tu repositorio con Vercel
3. Agrega la variable de entorno \`NEXT_PUBLIC_TMDB_API_KEY\` en la configuración de Vercel
4. ¡Despliega!

## 🌟 Características Técnicas

- **Server Components**: Para mejor rendimiento y SEO
- **Client Components**: Para interactividad del usuario
- **Suspense Boundaries**: Para estados de carga elegantes
- **Error Boundaries**: Manejo robusto de errores
- **Image Optimization**: Imágenes optimizadas de Next.js
- **TypeScript**: Tipado estricto para mejor desarrollo
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Componentes accesibles con shadcn/ui

## 🤝 Contribuir

1. Haz fork del proyecto
2. Crea una rama para tu feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push a la rama (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ve el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Reconocimientos

- [The Movie Database (TMDB)](https://www.themoviedb.org/) por la increíble API
- [Next.js](https://nextjs.org/) por el framework
- [shadcn/ui](https://ui.shadcn.com/) por los componentes hermosos
- [Vercel](https://vercel.com/) por el hosting gratuito
