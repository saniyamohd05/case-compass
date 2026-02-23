import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff, ArrowRight, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

const VoiceAssistant = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (event: any) => {
      let full = "";
      for (let i = 0; i < event.results.length; i++) {
        full += event.results[i][0].transcript;
      }
      setTranscript(full);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const handleAnalyze = () => {
    if (!transcript.trim()) return;
    sessionStorage.setItem(
      "argumind_case",
      JSON.stringify({
        situation: transcript,
        location: "",
        opponent: "",
        loss: "",
        evidenceContract: false,
        evidencePayment: false,
        evidenceCommunication: false,
      })
    );
    navigate("/loading");
  };

  const speakSummary = () => {
    if (!transcript.trim()) return;
    const utterance = new SpeechSynthesisUtterance(`You said: ${transcript.slice(0, 200)}. Click analyze to get your AI case assessment.`);
    utterance.lang = "en-IN";
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-lg mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-semibold text-foreground mb-2">Voice Assistant</h1>
            <p className="text-sm text-muted-foreground mb-10">Describe your legal situation by voice. We'll analyze it for you.</p>
          </motion.div>

          {/* Mic button */}
          <div className="relative w-28 h-28 mx-auto mb-8">
            {isListening && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/10"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full bg-primary/15"
                  animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                />
              </>
            )}
            <motion.button
              onClick={isListening ? stopListening : startListening}
              className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all shadow-lg ${
                isListening
                  ? "bg-destructive/10 border-2 border-destructive text-destructive"
                  : "bg-primary/10 border-2 border-primary text-primary hover:bg-primary/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isListening ? (
                  <motion.div key="off" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <MicOff className="w-8 h-8" />
                  </motion.div>
                ) : (
                  <motion.div key="on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Mic className="w-8 h-8" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <p className="text-xs text-muted-foreground mb-6">
            {isListening ? "Listening… speak now" : "Tap the microphone to start"}
          </p>

          {/* Transcript */}
          <div className="enterprise-card text-left mb-6 min-h-[120px]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-muted-foreground">Transcript</p>
              {transcript && (
                <button onClick={speakSummary} className="text-xs text-primary flex items-center gap-1 hover:underline">
                  <Volume2 className="w-3 h-3" /> Read back
                </button>
              )}
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {transcript || <span className="text-muted-foreground italic">Your speech will appear here…</span>}
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={handleAnalyze}
              disabled={!transcript.trim()}
              className="btn-primary text-sm py-2.5 px-6 inline-flex items-center gap-2"
            >
              Analyze Case <ArrowRight className="w-4 h-4" />
            </button>
            {transcript && (
              <button
                onClick={() => setTranscript("")}
                className="btn-secondary text-sm py-2.5 px-6"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
