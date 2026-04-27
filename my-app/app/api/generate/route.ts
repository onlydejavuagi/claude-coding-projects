import { NextRequest, NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";

const DOOR_PROMPTS: Record<string, string> = {
  "classic-white":
    "Replace the garage door on this house with a traditional bright white raised-panel residential garage door that has 4 horizontal panels. Keep the rest of the house, driveway, landscaping, and sky exactly the same. Photorealistic.",
  "carriage-house":
    "Replace the garage door on this house with a rustic carriage-house style garage door featuring natural brown wood texture and decorative black strap hinges. Keep the rest of the house exactly the same. Photorealistic.",
  "modern-black":
    "Replace the garage door on this house with a sleek contemporary matte black flush-panel aluminum garage door with clean horizontal lines. Keep the rest of the house exactly the same. Photorealistic.",
  "glass-aluminum":
    "Replace the garage door on this house with a modern full-view glass garage door with a silver aluminum frame and clear tempered glass panels. Keep the rest of the house exactly the same. Photorealistic.",
  "rustic-wood":
    "Replace the garage door on this house with an authentic natural cedar wood garage door featuring warm horizontal wood grain planks. Keep the rest of the house exactly the same. Photorealistic.",
  "steel-sandstone":
    "Replace the garage door on this house with a sandstone-beige insulated steel garage door that has a row of small decorative square windows along the top panel. Keep the rest of the house exactly the same. Photorealistic.",
};

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not set in .env.local" },
        { status: 500 }
      );
    }

    const { image, doorId, password } = (await req.json()) as {
      image: string;
      doorId: string;
      password: string;
    };

    if (password !== process.env.GENERATE_PASSWORD) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = DOOR_PROMPTS[doorId] ?? DOOR_PROMPTS["classic-white"];

    const imageBuffer = Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const imageFile = await toFile(imageBuffer, "house.png", {
      type: "image/png",
    });

    const response = await openai.images.edit({
      model: "gpt-image-1",
      image: imageFile,
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const b64 = response.data[0].b64_json;
    return NextResponse.json({ image: `data:image/png;base64,${b64}` });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
