import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquarePlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const feedbackSchema = z.object({
  type: z.enum(["suggestion", "question", "bug"]),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(1000, "Maximum 1000 characters."),
});

export const FeedbackForm = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>("suggestion");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!user) return null;

  const handleSubmit = async () => {
    const result = feedbackSchema.safeParse({ type, message });
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("feedback").insert({
      user_id: user.id,
      type: result.data.type,
      message: result.data.message,
    });
    setSubmitting(false);

    if (error) {
      toast.error("Failed to submit feedback.");
    } else {
      toast.success("Thanks for your feedback!");
      setMessage("");
      setType("suggestion");
      setOpen(false);

      // Send email notification (fire-and-forget)
      supabase.functions.invoke("notify-feedback", {
        body: { type: result.data.type, message: result.data.message },
      }).catch(() => {
        // Silent fail - feedback was already saved
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MessageSquarePlus className="w-4 h-4 mr-1" />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Send Feedback</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Type</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="suggestion">Suggestion</SelectItem>
                <SelectItem value="question">Question</SelectItem>
                <SelectItem value="bug">Bug Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              placeholder="Tell us what's on your mind…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1000}
              rows={4}
            />
            <p className="text-xs text-muted-foreground text-right">{message.length}/1000</p>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full"
          >
            {submitting ? "Submitting…" : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
