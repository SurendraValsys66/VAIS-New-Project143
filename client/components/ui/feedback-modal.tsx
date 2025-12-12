import { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FeedbackModal({ open, onOpenChange }: FeedbackModalProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSendFeedback = () => {
    if (!rating || !comment.trim()) {
      alert("Please provide a rating and comment");
      return;
    }

    console.log("Feedback submitted:", { rating, comment });
    setRating(null);
    setComment("");
    onOpenChange(false);

    // Show success toast
    toast({
      title: "Thank you for your feedback!",
      description:
        "We appreciate your input and will use it to improve our service.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm bg-white [&>button]:hidden">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 -mx-6 px-6">
          <h2 className="text-xl font-semibold text-gray-900">Rate your experience! 👋</h2>
          <DialogClose asChild>
            <button
              className="inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-6 w-6 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogClose>
        </div>

        <div className="space-y-6">
          {/* Rating Section */}
          <div className="space-y-3 text-center">
            <h3 className="text-lg font-bold text-gray-900">
              We love to hear from you! How's your experience with the{" "}
              <span className="text-valasys-orange">Valasys AI Score</span>?
            </h3>

            {/* Star Rating */}
            <div className="flex justify-center items-center gap-5 py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(null)}
                  className="transition-all duration-200 transform"
                  title={`${star} star${star !== 1 ? "s" : ""}`}
                  type="button"
                >
                  <Star
                    className={cn(
                      "w-8 h-8 transition-all duration-200",
                      (hoveredRating !== null && star <= hoveredRating) ||
                        (rating !== null && star <= rating)
                        ? "text-[#f7c52a]"
                        : "text-gray-300 hover:text-[#f7c52a]",
                    )}
                    style={
                      (hoveredRating !== null && star <= hoveredRating) ||
                      (rating !== null && star <= rating)
                        ? { fill: "#f7c52a" }
                        : {}
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Description Text */}
          <p className="text-sm text-gray-600 leading-relaxed text-center">
            Your feedback helps us improve our service.
            <br />
            Please share your thoughts and suggestions below.
          </p>

          {/* Simple Textarea */}
          <textarea
            placeholder="Any comments for us?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-4 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none border border-gray-200 rounded-lg min-h-32 focus:ring-2 focus:ring-valasys-orange focus:border-transparent"
          />

          {/* Send Button */}
          <Button
            onClick={handleSendFeedback}
            className="w-full bg-valasys-orange hover:bg-valasys-orange/90 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Send Feedback
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
