import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  createHeaderBlock,
  createHeroBlock,
  createFeaturesBlock,
  createTestimonialsBlock,
  createAboutBlock,
  createContactFormBlock,
  createFooterBlock,
  createSectionSpacerBlock,
} from "./utils";
import { LandingPageBlock } from "./types";

interface BlocksPanelProps {
  onAddBlock: (block: LandingPageBlock) => void;
}

interface BlockItem {
  id: string;
  label: string;
  onCreate: () => LandingPageBlock;
}

interface SectionGroup {
  id: string;
  label: string;
  items: BlockItem[];
  defaultExpanded?: boolean;
}

export const BlocksPanel: React.FC<BlocksPanelProps> = ({ onAddBlock }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["sections", "components"]),
  );

  const sectionGroups: SectionGroup[] = [
    {
      id: "sections",
      label: "Sections",
      items: [
        {
          id: "header",
          label: "Header",
          onCreate: createHeaderBlock,
        },
        {
          id: "hero",
          label: "Hero Section",
          onCreate: createHeroBlock,
        },
        {
          id: "features",
          label: "Features",
          onCreate: createFeaturesBlock,
        },
      ],
      defaultExpanded: true,
    },
    {
      id: "components",
      label: "Components",
      items: [
        {
          id: "testimonials",
          label: "Testimonials",
          onCreate: createTestimonialsBlock,
        },
        {
          id: "about",
          label: "About",
          onCreate: createAboutBlock,
        },
        {
          id: "contact",
          label: "Contact Form",
          onCreate: createContactFormBlock,
        },
      ],
      defaultExpanded: true,
    },
    {
      id: "other",
      label: "Other",
      items: [
        {
          id: "footer",
          label: "Footer",
          onCreate: createFooterBlock,
        },
        {
          id: "spacer",
          label: "Spacer",
          onCreate: createSectionSpacerBlock,
        },
      ],
    },
  ];

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const filteredSections = sectionGroups
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((section) => section.items.length > 0 || searchQuery === "");

  return (
    <div className="flex flex-col bg-white w-full h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-white flex-shrink-0">
        <Input
          placeholder="Search blocks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-sm"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          {filteredSections.map((section) => (
            <div key={section.id} className="border-b border-gray-100 last:border-b-0">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span>{section.label}</span>
                {expandedSections.has(section.id) ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {expandedSections.has(section.id) && (
                <div className="px-2 py-2 bg-gray-50">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onAddBlock(item.onCreate())}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-white hover:text-valasys-orange rounded transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
