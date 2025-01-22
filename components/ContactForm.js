'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Confetti from 'react-confetti';


// Icônes SVG simples
const CheckCircleIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
);

const XIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
 </svg>
);

const ClockIcon = () => (
    <div className="clock-animation w-16 h-16 rounded-full border-4 border-orange-500 relative">
      <div className="clock-hand-minute absolute w-1 h-6 bg-orange-500 left-1/2 -ml-0.5 bottom-1/2 origin-bottom" />
      <div className="clock-hand-hour absolute w-1 h-4 bg-orange-500 left-1/2 -ml-0.5 bottom-1/2 origin-bottom" />
    </div>
  );


  const AngryChefModal = ({ isOpen, onClose }) => {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);
    
    const handleOkChefClick = () => {
        setShowConfetti(true);
        setTimeout(() => {
          onClose();
          setShowConfetti(false);
        }, 60000);
      };
  
    if (!isOpen) return null;
  
    return (
        <>
          {showConfetti && (
            <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={1000}
            colors={['#5A2D0C', '#7B3F1D', '#4E1F07', '#3B1B0A', '#2C1205']}
            />
          )}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm transition-opacity" />
            
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-8 text-center shadow-xl transition-all">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative w-32 h-32">
                    <Image 
                      src="/kebab4.png"
                      alt="Chef en colère"
                      fill
                      className="object-cover rounded-full"
                      priority
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Tu fais quoi là ?!
                  </h3>
                  <p className="text-gray-700 font-medium">
                    Reste là, attends et mange mon kebab !
                  </p>
                  <button
                    type="button"
                    className="w-full rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                    onClick={handleOkChefClick}
                  >
                    Ok chef !
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
  };

// Nouvelle modale pour le temps d'attente
const WaitingModal = ({ isOpen, onClose, onLeaveClick  }) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm transition-opacity" />
        
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-8 text-center shadow-xl transition-all">
            <div className="flex flex-col items-center gap-6">
              <ClockIcon />
              <h3 className="text-xl font-medium text-gray-900">
                En préparation... 👨‍🍳
              </h3>
              <p className="text-gray-500">
                Temps d'attente estimé : <span className="font-semibold">1 à 2 heures environ</span>
              </p>
              <button
                type="button"
                className="w-full rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                onClick={onLeaveClick}
                >
                Y'en a marre, je rentre chez moi !
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

const Modal = ({ isOpen, onClose, title, message, type, onPerfectClick  }) => {

 useEffect(() => {
   const handleEsc = (e) => {
     if (e.key === 'Escape') onClose();
   };
   
   if (isOpen) {
     document.addEventListener('keydown', handleEsc);
     document.body.style.overflow = 'hidden';
   }
   
   return () => {
     document.removeEventListener('keydown', handleEsc);
     document.body.style.overflow = 'unset';
   };
 }, [isOpen, onClose]);

 if (!isOpen) return null;

 return (
   <div className="fixed inset-0 z-50 overflow-y-auto">
     <div 
       className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm transition-opacity"
       onClick={onClose}
     />
     
     <div className="flex min-h-full items-center justify-center p-4">
       <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
         <button
           onClick={onClose}
           className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
         >
           <XIcon />
         </button>

         <div className="flex items-center gap-3">
           {type === 'success' && (
             <div className="flex-shrink-0">
               <CheckCircleIcon />
             </div>
           )}
           <h3 className="text-lg font-medium text-gray-900">
             {title}
           </h3>
         </div>

         <div className="mt-3">
           <p className="text-sm text-gray-500">
             {message}
           </p>
         </div>

         <div className="mt-5 flex gap-3">
            <button
                type="button"
                className="w-1/2 rounded-xl bg-gradient-to-r from-orange-400 to-orange-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 border border-orange-300"
                onClick={onPerfectClick}
            >
                Parfait ! 👌
            </button>
            <button
                type="button"
                className="w-1/2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 border border-gray-300 transition-all duration-200"
                onClick={onClose}
            >
                Dégueu... 🤢
            </button>
        </div>
       </div>
     </div>
   </div>
 );
};

const KebabForm = () => {
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   message: ''
 });
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [showModal, setShowModal] = useState(false);
 const [showWaitingModal, setShowWaitingModal] = useState(false);
 const [showAngryChefModal, setShowAngryChefModal] = useState(false);


 const [modalContent, setModalContent] = useState({
   type: '',
   title: '',
   message: ''
 });

 const handlePerfectClick = () => {
    setShowModal(false);
    setShowWaitingModal(true);
  };

  const handleLeaveClick = () => {
    setShowWaitingModal(false);
    setShowAngryChefModal(true);
  };

 const WEBHOOK_URL = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;

 const handleSubmit = async (e) => {
   e.preventDefault();
   setIsSubmitting(true);

   try {
     const chatResponse = await fetch('/api/chat', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ message: formData.message }),
     });

     if (!chatResponse.ok) throw new Error('Erreur avec ChatGPT');
     const { response: aiResponse } = await chatResponse.json();

     const response = await fetch(WEBHOOK_URL, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         ...formData,
         submissionDate: new Date().toISOString(),
         aiResponse
       }),
     });

     if (!response.ok) throw new Error('Erreur lors de l\'envoi');
     
     setModalContent({
       type: 'success',
       title: 'Menu Kebab Généré ! 🎉',
       message: aiResponse
     });
     
     setFormData({ name: '', email: '', message: '' });
     setShowModal(true);
     
   } catch (error) {
     console.error('Erreur:', error);
     setModalContent({
       type: 'error',
       title: 'Oups ! 😅',
       message: 'Une erreur est survenue lors de la génération de ton kebab. Réessaie !'
     });
     setShowModal(true);
   } finally {
     setIsSubmitting(false);
   }
 };

 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData(prev => ({
     ...prev,
     [name]: value
   }));
 };

 return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200 antialiased px-4 py-8">
     {/* Modale */}
     <Modal 
       isOpen={showModal}
       onClose={() => setShowModal(false)}
       title={modalContent.title}
       message={modalContent.message}
       type={modalContent.type}
       onPerfectClick={handlePerfectClick} 
     />
           <WaitingModal 
        isOpen={showWaitingModal}
        onClose={() => setShowWaitingModal(false)}
        onLeaveClick={handleLeaveClick}
      />
            <AngryChefModal 
        isOpen={showAngryChefModal}
        onClose={() => setShowAngryChefModal(false)}
      />

