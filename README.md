# 🛍️ Mini-Market - Prueba de Desarrollo Vibes

## 🚀 Inicio Rápido

### **Backend (API) - Puerto 3001**
```bash
cd api
npm install
npm run dev
```

### **Frontend (Web) - Puerto 3000**  
```bash
cd web
npm install
npm run dev
```

## ✅ Funcionalidades Implementadas

### **Backend (Express + TypeScript)**
- ✅ API REST con endpoints de productos
- ✅ Filtros: búsqueda, ordenamiento, disponibilidad
- ✅ Paginación de resultados
- ✅ Manejo de errores y CORS

### **Frontend (Next.js + TypeScript)**
- ✅ Página de listado de productos (`/products`)
- ✅ Página de detalle de producto (`/products/[id]`)
- ✅ Interfaz responsive con Tailwind CSS
- ✅ Filtros en tiempo real

### **Características Técnicas**
- ✅ Algoritmo `getTopCheapestAvailable`
- ✅ Diseño mobile-first
- ✅ Mock data automático (fallback)
- ✅ Typescript en todo el proyecto

## 🛠️ Decisiones de Diseño

### **Arquitectura**
- **Monorepo** con carpetas `/api`, `/web` y `/shared`
- **Tipos compartidos** para consistencia entre frontend y backend
- **Componentes modulares** y reutilizables

### **Experiencia de Usuario**
- **Loading states** durante las peticiones
- **Error boundaries** para mejor manejo de errores
- **Responsive design** que funciona en móviles y desktop

### **Manejo de Datos**
- **Fallback automático** a datos mock cuando la API no está disponible
- **Paginación client-side** para mejor performance
- **Filtros combinables** para búsquedas avanzadas

## 📦 Estructura del Proyecto

```
vibes-mini-market/
├── api/                    # Backend Express + TypeScript
│   ├── src/
│   │   ├── index.ts       # Servidor principal
│   │   ├── products.router.ts # Rutas de productos
│   │   └── data/products.json # Datos de ejemplo
│   └── package.json
├── web/                   # Frontend Next.js + TypeScript
│   ├── src/
│   │   ├── app/
│   │   │   ├── products/
│   │   │   └── [id]/
│   │   ├── components/    # Componentes React
│   │   └── lib/api.ts    # Cliente API
│   └── package.json
└── shared/               # Tipos compartidos
    └── types.ts
```

## 🎨 Interfaz de Usuario

### **Listado de Productos**
- **Grid responsive** con cards de productos
- **Filtros visibles** en la parte superior
- **Paginación** en la parte inferior
- **Badges** de disponibilidad (Verde/Rojo)

### **Detalle de Producto**
- **Imagen grande** del producto
- **Información completa**: precio, categoría, disponibilidad
- **Diseño limpio** y enfocado en el contenido

## 🔧 Configuración

### **Variables de Entorno**
```env
# web/.env.local
NEXT_PUBLIC_API_BASE=http://localhost:3001
```

### **Dependencias Principales**
- **Backend**: Express, Cors, TypeScript
- **Frontend**: Next.js 15, Tailwind CSS, TypeScript
- **Desarrollo**: ts-node-dev, ESLint

## 🚀 Próximas Mejoras

- [ ] Persistencia con MongoDB
- [ ] Tests unitarios con Jest
- [ ] Sistema de favoritos
- [ ] Búsqueda en tiempo real con debounce
- [ ] Infinite scrolling
- [ ] Dark mode

## 📞 Soporte

Si encuentras algún problema:
1. Verifica que ambos servidores estén ejecutándose
2. Revisa la consola del navegador para errores
3. Asegúrate de que todas las dependencias estén instaladas
