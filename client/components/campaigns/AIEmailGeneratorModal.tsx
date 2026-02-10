import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
  Zap,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIEmailGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignName: string;
  jobTitles: string[];
  jobFunctions: string[];
  jobLevels: string[];
  geolocations: string[];
  industries: string[];
  onAddToAssets: () => void;
}

interface EmailSample {
  id: string;
  variant: string;
  subject: string;
  preview: string;
  body: string;
  cta: string;
  tone: string;
}

// Email sample generator
function generateEmailSamples(
  campaignName: string,
  jobTitles: string[],
  jobFunctions: string[],
  jobLevels: string[],
  industries: string[],
): EmailSample[] {
  const primaryJobTitle = jobTitles[0] || "Professional";
  const primaryFunction = jobFunctions[0] || "Your Team";
  const primaryLevel = jobLevels[0] || "Manager";
  const primaryIndustry = industries[0] || "Your Industry";

  return [
    {
      id: "sample-1",
      variant: "Professional & Formal",
      subject: `${campaignName}: Strategic Opportunity for ${primaryJobTitle}s in ${primaryIndustry}`,
      preview: `Discover how industry leaders are transforming their ${primaryFunction} operations...`,
      body: `Dear ${primaryLevel},

I hope this message finds you well. I'm reaching out because your expertise in ${primaryFunction} at a ${primaryIndustry} organization like yours makes you an ideal fit for our latest initiative.

At ${campaignName}, we're helping ${primaryJobTitle}s like yourself drive meaningful transformation in ${primaryFunction}. Our platform has helped over 500+ companies increase efficiency by 40% and reduce operational costs.

What makes our solution different:
• Industry-specific best practices tailored for ${primaryIndustry}
• Seamless integration with your existing workflows
• Dedicated support from ${primaryFunction} experts

I'd love to schedule a brief 15-minute call to discuss how we can help you achieve your goals for 2024. Would you be available next week?

Best regards,
[Your Name]
[Your Title]
${campaignName}`,
      cta: "Schedule a Demo",
      tone: "Professional",
    },
    {
      id: "sample-2",
      variant: "Conversational & Engaging",
      subject: `Quick question for you, ${primaryLevel}...`,
      preview: `I noticed you're working in ${primaryFunction} and thought you'd appreciate this...`,
      body: `Hi there!

I came across your profile and noticed you're focused on ${primaryFunction} in ${primaryIndustry}. Honestly, that's exactly the type of leader we're trying to help right now.

Here's the thing: most ${primaryJobTitle}s spend 15+ hours per week on manual tasks that could be automated. It's frustrating, right? 

At ${campaignName}, we've built something specifically to solve this. Our platform is already helping teams like yours:
✓ Save 10+ hours per week on manual processes
✓ Improve team collaboration across ${primaryFunction}
✓ Get actionable insights that actually move the needle

The best part? You can get started in minutes, no complicated setup required.

Would you be open to a quick chat? I can show you exactly how this works for teams in ${primaryIndustry} and answer any questions you might have.

Cheers,
[Your Name]
${campaignName}`,
      cta: "Let's Chat",
      tone: "Friendly",
    },
    {
      id: "sample-3",
      variant: "Problem-Focused & Solution-Oriented",
      subject: `${primaryJobTitle}s in ${primaryIndustry}: Are you struggling with this?`,
      preview: `Common challenge we see ${jobLevels.join("/")}s facing in ${primaryFunction}...`,
      body: `Hello ${primaryLevel},

I work with ${primaryJobTitle}s across ${primaryIndustry}, and there's one challenge I hear about constantly: ${primaryFunction} teams spend too much time on repetitive tasks and not enough on strategic work.

Sound familiar?

The root cause? Most processes are still manual, error-prone, and don't scale as the team grows.

That's why we built ${campaignName}. We help organizations like yours:

📊 Replace manual ${primaryFunction} processes with intelligent automation
🚀 Accelerate project delivery by up to 3x
💡 Empower ${primaryJobTitle}s to focus on high-impact work

We've already partnered with leading ${primaryIndustry} companies that are seeing real results. I'd be happy to share a quick case study specific to your organization type.

Would it make sense to connect for 20 minutes next Tuesday or Wednesday?

Looking forward to connecting,
[Your Name]
${campaignName}`,
      cta: "View Case Study",
      tone: "Data-Driven",
    },
  ];
}

