import { HeroSlides } from "./components/HeroSlides";
import { AboutSection } from "./components/AboutSection";
import { WishesSection } from "./components/WishesSection";
import { GiftsSection } from "./components/GiftsSection";
import { MusicPlayer } from "./components/MusicPlayer";
import { Footer } from "./components/Footer";
import { FloatingEmojis } from "./components/FloatingEmojis";
import { ScrollProgress } from "./components/ScrollProgress";
import { ClickConfetti } from "./components/ClickConfetti";
import { StarryBackground } from "./components/StarryBackground";

export default function App() {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Starry Background */}
      <StarryBackground />
      
      {/* Scroll Progress */}
      <ScrollProgress />
      
      {/* Click Confetti */}
      <ClickConfetti />
      
      {/* Floating Emojis */}
      <FloatingEmojis />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Music Player */}
        <MusicPlayer />

        {/* Hero Section - 5 slides */}
        <HeroSlides />

        {/* About Yana */}
        <AboutSection />

        {/* Main Wishes - 4 blocks */}
        <WishesSection />

        {/* Gifts Section - 3 gifts */}
        <GiftsSection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
