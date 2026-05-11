interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  compact?: boolean;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  centered = false,
  compact = false,
}: SectionHeadingProps) {
  const className = [
    "section-heading",
    centered ? "section-heading--centered" : "",
    compact ? "section-heading--compact" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </header>
  );
}
