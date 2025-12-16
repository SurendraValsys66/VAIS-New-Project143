import React, { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { EmailTemplate, ContentBlock } from "./types";
import { BlocksPanel } from "./BlocksPanel";
import { SettingsPanel } from "./SettingsPanel";
import { BlockRenderer } from "./BlockRenderer";
import { EmailPreview } from "./EmailPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  createEmptyTemplate,
  saveTemplateToLocalStorage,
  getTemplatesFromLocalStorage,
  deleteTemplateFromLocalStorage,
} from "./utils";
import {
  Save,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailBuilderProps {
  templateId?: string;
  onBack?: () => void;
}

export const EmailBuilder: React.FC<EmailBuilderProps> = ({
  templateId,
  onBack,
}) => {
  const [template, setTemplate] = useState<EmailTemplate>(() => {
    if (templateId) {
      const existing = getTemplatesFromLocalStorage().find(
        (t) => t.id === templateId,
      );
      return existing || createEmptyTemplate();
    }
    return createEmptyTemplate();
  });

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [templateName, setTemplateName] = useState(template.name);
  const [templateSubject, setTemplateSubject] = useState(template.subject);
  const [undoStack, setUndoStack] = useState<EmailTemplate[]>([]);
  const [redoStack, setRedoStack] = useState<EmailTemplate[]>([]);

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const updated = {
        ...template,
        name: templateName,
        subject: templateSubject,
      };
      setTemplate(updated);
    }, 500);
    return () => clearTimeout(timer);
  }, [templateName, templateSubject]);

  const selectedBlock =
    template.blocks.find((b) => b.id === selectedBlockId) || null;

  const handleAddBlock = useCallback((block: ContentBlock) => {
    setTemplate((prev) => ({
      ...prev,
      blocks: [...prev.blocks, block],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const handleUpdateBlock = useCallback((block: ContentBlock) => {
    setTemplate((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === block.id ? block : b)),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const handleDeleteBlock = useCallback(() => {
    if (selectedBlockId) {
      setTemplate((prev) => ({
        ...prev,
        blocks: prev.blocks.filter((b) => b.id !== selectedBlockId),
        updatedAt: new Date().toISOString(),
      }));
      setSelectedBlockId(null);
    }
  }, [selectedBlockId]);

  const handleMoveBlock = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragBlock = template.blocks[dragIndex];
      const newBlocks = [...template.blocks];
      newBlocks.splice(dragIndex, 1);
      newBlocks.splice(hoverIndex, 0, dragBlock);
      setTemplate((prev) => ({
        ...prev,
        blocks: newBlocks,
        updatedAt: new Date().toISOString(),
      }));
    },
    [template.blocks],
  );

  const handleSaveTemplate = () => {
    const updated = {
      ...template,
      name: templateName,
      subject: templateSubject,
      updatedAt: new Date().toISOString(),
    };
    setTemplate(updated);
    saveTemplateToLocalStorage(updated);
    setShowSaveDialog(false);
  };

  const handleUndo = useCallback(() => {
    if (undoStack.length > 0) {
      const newUndo = [...undoStack];
      const prevTemplate = newUndo.pop()!;
      setRedoStack([...redoStack, template]);
      setTemplate(prevTemplate);
      setUndoStack(newUndo);
    }
  }, [undoStack, redoStack, template]);

  const handleRedo = useCallback(() => {
    if (redoStack.length > 0) {
      const newRedo = [...redoStack];
      const nextTemplate = newRedo.pop()!;
      setUndoStack([...undoStack, template]);
      setTemplate(nextTemplate);
      setRedoStack(newRedo);
    }
  }, [undoStack, redoStack, template]);

  return (
    <DashboardLayout>
      <div className="flex flex-col h-screen bg-gray-50 -m-6">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1">
            {onBack && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            <div className="flex-1">
              <Input
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Template name"
                className="font-semibold text-lg"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
              className={previewMode ? "bg-valasys-orange text-white" : ""}
            >
              <Eye className="w-4 h-4 mr-1" />
              {previewMode ? "Edit" : "Preview"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSaveDialog(true)}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              Save Template
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {previewMode ? (
            <div className="flex-1">
              <EmailPreview template={template} />
            </div>
          ) : (
            <>
              {/* Left Sidebar - Blocks Panel with Selected Blocks */}
              <div className="flex flex-col w-64 bg-white border-r border-gray-200 overflow-hidden">
                {/* Blocks/Sections/Saved Tabs */}
                <div className="flex-1 overflow-hidden">
                  <BlocksPanel onAddBlock={handleAddBlock} />
                </div>

                {/* Selected Blocks List */}
                <div className="border-t border-gray-200 p-4 max-h-64 overflow-y-auto">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                    Template Blocks
                  </h3>
                  {template.blocks.length > 0 ? (
                    <div className="space-y-2">
                      {template.blocks.map((block, index) => (
                        <div
                          key={block.id}
                          className={cn(
                            "p-2 rounded cursor-pointer text-xs transition-all",
                            selectedBlockId === block.id
                              ? "bg-valasys-orange text-white ring-2 ring-valasys-orange"
                              : "bg-gray-100 hover:bg-gray-200",
                          )}
                          onClick={() => setSelectedBlockId(block.id)}
                        >
                          {block.type.charAt(0).toUpperCase() +
                            block.type.slice(1)}{" "}
                          Block {index + 1}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">
                      No blocks added yet. Select from above.
                    </p>
                  )}
                </div>
              </div>

              {/* Center - Editor Canvas */}
              <div className="flex-1 overflow-y-auto p-8 bg-gray-100">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Template Settings */}
                  <div className="bg-gray-50 border-b border-gray-200 p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subject" className="text-xs">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          value={templateSubject}
                          onChange={(e) => setTemplateSubject(e.target.value)}
                          placeholder="Email subject"
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bgColor" className="text-xs">
                          Background
                        </Label>
                        <Input
                          id="bgColor"
                          type="color"
                          value={template.backgroundColor}
                          onChange={(e) =>
                            setTemplate({
                              ...template,
                              backgroundColor: e.target.value,
                            })
                          }
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Blocks Canvas */}
                  <div
                    style={{
                      backgroundColor: template.backgroundColor,
                      padding: `${template.padding}px`,
                    }}
                  >
                    {template.blocks.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <p className="mb-2">No blocks yet</p>
                        <p className="text-sm">
                          Add blocks from the left toolbar to get started
                        </p>
                      </div>
                    ) : (
                      template.blocks.map((block) => (
                        <div key={block.id}>
                          <BlockRenderer
                            block={block}
                            isSelected={selectedBlockId === block.id}
                            onBlockUpdate={handleUpdateBlock}
                            onBlockSelect={setSelectedBlockId}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Settings Panel */}
              <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
                <SettingsPanel
                  block={selectedBlock}
                  onBlockUpdate={handleUpdateBlock}
                  onBlockDelete={handleDeleteBlock}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Save Template Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Save Template</DialogTitle>
            <DialogDescription>
              Save this email template for future use
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="save-name">Template Name</Label>
              <Input
                id="save-name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g., Welcome Email"
              />
            </div>
            <div>
              <Label htmlFor="save-subject">Email Subject</Label>
              <Input
                id="save-subject"
                value={templateSubject}
                onChange={(e) => setTemplateSubject(e.target.value)}
                placeholder="e.g., Welcome to Valasys"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveTemplate}
              className="bg-valasys-orange hover:bg-valasys-orange/90 text-white"
            >
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};