export function AIEmailGeneratorModal({
  isOpen,
  onClose,
  campaignName,
  jobTitles,
  jobFunctions,
  jobLevels,
  geolocations,
  industries,
  onAddToAssets,
}: AIEmailGeneratorModalProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);

  const samples = generateEmailSamples(
    campaignName,
    jobTitles,
    jobFunctions,
    jobLevels,
    industries,
  );

  const currentSample = samples[currentSampleIndex];

  const handleCopy = (text: string, sampleId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(sampleId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddAssets = () => {
    onAddToAssets();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-blue-600" />
            AI Email Generator
          </DialogTitle>
          <DialogDescription>
            Preview 3 AI-generated email samples customized for your campaign:
            <span className="font-semibold text-gray-900 block mt-1">
              "{campaignName}"
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Campaign Context Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            {jobTitles.length > 0 && (
              <div>
                <p className="text-xs text-gray-600 font-medium">Job Titles</p>
                <p className="text-sm text-gray-900 truncate">
                  {jobTitles.slice(0, 2).join(", ")}
                  {jobTitles.length > 2 ? "..." : ""}
                </p>
              </div>
            )}
            {jobLevels.length > 0 && (
              <div>
                <p className="text-xs text-gray-600 font-medium">Levels</p>
                <p className="text-sm text-gray-900 truncate">
                  {jobLevels.slice(0, 2).join(", ")}
                  {jobLevels.length > 2 ? "..." : ""}
                </p>
              </div>
            )}
            {geolocations.length > 0 && (
              <div>
                <p className="text-xs text-gray-600 font-medium">Regions</p>
                <p className="text-sm text-gray-900 truncate">
                  {geolocations.slice(0, 2).join(", ")}
                  {geolocations.length > 2 ? "..." : ""}
                </p>
              </div>
            )}
            {industries.length > 0 && (
              <div>
                <p className="text-xs text-gray-600 font-medium">Industries</p>
                <p className="text-sm text-gray-900 truncate">
                  {industries.slice(0, 2).join(", ")}
                  {industries.length > 2 ? "..." : ""}
                </p>
              </div>
            )}
          </div>

          {/* Email Samples Carousel */}
          <div className="space-y-4">
            {/* Navigation Tabs */}
            <Tabs
              value={currentSample.id}
              onValueChange={(value) => {
                const index = samples.findIndex((s) => s.id === value);
                setCurrentSampleIndex(index);
              }}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 gap-2 bg-transparent">
                {samples.map((sample, index) => (
                  <TabsTrigger
                    key={sample.id}
                    value={sample.id}
                    className={cn(
                      "text-xs font-medium py-2 px-3 rounded-lg border-2 transition-all",
                      currentSampleIndex === index
                        ? "bg-blue-100 border-blue-500 text-blue-900"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-300",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Zap className="w-3 h-3" />
                      Sample {index + 1}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {samples.map((sample, index) => (
                <TabsContent
                  key={sample.id}
                  value={sample.id}
                  className="space-y-4"
                >
                  {/* Email Preview Card */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Badge className="bg-blue-100 text-blue-800 text-xs mb-2">
                            {sample.tone} Tone
                          </Badge>
                          <h4 className="font-bold text-gray-900 text-sm">
                            {sample.variant}
                          </h4>
                        </div>
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    {/* Email Content */}
                    <div className="p-6 space-y-4">
                      {/* Subject Line */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="text-xs font-semibold text-gray-600 mb-1">
                          SUBJECT LINE
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {sample.subject}
                        </p>
                        <p className="text-xs text-gray-600 mt-2">
                          📊 Preview: {sample.preview}
                        </p>
                      </div>

                      {/* Email Body */}
                      <div className="bg-white rounded-lg p-4 border border-gray-200 max-h-64 overflow-y-auto">
                        <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed font-mono text-xs">
                          {sample.body}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600 font-medium">
                            CALL TO ACTION
                          </p>
                          <p className="text-sm font-semibold text-blue-900">
                            {sample.cta}
                          </p>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => handleCopy(sample.body, sample.id)}
                          className={cn(
                            "gap-1 text-xs",
                            copiedId === sample.id
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-blue-600 hover:bg-blue-700",
                          )}
                        >
                          {copiedId === sample.id ? (
                            <>
                              <Check className="w-3 h-3" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy Email
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentSampleIndex(Math.max(0, index - 1))}
                      disabled={index === 0}
                      className="gap-1"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      Previous
                    </Button>

                    <span className="text-xs text-gray-600">
                      Sample {index + 1} of {samples.length}
                    </span>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentSampleIndex(Math.min(samples.length - 1, index + 1))
                      }
                      disabled={index === samples.length - 1}
                      className="gap-1"
                    >
                      Next
                      <ChevronRight className="w-3 h-3" />
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Info Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-xs text-amber-800">
              <span className="font-semibold">💡 Pro Tip:</span> These are
              sample variations. When you add this asset to your campaign, the
              AI will generate personalized versions for each recipient based on
              their profile and your selected targeting criteria.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 justify-end border-t pt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleAddAssets}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <Mail className="w-4 h-4" />
            Add to Campaign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
