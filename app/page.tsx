'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Heart, Stars, Moon, Camera, Mail, Play, Pause, Lock, Unlock, Gift, ArrowRight, ArrowLeft } from 'lucide-react';
import { birthdayConfig } from '@/config/birthday';
import confetti from 'canvas-confetti';
import Image from 'next/image';

// Custom Hooks
function useAudio(url: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio(url);
    a.loop = true;
    audioRef.current = a;
    return () => {
      a.pause();
      a.src = '';
      audioRef.current = null;
    };
  }, [url]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.error('Audio playback failed', error);
        setPlaying(false);
      }
    }
  };

  return { playing, toggle };
}

// 0. Music Player
function MusicPlayer({ playing, toggle }: { playing: boolean; toggle: () => void }) {
  return (
    <button 
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 p-4 bg-zinc-900/80 backdrop-blur-md rounded-full text-rose-400 hover:text-rose-300 hover:bg-zinc-800 transition-all box-glow border border-white/10"
      aria-label="Toggle Music"
    >
      {playing ? <Pause size={24} /> : <Play size={24} />}
    </button>
  );
}

// 1. Intro Screen
function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 1500));
      setStep(1); // "I made something for you..."
      await new Promise(r => setTimeout(r, 2500));
      setStep(2); // "Jaanu ❤️"
      await new Promise(r => setTimeout(r, 2500));
      setStep(3); // "Your birthday surprise begins here."
    };
    sequence();
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center text-center px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.p 
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1 }}
            className="text-zinc-400 font-sans text-xl sm:text-2xl"
          >
            I made something for you...
          </motion.p>
        )}
        {step === 2 && (
          <motion.h1 
            key="step2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
            className="text-white font-serif text-5xl sm:text-7xl font-bold text-glow"
          >
            {birthdayConfig.name} <span className="text-rose-500">❤️</span>
          </motion.h1>
        )}
        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-8"
          >
            <p className="text-zinc-300 font-serif text-2xl sm:text-3xl italic">
              Your birthday surprise begins here.
            </p>
            <button 
              onClick={onComplete}
              className="px-8 py-4 bg-white text-black font-sans font-medium rounded-full hover:scale-105 transition-transform flex items-center gap-2 group"
            >
              Open Your Surprise 
              <span className="text-rose-500 group-hover:animate-bounce">❤️</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// 2. Hero Section
function Hero({ onNext }: { onNext: () => void }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -400]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 250]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -250]);

  const particles = [
    { top: '15%', left: '20%', size: 8, color: 'bg-rose-400', y: y1, delay: 0 },
    { top: '45%', left: '80%', size: 12, color: 'bg-rose-300', y: y2, delay: 1 },
    { top: '75%', left: '25%', size: 16, color: 'bg-white', y: y3, delay: 2 },
    { top: '25%', left: '75%', size: 6, color: 'bg-rose-500', y: y4, delay: 0.5 },
    { top: '85%', left: '85%', size: 10, color: 'bg-rose-400', y: y1, delay: 1.5 },
    { top: '10%', left: '60%', size: 14, color: 'bg-white', y: y2, delay: 0.2 },
    { top: '65%', left: '15%', size: 8, color: 'bg-rose-300', y: y4, delay: 1.2 },
    { top: '35%', left: '35%', size: 18, color: 'bg-rose-500', y: y3, delay: 2.5 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const particleItemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1, ease: "easeOut" as const }
    }
  };

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-black to-black -z-10" />
      
      {/* Floating Parallax Particles */}
      <motion.div 
        id="hero-particle-container" 
        className="absolute inset-0 z-0 pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {particles.map((p, i) => (
          <motion.div
            key={i}
            variants={particleItemVariants}
            style={{ top: p.top, left: p.left, y: p.y }}
            className="absolute"
          >
            <motion.div
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 6 + (i % 3) * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay
              }}
              className={`rounded-full blur-[2px] ${p.color}`}
              style={{ width: p.size, height: p.size }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="max-w-3xl flex flex-col items-center gap-6 relative z-10"
      >
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold text-white leading-tight">
          {birthdayConfig.hero.title}
        </h1>
        <p className="text-lg sm:text-2xl text-zinc-300 font-sans max-w-2xl font-light">
          {birthdayConfig.hero.subtitle}
        </p>
        
        <button 
          onClick={onNext}
          className="mt-12 px-8 py-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 font-sans tracking-widest uppercase text-sm rounded-full hover:bg-rose-500/20 hover:text-white transition-all flex items-center gap-3 backdrop-blur-sm"
        >
          Begin Our Story <ArrowRight size={16} />
        </button>
      </motion.div>
    </section>
  );
}

