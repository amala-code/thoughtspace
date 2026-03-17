'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import Header from '@/components/Header';

export default function QuoteRequestPage() {
  const [formData, setFormData] = useState({ name: '', email: '', quote: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      // Replace with your backend email endpoint
      const res = await fetch('https://blog-backend-one-xi.vercel.app/api/send-quote-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send quote');

      setStatusMessage('✅ Your quote has been sent successfully!');
      setFormData({ name: '', email: '', quote: '' });
    } catch (err) {
      console.error(err);
      setStatusMessage('❌ Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-black text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 border-2 border-white rounded-full"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Share Your Words</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Send Us Your Thought
              </h1>

              <p className="text-xl text-gray-400 max-w-2xl">
                Have something inspiring, insightful, or impactful to say? Submit your thought, and we’ll feature it!
              </p>
            </div>
          </div>
        </section>

        {/* Quote Form Section */}
        <section className="max-w-2xl mx-auto px-6 py-20">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-center mb-6">Send us your thought!</h2>
            <p className="text-center text-gray-500 mb-10">
              Fill in your details below. We’ll review your quote and get in touch if it’s selected.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Your thought</label>
                <textarea
                  name="quote"
                  value={formData.quote}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition resize-none"
                  placeholder="Write your quote here..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-white font-semibold transition-all transform ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-800 hover:scale-105'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Quote'}
                {!isSubmitting && <Send className="w-4 h-4" />}
              </button>
            </form>

            {statusMessage && (
              <p
                className={`mt-6 text-center font-medium ${
                  statusMessage.startsWith('✅') ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {statusMessage}
              </p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
