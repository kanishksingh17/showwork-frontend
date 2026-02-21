import React, { useState, useEffect } from 'react';
import { WithEditorControls } from '../components/editor/WithEditorControls';
import { ComponentRegistry } from '../components/registry';

// Generic Page Builder that takes the blocks for the current route as initial state
export const PageBuilder = ({ initialBlocks }) => {
    const [pageBlocks, setPageBlocks] = useState(initialBlocks || []);
    const [isEditorMode, setIsEditorMode] = useState(true);

    // Sync state when initialBlocks change (e.g. user navigates via Navbar to a new route mapping)
    useEffect(() => {
        setPageBlocks(initialBlocks || []);
    }, [initialBlocks]);

    const handleEdit = (id, data) => {
        alert(`Editing Block ID: ${id}\nData: ${JSON.stringify(data)}`);
    };

    const moveUp = (id) => {
        const index = pageBlocks.findIndex((b) => b.id === id);
        if (index > 0) {
            const newBlocks = [...pageBlocks];
            [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
            setPageBlocks(newBlocks);
        }
    };

    const moveDown = (id) => {
        const index = pageBlocks.findIndex((b) => b.id === id);
        if (index < pageBlocks.length - 1) {
            const newBlocks = [...pageBlocks];
            [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
            setPageBlocks(newBlocks);
        }
    };

    const deleteBlock = (id) => {
        setPageBlocks(pageBlocks.filter((b) => b.id !== id));
    };

    return (
        <>
            {/* Optional: Simple toggle for editor mode over laying the page */}
            <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, background: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px', color: '#000', margin: 0 }}>
                    <input
                        type="checkbox"
                        checked={isEditorMode}
                        onChange={(e) => setIsEditorMode(e.target.checked)}
                    />
                    Editor Mode
                </label>
            </div>

            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                {pageBlocks.map((block) => {
                    const TemplateComponent = ComponentRegistry[block.type];
                    if (!TemplateComponent) return <div key={block.id}>Unknown component: {block.type}</div>;

                    return (
                        <WithEditorControls
                            key={block.id}
                            id={block.id}
                            isEditorMode={isEditorMode}
                            componentName={block.type}
                            data={block.data}
                            onEditClick={handleEdit}
                            onMoveUp={moveUp}
                            onMoveDown={moveDown}
                            onDelete={deleteBlock}
                        >
                            <TemplateComponent data={block.data} />
                        </WithEditorControls>
                    );
                })}
            </div>
        </>
    );
};
