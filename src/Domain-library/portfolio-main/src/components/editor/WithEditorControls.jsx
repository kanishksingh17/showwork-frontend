import React from 'react';

export const WithEditorControls = ({
    id,
    isEditorMode,
    componentName,
    data,
    onEditClick,
    onMoveUp,
    onMoveDown,
    onDelete,
    children
}) => {
    if (!isEditorMode) {
        return <div className="min-h-screen">{children}</div>;
    }

    return (
        <div className="relative group border-2 border-transparent hover:border-blue-500 transition-colors min-h-screen">

            {/* Editor Controls (Hidden by default, shown on hover via 'group-hover') */}
            <div className="absolute top-0 right-0 z-50 bg-white shadow-md rounded p-1 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 -translate-y-2">
                <span className="text-xs text-black font-mono px-2 my-auto">{componentName} ({id})</span>

                <button onClick={() => onMoveUp(id)} className="p-1 cursor-pointer hover:bg-gray-100 rounded text-black">⬆️</button>
                <button onClick={() => onMoveDown(id)} className="p-1 cursor-pointer hover:bg-gray-100 rounded text-black">⬇️</button>
                <button onClick={() => onEditClick(id, data)} className="p-1 cursor-pointer hover:bg-blue-100 text-blue-600 font-bold rounded">Edit</button>
                <button onClick={() => onDelete(id)} className="p-1 cursor-pointer hover:bg-red-100 text-red-600 font-bold rounded">Trash</button>
            </div>

            <div className="pointer-events-none">
                {children}
            </div>
        </div>
    );
};
