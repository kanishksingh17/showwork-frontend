/**
 * Targeted Updating System - Skills Molecule Updater
 * This updater surgically patches skill items based on ID or name
 */
export const updateSkills = (originalSkills: any[], aiInstructions: any[]) => {
    const updatedSkills = [...originalSkills];

    aiInstructions.forEach((instruction) => {
        const index = updatedSkills.findIndex(s =>
            (instruction.id && s.id === instruction.id) ||
            (instruction.name && s.name.toLowerCase() === instruction.name.toLowerCase())
        );

        if (index > -1) {
            // Surgical update
            updatedSkills[index] = { ...updatedSkills[index], ...instruction };
        } else {
            // Add new skill with unique ID if not found
            updatedSkills.push({
                id: instruction.id || `skill-${Math.random().toString(36).substr(2, 9)}`,
                ...instruction
            });
        }
    });

    return updatedSkills;
};
