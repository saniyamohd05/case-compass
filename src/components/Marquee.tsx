const tags = [
  "Legal Risk Analysis",
  "Consumer Disputes",
  "Employment Issues",
  "Tenant Conflicts",
  "Freelancer Payments",
  "Contract Breaches",
  "Evidence Checklist",
  "Time & Cost Estimation",
  "Decision Intelligence",
  "Smart Legal Choices",
  "AI Case Analysis",
];

const Marquee = () => {
  return (
    <div className="py-6 border-y border-border overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...tags, ...tags].map((tag, i) => (
          <span
            key={i}
            className="mx-3 px-4 py-1.5 rounded-full border border-border text-xs text-muted-foreground shrink-0"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
