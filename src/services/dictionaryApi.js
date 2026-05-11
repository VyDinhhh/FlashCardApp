export async function lookupWordOnline(word) {
  if (!word.trim()) return null;

  try {
    const dictionaryResponse = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!dictionaryResponse.ok) {
      throw new Error("Word not found");
    }

    const dictionaryData = await dictionaryResponse.json();

    const firstEntry = dictionaryData[0];
    const firstMeaning = firstEntry?.meanings?.[0];
    const firstDefinition = firstMeaning?.definitions?.[0];

    const synonymResponse = await fetch(
      `https://api.datamuse.com/words?rel_syn=${word}`
    );

    const synonymData = await synonymResponse.json();

    return {
      wordType: firstMeaning?.partOfSpeech || "",
      meaning: firstDefinition?.definition || "",
      example: firstDefinition?.example || "",
      synonyms: synonymData.slice(0, 5).map((item) => item.word),
    };
  } catch (error) {
    console.error(error);

    return {
      wordType: "",
      meaning: "No online meaning found. You can enter your own meaning.",
      example: "",
      synonyms: [],
    };
  }
}