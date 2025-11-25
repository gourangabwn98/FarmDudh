// src/components/VoiceShopping.jsx
import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Send, AlertCircle } from "lucide-react";

const VoiceShopping = ({ addToCart, removeFromCart }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showConfirm, setShowConfirm] = useState(null);
  const [micStatus, setMicStatus] = useState(""); // "ready", "blocked", "error"
  const recognitionRef = useRef(null);

  const products = {
    milk: { name: "A2 Milk", unit: "L", price: 70 },
    dahi: { name: "Dahi", unit: "g", price: 80 },
    ghee: { name: "Desi Ghee", unit: "g", price: 600 },
    paneer: { name: "Paneer", unit: "g", price: 320 },
  };

  useEffect(() => {
    const initSpeech = async () => {
      if (
        "SpeechRecognition" in window ||
        "webkitSpeechRecognition" in window
      ) {
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = true;
        rec.lang = "en-IN";

        rec.onresult = (e) => {
          const result = e.results[0][0].transcript;
          setTranscript(result);
          if (e.results[0].isFinal) {
            processCommand(result.toLowerCase());
          }
        };

        rec.onerror = (event) => {
          console.error("Speech error:", event.error);
          setIsListening(false);
          if (event.error === "not-allowed") {
            setMicStatus("blocked");
          } else {
            setMicStatus("error");
          }
        };

        rec.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = rec;
        setMicStatus("ready");
      } else {
        setMicStatus("unsupported");
      }
    };

    initSpeech();
  }, []);

  const startListening = async () => {
    if (!recognitionRef.current) return;

    try {
      // Request permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStatus("ready");
      setTranscript("");
      setShowConfirm(null);
      recognitionRef.current.start();
      setIsListening(true);
    } catch (err) {
      setMicStatus("blocked");
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const processCommand = (command) => {
    stopListening();
    // ... (same as before)
    let action = "add";
    if (command.includes("remove") || command.includes("delete"))
      action = "remove";

    let product = null;
    let qty = 1;

    for (const [key, prod] of Object.entries(products)) {
      if (command.includes(key)) {
        product = prod;
        break;
      }
    }

    if (!product) {
      setShowConfirm({ error: "Try: 'Add 2 liters milk'" });
      return;
    }

    const qtyMatch = command.match(/(\d+)\s*(liter|litre|l|kg|g|gram|packet)/i);
    if (qtyMatch) qty = parseInt(qtyMatch[1]);

    const item = {
      name: product.name,
      quantity: qty,
      unit: product.unit === "L" ? "L" : "g",
      price: product.price * (product.unit === "L" ? qty : qty / 1000),
      img: "/api/placeholder/150/150",
      discount: 0,
    };

    setShowConfirm({
      action,
      item,
      onConfirm: () => {
        if (action === "add") addToCart(item);
        else removeFromCart(item.name);
        setShowConfirm(null);
      },
    });
  };

  return (
    <div className="voice-shopping p-5 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-xl mb-6">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={startListening}
          disabled={
            isListening ||
            micStatus === "blocked" ||
            micStatus === "unsupported"
          }
          className={`p-4 rounded-full transition-all ${
            isListening
              ? "bg-red-500 animate-pulse"
              : micStatus === "blocked" || micStatus === "unsupported"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white shadow-lg`}
        >
          {isListening ? <MicOff size={28} /> : <Mic size={28} />}
        </button>
        <div>
          <p className="font-bold text-lg">Voice Order</p>
          <p className="text-sm text-gray-600">Say: "Add 2 liters milk"</p>
        </div>
      </div>

      {/* Mic Status */}
      {micStatus === "blocked" && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle size={18} className="text-red-600" />
          <p className="text-sm text-red-700">
            Mic blocked. Go to browser settings → allow microphone.
          </p>
        </div>
      )}
      {micStatus === "unsupported" && (
        <div className="mb-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-700">
            Voice not supported. Use Chrome/Firefox on mobile/desktop.
          </p>
        </div>
      )}

      {transcript && (
        <div className="mb-3 p-3 bg-white rounded-lg border border-green-200">
          <p className="text-sm font-medium">
            Heard: <span className="text-green-700">{transcript}</span>
          </p>
        </div>
      )}

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            {showConfirm.error ? (
              <>
                <p className="text-red-600 mb-4">{showConfirm.error}</p>
                <button
                  onClick={() => setShowConfirm(null)}
                  className="w-full bg-gray-500 text-white py-2 rounded-lg"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <p className="text-lg font-bold mb-2">
                  {showConfirm.action === "add" ? "Add" : "Remove"}?
                </p>
                <p className="mb-4">
                  {showConfirm.item.quantity} {showConfirm.item.unit}{" "}
                  {showConfirm.item.name}
                  {showConfirm.action === "add" &&
                    ` (₹${showConfirm.item.price.toFixed(0)})`}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={showConfirm.onConfirm}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowConfirm(null)}
                    className="flex-1 bg-gray-400 text-white py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Fallback */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Type: Add 1kg ghee"
          className="flex-1 px-4 py-2 border rounded-lg focus:border-green-500 focus:outline-none"
          onKeyPress={(e) =>
            e.key === "Enter" && processCommand(e.target.value)
          }
        />
        <button
          onClick={(e) => processCommand(e.target.previousElementSibling.value)}
          className="bg-blue-600 text-white p-2 rounded-lg"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default VoiceShopping;
