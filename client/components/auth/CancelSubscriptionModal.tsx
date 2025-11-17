import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertTriangle,
  Calendar,
  CreditCard,
  Clock,
  Mail,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

interface CancelSubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail: string;
  planDetails: {
    plan: string;
    credits: number;
    nextBilling: Date;
    planExpiryDate: Date;
  };
  onConfirm: (email: string, reason: string) => void;
}

export default function CancelSubscriptionModal({
  open,
  onOpenChange,
  userEmail,
  planDetails,
  onConfirm,
}: CancelSubscriptionModalProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(userEmail);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((r) => setTimeout(r, 500));
      onConfirm(email, reason);
      setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpgrade = () => {
    navigate("/subscription");
    onOpenChange(false);
    setShowSuccess(false);
    setEmail(userEmail);
    setReason("");
  };

  const handleClose = () => {
    onOpenChange(false);
    setShowSuccess(false);
    setEmail(userEmail);
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900">
                Cancel Your Subscription
              </DialogTitle>
              <DialogDescription className="mt-2 text-gray-600">
                We're sorry to see you go. Please review your plan details below
                and let us know why you're canceling so we can improve our
                service.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plan Details Summary */}
          <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">
              Current Plan Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-orange-200 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-4 h-4 text-valasys-orange" />
                </div>
                <div>
                  <div className="text-xs text-gray-600">Plan</div>
                  <div className="font-semibold text-gray-900">
                    {planDetails.plan}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-orange-200 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-4 h-4 text-valasys-orange" />
                </div>
                <div>
                  <div className="text-xs text-gray-600">Remaining Credits</div>
                  <div className="font-semibold text-gray-900">
                    {planDetails.credits.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-orange-200 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-valasys-orange" />
                </div>
                <div>
                  <div className="text-xs text-gray-600">Next Billing Date</div>
                  <div className="font-semibold text-gray-900">
                    {planDetails.nextBilling.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-orange-200 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-valasys-orange" />
                </div>
                <div>
                  <div className="text-xs text-gray-600">Plan Expiry</div>
                  <div className="font-semibold text-gray-900">
                    {planDetails.planExpiryDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-sm text-yellow-800">
              <span className="font-semibold">Important:</span> Once you cancel
              your subscription, your access to the platform will be revoked
              immediately. Your data will be retained for 7 days before
              permanent deletion. Download any critical reports or data before
              confirming cancellation.
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="cancel-email" className="text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-valasys-orange" />
                <span>Email Address</span>
              </Label>
              <Input
                id="cancel-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@company.com"
                required
                className="border-gray-300 focus:border-valasys-orange focus:ring-valasys-orange/20"
              />
              <p className="text-xs text-gray-600">
                Confirmation will be sent to this email address
              </p>
            </div>

            {/* Reason for Cancellation */}
            <div className="space-y-2">
              <Label htmlFor="cancel-reason" className="text-gray-700">
                Reason for Cancellation
                <span aria-hidden="true" className="text-red-500 ml-1">
                  *
                </span>
              </Label>
              <textarea
                id="cancel-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please let us know why you're canceling (this helps us improve)..."
                required
                minLength={10}
                maxLength={500}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-valasys-orange/20 focus:border-valasys-orange transition-colors resize-none"
                rows={4}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-600">
                  Minimum 10 characters
                </p>
                <p className="text-xs text-gray-500">
                  {reason.length}/500
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="border-gray-300 hover:bg-gray-50"
            >
              Keep Subscription
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || reason.length < 10}
              className={`${
                isSubmitting || reason.length < 10
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              } text-white font-medium`}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Confirm Cancellation"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
