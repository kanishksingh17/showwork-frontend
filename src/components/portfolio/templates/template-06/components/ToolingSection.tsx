import React from 'react';

const ToolCat = ({ label, tools, primaryIndexes = [] }: any) => (
    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] border-t border-[var(--t06-line)] py-8 last:border-b r-up">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--t06-mid)] pt-1">{label}</div>
        <div className="flex flex-wrap gap-2">
            {tools.map((t: string, i: number) => (
                <span key={i} className={`font-mono text-[10px] uppercase tracking-widest px-3.5 py-1.5 border transition-all ${primaryIndexes.includes(i) ? 'text-[var(--t06-accent)] border-[var(--t06-accent)] bg-[var(--t06-accent-light)]' : 'text-[var(--t06-ink-3)] border-[var(--t06-line)] hover:border-[var(--t06-accent-mid)]'}`}>
                    {t}
                </span>
            ))}
        </div>
    </div>
);

export const ToolingSection: React.FC = () => {
    return (
        <section id="tooling" className="py-32 bg-white">
            <div className="max-w-[1360px] mx-auto px-14">
                <span className="t06-meta-label r-left mb-6 block">07 Tooling Ecosystem</span>
                <div className="t06-rule mb-16" />

                <div className="grid grid-cols-12 gap-12 mb-12">
                    <div className="col-span-6">
                        <p className="text-[14px] text-[var(--t06-ink-3)] leading-relaxed r-up">Tools selected for constraints, not familiarity. Primary choices below reflect production deployments. Secondary choices reflect evaluated alternatives with measured tradeoffs.</p>
                    </div>
                </div>

                <div className="flex flex-col">
                    <ToolCat label="Cloud Platforms" tools={["AWS", "GCP", "Azure", "Cloudflare"]} primaryIndexes={[0, 1]} />
                    <ToolCat label="Containerization" tools={["Kubernetes", "Helm", "EKS", "GKE", "ArgoCD", "Istio"]} primaryIndexes={[0, 1]} />
                    <ToolCat label="Infra as Code" tools={["Terraform", "Pulumi", "CDK", "Crossplane"]} primaryIndexes={[0, 1]} />
                    <ToolCat label="Observability" tools={["OpenTelemetry", "Grafana", "Datadog", "Honeycomb", "Prometheus"]} primaryIndexes={[0, 1]} />
                    <ToolCat label="Data & Messaging" tools={["Kafka", "PostgreSQL", "Redis", "ClickHouse", "NATS"]} primaryIndexes={[0, 1]} />
                    <ToolCat label="Security" tools={["Vault", "SPIFFE/SPIRE", "AWS Nitro", "OPA", "Falco"]} primaryIndexes={[0, 1]} />
                </div>
            </div>
        </section>
    );
};
