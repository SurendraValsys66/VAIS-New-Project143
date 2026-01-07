import React, { useState } from "react";
import { ChevronDown, ChevronRight, Grid3x3, Settings, Zap, Share2, Lock, Palette, X } from "lucide-react";
import { Input } from "@/components/ui/input";
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
  onSelectBlockVariant?: (variantName: string) => void;
}

interface BlockVariant {
  id: string;
  name: string;
  description?: string;
  preview?: string;
  onCreate: () => LandingPageBlock;
}

interface BlockItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onCreate: () => LandingPageBlock;
  variants?: BlockVariant[];
}

interface SectionGroup {
  id: string;
  label: string;
  items: BlockItem[];
}

export const BlocksPanel: React.FC<BlocksPanelProps> = ({ onAddBlock, onSelectBlockVariant }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["start", "basics", "cms", "elements"]),
  );
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(),
  );
  const [selectedVariantGroup, setSelectedVariantGroup] = useState<BlockItem | null>(null);

  const getIconColor = (itemId: string) => {
    const iconMap: Record<string, string> = {
      sections: "text-gray-500",
      navigation: "text-gray-500",
      menus: "text-gray-500",
      collections: "text-blue-500",
      fields: "text-blue-500",
      icons: "text-blue-500",
      media: "text-cyan-500",
      forms: "text-green-500",
      interactive: "text-orange-500",
      social: "text-red-500",
      utility: "text-gray-500",
      creative: "text-purple-500",
      wireframer: "text-gray-500",
    };
    return iconMap[itemId] || "text-gray-500";
  };

  const getIcon = (itemId: string) => {
    const iconSize = "w-5 h-5";
    const colorClass = getIconColor(itemId);
    
    const iconMap: Record<string, React.ReactNode> = {
      sections: <Grid3x3 className={`${iconSize} ${colorClass}`} />,
      navigation: <Settings className={`${iconSize} ${colorClass}`} />,
      menus: <Zap className={`${iconSize} ${colorClass}`} />,
      collections: <Settings className={`${iconSize} ${colorClass}`} />,
      fields: <Grid3x3 className={`${iconSize} ${colorClass}`} />,
      icons: <Settings className={`${iconSize} ${colorClass}`} />,
      media: <Share2 className={`${iconSize} ${colorClass}`} />,
      forms: <Lock className={`${iconSize} ${colorClass}`} />,
      interactive: <Zap className={`${iconSize} ${colorClass}`} />,
      social: <Share2 className={`${iconSize} ${colorClass}`} />,
      utility: <Settings className={`${iconSize} ${colorClass}`} />,
      creative: <Palette className={`${iconSize} ${colorClass}`} />,
      wireframer: <Grid3x3 className={`${iconSize} ${colorClass}`} />,
    };
    return iconMap[itemId] || null;
  };

  const sectionGroups: SectionGroup[] = [
    {
      id: "start",
      label: "Start",
      items: [
        {
          id: "wireframer",
          label: "Wireframer",
          onCreate: createHeaderBlock,
        },
      ],
    },
    {
      id: "basics",
      label: "Basics",
      items: [
        {
          id: "sections",
          label: "Sections",
          onCreate: createHeroBlock,
          variants: [
            {
              id: "section-hero",
              name: "Hero Section",
              description: "Full width hero with image",
              onCreate: createHeroBlock,
            },
            {
              id: "section-features",
              name: "Features",
              description: "Grid of features",
              onCreate: createFeaturesBlock,
            },
            {
              id: "section-testimonials",
              name: "Testimonials",
              description: "Customer testimonials",
              onCreate: createTestimonialsBlock,
            },
            {
              id: "section-about",
              name: "About",
              description: "About company section",
              onCreate: createAboutBlock,
            },
            {
              id: "section-contact",
              name: "Contact",
              description: "Contact form section",
              onCreate: createContactFormBlock,
            },
            {
              id: "section-footer",
              name: "Footer",
              description: "Footer section",
              onCreate: createFooterBlock,
            },
          ],
        },
        {
          id: "navigation",
          label: "Navigation",
          onCreate: createHeaderBlock,
          variants: [
            {
              id: "nav-header",
              name: "Header Nav",
              description: "Top navigation bar",
              onCreate: createHeaderBlock,
            },
            {
              id: "nav-sticky",
              name: "Sticky Nav",
              description: "Sticky navigation",
              onCreate: createHeaderBlock,
            },
          ],
        },
        {
          id: "menus",
          label: "Menus",
          onCreate: createContactFormBlock,
          variants: [
            {
              id: "menu-horizontal",
              name: "Horizontal Menu",
              description: "Horizontal menu layout",
              onCreate: createContactFormBlock,
            },
            {
              id: "menu-vertical",
              name: "Vertical Menu",
              description: "Vertical menu layout",
              onCreate: createContactFormBlock,
            },
          ],
        },
      ],
    },
    {
      id: "cms",
      label: "CMS",
      items: [
        {
          id: "collections",
          label: "Collections",
          onCreate: createFeaturesBlock,
          variants: [
            {
              id: "collection-grid",
              name: "Grid Collection",
              description: "Grid layout",
              onCreate: createFeaturesBlock,
            },
            {
              id: "collection-list",
              name: "List Collection",
              description: "List layout",
              onCreate: createFeaturesBlock,
            },
          ],
        },
        {
          id: "fields",
          label: "Fields",
          onCreate: createTestimonialsBlock,
          variants: [
            {
              id: "field-text",
              name: "Text Field",
              description: "Text input",
              onCreate: createTestimonialsBlock,
            },
            {
              id: "field-image",
              name: "Image Field",
              description: "Image upload",
              onCreate: createTestimonialsBlock,
            },
          ],
        },
      ],
    },
    {
      id: "elements",
      label: "Elements",
      items: [
        {
          id: "icons",
          label: "Icons",
          onCreate: createAboutBlock,
        },
        {
          id: "media",
          label: "Media",
          onCreate: createFeaturesBlock,
        },
        {
          id: "forms",
          label: "Forms",
          onCreate: createContactFormBlock,
        },
        {
          id: "interactive",
          label: "Interactive",
          onCreate: createTestimonialsBlock,
        },
        {
          id: "social",
          label: "Social",
          onCreate: createSectionSpacerBlock,
        },
        {
          id: "utility",
          label: "Utility",
          onCreate: createHeaderBlock,
        },
        {
          id: "creative",
          label: "Creative",
          onCreate: createFooterBlock,
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

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: BlockItem) => {
    if (item.variants && item.variants.length > 0) {
      toggleItem(item.id);
    } else {
      onAddBlock(item.onCreate());
    }
  };

  const handleVariantClick = (variant: BlockVariant) => {
    onAddBlock(variant.onCreate());
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
    <>
      <div className="flex flex-col bg-white w-full h-full overflow-hidden">
        <div className="p-3 border-b border-gray-200 bg-white flex-shrink-0">
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm h-9"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div>
            {filteredSections.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  <span className="text-gray-600">{section.label}</span>
                </button>

                {expandedSections.has(section.id) && (
                  <div className="bg-white">
                    {section.items.map((item) => (
                      <div key={item.id}>
                        <button
                          onClick={() => handleItemClick(item)}
                          className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-valasys-orange transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {getIcon(item.id)}
                            <span>{item.label}</span>
                          </div>
                          {item.variants && item.variants.length > 0 && (
                            <ChevronRight className="w-4 h-4 text-gray-300" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedVariantGroup && selectedVariantGroup.variants && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedVariantGroup.label}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Choose a layout to add to your page
                </p>
              </div>
              <button
                onClick={() => setSelectedVariantGroup(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedVariantGroup.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantClick(variant)}
                    className="group relative bg-white border-2 border-gray-100 rounded-lg overflow-hidden hover:border-valasys-orange transition-all hover:shadow-lg"
                  >
                    {/* Preview Area */}
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center min-h-48">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-2 group-hover:bg-orange-100 transition-colors"></div>
                        <p className="text-sm text-gray-400 group-hover:text-valasys-orange transition-colors">
                          Preview
                        </p>
                      </div>
                    </div>

                    {/* Variant Info */}
                    <div className="p-4 bg-white">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {variant.name}
                      </h3>
                      {variant.description && (
                        <p className="text-xs text-gray-500 mt-1">
                          {variant.description}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
