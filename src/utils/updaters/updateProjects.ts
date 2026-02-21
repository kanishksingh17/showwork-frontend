/**
 * Targeted Updating System - Projects Molecule Updater
 * This updater surgically patches project items based on ID or index
 */
export const updateProjects = (originalProjects: any[], aiInstructions: any[]) => {
    const updatedProjects = [...originalProjects];

    aiInstructions.forEach((instruction, index) => {
        // Find existing project by ID or secondary identifier (name)
        const projectIndex = updatedProjects.findIndex(p =>
            (instruction.id && p.id === instruction.id) ||
            (instruction.name && p.name.toLowerCase() === instruction.name.toLowerCase())
        );

        if (projectIndex > -1) {
            // Surgical update: merge AI improvements into existing project
            updatedProjects[projectIndex] = {
                ...updatedProjects[projectIndex],
                ...instruction,
                // Ensure media and tags are merged if provided
                technologies: instruction.technologies || updatedProjects[projectIndex].technologies,
                metadata: {
                    ...updatedProjects[projectIndex].metadata,
                    ...instruction.metadata,
                    updatedAt: new Date()
                }
            };
        } else {
            // Add new project if it doesn't exist
            updatedProjects.push({
                id: instruction.id || `project-${Math.random().toString(36).substr(2, 9)}`,
                showcase: true, // Default to showcase for AI-generated projects
                ...instruction
            });
        }
    });

    return updatedProjects;
};
