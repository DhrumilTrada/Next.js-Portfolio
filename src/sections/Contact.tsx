"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import grainImage from "@/assets/images/grain.jpg";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Escape key & outside click to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return "Email is required";
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Email is invalid";
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (!message.trim()) return "Message is required";
    if (message.trim().length < 10)
      return "Message must be at least 10 characters";
    return undefined;
  };

  // Validate entire form and return errors object
  const validateForm = (data: FormData): FormErrors => {
    return {
      name: validateName(data.name),
      email: validateEmail(data.email),
      message: validateMessage(data.message),
    };
  };

  // Handle input changes with dynamic validation
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate current field on change
    let error: string | undefined;
    if (name === "name") error = validateName(value);
    else if (name === "email") error = validateEmail(value);
    else if (name === "message") error = validateMessage(value);

    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    const errors = validateForm(formData);
    setFormErrors(errors);

    // If any errors exist, don't submit
    if (Object.values(errors).some((error) => error !== undefined)) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: "", email: "", message: "" });
        setFormErrors({});
      } else {
        // Optional: handle API error response here
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Contact Section */}
      <div className="py-16 pt-12 lg:py-24 lg:pt-20">
        <div className="container">
          <div className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 py-8 px-10 rounded-3xl text-center md:text-left relative overflow-hidden z-0">
            <div
              className="absolute inset-0 opacity-5 -z-10"
              style={{
                backgroundImage: `url(${grainImage.src})`,
                backgroundSize: "cover",
              }}
            ></div>
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
              <div>
                <h2 className="font-serif md:text-3xl text-2xl">
                  Let's create something amazing together
                </h2>
                <p className="text-sm md:text-base mt-2">
                  Ready to bring your next project to life? Let's connect and
                  discuss how I can help you achieve your goals.
                </p>
              </div>
              <div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-white bg-gray-900 inline-flex items-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-900"
                >
                  <span className="font-semibold">Contact Me</span>
                  <ArrowUpRightIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 backdrop-blur-sm bg-gray-200/40 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="bg-gray-100 text-gray-900 rounded-2xl shadow-lg w-full max-w-md mx-4 p-6 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-xl font-bold"
                aria-label="Close"
              >
                &times;
              </button>

              <h3 className="text-xl font-serif text-gray-900 mb-4">
                Contact Me
              </h3>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                noValidate
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                      formErrors.name
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-emerald-400"
                    }`}
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!formErrors.name}
                    aria-describedby="name-error"
                    required
                  />
                  {formErrors.name && (
                    <p id="name-error" className="text-red-600 text-sm mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                      formErrors.email
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-sky-400"
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!formErrors.email}
                    aria-describedby="email-error"
                    required
                  />
                  {formErrors.email && (
                    <p id="email-error" className="text-red-600 text-sm mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                      formErrors.message
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-emerald-400"
                    }`}
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={!!formErrors.message}
                    aria-describedby="message-error"
                    required
                  ></textarea>
                  {formErrors.message && (
                    <p id="message-error" className="text-red-600 text-sm mt-1">
                      {formErrors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? "Sending..." : "Send"}</span>
                  <ArrowUpRightIcon className="size-4" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
