import { ContentGenerator } from '../generateContentDataObject';

/**
 * Updater for Feature molecules
 * Maps AI simplified data to internal molecule state with READONLY_IDs
 */
export const updateFeatures = (originalItems: any[], aiInstructions: any[]) => {
    const updatedItems = [...originalItems];

    aiInstructions.forEach((instruction, index) => {
        // If we have an ID, update specific item
        if (instruction.id) {
            const itemIndex = updatedItems.findIndex(item => item.id === instruction.id);
            if (itemIndex > -1) {
                updatedItems[itemIndex] = { ...updatedItems[itemIndex], ...instruction };
            }
        }
        // Else use position-based patching
        else if (index < updatedItems.length) {
            updatedItems[index] = { ...updatedItems[index], ...instruction };
        }
        // Else add new item
        else {
            updatedItems.push({
                id: `feature-${Math.random().toString(36).substr(2, 9)}`,
                ...instruction
            });
        }
    });

    return updatedItems;
};
