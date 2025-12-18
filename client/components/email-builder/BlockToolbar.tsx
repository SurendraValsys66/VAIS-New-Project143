import React from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  ChevronUp,
  ChevronDown,
  Copy,
  Trash2,
} from "lucide-react";

interface BlockToolbarProps {
  blockIndex: number;
  totalBlocks: number;
  onAddBlock: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export const BlockToolbar: React.FC<BlockToolbarProps> = ({
  blockIndex,
  totalBlocks,
  onAddBlock,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
}) => {
  return (
    <div className="flex gap-1 p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={onAddBlock}
        title="Add new block below"
        className="h-8 w-8 p-0 hover:bg-gray-100"
      >
        <Plus className="w-4 h-4 text-gray-600" />
      </Button>

      <div className="border-l border-gray-200" />

      <Button
        variant="ghost"
        size="sm"
        onClick={onMoveUp}
        disabled={blockIndex === 0}
        title="Move block up"
        className="h-8 w-8 p-0 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronUp className="w-4 h-4 text-gray-600" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onMoveDown}
        disabled={blockIndex === totalBlocks - 1}
        title="Move block down"
        className="h-8 w-8 p-0 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </Button>

      <div className="border-l border-gray-200" />

      <Button
        variant="ghost"
        size="sm"
        onClick={onDuplicate}
        title="Duplicate block"
        className="h-8 w-8 p-0 hover:bg-gray-100"
      >
        <Copy className="w-4 h-4 text-gray-600" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        title="Delete block"
        className="h-8 w-8 p-0 hover:bg-red-100"
      >
        <Trash2 className="w-4 h-4 text-red-600" />
      </Button>
    </div>
  );
};