// 3. Story Timeline
function StoryTimeline() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-serif text-center mb-20 text-white"
      >
        A Little Story About Us...
      </motion.h2>

      <div className="space-y-24">
        {birthdayConfig.timeline.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}
          >
            <div className="flex-1 w-full relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
              {/* Fallback pattern for missing images */}
              <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                <span className="text-zinc-600 font-sans text-sm">Image Placeholder: {item.image}</span>
              </div>
              {item.image && (
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  className="object-cover relative z-10"
                  onError={(e) => {
                    // Hide if image doesn't exist to show fallback
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-rose-400 font-sans text-sm uppercase tracking-widest mb-2 font-medium">{item.date}</p>
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">{item.title}</h3>
              <p className="text-zinc-400 font-sans leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// 4. Memory Gallery
function MemoryGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-zinc-950">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-serif text-center mb-16 text-white"
      >
        Moments We Shared
      </motion.h2>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-w-7xl mx-auto space-y-6">
        {birthdayConfig.memories.map((memory, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="break-inside-avoid"
          >
            <div 
              onClick={() => setSelectedImage(index)}
              className="polaroid cursor-pointer group hover:rotate-1 transition-transform bg-white pb-6"
            >
              <div className="relative aspect-square sm:aspect-auto sm:min-h-[250px] bg-zinc-200 overflow-hidden mb-4">
                <span className="absolute inset-0 flex items-center justify-center text-zinc-400 text-xs text-center p-4">
                  {memory.image}
                </span>
                <Image 
                  src={memory.image} 
                  alt={memory.caption} 
                  fill
                  className="object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <p className="text-center font-serif text-zinc-800 text-sm italic px-2">{memory.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </button>
            <div className="max-w-4xl w-full relative" onClick={e => e.stopPropagation()}>
              <div className="relative aspect-[4/3] sm:aspect-video bg-zinc-900 rounded-xl overflow-hidden mb-6">
                <Image 
                  src={birthdayConfig.memories[selectedImage].image} 
                  alt="" 
                  fill
                  className="object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex justify-between items-center text-white">
                <button 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  onClick={() => setSelectedImage(prev => (prev === 0 ? birthdayConfig.memories.length - 1 : prev! - 1))}
                >
                  <ArrowLeft size={24} />
                </button>
                <div className="text-center">
                  <p className="font-serif text-xl sm:text-2xl mb-1">{birthdayConfig.memories[selectedImage].caption}</p>
                  <p className="text-zinc-500 font-sans text-sm">{birthdayConfig.memories[selectedImage].date}</p>
                </div>
                <button 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  onClick={() => setSelectedImage(prev => (prev === birthdayConfig.memories.length - 1 ? 0 : prev! + 1))}
                >
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function UsBeingUsVideo() {
    return (
      <section className="bg-black px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto w-full max-w-6xl"
        >
          <h2 className="mb-10 text-center font-serif text-4xl text-white md:text-5xl">
            {birthdayConfig.memoryVideo.title}
          </h2>
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
            <video
              src={birthdayConfig.memoryVideo.src}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
            />
          </div>
        </motion.div>
      </section>
    );
  }

// 5. Reasons Why I Love You
function LoveReasons() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % birthdayConfig.reasons.length);
    }, 200);
  };

  return (
    <section className="py-32 px-6 bg-[#050505] flex flex-col items-center justify-center min-h-[80vh]">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-serif text-center mb-16 text-white"
      >
        A Few Reasons Why I Love You...
      </motion.h2>

      <div className="relative w-full max-w-sm h-80 perspective-1000">
        <motion.div
          className="w-full h-full relative preserve-3d cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={() => !isFlipped && setIsFlipped(true)}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center p-8 box-glow shadow-2xl">
            <Heart className="text-rose-500 mb-6" size={48} />
            <p className="text-zinc-400 font-sans uppercase tracking-widest text-sm mb-2">Reason</p>
            <p className="text-4xl font-serif text-white">#{String(currentIndex + 1).padStart(2, '0')}</p>
            <p className="absolute bottom-6 text-xs text-zinc-500">Tap to reveal</p>
          </div>
          
          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-rose-950/30 border border-rose-900/50 rounded-2xl flex items-center justify-center p-8 shadow-2xl backdrop-blur-sm text-center">
            <p className="text-xl md:text-2xl font-serif text-rose-100 leading-relaxed">
              &quot;{birthdayConfig.reasons[currentIndex]}&quot;
            </p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isFlipped && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleNext}
            className="mt-12 px-6 py-3 bg-white text-black font-sans rounded-full flex items-center gap-2 hover:bg-zinc-200 transition-colors"
          >
            Next Reason <ArrowRight size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}

// 6. Hidden Surprises
function SecretHunt({ onComplete }: { onComplete: () => void }) {
  const [found, setFound] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const icons = {
    heart: Heart,
    star: Stars,
    moon: Moon,
    camera: Camera,
    envelope: Mail
  };

  const positions = [
    { top: '8%', left: '5%' },
    { top: '85%', left: '12%' },
    { top: '35%', right: '8%' },
    { top: '92%', right: '20%' },
    { top: '50%', right: '50%' }, // extra safe fallback in case config has 5 items
  ];

  const handleFind = (index: number) => {
    if (!found.includes(index)) {
      const newFound = [...found, index];
      setFound(newFound);
      setActiveMessage(birthdayConfig.secrets[index].message);
      
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f43f5e', '#ffffff']
      });

      if (newFound.length === birthdayConfig.secrets.length) {
        setTimeout(onComplete, 3000);
      }
    }
  };

  return (
    <section className="relative min-h-screen py-24 px-6 overflow-hidden bg-black flex flex-col items-center">
      <div className="absolute inset-0 bg-zinc-950" />
      
      <div className="relative z-10 text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">But I Hid A Few Things For You...</h2>
        <p className="text-zinc-400 font-sans">Find the {birthdayConfig.secrets.length} hidden secrets around this space.</p>
        <p className="text-rose-500 font-sans text-sm mt-2">{found.length} / {birthdayConfig.secrets.length} found</p>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {birthdayConfig.secrets.map((secret, index) => {
          const Icon = icons[secret.icon as keyof typeof icons] || Heart;
          const isFound = found.includes(index);
          return (
            <motion.div
              key={index}
              className={`secret-icon-glow absolute cursor-pointer pointer-events-auto p-4 transition-all duration-700 ${isFound ? 'opacity-10 scale-150 text-white' : 'opacity-100 text-rose-400 hover:text-rose-300 hover:scale-110'}`}
              style={positions[index]}
              onClick={() => handleFind(index)}
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            >
              <Icon size={isFound ? 48 : 32} />
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative z-20 mt-auto mb-20 bg-zinc-900/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-md text-center box-glow"
          >
            <p className="text-rose-100 font-serif text-xl">{activeMessage}</p>
            <button 
              onClick={() => setActiveMessage(null)}
              className="mt-4 text-xs text-zinc-500 uppercase tracking-widest hover:text-white"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {found.length === birthdayConfig.secrets.length && !activeMessage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-20 mt-auto mb-20 text-center"
        >
          <p className="text-2xl font-serif text-rose-400 mb-6">You found everything ❤️</p>
          <button 
            onClick={onComplete}
            className="px-8 py-3 bg-white text-black font-sans rounded-full hover:bg-zinc-200 transition-colors"
          >
            Unlock Next Surprise
          </button>
        </motion.div>
      )}
    </section>
  );
}

// 7. Password Reveal
function PasswordReveal({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toLowerCase().trim() === birthdayConfig.password.secret.toLowerCase()) {
      setError('');
      onUnlock();
    } else {
      setError("Close... but you know me better than that 😌");
      setInput('');
    }
  };

  return (
    <section className="py-32 px-6 flex flex-col items-center justify-center text-center bg-zinc-950 border-y border-white/5">
      <Lock className="text-zinc-700 mb-8" size={48} />
      <h2 className="text-3xl font-serif text-white mb-4">There is one thing here that only you can unlock...</h2>
      <p className="text-zinc-400 mb-12 font-sans">{birthdayConfig.password.hint}</p>
      
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
        <input 
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Password..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 text-center text-white focus:outline-none focus:border-rose-500/50 transition-colors"
        />
        {error && <p className="text-rose-400 text-sm">{error}</p>}
        <button 
          type="submit"
          className="w-full bg-white text-black py-4 rounded-xl font-medium hover:bg-zinc-200 transition-colors"
        >
          Unlock
        </button>
      </form>
    </section>
  );
}

// 8. Gift Reveal & Video
function GiftReveal({ onVideoEnd }: { onVideoEnd: () => void }) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ffffff', '#ffd700']
    });
  };

  return (
    <section className="py-32 px-6 min-h-[80vh] flex flex-col items-center justify-center text-center">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div 
            key="box"
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center gap-12"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full" />
              <Gift className="relative text-rose-500 hover:scale-110 transition-transform cursor-pointer" size={120} onClick={handleOpen} />
            </div>
            <div>
              <h2 className="text-3xl font-serif text-white mb-8">I saved something special for you...</h2>
              <button 
                onClick={handleOpen}
                className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-medium transition-colors shadow-lg shadow-rose-500/30"
              >
                Open Your Gift 🎁
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl flex flex-col items-center gap-8"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-white">{birthdayConfig.gift.message}</h2>
            
            {birthdayConfig.gift.type === 'video' && (
              <div className="w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 relative">
                 <div className="absolute inset-0 flex items-center justify-center">
                   <p className="text-zinc-600 font-sans text-sm">Video Placeholder: {birthdayConfig.gift.src}</p>
                 </div>
                 <video 
                   src={birthdayConfig.gift.src}
                   controls
                   className="w-full h-full object-cover relative z-10"
                   onEnded={onVideoEnd}
                   onError={(e) => {
                     (e.target as HTMLElement).style.display = 'none';
                   }}
                 />
              </div>
            )}
            
            <button onClick={onVideoEnd} className="mt-8 px-6 py-3 border border-white/20 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors">
              Continue ❤️
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// 9. Love Letter
function LoveLetter({ onRead }: { onRead: () => void }) {
  const text = birthdayConfig.letter;
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Intersection observer to start typing only when visible could be added,
  // but for simplicity we'll type automatically when rendered.

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        const nextIndex = Math.min(index + 8, text.length);
        setDisplayedText(text.slice(0, nextIndex));
        setIndex(nextIndex);
      }, 10); // Typing speed
      return () => clearTimeout(timeout);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsTyping(false);
    }
  }, [index, text]);

  return (
    <section className="py-32 px-6 flex flex-col items-center justify-center bg-[#080808]">
      <h2 className="text-3xl md:text-5xl font-serif text-white mb-16">Something I Really Want You To Know...</h2>
      
      <div className="max-w-2xl w-full bg-[#111] border border-white/5 p-8 md:p-12 rounded-lg shadow-2xl relative">
        {/* Subtle texture/paper effect */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper.png")' }} />
        
        <p className="font-serif text-lg md:text-xl text-zinc-300 leading-relaxed whitespace-pre-wrap relative z-10">
          {displayedText}
          {isTyping && <span className="inline-block w-1 h-5 ml-1 bg-rose-500 animate-pulse" />}
        </p>

        {!isTyping && (
          <Mail 
            size={14} 
            className={`absolute bottom-4 right-4 cursor-pointer transition-all duration-500 ${showEasterEgg ? 'opacity-100 text-rose-500' : 'opacity-10 text-zinc-600 hover:opacity-100 hover:text-rose-400'}`}
            onClick={() => {
              setShowEasterEgg(true);
              confetti({ particleCount: 20, spread: 40, origin: { y: 0.7 }, colors: ['#f43f5e'] });
            }} 
          />
        )}
      </div>

      <AnimatePresence>
        {showEasterEgg && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-rose-400 font-serif italic"
          >
            "If I wrote a book about love, every chapter would be about you. 💌"
          </motion.p>
        )}
      </AnimatePresence>

      {!isTyping && (
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onRead}
          className="mt-16 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full font-sans transition-all flex items-center gap-2"
        >
          Read the final message <ArrowRight size={16} />
        </motion.button>
      )}
    </section>
  );
}

