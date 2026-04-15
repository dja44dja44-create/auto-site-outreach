/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import {
  Menu,
  ArrowRight,
  Code2,
  Layout,
  Database,
  CheckCircle2,
  Mail,
  Globe,
  UserCircle,
  PenTool,
  Terminal,
  ShieldCheck
} from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary-container/30 selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-primary font-headline tracking-tight">
              Louis Lepierre
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-headline font-medium text-sm">
            <a href="#projets" className="relative group text-on-surface-variant hover:text-primary transition-colors duration-300 py-1">
              Projets
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#expertise" className="relative group text-on-surface-variant hover:text-primary transition-colors duration-300 py-1">
              Expertise & Méthodologie
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="relative group text-on-surface-variant hover:text-primary transition-colors duration-300 py-1">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-32">
        {/* Hero Section */}
        <section className="px-6 py-12 md:py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary-container/10 text-tertiary font-label text-xs font-bold mb-6 border border-tertiary/10">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                DISPONIBLE DANS TOUTE LA FRANCE
              </div>
              <h1 className="font-headline text-5xl lg:text-7xl font-extrabold text-primary leading-[1.1] tracking-tight mb-6">
                L'Artisanat Digital au service de votre <span className="text-primary-container italic">Vision.</span>
              </h1>
              <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl mb-8">
                Je m'appelle Louis Lepierre. En tant qu'artisan du web basé à Nantes, je conçois des expériences numériques avec la même rigueur technique qu'un compagnon du devoir. Ma mission est de transformer vos idées complexes en outils fluides, performants et humains.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#projets" className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-headline font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
                  Découvrir mes projets <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#contact" className="bg-outline-variant/30 text-on-surface px-8 py-4 rounded-xl font-headline font-bold hover:bg-outline-variant/50 transition-colors">
                  Démarrer une conversation
                </a>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative hidden md:block"
            >
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 bg-surface-container-high">
                <img 
                  src="https://picsum.photos/seed/workspace/800/1000" 
                  alt="Espace de travail numérique" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-6 rounded-2xl shadow-xl max-w-[240px]">
                <p className="text-sm font-headline font-bold text-primary italic leading-tight">
                  "Une ingénierie de précision au service de votre croissance numérique."
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Expertise & Methodology Section */}
        <section id="expertise" className="bg-surface-container-low py-24 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Expertise & Méthodologie</h2>
              <p className="text-on-surface-variant max-w-2xl text-lg">
                Des fondations solides pour des applications qui durent. Je n'utilise pas de templates, chaque ligne de code est pensée pour votre besoin spécifique.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Front-End */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-surface-container-lowest p-8 rounded-[1.5rem] shadow-md border border-outline-variant/20 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Layout className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-headline font-bold text-primary mb-4">Front-End Sur-Mesure</h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">
                  Interfaces réactives et élégantes avec React, Tailwind CSS et des animations fluides pour une immersion totale.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-medium text-on-surface-variant">Performance First</span>
                  <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-medium text-on-surface-variant">Accessibilité</span>
                </div>
              </motion.div>

              {/* Backend */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-surface-container-lowest p-8 rounded-[1.5rem] shadow-md border border-outline-variant/20 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container mb-6">
                  <Database className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-headline font-bold text-primary mb-4">Backend & APIs</h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">
                  Architectures robustes Node.js et intégration de bases de données pour une gestion de contenu autonome et sécurisée.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-medium text-on-surface-variant">Scalabilité</span>
                  <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-medium text-on-surface-variant">Sécurité</span>
                </div>
              </motion.div>

              {/* Methodology */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-surface-container-lowest p-8 rounded-[1.5rem] shadow-md border border-outline-variant/20 hover:shadow-xl transition-all scroll-mt-24"
              >
                <div className="w-14 h-14 rounded-2xl bg-tertiary-container/20 flex items-center justify-center text-tertiary mb-6">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-headline font-bold text-primary mb-4">Méthodologie Agile</h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">
                  Une approche artisanale : de l'audit initial au déploiement continu, avec un suivi national rigoureux et transparent.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-medium text-on-surface-variant">Itératif</span>
                  <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-medium text-on-surface-variant">Sur-mesure</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projets" className="py-24 max-w-7xl mx-auto px-6 scroll-mt-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Réalisations Récentes</h2>
              <p className="text-on-surface-variant max-w-xl text-lg">
                Des solutions digitales conçues pour répondre à des enjeux business concrets.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="group cursor-pointer bg-surface-container-lowest rounded-3xl p-4 shadow-md hover:shadow-xl transition-all border border-outline-variant/20">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-surface-container mb-6 relative">
                <img 
                  src="https://picsum.photos/seed/bakery/600/400" 
                  alt="Aux Délices" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                  E-Commerce
                </div>
              </div>
              <div className="px-2 pb-2">
                <h3 className="text-2xl font-headline font-bold text-primary mb-2">Aux Délices</h3>
                <p className="text-on-surface-variant mb-4 line-clamp-2">
                  Refonte d'un site vitrine avec système Click & Collect intégré et interface d'administration simplifiée pour le client.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-medium text-on-surface-variant">Next.js</span>
                  <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-medium text-on-surface-variant">Tailwind</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group cursor-pointer bg-surface-container-lowest rounded-3xl p-4 shadow-md hover:shadow-xl transition-all border border-outline-variant/20">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-surface-container mb-6 relative">
                <img 
                  src="https://picsum.photos/seed/flowers/600/400" 
                  alt="Camélia Blanc" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                  Vitrine Luxe
                </div>
              </div>
              <div className="px-2 pb-2">
                <h3 className="text-2xl font-headline font-bold text-primary mb-2">Camélia Blanc</h3>
                <p className="text-on-surface-variant mb-4 line-clamp-2">
                  Développement d'une plateforme e-commerce personnalisée, optimisée pour la conversion et la gestion de stocks.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-medium text-on-surface-variant">React</span>
                  <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-medium text-on-surface-variant">Node.js</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group cursor-pointer bg-surface-container-lowest rounded-3xl p-4 shadow-md hover:shadow-xl transition-all border border-outline-variant/20">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-surface-container mb-6 relative">
                <img 
                  src="https://picsum.photos/seed/conference/600/400" 
                  alt="Forum Métiers Web" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                  Plateforme RH
                </div>
              </div>
              <div className="px-2 pb-2">
                <h3 className="text-2xl font-headline font-bold text-primary mb-2">Forum Métiers Web</h3>
                <p className="text-on-surface-variant mb-4 line-clamp-2">
                  Plateforme de réservation et programme interactif temps réel pour un événement d'envergure.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-medium text-on-surface-variant">TypeScript</span>
                  <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-medium text-on-surface-variant">PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-primary text-on-primary scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-primary mb-6 leading-tight">
                Prêt à lancer votre projet <span className="text-on-primary-container italic">sur le marché ?</span>
              </h2>
              <p className="text-lg text-on-primary/80 mb-10">
                Je réponds à vos demandes partout en France. Analysons ensemble vos besoins pour définir la stratégie technique adaptée.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-primary-container/40 p-6 rounded-2xl shadow-sm border border-primary-container">
                  <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center text-on-primary-container">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-primary/70">Email Direct</p>
                    <a href="mailto:louis.lepierre@proton.me" className="text-on-primary font-bold text-lg hover:underline decoration-2 underline-offset-4">
                      louis.lepierre@proton.me
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-primary-container/40 p-6 rounded-2xl shadow-sm border border-primary-container">
                  <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center text-on-primary-container">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-primary/70">Collaboration</p>
                    <p className="text-on-primary font-bold text-lg">
                      100% Remote
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-primary-container/20 p-8 md:p-10 rounded-[2rem] shadow-xl border border-primary-container/50 backdrop-blur-sm">
              <h3 className="text-2xl font-headline font-bold text-on-primary mb-8">Démarrer une conversation</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-primary/80">Votre Nom</label>
                  <input 
                    type="text" 
                    placeholder="Comment dois-je vous appeler ?" 
                    className="w-full bg-primary-container/30 border-none border-b-2 border-primary-container focus:border-on-primary focus:ring-0 transition-colors rounded-t-xl p-4 text-on-primary placeholder:text-on-primary/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-primary/80">Email</label>
                  <input 
                    type="email" 
                    placeholder="Où puis-je vous joindre ?" 
                    className="w-full bg-primary-container/30 border-none border-b-2 border-primary-container focus:border-on-primary focus:ring-0 transition-colors rounded-t-xl p-4 text-on-primary placeholder:text-on-primary/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-primary/80">Votre Vision</label>
                  <textarea 
                    placeholder="Parlez-moi de votre projet..." 
                    rows={4}
                    className="w-full bg-primary-container/30 border-none border-b-2 border-primary-container focus:border-on-primary focus:ring-0 transition-colors rounded-t-xl p-4 text-on-primary placeholder:text-on-primary/40 resize-none"
                  ></textarea>
                </div>
                <button className="w-full bg-on-primary text-primary font-headline font-bold py-4 rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-2">
                  Envoyer la demande <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary-container text-on-primary-container py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-on-primary font-headline tracking-tight">
            Louis Lepierre
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-on-primary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-on-primary transition-colors">GitHub</a>
          </div>
          <p className="text-sm opacity-70">
            © 2024 Louis Lepierre — Digital Artisan in Nantes
          </p>
        </div>
      </footer>

      {/* Floating Artisan Badge */}
      <div className="fixed bottom-8 right-8 z-40 hidden md:flex group">
        <div className="bg-surface/80 backdrop-blur-xl text-on-surface px-6 py-3.5 rounded-full flex items-center gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-outline-variant/30 cursor-pointer hover:scale-105 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300">
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest font-label bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            Accepting New Projects
          </span>
        </div>
      </div>
    </div>
  );
}
