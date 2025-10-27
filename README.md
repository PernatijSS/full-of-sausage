# 🎉 Birthday Landing Page - Яна

Лендос Яне на др 

## ✨ Особенности

- 🎵 **Музыкальный плеер** с регулировкой громкости
- ✨ **Интерактивные анимации** (звездное небо, конфетти, плавающие эмодзи)
- 🎮 **Кастомный курсор** с анимациями
- 🖼️ **Слайдер** с параллакс-эффектом
- 🎁 **Система подарков** с промокодами
- 📱 **Полная адаптивность** под все устройства
- 🛡️ **Защита контента** от копирования

## 🚀 Технологии

- **React 18** + TypeScript
- **Motion** для анимаций
- **Tailwind CSS** для стилей
- **Lucide React** для иконок
- **Vite** для сборки

## 🎯 Компоненты

- `MusicPlayer` - Плеер с треком Radiohead - All I Need
- `StarryBackground` - Анимированное звездное небо
- `CustomCursor` - Кастомный курсор
- `FloatingEmojis` - Плавающие праздничные эмодзи
- `ClickConfetti` - Конфетти при кликах
- `HeroSlides` - Главный слайдер с изображениями
- `AboutSection` - Секция "О Яне"
- `GiftsSection` - Система подарков с модальными окнами
- `WishesSection` - Пожелания на день рождения
- `ScrollProgress` - Индикатор прогресса прокрутки
- `Footer` - Футер с контактами

## 🎵 Музыка

В проекте используется трек **Radiohead - All I Need**. Файл расположен в `src//assets/Radiohead All I Need.mp3`

## 🛠 Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка проекта
npm run build

# Деплой на GitHub Pages
npm run deploy
```

## 🌐 GitHub Pages

Проект доступен онлайн: [https://pernatijss.github.io/full-of-sausage](https://pernatijss.github.io/full-of-sausage)

### 🚀 Как обновить сайт:

```bash
# После внесения изменений в код:
npm run deploy
```

**Важно:** Все изменения разработки делаются в `main` ветке, а для обновления сайта используется команда `npm run deploy`

## 🎨 Дизайн

Оригинальный дизайн в Figma: [Birthday Landing Page Design](https://www.figma.com/design/vJywgV71F6QS5zPQytQ9YO/Birthday-Landing-Page-Design)

## 📁 Структура проекта

```
src/
├── components/          # React компоненты
├── assets/             # Статические файлы (аудио, изображения)
├── styles/             # Глобальные стили
└── App.tsx            # Главный компонент
```

## ⚙️ Особенности реализации

- Все анимации оптимизированы для производительности
- Поддержка touch-жестов для мобильных устройств
- Graceful degradation для старых браузеров
- TypeScript для типобезопасности
- Автоматический деплой на GitHub Pages
