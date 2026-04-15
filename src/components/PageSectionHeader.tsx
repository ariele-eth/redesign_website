import type { ReactNode } from "react";

type PageSectionHeaderProps = {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function PageSectionHeader({ label, title, description, align = "left", className }: PageSectionHeaderProps) {
  return (
    <div className={`page-section-header ${align === "center" ? "page-section-header-center" : ""}${className ? ` ${className}` : ""}`}>
      <span className="label">{label}</span>
      <h2 className="h2">{title}</h2>
      {description ? <p className="lead">{description}</p> : null}
    </div>
  );
}