<div className="container mx-auto">
        {/* Layout 3 colonnes */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
    
    {/* Colonne de gauche */}
    <div className="hidden lg:block w-64 sticky top-8">
        <div className="bg-white/80 rounded-2xl shadow-lg p-4 h-[600px] relative overflow-hidden">
            <Image 
                src="/kebab.png"
                alt="Kebab Image"
                fill
                className="object-cover rounded-xl"
                priority
            />
        </div>
    </div>

    <div className="w-full max-w-xl">
        {/* En-tête */}
        <div className="w-full max-w-xl text-center mb-12">
        <h1 className="text-4xl font-bold text-orange-900 mb-4">
            Le Générateur de Kebab Parfait 🥙
        </h1>
        <p className="text-orange-800 text-lg">
            Dis-nous tes envies, on te prépare LE kebab de tes rêves !
        </p>
        
        </div>


        {/* Formulaire */}
        <div className="w-full max-w-xl relative rounded-2xl shadow-lg border-2 border-orange-300 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
                <Image 
                src="/kebab.png"
                alt="King Döner Restaurant"
                fill
                className="object-cover opacity-10" // opacité réduite pour le texte
                priority
                />
            </div>
            <div className="relative p-8 bg-white/95">
            <form onSubmit={handleSubmit} className="space-y-6">            
            <div className="space-y-1.5">
                <label 
                htmlFor="name"
                className="block text-sm font-medium text-orange-900"
                >
                Ton nom 
                </label>
                <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-orange-50 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-colors duration-200 text-gray-900 text-sm placeholder-gray-400"
                required
                disabled={isSubmitting}
                placeholder="Jean"
                />
            </div>

            <div className="space-y-1.5">
                <label 
                htmlFor="email"
                className="block text-sm font-medium text-orange-900"
                >
                Ton email pour la livraison 📧
                </label>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-orange-50 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-colors duration-200 text-gray-900 text-sm placeholder-gray-400"
                required
                disabled={isSubmitting}
                placeholder="kebab.lover@mail.com"
                />
            </div>

            <div className="space-y-1.5">
                <label 
                htmlFor="message"
                className="block text-sm font-medium text-orange-900"
                >
                Dis-nous tout ! 🌯
                </label>
                <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2.5 bg-orange-50 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-colors duration-200 text-gray-900 text-sm placeholder-gray-400 resize-none"
                required
                disabled={isSubmitting}
                placeholder="J'adore le piquant, je veux de la sauce samouraï et pas d'oignons..."
                />
            </div>

            <div className="space-y-4">
                <button
                    type="submit"
                    disabled={true}
                    className="w-full py-3 px-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-medium rounded-xl shadow-lg border border-orange-300 transition-all duration-200 text-sm relative overflow-hidden group disabled:opacity-90 disabled:cursor-not-allowed"
                >
                    <div className="flex items-center justify-center gap-2">
                    <span>Composer un Kebab Premium</span>
                    <span className="bg-orange-700 text-xs py-1 px-2 rounded-full">
                        12.99€
                    </span>
                    <span className="text-xs">✨</span>
                    </div>
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg border border-gray-300 transition-all duration-200 text-sm ${
                    isSubmitting 
                        ? 'opacity-75 cursor-not-allowed'
                        : 'hover:bg-gray-200 hover:shadow-sm active:transform active:scale-[0.98]'
                    }`}
                >
                    {isSubmitting ? 'On prépare ton kebab...' : 'Composer gratuitement'}
                </button>

                <p className="text-xs text-center text-gray-500">
                    La version premium arrive bientôt ! 🚀
                </p>
                </div>
            </form>
        </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-orange-700">
        Pro tip : Dis-nous si tu aimes épicé ou pas, on adaptera les sauces ! 🌶️
        </div>
    </div>
    {/* Colonne de droite */}
    <div className="hidden lg:block w-64 sticky top-8">
    <div className="bg-white/80 rounded-2xl shadow-lg p-4 h-[600px] relative overflow-hidden group">
            <Image 
                src="/kebab2.png"
                alt="Kebab Image"
                fill
                className="object-cover rounded-xl transition-opacity duration-300 group-hover:opacity-0"
                priority
            />
            <Image 
                src="/kebab3.png"
                alt="Kebab Hover Image"
                fill
                className="object-cover rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                priority
            />
        </div>
    </div>
    </div>
    </div>
   </div>
 );
};

export default KebabForm;