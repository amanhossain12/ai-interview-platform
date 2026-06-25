import axios from "axios";

// তোমার নতুন API key বসাও
const API_KEY = "sk_a6aa9381e2ab86631e8fb9bf6fc79f6d323d689eedd71dc3";

// তোমার Voice ID বসাও
const VOICE_ID = "bajNon13EdhNMndG3z05";

export const speakWithElevenLabs = async (text) => {
  try {
    console.log("Calling ElevenLabs...");
    console.log("Text:", text);

    const response = await axios({
      method: "POST",
      url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      data: {
        text: text,
        model_id: "eleven_multilingual_v2",
      },
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      responseType: "blob",
    });

    console.log("Success:", response.status);

    const audioBlob = new Blob(
      [response.data],
      {
        type: "audio/mpeg",
      }
    );

    const audioUrl =
      URL.createObjectURL(audioBlob);

    const audio = new Audio(audioUrl);

    audio.onplay = () => {
      console.log("Audio Started");
    };

    audio.onended = () => {
      console.log("Audio Ended");
    };

    audio.onerror = (e) => {
      console.log(
        "Audio Error:",
        e
      );
    };

    await audio.play();
  } catch (err) {
    console.log(
      "STATUS:",
      err.response?.status
    );

    console.log(
      "HEADERS:",
      err.response?.headers
    );

    console.log(
      "DATA:",
      err.response?.data
    );

    console.error(
      "FULL ERROR:",
      err
    );
  }
};