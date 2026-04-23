import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Palette, MessageCircle, Star, Phone, Gift } from "lucide-react";

import bgImage from "./assets/bg.jpg";
import headerImg from "./assets/header.png";
import sitelogo from "./assets/sitelogo.jpeg";
import weddingImg from "./assets/wedding.png";
import babyImg from "./assets/baby.png";
import mehendiImg from "./assets/mehendi1.png";
import haldiImg from "./assets/haldi.jpg";
import sangeetImg from "./assets/sangeet.png";
import engagementImg from "./assets/engagement1.png";
import receptionImg from "./assets/reception.png";
import housewarmingImg from "./assets/housewarming.png";
import godbharaiImg from "./assets/Godbharai.png";
import whatsappImg from "./assets/whatsapp.png";

const templates = {
  Wedding: {
    title: "Wedding Video Invitation",
    price: "₹1499",
    image: weddingImg,
    video: "/wedding.mp4",
    isVideo: true,
    labels: ["wedding", "photo", "video"]
  },
  Weddings: {
    title: "Wedding Invitation",
    price: "₹999",
    image: weddingImg,
    labels: ["wedding", "photo"]
  },
  Birthday: {
    title: "Birthday Invitation",
    price: "₹1199",
    video: "/birthday.mp4",
    isVideo: true,
    labels: ["birthday", "video"]
  },
  BabyShower: {
    title: "Baby Shower Video Invitation",
    price: "₹999",
    image: babyImg,
    video: "/baby.mp4",
    isVideo: true,
    labels: ["baby", "photo", "video"]
  },
  Babymoon: {
    title: "Baby Shower Invitation",
    price: "₹499",
    image: babyImg,
    labels: ["baby", "photo"]
  },
  Mehendi: {
    title: "Mehendi Invitation",
    price: "₹499",
    image: mehendiImg,
    labels: ["mehendi", "photo"]
  },
  Haldi: {
    title: "Haldi Invitation",
    price: "₹499",
    image: haldiImg,
    labels: ["haldi", "photo"]
  },
  Sangeet: {
    title: "Sangeet Invitation",
    price: "₹499",
    image: sangeetImg,
    labels: ["sangeet", "photo"]
  },
  Engagement: {
    title: "Engagement Invitation",
    price: "₹499",
    image: engagementImg,
    labels: ["engagement", "photo"]
  },
  Reception: {
    title: "Reception Video Invitation",
    price: "₹799",
    video: "/reception.mp4",
    isVideo: true,
    labels: ["reception", "video"]
  },
  ReceptionPhoto: {
    title: "Reception Invitation",
    price: "₹499",
    image: receptionImg,
    labels: ["reception", "photo"]
  },
  Housewarming: {
    title: "Housewarming Invitation",
    price: "₹799",
    image: housewarmingImg,
    labels: ["housewarming", "photo"]
  },
  Godbharai: {
    title: "Godbharai Invitation",
    price: "₹599",
    image: godbharaiImg,
    labels: ["godbharai", "photo"]
  },
};

