export interface ContentContract {
    maxWords?: number;
    maxLines?: number;
    maxChars?: number;
}

export const TemplateContracts: Record<string, Record<string, ContentContract>> = {
    "template-03": {
        projectCard: {
            maxWords: 20,
            maxLines: 3
        },
        hero: {
            maxWords: 40
        }
    },
    "template-01": {
        projectCard: {
            maxWords: 25,
            maxLines: 4
        }
    },
    "template-02": {
        projectCard: {
            maxWords: 15,
            maxLines: 2
        }
    }
};

/**
 * Deterministic trimming utility (Step 2 & 3 of the Systematic Philosophy)
 */
export function smartTrim(text: string, contract: ContentContract): string {
    if (!text) return "";

    let result = text.trim();

    // Trim by words first
    if (contract.maxWords) {
        const words = result.split(/\s+/);
        if (words.length > contract.maxWords) {
            result = words.slice(0, contract.maxWords).join(" ");
            // Add ellipsis if it's truncated
            if (!result.endsWith('.') && !result.endsWith('!') && !result.endsWith('?')) {
                result += "...";
            }
        }
    }

    // Chars limit as a hard fallback
    if (contract.maxChars && result.length > contract.maxChars) {
        result = result.substring(0, contract.maxChars) + "...";
    }

    return result;
}
