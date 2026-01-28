import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Zap, Target } from "lucide-react";

interface UnlockIntentSignalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUnlock: (selectedOptions: string[]) => void;
  currentlyClickedBadgeId?: string;
}

const unlockOptions = [
  {
    id: "current",
    label: "Unlock Current Signal",
    description: "Unlock only this company's intent signal",
  },
  {
    id: "super_strong",
    label: "Unlock Super Strong Signals Only",
    description: "Unlock only companies with super strong intent signals",
  },
  {
    id: "very_strong",
    label: "Unlock Very Strong Signals Only",
    description: "Unlock only companies with very strong intent signals",
  },
  {
    id: "strong",
    label: "Unlock Strong Signals Only",
    description: "Unlock only companies with strong intent signals",
  },
  {
    id: "all",
    label: "Unlock All Signals",
    description: "Unlock all intent signals in this list",
  },
];

export default function UnlockIntentSignalModal({
  open,
  onOpenChange,
  onUnlock,
  currentlyClickedBadgeId,
}: UnlockIntentSignalModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set(["current"]),
  );

  const handleCheckboxChange = (optionId: string) => {
    const newSelected = new Set(selectedOptions);
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      newSelected.add(optionId);
    }
    setSelectedOptions(newSelected);
  };

  const handleUnlock = () => {
    if (selectedOptions.size > 0) {
      onUnlock(Array.from(selectedOptions));
      onOpenChange(false);
      setSelectedOptions(new Set(["current"]));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 border-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Column - Bombora Logo and Introduction */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex flex-col justify-between border-r border-gray-200">
            <div>
              {/* Icon before Title */}
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 w-fit">
                <Zap className="w-6 h-6 text-white" />
              </div>

              {/* Title and Description */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Unlock Intent Signals
              </h2>

              {/* Bombora Logo */}
              <div className="mb-8">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F826a3e27b58443589187ad5b7757a718%2F26618173823c471191d805cde87239d2?format=webp&width=800"
                  alt="Powered by Bombora"
                  style={{ width: "150px" }}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Unlock Bombora intent data signals to access deeper insights
                into company buying behaviors and decision-making timelines.
              </p>

              {/* Included with Intent Signal Section */}
              <div>
                <h4 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-widest">
                  Included with Intent Signal
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex-shrink-0 text-teal-600">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">
                      Real-time intent signals
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex-shrink-0 text-teal-600">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">
                      Composite scoring breakdown
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex-shrink-0 text-teal-600">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">
                      Matched topic analysis
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex-shrink-0 text-teal-600">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">
                      Bombora Intent Delta Count
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex-shrink-0 text-teal-600">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">
                      AI-powered insights
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Unlock Options and Actions */}
          <div className="p-8 flex flex-col justify-between">
            {/* Options List */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-5 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4" />
                Choose unlock options
              </h3>
              <div className="space-y-3">
                {unlockOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all hover:shadow-md hover:bg-blue-50"
                  >
                    <Checkbox
                      checked={selectedOptions.has(option.id)}
                      onCheckedChange={() => handleCheckboxChange(option.id)}
                      className="flex-shrink-0"
                    />
                    <p className="font-semibold text-gray-900 text-sm">
                      {option.label}
                    </p>
                  </label>
                ))}
              </div>
            </div>

            {/* Note Message */}
            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded mb-6">
              <p className="text-sm text-amber-900">
                <span className="font-semibold">Note:</span> Each unlock intent
                signal deducts 5 credit.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  onOpenChange(false);
                  setSelectedOptions(new Set(["current"]));
                }}
                variant="outline"
                className="flex-1 h-11"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUnlock}
                disabled={selectedOptions.size === 0}
                className="flex-1 bg-gradient-to-r from-valasys-orange to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white h-11 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <Zap className="w-4 h-4 mr-2" />
                Unlock Selected
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
