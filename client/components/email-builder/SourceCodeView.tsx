import React, { useState, useCallback } from "react";
import { EmailTemplate } from "./types";
import { renderTemplateToHTML } from "./utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

interface SourceCodeViewProps {
  template: EmailTemplate;
}

export const SourceCodeView: React.FC<SourceCodeViewProps> = ({ template }) => {
  const [copied, setCopied] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);

  const htmlContent = renderTemplateToHTML(template);

  const handleCopy = useCallback(() => {
    const copyToClipboard = (text: string) => {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (successful) {
          setCopied(true);
          setOpenTooltip(true);
          toast.success("Code copied to clipboard");
          setTimeout(() => {
            setCopied(false);
            setOpenTooltip(false);
          }, 2000);
        } else {
          toast.error("Failed to copy code");
        }
      } catch (err) {
        console.error("Copy failed:", err);
        toast.error("Failed to copy code");
      }
    };

    // Try modern Clipboard API first, but fallback to execCommand
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(htmlContent)
        .then(() => {
          console.log("Content copied to clipboard");
          setCopied(true);
          setOpenTooltip(true);
          toast.success("Code copied to clipboard");
          setTimeout(() => {
            setCopied(false);
            setOpenTooltip(false);
          }, 2000);
        })
        .catch(() => {
          // Fallback to execCommand if Clipboard API fails
          copyToClipboard(htmlContent);
        });
    } else {
      // No Clipboard API available, use fallback
      copyToClipboard(htmlContent);
    }
  }, [htmlContent]);

  const handleDownloadInlineHTML = () => {
    try {
      // htmlContent is already a complete HTML document from renderTemplateToHTML
      const element = document.createElement("a");
      const file = new Blob([htmlContent], { type: "text/html" });
      element.href = URL.createObjectURL(file);
      element.download = `${template.name || "template"}.html`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      // Clean up the object URL
      setTimeout(() => URL.revokeObjectURL(element.href), 100);

      toast.success("Pure HTML downloaded successfully");
    } catch (error) {
      console.error("Error downloading HTML:", error);
      toast.error("Failed to download HTML");
    }
  };


  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header with Actions */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-800">
            HTML Source Code
          </h2>
          <p className="text-sm text-gray-600 mt-1 truncate">
            Complete HTML for: {template.name || "Untitled Template"}
          </p>
        </div>
        <TooltipProvider delayDuration={200}>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="font-medium" side="top">
                {copied ? "Copied!" : "Copy Code"}
              </TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-max">
                <DropdownMenuItem
                  onClick={handleDownloadInlineHTML}
                  className="py-2.5"
                >
                  <Download className="w-4 h-4 mr-3" />
                  Download Pure HTML
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TooltipProvider>
      </div>

      {/* Code Display */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <pre className="p-4 text-xs font-mono text-gray-800 overflow-auto max-h-full leading-relaxed">
            <code>{htmlContent}</code>
          </pre>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="bg-white border-t border-gray-200 p-4 text-sm text-gray-600 flex justify-between">
        <span>Lines: {htmlContent.split("\n").length}</span>
        <span>Characters: {htmlContent.length}</span>
        <span>Blocks: {template.blocks.length}</span>
      </div>
    </div>
  );
};
