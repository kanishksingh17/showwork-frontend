export const versionService = {
    createSnapshot: (projectId: string, snapshot: any, type: string, previousData?: any) => {
        console.log(`[VersionService] Snapshot created for project ${projectId}: ${type}`);
        // Minimal implementation: save to localStorage if needed, or just log
        try {
            const snapshots = JSON.parse(localStorage.getItem('project-snapshots') || '[]');
            snapshots.push({
                id: `snap_${Date.now()}`,
                projectId,
                type,
                timestamp: new Date().toISOString(),
                snapshot
            });
            // Keep only last 20 snapshots
            localStorage.setItem('project-snapshots', JSON.stringify(snapshots.slice(-20)));
        } catch (e) {
            console.error('Failed to save snapshot', e);
        }
    },
    getHistory: (projectId: string) => {
        try {
            const snapshots = JSON.parse(localStorage.getItem('project-snapshots') || '[]');
            return snapshots.filter((s: any) => s.projectId === projectId);
        } catch (e) {
            return [];
        }
    }
};

export default versionService;
