"use client";

import React, { useState } from 'react';
import { ChevronRight, Folder, File } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FileNode } from '@/services/githubService';

interface FilesystemItemProps {
  node: FileNode;
  animated?: boolean;
  onToggle?: (path: string, isOpen: boolean) => void; // called when folder toggles
  onSelect?: (path: string, isSelected: boolean) => void; // called when item is selected
  selectedPaths?: Set<string>; // set of selected paths
}

export function FilesystemItem({
  node,
  animated = true,
  onToggle,
  onSelect,
  selectedPaths = new Set()
}: FilesystemItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isSelected = selectedPaths.has(node.path);

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (node.type === 'folder' && onToggle) {
      onToggle(node.path, next);
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (node.type === 'file' && onSelect) {
      onSelect(node.path, !isSelected);
    }
  };

  const handleDivClick = (e: React.MouseEvent) => {
    // Only handle folder clicks on the div
    if (node.type === 'folder') {
      toggle();
    }
  };

  const ChevronIcon = () =>
    animated ? (
      <motion.span
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
        className="flex"
      >
        <ChevronRight className="size-4 text-gray-500" />
      </motion.span>
    ) : (
      <ChevronRight className={`size-4 text-gray-500 ${isOpen ? 'rotate-90' : ''}`} />
    );

  return (
    <li key={node.path}>
      <div
        className={`flex items-center gap-1.5 py-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded px-1 ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
          }`}
        onClick={handleDivClick}
      >
        {node.type === 'folder' ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            className="p-1 -m-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <ChevronIcon />
          </button>
        ) : (
          <span className="ml-[22px]" />
        )}

        {node.type === 'folder' ? (
          <Folder className={`size-6 text-sky-500 fill-sky-500`} />
        ) : (
          <File className="ml-[22px] size-6 text-gray-900 dark:text-gray-100" />
        )}

        <span className="ml-2 flex-1">{node.name}</span>

        {node.type === 'file' && (
          <button
            onClick={handleCheckboxClick}
            className="ml-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            title={isSelected ? "Deselect file" : "Select file"}
          >
            {isSelected ? (
              <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">✓</span>
            ) : (
              <span className="text-xs text-gray-400">○</span>
            )}
          </button>
        )}

        {node.type === 'folder' && node.loaded === false && isOpen && (
          <span className="ml-2 text-xs text-gray-400">Loading…</span>
        )}
      </div>

      {node.nodes && node.nodes.length > 0 && (
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
              className="pl-6 overflow-hidden flex flex-col"
            >
              {node.nodes.map((child) => (
                <FilesystemItem
                  key={child.path}
                  node={child}
                  animated={animated}
                  onToggle={onToggle}
                  onSelect={onSelect}
                  selectedPaths={selectedPaths}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </li>
  );
}

export default FilesystemItem;

