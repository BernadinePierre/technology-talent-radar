import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export const SupportCard = () => {
  const handleDonate = () => {
    window.open("https://donate.stripe.com/7sY7sL1zk5Nfg7f1jV2ZO00", "_blank");
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 text-center">
      <Heart className="w-6 h-6 text-secondary mx-auto mb-3" />
      <h3 className="text-sm font-semibold font-heading uppercase tracking-wider mb-1">
        Support continued development
      </h3>
      <p className="text-xs text-muted-foreground mb-5">
        Keeps the tool free for everyone. Does not unlock extra features (but stay tuned for premium features).
      </p>
      <Button variant="hero" size="sm" onClick={handleDonate} className="px-6">
        Donate
      </Button>
    </div>
  );
};
