import React from 'react';

export const SqlModelPanel: React.FC = () => {
    return (
        <div className="md:col-span-4 lg:col-span-3 dashboard-panel bento-fade-in delay-300">
            <div className="panel-header">
                <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">SQL_MODELS.sql</span>
                <span className="material-symbols-outlined text-xs text-gray-500">code</span>
            </div>

            <div className="p-4 font-mono text-xs leading-relaxed text-gray-300">
                <p><span className="code-syntax-keyword">SELECT</span> date_trunc(<span className="code-syntax-string">'month'</span>, created_at),</p>
                <p className="pl-4"><span className="code-syntax-func">COUNT</span>(<span className="code-syntax-keyword">DISTINCT</span> user_id) <span className="code-syntax-keyword">AS</span> mau,</p>
                <p className="pl-4"><span className="code-syntax-func">SUM</span>(order_value) <span className="code-syntax-keyword">AS</span> revenue</p>
                <p><span className="code-syntax-keyword">FROM</span> staging.analytics_events</p>
                <p><span className="code-syntax-keyword">WHERE</span> status = <span className="code-syntax-string">'completed'</span></p>
                <p><span className="code-syntax-keyword">GROUP BY</span> 1</p>
                <p><span className="code-syntax-keyword">ORDER BY</span> 1 <span className="code-syntax-keyword">DESC</span>;</p>
            </div>
        </div>
    );
};
