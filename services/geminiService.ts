
import { GoogleGenAI } from "@google/genai";
import { Profile, Skill, Experience, Project, Certification } from "../types";
import { RESUME_DATA, SKILLS, EXPERIENCES, PROJECTS, INITIAL_CERTIFICATIONS } from "../constants";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

interface ContextData {
  profile: Profile;
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  certifications: Certification[];
}

// Fallback data if none provided
const DEFAULT_CONTEXT: ContextData = {
  profile: RESUME_DATA,
  skills: SKILLS,
  experiences: EXPERIENCES,
  projects: PROJECTS,
  certifications: INITIAL_CERTIFICATIONS
};

const generateSystemPrompt = (data: ContextData) => {
  const { profile, skills, experiences, projects, certifications } = data;
  return `
You are an AI assistant representing ${profile.name}, a ${profile.role}.
Use the following resume data to answer questions from recruiters or visitors.
Be professional, concise, and enthusiastic.

Profile:
Name: ${profile.name}
Role: ${profile.role}
Location: ${profile.location}
Contact: ${profile.email}, ${profile.phone}
Summary: ${profile.summary}

Skills:
${skills.map(s => `- ${s.name}`).join('\n')}

Experience:
${experiences.map(e => `${e.role} at ${e.company} (${e.period}):\n${e.description.join('\n')}`).join('\n\n')}

Projects:
${projects.map(p => `${p.title} (${p.tech.join(', ')}):\n${p.description.join('\n')}`).join('\n\n')}

Certifications:
${certifications.map(c => `- ${c.name} (${c.issuer}, ${c.year}) ${c.link ? `[Link: ${c.link}]` : ''}`).join('\n')}

If asked about something not in this resume, politely state that you don't have that information handy but invite them to email ${profile.name}.
Keep answers relatively short (under 100 words) unless asked for details.
`;
};

export const sendMessageToGemini = async (
  history: {role: string, parts: {text: string}[]}[], 
  message: string,
  contextData: ContextData = DEFAULT_CONTEXT
): Promise<string> => {
  try {
    if (!apiKey) {
      return "Error: API Key is missing. Please configure the environment variable.";
    }

    const systemPrompt = generateSystemPrompt(contextData);

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemPrompt,
      },
      history: history, 
    });

    const result = await chat.sendMessage({
      message: message
    });

    return result.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
};

export const editUserProfileImage = async (base64Image: string, prompt: string): Promise<string | null> => {
  try {
    if (!apiKey) {
      console.error("API Key is missing");
      throw new Error("API Key is missing");
    }

    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const mimeType = base64Image.match(/^data:(image\/\w+);base64,/)?.[1] || "image/jpeg";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Gemini Image Edit Error:", error);
    throw error;
  }
};
