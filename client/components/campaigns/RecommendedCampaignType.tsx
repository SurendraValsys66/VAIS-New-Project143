import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  Target,
  Zap,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface RecommendationData {
  type: "mql" | "hql" | "content-syndication" | "bant" | "webinar";
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  reasons: string[];
  expectedOutcome: string;
  secondary?: {
    type: string;
    reason: string;
  };
}

interface RecommendedCampaignTypeProps {
  jobTitles: string[];
  jobFunctions: string[];
  jobLevels: string[];
  geolocations: string[];
  employeeSize: string[];
  industries: string[];
  totalDeliverables?: number;
  campaignAssets?: any[];
}

const campaignTypeConfig: {
  [key: string]: Omit<RecommendationData, "type">;
} = {
  mql: {
    name: "MQL Campaign",
    description: "Marketing Qualified Lead Generation",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    reasons: [
      "High volume lead generation strategy",
      "Efficient cost-per-lead scaling",
      "Perfect for awareness and top-of-funnel building",
    ],
    expectedOutcome: "3-5x increase in qualified leads within 30 days",
  },
  hql: {
    name: "HQL Campaign",
    description: "High Quality Lead Targeting",
    icon: <Target className="w-6 h-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    reasons: [
      "Higher conversion probability with refined targeting",
      "Better lead qualification and fit scoring",
      "Balanced volume and quality ratio",
    ],
    expectedOutcome: "2-3x conversion improvement over baseline",
  },
  "content-syndication": {
    name: "Content Syndication",
    description: "Gated Content Distribution",
    icon: <BookOpen className="w-6 h-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    reasons: [
      "Scales reach across multiple channels quickly",
      "Ideal distribution for gated content assets",
      "Builds awareness while capturing leads",
    ],
    expectedOutcome: "5-8x content reach with 15-20% lead capture rate",
  },
  bant: {
    name: "BANT Campaign",
    description: "Budget-Authority-Need-Timeline Qualification",
    icon: <Zap className="w-6 h-6" />,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    reasons: [
      "Highly sales-ready leads with verified BANT criteria",
      "Perfect for enterprise and high-value deals",
      "Strong pipeline conversion potential",
    ],
    expectedOutcome: "60%+ sales qualified lead rate with 30%+ conversion",
  },
  webinar: {
    name: "Webinar Campaign",
    description: "Event Registration & Engagement",
    icon: <Users className="w-6 h-6" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    reasons: [
      "High engagement intent from registered attendees",
      "Builds trust and authority through educational content",
      "Strong mid-funnel accelerator for deals",
    ],
    expectedOutcome: "40-50% attendance rate with 25%+ pipeline impact",
  },
};

export default function RecommendedCampaignType({
  jobTitles,
  jobFunctions,
  jobLevels,
  geolocations,
  employeeSize,
  industries,
  totalDeliverables = 0,
  campaignAssets = [],
}: RecommendedCampaignTypeProps) {
  const recommendation = useMemo<RecommendationData | null>(() => {
    // Calculate recommendation based on selection criteria
    const hasWebinarAsset = campaignAssets?.some(
      (asset) =>
        asset.type === "webinar" ||
        asset.name?.toLowerCase().includes("webinar"),
    );

    if (hasWebinarAsset) {
      return {
        type: "webinar",
        ...campaignTypeConfig.webinar,
      };
    }

    // Check for content download focus
    const hasContentAssets = campaignAssets?.some(
      (asset) =>
        asset.type === "content" ||
        asset.type === "ebook" ||
        asset.type === "whitepaper" ||
        asset.name?.toLowerCase().includes("content"),
    );

    // Analyze targeting criteria
    const hasRefinedTargeting =
      jobTitles.length > 0 &&
      employeeSize.length > 0 &&
      jobLevels.some((level) => ["Director", "VP", "C-Level"].includes(level));

    const isEnterpriseTarget =
      (employeeSize.some((size) =>
        ["5001-10,000", "10,000+", "5000+"].includes(size),
      ) ||
        jobLevels.some((level) => ["C-Level", "VP"].includes(level))) &&
      jobTitles.length <= 2;

    const isBroadTargeting =
      jobTitles.length >= 3 &&
      jobFunctions.length >= 2 &&
      geolocations.length >= 2;

    // Determine volume level
    const isHighVolume = totalDeliverables > 5000 || geolocations.length >= 3;
    const isModerateVolume =
      totalDeliverables >= 1000 && totalDeliverables <= 5000;
    const isLowVolume = totalDeliverables < 1000 && isEnterpriseTarget;

    // Recommendation logic
    if (isEnterpriseTarget && isLowVolume) {
      return {
        type: "bant",
        ...campaignTypeConfig.bant,
        secondary: {
          type: "HQL Campaign",
          reason: "Alternative for broader enterprise reach",
        },
      };
    }

    if (hasContentAssets && !isEnterpriseTarget) {
      return {
        type: "content-syndication",
        ...campaignTypeConfig["content-syndication"],
        secondary: {
          type: "MQL Campaign",
          reason: "For additional lead volume growth",
        },
      };
    }

    if (isHighVolume && isBroadTargeting) {
      return {
        type: "mql",
        ...campaignTypeConfig.mql,
        secondary: {
          type: "Content Syndication",
          reason: "To amplify reach across channels",
        },
      };
    }

    if (hasRefinedTargeting && isModerateVolume) {
      return {
        type: "hql",
        ...campaignTypeConfig.hql,
        secondary: {
          type: "MQL Campaign",
          reason: "For volume scaling after initial qualification",
        },
      };
    }

    // Default to HQL if no specific criteria matched
    return {
      type: "hql",
      ...campaignTypeConfig.hql,
    };
  }, [jobTitles, jobFunctions, jobLevels, geolocations, employeeSize, industries, totalDeliverables, campaignAssets]);

  if (!recommendation) {
    return null;
  }

  return (
    <div className="space-y-2">
      {/* Compact Header */}
      <h3 className="text-sm font-semibold text-gray-900">
        Recommended Campaign Type
      </h3>

      {/* Minimal Recommendation Card */}
      <Card
        className={cn(
          "border shadow-sm hover:shadow-md transition-shadow",
          recommendation.borderColor,
        )}
      >
        <CardHeader className={cn("py-3 px-4", recommendation.bgColor)}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className={recommendation.color}>{recommendation.icon}</div>
              <div className="flex-1">
                <CardTitle className={cn("text-base font-bold", recommendation.color)}>
                  {recommendation.name}
                </CardTitle>
              </div>
            </div>
            <Badge className={cn("h-fit whitespace-nowrap text-xs", recommendation.bgColor, recommendation.color, "border-current")}>
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Recommended
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="py-3 px-4">
          <div className="space-y-2">
            {/* Compact Why This Is Recommended */}
            <div>
              <ul className="space-y-1">
                {recommendation.reasons.slice(0, 2).map((reason, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-gray-700">
                    <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compact Expected Outcome */}
            <div className={cn("p-2 rounded border text-xs", recommendation.bgColor, recommendation.borderColor)}>
              <p className={cn("font-medium", recommendation.color)}>
                {recommendation.expectedOutcome}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
