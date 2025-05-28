import { useState, useCallback } from "react";
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

const useGeminiHumor = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSnarkyReply = useCallback(async (userQuery: string) => {
    if (!API_KEY) {
      setError("API key is missing");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        response: {
          type: Type.STRING,
        },
      },
      required: ["response"],
    };

    try {
      const prompt = `
Generate exactly one short, catchy, and funny phrase using popular Gen Z slang and internet humor. The phrase should be informal, playful, and relatable—like a quick reaction you might say when avoiding math or any tough problem.

Requirements:
- The phrase must be between 1 and 6 words only.
- Use trendy slang, memes, or casual internet language.
- The tone should be sassy, cheeky, or humorous, like you're joking with friends online.
- Examples of the style:
  "nice try diddy",
  "skill issue fr",
  "touch grass instead",
  "calculator broke sorry",
  "no cap impossible",
  "cry about it",
  "i am broke",
  "L",
  "ratio",
  "i am broke",
  "bihari stole my brain",
  "nice try diddy",
  "skill issue ngl",
  "try again sweetie",
  "hard pass bro",
  "not today satan",
  "leave me alone lil bro",
  "i am not paid enough",
  "watch reels insted",
  "i am in an aura debt rn",
  "lmao ded",
- Do not use full sentences or formal language—keep it short and funny.
- Output only the phrase in the response field as JSON.

User query: "${userQuery}"
`;

      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema,
        },
      });

      const responseText = await result.text;
      console.log("Generated response:", responseText);

      if (responseText) {
        const parsedResponse = JSON.parse(responseText);
        const phrase = parsedResponse.response;
        setResponse(phrase);
        return phrase;
      } else {
        setError("Empty response from API");
        return null;
      }
    } catch (err: any) {
      console.error("Error generating humor:", err);
      setError(err.message || "Failed to generate humor.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { response, loading, error, fetchSnarkyReply };
};

export default useGeminiHumor;
