/**
 * Systematic Content Trimming Utility
 */

export interface ContentContract {
    maxWords?: number;
    maxLines?: number;
    maxChars?: number;
}

export const ProjectCardContract: ContentContract = {
    maxWords: 20,
};

const FILLER_PHRASES = [
    "This project is a",
    "This is a",
    "A project that",
    "Developed a",
    "Built a",
    "Designed and developed",
    "In this project,",
    "which is",
    "that allows users to"
];

export function smartTrim(text: string, contract: ContentContract): string {
    if (!text) return "";

    let result = text.trim();

    // 1. Remove obvious fillers if they start the sentence
    for (const filler of FILLER_PHRASES) {
        if (result.toLowerCase().startsWith(filler.toLowerCase())) {
            // Just remove the filler part and capitalize the next word
            const afterFiller = result.substring(filler.length).trim();
            result = afterFiller.charAt(0).toUpperCase() + afterFiller.slice(1);
            break;
        }
    }

    // 2. Trim by words (Deterministic Trimming)
    if (contract.maxWords) {
        const words = result.split(/\s+/);
        if (words.length > contract.maxWords) {
            result = words.slice(0, contract.maxWords).join(" ");

            // 3. Smart Punctuation handling
            // If we cut midway through a sentence, add ellipsis
            if (!/[.!?]$/.test(result)) {
                result += "...";
            }
        }
    }

    return result;
}