const testimonials = [
  {
    text: "Absolutely loved the design! Got my daughter’s birthday invite within 24 hours.",
    name: "Shruti M",
  },
  {
    text: "Beautiful and elegant invitations. Highly recommended!",
    name: "Anjali K",
  },
  {
    text: "Very fast service and amazing quality designs!",
    name: "Ajinkya M",
  },  {
    text: "The team was super responsive and helped me customize my invitation perfectly!",
    name: "Priya S",
  },
  {
    text: "Outstanding work! Delivered before the deadline with excellent quality.",
    name: "Vikram T",
  },
  {
    text: "Best invitations I've ever seen. Worth every penny!",
    name: "Neha P",
  },];

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [index, setIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [showTemplateDetailsModal, setShowTemplateDetailsModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showOrderMethodModal, setShowOrderMethodModal] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]); // multi-label filter
  // const [previewMode, setPreviewMode] = useState("image"); // unused
  const [templateDetails, setTemplateDetails] = useState({
    detailType: "single", // "single" or "couple"
    guestName: "",
    guestTitle: "",
    brideName: "",
    groomName: "",
    guestImage: null,
    brideImage: null,
    groomImage: null,
    customColor: "#FF69B4",
    additionalNotes: "",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [customIdea, setCustomIdea] = useState("");
  const [additionalRequest, setAdditionalRequest] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderConfirmationMessage, setOrderConfirmationMessage] = useState("");

  // Set default date to current date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Force video autoplay for mobile and web
  useEffect(() => {
    const playAllVideos = () => {
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        if (video.paused) {
          video.play().catch(err => {
            // Silent catch - some browsers may block autoplay
            console.log('Video autoplay not allowed:', err);
          });
        }
      });
    };

    // Play videos immediately
    playAllVideos();

    // Play videos when they're loaded
    const observer = new MutationObserver(() => {
      playAllVideos();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // Protection against developer tools and unauthorized access
  useEffect(() => {
    // Disable right-click globally
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    // Disable copy
    const handleCopy = (e) => e.preventDefault();
    document.addEventListener('copy', handleCopy);

    // Disable drag for all media
    const handleDragStart = (e) => e.preventDefault();
    document.addEventListener('dragstart', handleDragStart);

    // Disable developer tools shortcuts
    const handleKeyDown = (e) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U') // Disable View Page Source
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Disable inspect element on media elements
    const preventElementInspection = (e) => {
      if (e.target.tagName === 'VIDEO' || e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', preventElementInspection);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', preventElementInspection);
    };
  }, []);

  const handleSelectTemplate = (templateName) => {
    setSelectedTemplate(templateName);
    setShowTemplateDetailsModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseTemplateModal = () => {
    setShowTemplateDetailsModal(false);
    document.body.style.overflow = "auto";
  };

  const handleOpenContactModal = () => {
    setShowContactModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseContactModal = () => {
    setShowContactModal(false);
    document.body.style.overflow = "auto";
  };

  const handleTemplateDetailsChange = (field, value) => {
    setTemplateDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setTemplateDetails(prev => ({
  //         ...prev,
  //         guestImage: reader.result
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleProceedToOrder = () => {
    handleCloseTemplateModal();
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    // Scroll to order section
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  // Form validation function - only checks, doesn't set state
  const checkFormValid = () => {
    if (!selectedTemplate || selectedTemplate.trim() === "") return false;
    if (selectedTemplate === "Custom" && (!customIdea || customIdea.trim() === "")) return false;
    if (!name || name.trim() === "") return false;
    if (!email || email.trim() === "") return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
    if (!phone || phone.trim() === "") return false;
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) return false;
    if (!event || event.trim() === "") return false;
    if (!date || date.trim() === "") return false;
    if (!venue || venue.trim() === "") return false;
    return true;
  };

  // Real-time email validation
  const validateEmail = (emailValue) => {
    if (!emailValue) return "Email address is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      return "Invalid email format (e.g., user@example.com)";
    }
    return "";
  };

  // Real-time phone validation
  const validatePhone = (phoneValue) => {
    if (!phoneValue) return "Phone number is required";
    const digitsOnly = phoneValue.replace(/\D/g, "");
    if (digitsOnly.length === 0) return "Phone number is required";
    if (digitsOnly.length < 10) return `Phone number must be 10 digits (${digitsOnly.length}/10)`;
    if (digitsOnly.length > 10) return "Phone number must be exactly 10 digits";
    return "";
  };

  // Handle email change with real-time validation
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (validationErrors.email) {
      const error = validateEmail(newEmail);
      setValidationErrors(prev => ({
        ...prev,
        email: error
      }));
    }
  };

  // Handle phone change with real-time validation
  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    if (validationErrors.phone) {
      const error = validatePhone(newPhone);
      setValidationErrors(prev => ({
        ...prev,
        phone: error
      }));
    }
  };

  // Real-time validation function - validates and sets errors
  const validateForm = () => {
    const errors = {};
    
    if (!selectedTemplate || selectedTemplate.trim() === "") {
      errors.template = "Please select a template";
    } else if (selectedTemplate === "Custom" && (!customIdea || customIdea.trim() === "")) {
      errors.customIdea = "Please describe your custom template idea";
    }
    if (!name || name.trim() === "") {
      errors.name = "Full name is required";
    }
    
    // Email validation
    const emailError = validateEmail(email);
    if (emailError) {
      errors.email = emailError;
    }
    
    // Phone validation
    const phoneError = validatePhone(phone);
    if (phoneError) {
      errors.phone = phoneError;
    }
    
    if (!event || event.trim() === "") {
      errors.event = "Event type is required";
    }
    if (!date || date.trim() === "") {
      errors.date = "Event date is required";
    }
    if (!venue || venue.trim() === "") {
      errors.venue = "Venue location is required";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle WhatsApp order submission - sends all details via WhatsApp
  const handleWhatsAppOrderSubmit = () => {
    if (!validateForm()) return;

    // Format the message with all order details
    const templatePrice = selectedTemplate === "Custom" ? "Custom Quote" : templates[selectedTemplate]?.price || "Price on Request";
    const templateName = selectedTemplate === "Custom" ? "🎨 Custom Template" : templates[selectedTemplate]?.title || selectedTemplate;

    const message = `📋 *NEW ORDER REQUEST*

*BILLING DETAILS:*
👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}

*TEMPLATE VIEW DETAILS:*
${templateDetails.detailType === "couple" ? 
  `💒 *BRIDE DETAILS:*
👰 Name: ${templateDetails.brideName || "Not provided"}
💍 Title: ${templateDetails.brideTitle || "Not provided"}
🖼️ Image: ${templateDetails.brideImage ? "✅ Image Attached" : "❌ No image"}

💒 *GROOM DETAILS:*
🤵 Name: ${templateDetails.groomName || "Not provided"}
🎩 Title: ${templateDetails.groomTitle || "Not provided"}
🖼️ Image: ${templateDetails.groomImage ? "✅ Image Attached" : "❌ No image"}`
  : 
  `👥 Guest Name: ${templateDetails.guestName || "Not provided"}
🎭 Guest Title: ${templateDetails.guestTitle || "Not provided"}
🖼️ Guest Image: ${templateDetails.guestImage ? "✅ Image Attached" : "❌ No image"}`
}
🎨 Custom Color: ${templateDetails.customColor || "#FF69B4"}
📝 Template Notes: ${templateDetails.additionalNotes || "None"}

*EVENT DETAILS:*
🎉 Event Type: ${event}
📅 Event Date: ${date}
📍 Venue: ${venue}

*TEMPLATE SELECTION:*
✨ Template: ${templateName}
💰 Price: ${templatePrice}
${selectedTemplate === "Custom" ? `\n*CUSTOM TEMPLATE DESCRIPTION:*\n${customIdea}` : ""}
${additionalRequest ? `\n*ADDITIONAL REQUESTS:*\n${additionalRequest}` : ""}

*Submitted At:* ${new Date().toLocaleString()}

Please confirm the order and provide further details.`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappPhone = "917972770968"; // Business WhatsApp number
    const whatsappURL = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;

    // Show success message immediately
    setOrderSubmitted(true);
    setOrderConfirmationMessage(`✅ Order Sent to WhatsApp!\n\nRedirecting you to WhatsApp...\n\nOur team will respond to your order for ${templateName} shortly.\n\nThank you!`);

    // Open WhatsApp after a short delay
    setTimeout(() => {
      window.open(whatsappURL, "_blank");
    }, 500);

    // Reset form after 3 seconds
    setTimeout(() => {
      setOrderSubmitted(false);
      setName("");
      setEmail("");
      setPhone("");
      setEvent("");
      setDate(new Date().toISOString().split('T')[0]);
      setVenue("");
      setSelectedTemplate("");
      setCustomIdea("");
      setAdditionalRequest("");
      setValidationErrors({});
    }, 3000);
  };

  // Compute form validity for render - doesn't update state
  const isFormValid = checkFormValid();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <style>{`
        video, img {
          user-select: none;
          pointer-events: auto;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -webkit-touch-callout: none;
        }
        video::selection, img::selection {
          background: transparent;
        }
        * {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: text;
        }
        .housewarming-image {
          object-fit: cover;
        }
        .logo-rounded {
          border-radius: 100%;
          object-fit: inherit; !important;
        }
          .logo-txt {
          font-size: 1.55rem; /* Base size for mobile */ 
        }
      `}</style>
      {/* � PRIVACY POLICY MODAL */}
      {showPrivacyPolicy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowPrivacyPolicy(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-2xl w-full border-2 border-pink-200 my-auto mx-3 sm:mx-0"
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setShowPrivacyPolicy(false)}
              whileHover={{ scale: 1.1 }}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold p-2 rounded-full hover:bg-gray-100 transition-all"
            >
              ✕
            </motion.button>

            {/* Header */}
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4 sm:mb-6">Privacy Policy</h2>

            {/* Content */}
            <div className="space-y-6 text-gray-700 max-h-96 overflow-y-auto pr-4">
              <section>
                <h3 className="font-bold text-lg text-gray-800 mb-2">1. Information We Collect</h3>
                <p>We collect personal information such as your name, email address, phone number, and event details when you use our invitation services. We may also collect information about your customization preferences and uploaded images.</p>
              </section>

              <section>
                <h3 className="font-bold text-lg text-gray-800 mb-2">2. How We Use Your Information</h3>
                <p>Your information is used to create and deliver your digital invitations, communicate with you about your order, and improve our services. We may use your contact details to send order updates and promotional offers.</p>
              </section>

              <section>
                <h3 className="font-bold text-lg text-gray-800 mb-2">3. Data Security</h3>
                <p>We take your privacy seriously and implement industry-standard security measures to protect your personal information. Your data is encrypted and stored securely on our servers.</p>
              </section>

              <section>
                <h3 className="font-bold text-lg text-gray-800 mb-2">4. Sharing Your Information</h3>
                <p>We do not sell, trade, or rent your personal information to third parties. Your information is kept confidential and used only for the purposes stated in this policy.</p>
              </section>

              <section>
                <h3 className="font-bold text-lg text-gray-800 mb-2">5. Your Rights</h3>
                <p>You have the right to access, modify, or delete your personal information at any time. Please contact us at ecard.invitation.studio@gmail.com to exercise these rights.</p>
              </section>

              <section>
                <h3 className="font-bold text-lg text-gray-800 mb-2">6. Contact Us</h3>
                <p>If you have any questions about our privacy policy, please contact us at <a href="mailto:ecard.invitation.studio@gmail.com" className="text-pink-500 hover:text-pink-600 font-semibold">ecard.invitation.studio@gmail.com</a> or call <a href="tel:7972770968" className="text-pink-500 hover:text-pink-600 font-semibold">7972770968</a>.</p>
              </section>

              <section>
                <p className="text-xs text-gray-500 italic">Last updated: April 21, 2026</p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ORDER METHOD MODAL - WhatsApp Only */}
      {showOrderMethodModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowOrderMethodModal(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 max-w-sm w-full border-2 border-green-300 mx-3 sm:mx-0"
          >
            <motion.button
              onClick={() => setShowOrderMethodModal(false)}
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-2xl font-bold rounded-full hover:shadow-2xl transition-all flex items-center justify-center border-2 border-white shadow-lg"
            >
              ✕
            </motion.button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">📱 Order via WhatsApp</h2>
              <p className="text-gray-600 text-sm">Send your complete order details directly to our team</p>
            </div>

            <motion.button
              onClick={() => {
                handleWhatsAppOrderSubmit();
                setShowOrderMethodModal(false);
              }}
              whileHover={{ scale: 1.08, x: 10 }}
              whileTap={{ scale: 0.95 }}
              className="w-full p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:shadow-xl transition-all cursor-pointer border-2 border-green-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <img src={whatsappImg} alt="WhatsApp" className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-800 text-lg">Send Order on WhatsApp</p>
                  <p className="text-sm text-gray-600">Instant & Secure</p>
                </div>
              </div>
            </motion.button>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
              <p className="text-sm text-gray-700 text-center font-semibold mb-2">✅ Your order will include:</p>
              <ul className="text-xs text-gray-600 space-y-1 text-left">
                <li>✓ All billing details</li>
                <li>✓ Event information</li>
                <li>✓ Template selection & price</li>
                <li>✓ Custom requests</li>
              </ul>
              <p className="text-xs text-gray-700 text-center font-semibold mt-3">⚡ Our team responds within minutes!</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* 📞 CONTACT MODAL */}
      {showContactModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseContactModal}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 max-w-md w-full border-2 border-pink-200 mx-3 sm:mx-0"
          >
            {/* Close Button - Fixed to viewport */}
            <motion.button
              onClick={handleCloseContactModal}
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="fixed top-10 right-8 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-3xl font-bold rounded-full hover:shadow-2xl transition-all flex items-center justify-center z-[60] border-2 border-white shadow-lg"
            >
              ✕
            </motion.button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">Get In Touch</h2>
              <p className="text-gray-600">We're here to help! Reach out to us anytime.</p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Phone */}
              <motion.a
                href="tel:7972770968"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl hover:shadow-lg transition-all cursor-pointer border-2 border-pink-200"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold">Phone</p>
                  <p className="text-lg font-bold text-gray-800">7972770968</p>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:ecard.invitation.studio@gmail.com"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl hover:shadow-lg transition-all cursor-pointer border-2 border-pink-200"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xl">✉️</span>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold">Email</p>
                  <p className="text-lg font-bold text-gray-800">ecard.invitation.studio@gmail.com</p>
                </div>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/917972770968"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:shadow-lg transition-all cursor-pointer border-2 border-green-200"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <img src={whatsappImg} alt="WhatsApp" className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold">WhatsApp</p>
                  <p className="text-lg font-bold text-gray-800">Chat with us</p>
                </div>
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/ecard_invitation_studio?igsh=MTE5bDcxeXFmem95cw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 via-purple-50 to-red-50 rounded-2xl hover:shadow-lg transition-all cursor-pointer border-2 border-pink-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#instagramGrad)" />
                    <defs>
                      <linearGradient id="instagramGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#feda75" />
                        <stop offset="5%" stopColor="#fa7e1e" />
                        <stop offset="45%" stopColor="#d92e7f" />
                        <stop offset="60%" stopColor="#9b36b7" />
                        <stop offset="90%" stopColor="#515bd4" />
                      </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="3.5" fill="white" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold">Instagram</p>
                  <p className="text-lg font-bold text-gray-800">@ecard_invitation_studio</p>
                </div>
              </motion.a>
            </div>

            {/* Footer Message */}
            <div className="mt-8 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl border-2 border-pink-200">
              <p className="text-sm text-gray-700 text-center font-semibold">✨ We typically respond within a few minutes!</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ✅ NOTIFICATION */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-4 rounded-full shadow-lg font-semibold text-lg flex items-center gap-3"
        >
          <span className="text-2xl">✅</span>
          <span>Template details saved successfully!</span>
        </motion.div>
      )}

      {/* 📋 TEMPLATE DETAILS PAGE */}
      {showTemplateDetailsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 z-40 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="min-h-screen w-full py-6 sm:py-10 px-3 sm:px-4"
          >
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-6 sm:mb-8 flex justify-between items-start px-2 sm:px-4">
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm text-gray-600 mb-2 uppercase tracking-widest font-semibold"
                >
                  Customize Your Invitation
                </motion.p>
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  {selectedTemplate} Invitation
                </h1>
              </div>
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCloseTemplateModal}
                className="text-gray-600 hover:text-gray-900 text-3xl font-bold p-3 rounded-full hover:bg-white/50 transition-all"
              >
                ✕
              </motion.button>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-pink-100">

            <div className="space-y-6">
              {/* Template Preview */}
              <div className="bg-gradient-to-b from-pink-50 to-purple-50 p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-4">Template Preview</h3>
                {templates[selectedTemplate]?.isVideo ? (
                  <div className="relative select-none">
                    <video
                      src={templates[selectedTemplate]?.video}
                      poster={templates[selectedTemplate]?.image}
                      controls
                      controlsList="nodownload nofullscreen"
                      className="w-full h-auto object-contain rounded-xl select-none"
                      preload="auto"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl pointer-events-none">
                      <div className="text-black/40 text-4xl font-bold transform -rotate-45 text-center">ecard_invitation_studio</div>
                    </div>
                  </div>
                ) : templates[selectedTemplate]?.video ? (
                  <div className="grid md:grid-cols-2 gap-4 select-none">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">📷 Image Preview</p>
                      <div className="relative">
                      <img
                        src={templates[selectedTemplate]?.image}
                        alt={selectedTemplate}
                        fetchPriority="high"
                        className="w-full h-auto object-contain rounded-xl border-2 border-pink-200 select-none"
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        onCopy={(e) => e.preventDefault()}
                        onMouseDown={(e) => e.preventDefault()}
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-xl pointer-events-none">
                          <div className="text-black/40 text-3xl font-bold transform -rotate-45 text-center">ecard_invitation_studio</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">🎥 Video Preview</p>
                      <div className="relative">
                        <video
                          src={templates[selectedTemplate]?.video}
                          poster={['Wedding', 'BabyShower'].includes(selectedTemplate) ? undefined : templates[selectedTemplate]?.image}
                          controls
                          controlsList="nodownload nofullscreen"
                          className="w-full h-auto object-contain rounded-xl border-2 border-blue-200 select-none"
                          preload="auto"
                          onContextMenu={(e) => e.preventDefault()}
                          onDragStart={(e) => e.preventDefault()}
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-xl pointer-events-none">
                          <div className="text-black/40 text-3xl font-bold transform -rotate-45 text-center">ecard_invitation_studio</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative select-none">
                    <motion.img
                      src={templates[selectedTemplate]?.image}
                      alt={selectedTemplate}
                      fetchPriority="high"
                      className={`w-full h-auto object-contain rounded-xl select-none ${selectedTemplate === "Housewarming" ? "housewarming-image" : ""}`}
                      whileHover={{ scale: 1.05 }}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl pointer-events-none">
                      <div className="text-black/40 text-4xl font-bold transform -rotate-45 text-center">ecard_invitation_studio</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg mb-4">Your Details</h3>
                
                {/* Detail Type Toggle */}
                <div className="flex gap-4 mb-6">
                  <label className="flex items-center gap-2 cursor-pointer p-3 border-2 border-pink-200 rounded-xl hover:bg-pink-50 transition-all" style={{borderColor: templateDetails.detailType === "single" ? "#ec4899" : "#fce7f3"}}>
                    <input
                      type="radio"
                      name="detailType"
                      value="single"
                      checked={templateDetails.detailType === "single"}
                      onChange={(e) => handleTemplateDetailsChange("detailType", e.target.value)}
                      className="cursor-pointer"
                    />
                    <span className="font-semibold">👤 Single Person</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-3 border-2 border-pink-200 rounded-xl hover:bg-pink-50 transition-all" style={{borderColor: templateDetails.detailType === "couple" ? "#ec4899" : "#fce7f3"}}>
                    <input
                      type="radio"
                      name="detailType"
                      value="couple"
                      checked={templateDetails.detailType === "couple"}
                      onChange={(e) => handleTemplateDetailsChange("detailType", e.target.value)}
                      className="cursor-pointer"
                    />
                    <span className="font-semibold">💒 Bride & Groom</span>
                  </label>
                </div>

                {/* Single Person Fields */}
                {templateDetails.detailType === "single" && (
                  <div className="space-y-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <input
                      type="text"
                      placeholder="Person's Name / Main Guest Name"
                      value={templateDetails.guestName}
                      onChange={(e) => handleTemplateDetailsChange("guestName", e.target.value)}
                      className="w-full p-3 border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Title/Role (e.g., Birthday Girl, Guest of Honor)"
                      value={templateDetails.guestTitle}
                      onChange={(e) => handleTemplateDetailsChange("guestTitle", e.target.value)}
                      className="w-full p-3 border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none"
                    />
                    <div>
                      <label className="block font-semibold mb-2">Upload Photo (Optional)</label>
                      <label className="w-full p-4 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setTemplateDetails(prev => ({
                                  ...prev,
                                  guestImage: reader.result
                                }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                        <div className="text-center">
                          <span className="text-2xl">📷</span>
                          <p className="text-blue-600 font-semibold">Click to upload image</p>
                          <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                        </div>
                      </label>
                      {templateDetails.guestImage && (
                        <div className="mt-3">
                          <img src={templateDetails.guestImage} alt="Uploaded" className="h-32 w-32 object-cover rounded-lg" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bride & Groom Fields */}
                {templateDetails.detailType === "couple" && (
                  <div className="space-y-6">
                    {/* Bride Section */}
                    <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200">
                      <h4 className="font-bold text-lg text-red-600 mb-4">👰 Bride Details</h4>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Bride's Name"
                          value={templateDetails.brideName}
                          onChange={(e) => handleTemplateDetailsChange("brideName", e.target.value)}
                          className="w-full p-3 border-2 border-red-200 rounded-xl focus:border-red-400 focus:outline-none"
                        />
                        <div>
                          <label className="block font-semibold mb-2">Bride's Photo (Optional)</label>
                          <label className="w-full p-4 border-2 border-dashed border-red-300 rounded-xl cursor-pointer hover:bg-red-100 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setTemplateDetails(prev => ({
                                      ...prev,
                                      brideImage: reader.result
                                    }));
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                            />
                            <div className="text-center">
                              <span className="text-2xl">📷</span>
                              <p className="text-red-600 font-semibold">Click to upload bride's image</p>
                              <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                            </div>
                          </label>
                          {templateDetails.brideImage && (
                            <div className="mt-3">
                              <img src={templateDetails.brideImage} alt="Bride" className="h-32 w-32 object-cover rounded-lg" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Groom Section */}
                    <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                      <h4 className="font-bold text-lg text-blue-600 mb-4">🤵 Groom Details</h4>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Groom's Name"
                          value={templateDetails.groomName}
                          onChange={(e) => handleTemplateDetailsChange("groomName", e.target.value)}
                          className="w-full p-3 border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none"
                        />
                        <div>
                          <label className="block font-semibold mb-2">Groom's Photo (Optional)</label>
                          <label className="w-full p-4 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setTemplateDetails(prev => ({
                                      ...prev,
                                      groomImage: reader.result
                                    }));
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                            />
                            <div className="text-center">
                              <span className="text-2xl">📷</span>
                              <p className="text-blue-600 font-semibold">Click to upload groom's image</p>
                              <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                            </div>
                          </label>
                          {templateDetails.groomImage && (
                            <div className="mt-3">
                              <img src={templateDetails.groomImage} alt="Groom" className="h-32 w-32 object-cover rounded-lg" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  {/* <label className="block font-semibold mb-3">Choose Color Theme</label>
                  <div className="flex gap-4 items-center mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className="text-sm font-semibold">Custom Color:</span>
                      <input
                        type="color"
                        value={templateDetails.customColor}
                        onChange={(e) => handleTemplateDetailsChange("customColor", e.target.value)}
                        className="w-14 h-10 rounded-lg cursor-pointer border-2 border-pink-200"
                      />
                    </label>
                    <span className="text-xs text-gray-600">{templateDetails.customColor}</span>
                  </div> */}
                  
                  {/* <label className="block font-semibold mb-2 text-sm">Premium color presets:</label> */}
                  {/* <div className="flex gap-2">
                    {["#FF69B4", "#A020F0", "#FF1493", "#4169E1", "#20B2AA", "#DC143C", "#FFD700", "#9932CC"].map(color => (
                      <motion.button
                        key={color}
                        onClick={() => handleTemplateDetailsChange("customColor", color)}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 rounded-full border-3 transition-all shadow-md ${
                          templateDetails.customColor === color ? "border-gray-900 shadow-lg ring-2 ring-gray-400" : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))} */}
                  {/* </div> */}
                </div>

                <textarea
                  placeholder="Additional notes or special requests (Optional)"
                  value={templateDetails.additionalNotes}
                  onChange={(e) => handleTemplateDetailsChange("additionalNotes", e.target.value)}
                  className="w-full p-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none resize-none h-20"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-pink-100">
                <motion.button
                  onClick={handleCloseTemplateModal}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-8 py-4 border-2 border-pink-500 text-pink-500 rounded-xl font-bold text-lg hover:bg-pink-50 transition-colors"
                >
                  Back to Templates
                </motion.button>
                <motion.button
                  onClick={handleProceedToOrder}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Proceed to Order →
                </motion.button>
              </div>
            </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* 🎯 SCROLLING BANNER */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-1 sm:py-2 overflow-hidden sticky top-0 z-50">
        <motion.div
          animate={{ x: [1000, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="whitespace-nowrap font-semibold text-xs sm:text-lg"
        >
          ✨ Get 10% OFF on your first order! ✨ Free customization & revisions! ✨ Delivery in 24 hours! ✨ Premium quality designs! ✨ 100% customer satisfaction! ✨ ALL TYPES OF INVITATIONS - Weddings, Birthdays, Baby Showers, Housewarmings & More! ✨ Contact us now to create your perfect digital invitation! ✨
        </motion.div>
      </div>
      
      {/* 🔝 NAVIGATION BAR */}
      <nav className="fixed top-9 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-16 py-2.5 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.10 }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
          >
            {/* Logo Image - Circular with professional styling logo-rounded bg-gradient-to-br from-pink-100 to-purple-100  shadow-lg ring-2 ring-pink-200 relative overflow-hidden group-hover:ring-pink-400 transition-all */}
            <div className="w-10 sm:w-14 h-10 sm:h-14 flex items-center justify-center flex-shrink-0">
              <img
                src={sitelogo}
                alt="Ecard Invitations Logo"
                className="w-9 sm:w-12 h-9 sm:h-12 object-contain logo-rounded"
              />
            </div>
            <div className="block">
              <p className="font-black text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-xs sm:text-sm md:text-lg logo-txt leading-none">
                Ecard Invitations Studio <span className="text-yellow-400">✨</span>
              </p>
            </div>
          </motion.div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex gap-8 items-center">
            <a href="#home" className="text-gray-700 hover:text-pink-500 font-semibold transition-colors text-sm">
              Home
            </a>
            <a href="#templates" className="text-gray-700 hover:text-pink-500 font-semibold transition-colors text-sm">
              Templates
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-pink-500 font-semibold transition-colors text-sm">
              Testimonials
            </a>
            <a href="#order" className="text-gray-700 hover:text-pink-500 font-semibold transition-colors text-sm">
              Contact
            </a>
            <motion.button
              onClick={handleOpenContactModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all text-sm"
            >
              Order
            </motion.button>
          </div>

          {/* Mobile Menu - Navigation Links and Contact */}
          <div className="md:hidden flex gap-2 items-center flex-shrink-0">
            <div className="flex gap-1 sm:gap-2 items-center">
              <a href="#templates" className="text-gray-700 hover:text-pink-500 font-semibold transition-colors text-xs sm:text-sm px-2 py-1">
                Templates
              </a>
              <a href="#order" className="text-gray-700 hover:text-pink-500 font-semibold transition-colors text-xs sm:text-sm px-2 py-1">
                Order
              </a>
            </div>
            <motion.button
              onClick={handleOpenContactModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-sm shadow-md whitespace-nowrap"
            >
              Contact
            </motion.button>
          </div>
        </div>
      </nav>

      
      {/* �💎 HEADER */}
      <section
        id="home"
        className="min-h-screen flex items-center px-4 sm:px-6 md:px-16 relative overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-6 sm:gap-10 max-w-6xl mx-auto items-center pt-20 md:pt-0">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
          >

            {/* 💎 BRAND */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 sm:mb-6"
            >
              {/* <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(236,72,153,0.4)]">
                Ecard Invitation Studio <span className="text-yellow-400">✨</span>
              </h2> */}

           
              <p className="mt-2 sm:mt-3 text-base sm:text-lg md:text-xl font-semibold text-gray-700 italic">
                We design emotions, not just invitations
              </p>

                 {/* ✨ SHIMMER LINE */}
              <div className="h-1 w-32 mt-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>

            </motion.div>

            {/* MAIN HEADING */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
              Create Stunning <br />
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Digital Invitations
              </span>
            </h1>

            <p className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-700">
              Elegant, modern and customized invitations for every special moment.
            </p>

            {/* 🎠 TESTIMONIAL */}
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4 sm:mb-6 bg-white/80 p-3 sm:p-4 rounded-xl shadow"
            >
              <p className="text-yellow-500 text-sm">★★★★★</p>
              <p className="text-gray-600 italic text-xs sm:text-sm">
                “{testimonials[index].text}”
              </p>
              <p className="text-xs text-gray-500 mt-1">
                — {testimonials[index].name}
              </p>
            </motion.div>

            {/* 🎬 FEATURES */}
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/80 px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow flex gap-2 text-xs sm:text-base">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 flex-shrink-0" /> <span className="hidden sm:inline">Fast Delivery</span><span className="sm:hidden">Fast</span>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/80 px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow flex gap-2 text-xs sm:text-base">
                <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" /> <span className="hidden sm:inline">Custom Designs</span><span className="sm:hidden">Custom</span>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/80 px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow flex gap-2 text-xs sm:text-base">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" /> <span className="hidden sm:inline">Easy WhatsApp Order</span><span className="sm:hidden">WhatsApp</span>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/80 px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow flex gap-2 text-xs sm:text-base">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" /> <span className="hidden sm:inline">Premium Quality</span><span className="sm:hidden">Premium</span>
              </motion.div>
            </div>

            {/* 🚀 BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <a href="#templates" className="flex-1 sm:flex-none">
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base">
                  <Gift className="inline w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-yellow-400" /> Explore
                </button>
              </a>

              <a href="#order" className="flex-1 sm:flex-none">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 0px #ff69b4",
                      "0 0 20px #ff69b4",
                      "0 0 0px #ff69b4",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base"
                >
                  ✨ Order Now
                </motion.button>
              </a>

                <motion.button
                  onClick={handleOpenContactModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 0px #ff69b4",
                      "0 0 20px #ff69b4",
                      "0 0 0px #ff69b4",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" /> Contact Us
                </motion.button>
            </div>
          </motion.div>

          {/* IMAGE */}
          <motion.img
            src={headerImg}
            alt="Header showcase image"
            className="rounded-2xl shadow-xl hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          />

        </div>
      </section>

      {/* 🎨 TEMPLATES */}
      <section id="templates" className="py-12 sm:py-20 text-center bg-gradient-to-b from-white to-pink-50">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-8 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
        >
          Choose Your Template
        </motion.h2>

        {/* Multi-label Filter UI */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-10 px-2 sm:px-6">
          <button
            key="all"
            onClick={() => setSelectedLabels([])}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 font-semibold transition-all duration-200 text-xs sm:text-sm capitalize ${
              selectedLabels.length === 0
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-pink-500"
                : "bg-white text-pink-500 border-pink-200 hover:bg-pink-50"
            }`}
          >
            All
          </button>
          {Array.from(
            new Set(
              Object.values(templates).flatMap((t) => t.labels || [])
            )
          ).map((label) => (
            <button
              key={label}
              onClick={() => {
                setSelectedLabels((prev) =>
                  prev.includes(label)
                    ? prev.filter((l) => l !== label)
                    : [...prev, label]
                );
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 font-semibold transition-all duration-200 text-xs sm:text-sm capitalize ${
                selectedLabels.includes(label)
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-pink-500"
                  : "bg-white text-pink-500 border-pink-200 hover:bg-pink-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-3 sm:px-6">
          {Object.keys(templates)
            .filter((key) => {
              if (selectedLabels.length === 0) return true;
              const labels = templates[key].labels || [];
              // Strict AND filtering: show only if ALL selected labels are present
              return selectedLabels.every((l) => labels.includes(l));
            })
            .map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100 overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 to-purple-400"></div>
                <div className="relative">
                  {templates[key].isVideo ? (
                    <div className="relative group select-none overflow-hidden rounded-xl mb-4">
                      <video
                        key={`video-${key}`}
                        src={templates[key].video}
                        poster={templates[key].image}
                        className="h-48 sm:h-80 lg:h-96 w-full object-cover rounded-xl select-none group-hover:scale-105 transition-transform duration-300"
                        preload="auto"
                        autoPlay
                        muted
                        loop
                        playsInline
                        webkit-playsinline="true"
                        defaultMuted
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        onCanPlay={(e) => e.target.play()}
                      />
                      <div className="absolute inset-0 flex items-center justify-center rounded-xl pointer-events-none">
                        <div className="text-black/40 text-2xl font-bold transform -rotate-45 text-center">ecard_invitation_studio</div>
                      </div>
                    </div>
                  ) : templates[key].video ? (
                    <div className="relative h-48 sm:h-80 lg:h-96 rounded-xl mb-4 overflow-hidden select-none">
                      <img
                        src={templates[key].image}
                        alt={templates[key].title}
                        fetchPriority="low"
                        className="h-48 sm:h-80 lg:h-96 w-full object-cover rounded-xl hover:scale-105 transition-transform duration-300 select-none"
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        onCopy={(e) => e.preventDefault()}
                        onMouseDown={(e) => e.preventDefault()}
                      />
                      <div className="absolute inset-0 flex items-center justify-center rounded-xl pointer-events-none">
                        <div className="text-black/40 text-2xl font-bold transform -rotate-45 text-center">ecard_invitation_studio</div>
                      </div>
                      <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <span>🎥</span> Has Video
                      </div>
                    </div>
                  ) : (
                    <motion.div className="relative select-none">
                      <motion.img
                        src={templates[key].image}
                        alt={templates[key].title}
                        fetchPriority="low"
                        className={`h-48 sm:h-80 lg:h-96 w-full object-cover rounded-xl mb-4 select-none ${key === "Housewarming" ? "housewarming-image" : ""}`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        onCopy={(e) => e.preventDefault()}
                        onMouseDown={(e) => e.preventDefault()}
                      />
                      <div className="absolute inset-0 flex items-center justify-center rounded-xl pointer-events-none">
                        <div className="text-black/40 text-2xl font-bold transform -rotate-45 text-center">ecard_invitation_studio</div>
                      </div>
                    </motion.div>
                  )}
                </div>
                {/* Labels display */}
                <div className="flex flex-wrap gap-2 mb-2 justify-center">
                  {(templates[key].labels || []).map((label) => (
                    <span
                      key={label}
                      className="px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold border border-pink-200 capitalize"
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{templates[key].title}</h3>
                <p className="text-2xl font-semibold text-pink-500 mb-4">{templates[key].price}</p>

                <motion.button
                  onClick={() => handleSelectTemplate(key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  View Template
                </motion.button>
              </motion.div>
            ))}
        </div>
      </section>

      {/* 📝 ORDER FORM */}
      <section id="order" className="py-12 sm:py-20 text-center bg-gradient-to-b from-purple-50 via-pink-50 to-white">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Place Your Order
        </motion.h2>
        <p className="text-gray-600 mb-12 text-lg">Fill in your details below and we'll create your perfect invitation</p>

        {orderSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl border-2 border-green-300 shadow-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl mb-4 text-center"
            >
              ✅
            </motion.div>
            <p className="text-center text-gray-800 font-semibold text-lg whitespace-pre-line">{orderConfirmationMessage}</p>
          </motion.div>
        )}

        {!orderSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-pink-100 grid md:grid-cols-2 gap-6 sm:gap-10"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">📋</span>
              <h3 className="text-2xl font-bold text-gray-800">Billing Details</h3>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 font-medium ${
                  validationErrors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-pink-200 focus:border-pink-500 focus:ring-pink-200"
                }`}
              />
              {validationErrors.name && (
                <p className="text-red-600 text-sm mt-2 font-bold bg-red-50 p-2 rounded-lg border-l-4 border-red-500">⚠️ {validationErrors.name}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => {
                  const error = validateEmail(email);
                  if (error) {
                    setValidationErrors(prev => ({
                      ...prev,
                      email: error
                    }));
                  }
                }}
                className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 font-medium ${
                  validationErrors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-pink-200 focus:border-pink-500 focus:ring-pink-200"
                }`}
              />
              {validationErrors.email && (
                <p className="text-red-600 text-sm mt-2 font-bold bg-red-50 p-3 rounded-lg border-l-4 border-red-500 flex items-start gap-2">
                  <span className="text-lg mt-0.5">❌</span>
                  <span>{validationErrors.email}</span>
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={() => {
                  const error = validatePhone(phone);
                  if (error) {
                    setValidationErrors(prev => ({
                      ...prev,
                      phone: error
                    }));
                  }
                }}
                className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 font-medium ${
                  validationErrors.phone
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-pink-200 focus:border-pink-500 focus:ring-pink-200"
                }`}
              />
              {validationErrors.phone && (
                <p className="text-red-600 text-sm mt-2 font-bold bg-red-50 p-3 rounded-lg border-l-4 border-red-500 flex items-start gap-2">
                  <span className="text-lg mt-0.5">❌</span>
                  <span>{validationErrors.phone}</span>
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event Type *</label>
              <input
                type="text"
                required
                placeholder="e.g., Wedding, Birthday, Mehendi"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 font-medium ${
                  validationErrors.event
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-pink-200 focus:border-pink-500 focus:ring-pink-200"
                }`}
              />
              {validationErrors.event && (
                <p className="text-red-600 text-sm mt-2 font-bold bg-red-50 p-2 rounded-lg border-l-4 border-red-500">⚠️ {validationErrors.event}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date *</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 font-medium ${
                  validationErrors.date
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-pink-200 focus:border-pink-500 focus:ring-pink-200"
                }`}
              />
              {validationErrors.date && (
                <p className="text-red-600 text-sm mt-2 font-bold bg-red-50 p-2 rounded-lg border-l-4 border-red-500">⚠️ {validationErrors.date}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">Venue Location *</label>
              <input
                type="text"
                required
                placeholder="Enter event venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 font-medium ${
                  validationErrors.venue
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-pink-200 focus:border-pink-500 focus:ring-pink-200"
                }`}
              />
              {validationErrors.venue && (
                <p className="text-red-600 text-sm mt-2 font-bold bg-red-50 p-2 rounded-lg border-l-4 border-red-500">⚠️ {validationErrors.venue}</p>
              )}
            </motion.div>
          </div>

          <div className="flex flex-col justify-center items-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full"
            >
              <label className="block text-sm font-semibold text-gray-700 mb-3">Select Template *</label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 font-medium ${
                  validationErrors.template
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-pink-200 focus:border-pink-500 focus:ring-pink-200"
                }`}
              >
                <option value="">-- Choose a template --</option>
                <option value="Custom">✨ Custom Template (Tell us your idea!)</option>
                {Object.keys(templates).map((key) => (
                  <option key={key} value={key}>
                    {templates[key].title}
                  </option>
                ))}
              </select>
              {validationErrors.template && (
                <p className="text-red-500 text-xs mt-2 font-semibold">⚠️ {validationErrors.template}</p>
              )}
            </motion.div>

            {selectedTemplate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full space-y-4"
              >
                {selectedTemplate === "Custom" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Describe Your Template Idea *</label>
                    <textarea
                      placeholder="Tell us about your custom invitation idea (colors, design, theme, etc.)"
                      value={customIdea}
                      onChange={(e) => setCustomIdea(e.target.value)}
                      className={`w-full p-3 border-2 rounded-xl focus:ring-2 focus:outline-none resize-none h-24 font-medium ${
                        validationErrors.customIdea
                          ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                          : "border-pink-200 focus:border-pink-500 focus:ring-pink-200"
                      }`}
                    />
                    {validationErrors.customIdea && (
                      <p className="text-red-500 text-xs mt-1 font-semibold">⚠️ {validationErrors.customIdea}</p>
                    )}
                  </div>
                )}
                
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300 text-center">
                  <p className="text-sm text-gray-600 font-semibold">✅ Selected:</p>
                  <p className="text-lg font-bold text-green-600">
                    {selectedTemplate === "Custom" ? "🎨 Custom Template" : templates[selectedTemplate]?.title}
                  </p>
                  {selectedTemplate !== "Custom" && templates[selectedTemplate]?.price && (
                    <p className="text-xl font-bold text-pink-600 mt-2">
                      💰 Price: {templates[selectedTemplate].price}
                    </p>
                  )}
                  {selectedTemplate === "Custom" && (
                    <p className="text-xs text-gray-600 mt-2">We'll help you create something unique!</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Requests (Optional)</label>
                  <textarea
                    placeholder="Any special requests or notes for the design team?"
                    value={additionalRequest}
                    onChange={(e) => setAdditionalRequest(e.target.value)}
                    className="w-full p-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none resize-none h-20 font-medium"
                  />
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full"
            >
              <motion.button
                onClick={() => {
                  if (validateForm()) {
                    setShowOrderMethodModal(true);
                  }
                }}
                whileHover={isFormValid ? { scale: 1.08, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)" } : {}}
                whileTap={isFormValid ? { scale: 0.95 } : {}}
                animate={isFormValid ? {
                  boxShadow: [
                    "0 0 20px rgba(236, 72, 153, 0.2)",
                    "0 0 30px rgba(236, 72, 153, 0.4)",
                    "0 0 20px rgba(236, 72, 153, 0.2)",
                  ],
                } : {}}
                transition={isFormValid ? { boxShadow: { repeat: Infinity, duration: 3 } } : {}}
                disabled={!isFormValid}
                className={`w-full py-4 px-6 rounded-xl font-bold shadow-xl transition-all duration-300 text-lg flex items-center justify-center gap-2 ${
                  isFormValid
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white hover:shadow-2xl cursor-pointer"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed opacity-70"
                }`}
              >
                <img src={whatsappImg} alt="WhatsApp" className="w-6 h-6" />
                {isFormValid ? "Place Order on WhatsApp" : "Order Now"}
              </motion.button>
            </motion.div>

            <p className="text-xs text-gray-500 text-center">✅ Send order directly via WhatsApp - our team will respond within minutes!</p>
          </div>
        </motion.div>
        )}
      </section>

      {/* 🌟 TESTIMONIALS */}
      <section id="testimonials" className="py-12 sm:py-20 text-center bg-gradient-to-b from-pink-50 to-purple-50">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
        >
          Our Testimonials
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-3 sm:px-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white px-3 sm:px-4 py-3 sm:py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-pink-100"
            >
              <div className="text-yellow-400 text-lg mb-1">★★★★★</div>
              <p className="text-gray-600 italic text-xs sm:text-sm mb-1 leading-relaxed">"{testimonial.text}"</p>
              <p className="text-pink-600 font-semibold text-xs sm:text-sm">— {testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🏢 PROFESSIONAL FOOTER */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            {/* BRAND */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">Invitation App</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Creating premium digital invitations for your special moments. Fast, beautiful, and hassle-free.</p>
            </motion.div>

            {/* QUICK LINKS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#templates" className="hover:text-pink-400 transition">Templates</a></li>
                <li><a href="#order" className="hover:text-pink-400 transition">Place Order</a></li>
                <li><a href="#testimonials" className="hover:text-pink-400 transition">Testimonials</a></li>
                <li><button onClick={() => setShowPrivacyPolicy(true)} className="hover:text-pink-400 transition cursor-pointer bg-transparent border-none text-gray-300 text-sm">Privacy Policy</button></li>
              </ul>
            </motion.div>

            {/* SERVICES */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-bold text-lg mb-4">Our Services</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>🎨 Custom Designs</li>
                <li>📱 Digital Invitations</li>
                <li>✨ Photo Upload & Customization</li>
                <li>🎁 Premium Templates</li>
              </ul>
            </motion.div>

            {/* CONTACT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-pink-400" />
                  <a href="tel:7972770968" className="hover:text-pink-400 transition">7972770968</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-pink-400">✉️</span>
                  <a href="mailto:ecard.invitation.studio@gmail.com" className="hover:text-pink-400 transition">ecard.invitation.studio@gmail.com</a>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <span>📱</span>
                  <a href="https://wa.me/917972770968" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">WhatsApp Chat</a>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <svg className="w-5 h-5 text-pink-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" opacity="0.3" />
                    <circle cx="12" cy="12" r="3.5" fill="currentColor" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                  </svg>
                  <a href="https://www.instagram.com/ecard_invitation_studio?igsh=MTE5bDcxeXFmem95cw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">@ecard_invitation_studio</a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-gray-700 pt-6 sm:pt-8 mb-6 sm:mb-8"></div>

          {/* BOTTOM */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">&copy; 2026 Invitation App. All rights reserved. | Designed with ❤️ for your special moments.</p>
            <div className="flex gap-4 sm:gap-6 items-center">
              <a href="https://www.instagram.com/ecard_invitation_studio?igsh=MTE5bDcxeXFmem95cw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
                  <circle cx="12" cy="12" r="3.5" fill="white" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
                </svg>
                <span className="hidden sm:inline">Instagram</span>
              </a>
              <a href="https://wa.me/917972770968" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <img src={whatsappImg} alt="WhatsApp" className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}