export const CloudPartnerLogos: React.FC = () => {
    return (
        <section className="py-20 border-b border-[var(--t05-line)] bg-white relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-[0.02] schematic-grid" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 lg:gap-20">
                    <div className="flex flex-col gap-2 max-w-sm">
                        <span className="text-[var(--t05-accent)] font-mono text-[10px] tracking-[0.2em] uppercase font-bold">[ Infrastructure Agnostic ]</span>
                        <h3 className="text-[var(--t05-ink)] text-xl font-light">Engineered for hybrid and multi-cloud environments.</h3>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale contrast-125">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/DigitalOcean_logo.svg" alt="DigitalOcean" className="h-8" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" alt="Azure" className="h-8" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg" alt="K8s" className="h-10" />
                    </div>
                </div>
            </div>
        </section>
    );
};
