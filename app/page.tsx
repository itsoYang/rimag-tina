import Hero from '@/components/home/Hero';
import StandardIntro from '@/components/home/StandardIntro';
import Features from '@/components/home/Features';
import Stats from '@/components/home/Stats';
import NewsAndBlogs from '@/components/home/NewsAndBlogs';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StandardIntro />
      <Features />
      <Stats />
      <NewsAndBlogs />
    </>
  );
}
