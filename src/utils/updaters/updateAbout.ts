/**
 * Targeted Updating System - About Molecule Updater
 * This updater surgicaly patches About-related content (bio, tagline, etc.)
 */
export const updateAbout = (originalContent: any, aiInstructions: any) => {
    // If AI provides specific fields, merge them
    const updatedContent = {
        ...originalContent,
        ...aiInstructions,
        // Ensure structure follows the molecule schema
        metadata: {
            ...originalContent?.metadata,
            ...aiInstructions?.metadata,
            updatedAt: new Date()
        }
    };

    return updatedContent;
};
