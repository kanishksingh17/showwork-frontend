export const portfolioAPI = {
    getTemplates: async () => [],
    getPortfolio: async (id: string) => ({ id, name: 'My Portfolio' }),
    getStatus: async (jobId: string) => ({ jobId, status: 'completed', progress: 100, currentStep: 'Finished', steps: [], createdAt: new Date(), updatedAt: new Date() }),
    create: async (data: any) => ({ success: true, url: '#' }),
};

export default portfolioAPI;
