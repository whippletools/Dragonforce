import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award } from 'lucide-react';
import { translations, type Lang } from '../data/translations';

interface AboutSectionProps {
  lang: Lang;
}

const AboutSection = ({ lang }: AboutSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = translations[lang];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left column - Image & Badge */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/DSC04975.jpg"
                alt="Dragon Force Training"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            {/* ISO Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -right-4 md:right-8 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3 glow-gold"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">ISO 9001</p>
                <p className="text-sm font-bold text-gray-900">
                  {lang === 'es' ? 'Certificados' : 'Certified'}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block border-2 border-[#1a4f8a] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#1a4f8a] mb-6">
              {t.about.label}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1a4f8a] mb-6">
              {t.about.title}
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              {t.about.desc}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