// 10. Final Reveal
function FinalReveal({ onRestart }: { onRestart: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 1000));
      setStep(1); // "One Last Thing..."
      await new Promise(r => setTimeout(r, 3000));
      setStep(2); // Prelude
      await new Promise(r => setTimeout(r, 4000));
      setStep(3); // Climax
      await new Promise(r => setTimeout(r, 4000));
      setStep(4); // Happy Birthday
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.3 },
        colors: ['#f43f5e', '#ffffff', '#e11d48']
      });
    };
    sequence();
  }, []);

  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/10 via-black to-black" />
      
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.p 
            key="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-zinc-400 font-sans text-xl"
          >
            One Last Thing...
          </motion.p>
        )}
        {step === 2 && (
          <motion.p 
            key="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-zinc-300 font-serif text-2xl md:text-4xl max-w-2xl leading-relaxed"
          >
            {birthdayConfig.finalMessage.prelude}
          </motion.p>
        )}
        {step === 3 && (
          <motion.p 
            key="3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-rose-100 font-serif text-2xl md:text-4xl max-w-2xl leading-relaxed"
          >
            {birthdayConfig.finalMessage.climax}
          </motion.p>
        )}
        {step === 4 && (
          <motion.div 
            key="4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center gap-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white text-glow mb-4">
              Happy Birthday, {birthdayConfig.name} ❤️
            </h1>
            <p className="text-2xl md:text-3xl font-serif text-rose-400 italic">
              {birthdayConfig.finalMessage.outro}
            </p>
            
            <button 
              onClick={onRestart}
              className="mt-20 text-zinc-500 hover:text-white font-sans text-sm uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              Start Again <ArrowRight size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


// MAIN PAGE ASSEMBLY
export default function BirthdayApp() {
  const [hasStarted, setHasStarted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [huntCompleted, setHuntCompleted] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);
  const [letterRead, setLetterRead] = useState(false);
  
  const { playing, toggle } = useAudio(birthdayConfig.music.src);

  // Handle CSS 3D Transforms Setup
  useEffect(() => {
    // Add custom styles for 3d transform classes that Tailwind doesn't have by default
    const style = document.createElement('style');
    style.innerHTML = `
      .perspective-1000 { perspective: 1000px; }
      .preserve-3d { transform-style: preserve-3d; }
      .backface-hidden { backface-visibility: hidden; }
      .rotate-y-180 { transform: rotateY(180deg); }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); }
  }, []);

  const handleStart = () => {
    setHasStarted(true);
    if (birthdayConfig.music.enabled && !playing) {
      toggle();
    }
  };

  const handleRestart = () => {
    setHasStarted(false);
    setUnlocked(false);
    setHuntCompleted(false);
    setVideoWatched(false);
    setLetterRead(false);
    window.scrollTo({ top: 0 });
  };

  if (!hasStarted) {
    return <IntroScreen onComplete={handleStart} />;
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-rose-500/30">
      <MusicPlayer playing={playing} toggle={toggle} />
      
      {!letterRead ? (
        <>
          <Hero onNext={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} />
          <StoryTimeline />
          <MemoryGallery />
          <UsBeingUsVideo />
          <LoveReasons />
          
          {!huntCompleted ? (
            <SecretHunt onComplete={() => setHuntCompleted(true)} />
          ) : (
             <>
              {!unlocked ? (
                <PasswordReveal onUnlock={() => setUnlocked(true)} />
              ) : (
                <>
                  {!videoWatched ? (
                    <GiftReveal onVideoEnd={() => setVideoWatched(true)} />
                  ) : (
                    <LoveLetter onRead={() => setLetterRead(true)} />
                  )}
                </>
              )}
             </>
          )}
        </>
      ) : (
        <FinalReveal onRestart={handleRestart} />
      )}
    </main>
  );
}
