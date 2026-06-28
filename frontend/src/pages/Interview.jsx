import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { speakWithElevenLabs } from "../utils/elevenlabs";

function Interview() {
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);

  const navigate = useNavigate();

  const questions = [
    "Tell me about yourself",
    "Why should we hire you",
    "What is React and its advantages",
    "Explain useState Hook",
    "Difference between var let and const",
    "What is JDBC",
    "Explain REST API",
    "What is Spring Boot",
    "Difference between SQL and NoSQL",
    "Describe a challenging project you worked on",
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  // Camera Access
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // AI Greeting + Question Voice
  useEffect(() => {
    if (currentQuestion === 0) {
      const timer = setTimeout(() => {
        speakWithElevenLabs(
          "Hello Aman. Welcome to your AI interview. Let's begin."
        );

        setTimeout(() => {
          speakWithElevenLabs(questions[0]);
        }, 4000);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        speakWithElevenLabs(
          questions[currentQuestion]
        );
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentQuestion]);

  // Start Recording
  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition not supported"
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.lang = "en-IN";

   recognition.onresult = (event) => {
  let finalText = "";

  for (
    let i = event.resultIndex;
    i < event.results.length;
    i++
  ) {
    if (event.results[i].isFinal) {
      finalText +=
        event.results[i][0].transcript + " ";
    }
  }

  if (finalText) {
    setTranscript(
      (prev) => prev + finalText
    );
  }
};

    recognition.start();

    recognitionRef.current = recognition;
    setIsRecording(true);
  };

  // Stop Recording
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setIsRecording(false);
  };

  // Next Question
  const nextQuestion = () => {
    const updatedAnswers = [
      ...answers,
      {
        question:
          questions[currentQuestion],
        answer: transcript,
      },
    ];

    setAnswers(updatedAnswers);

    if (
      currentQuestion <
      questions.length - 1
    ) {
      speakWithElevenLabs(
        "Thank you. Let's move to the next question."
      );

      setCurrentQuestion(
        currentQuestion + 1
      );

      setTranscript("");
    } else {
      localStorage.setItem(
        "interviewAnswers",
        JSON.stringify(updatedAnswers)
      );

      navigate("/result");
    }
  };

  // Submit Interview
  const handleSubmit = async () => {
  try {

    speakWithElevenLabs(
      "Interview completed. Generating your result."
    );

    const response = await fetch(
  "https://ai-interview-platform-l487.onrender.com/api/evaluate",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: questions[currentQuestion],
      answer: transcript,
    }),
  }
);
    const data = await response.json();

console.log("Full Response:", data);
console.log("Feedback:", data.feedback);

if (data.feedback) {
  localStorage.setItem(
    "aiFeedback",
    data.feedback
  );
} else {
  localStorage.setItem(
    "aiFeedback",
    "No feedback received from Gemini"
  );
}
    const finalAnswers = [
      ...answers,
      {
        question: questions[currentQuestion],
        answer: transcript,
      },
    ];

    localStorage.setItem(
      "interviewAnswers",
      JSON.stringify(finalAnswers)
    );

    navigate("/result");

  } catch (error) {
    console.error(error);
    alert("Failed to evaluate answer");
  }
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-8">

        <div className="max-w-7xl mx-auto">

          {/* Header */}

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-4xl font-bold">
              AI Mock Interview
            </h1>

            <div className="bg-red-600 px-4 py-2 rounded-xl font-semibold">
              ⏱{" "}
              {Math.floor(
                timeLeft / 60
              )}
              :
              {(timeLeft % 60)
                .toString()
                .padStart(2, "0")}
            </div>

          </div>

          {/* AI Interviewer */}

          <div className="bg-slate-900 rounded-3xl p-6 mb-8">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-3xl">
                🤖
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  AI Interviewer
                </h3>

                <p className="text-slate-400">
                  Technical Interview Round
                </p>
              </div>

            </div>

            <h2 className="text-2xl font-semibold">
              Question{" "}
              {currentQuestion + 1}
            </h2>

            <p className="mt-4 text-xl">
              {
                questions[
                  currentQuestion
                ]
              }
            </p>

          </div>

          {/* Main Section */}

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Camera */}

            <div className="bg-slate-900 rounded-3xl p-6">

              <h3 className="text-xl font-semibold mb-4">
                Camera Preview
              </h3>

              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full rounded-2xl"
              />

            </div>

            {/* Transcript */}

            <div className="bg-slate-900 rounded-3xl p-6">

              <h3 className="text-xl font-semibold mb-4">
                Your Answer
              </h3>

              <div className="h-[320px] overflow-y-auto bg-slate-950 rounded-2xl p-4 border border-slate-800">
                {transcript ||
                  "Start speaking..."}
              </div>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-4 mt-8">

            <button
              onClick={startRecording}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl"
            >
              Start Recording
            </button>

            <button
              onClick={stopRecording}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl"
            >
              Stop Recording
            </button>

            <button
              onClick={() =>
                speakWithElevenLabs(
                  questions[
                    currentQuestion
                  ]
                )
              }
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl"
            >
              Replay Question
            </button>

            <button
              onClick={() =>
                speakWithElevenLabs(
                  "Hello Aman. Welcome to your AI interview."
                )
              }
              className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-xl"
            >
              Test Voice
            </button>

            <button
              onClick={nextQuestion}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
            >
              Next Question
            </button>

            <button
              onClick={handleSubmit}
              className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl"
            >
              Submit Interview
            </button>

          </div>

          {isRecording && (
            <p className="mt-4 text-green-400 font-semibold">
              🎤 Recording...
            </p>
          )}

        </div>

      </div>
    </>
  );
}

export default Interview;
