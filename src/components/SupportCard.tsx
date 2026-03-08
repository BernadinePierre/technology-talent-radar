import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";

const presets = [
  { label: "£1", value: 1 },
  { label: "£5", value: 5 },
];

export const SupportCard = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const isCustom = selected === null && custom.length > 0;
  const amount = selected ?? (parseFloat(custom) || 0);

  const handleDonate = () => {
    // Placeholder — wire to Stripe or payment link
    const url = `https://donate.stripe.com/7sY7sL1zk5Nfg7f1jV2ZO00`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 text-center">
      <Heart className="w-6 h-6 text-secondary mx-auto mb-3" />
      <h3 className="text-sm font-semibold font-heading uppercase tracking-wider mb-1">
        Support continued development
      </h3>
      <p className="text-xs text-muted-foreground mb-5">
        Does not unlock extra features — keeps the tool free for everyone.
      </p>

      <div className="flex items-center justify-center gap-2 mb-4">
        {presets.map((p) => (
          <button
            key={p.value}
            onClick={() => { setSelected(p.value); setCustom(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              selected === p.value
                ? "border-secondary bg-secondary/10 text-secondary"
                : "border-border bg-muted/40 text-foreground hover:border-secondary/50"
            }`}
          >
            {p.label}
          </button>
        ))}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">£</span>
          <Input
            type="number"
            min="1"
            placeholder="Other"
            value={custom}
            onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
            className="w-24 pl-7 h-10 text-sm"
          />
        </div>
      </div>

      <Button
        variant="hero"
        size="sm"
        disabled={amount < 1}
        onClick={handleDonate}
        className="px-6"
      >
        Donate {amount >= 1 ? `£${amount}` : ""}
      </Button>
    </div>
  );
};
