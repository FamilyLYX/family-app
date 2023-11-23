// Breadcrumbs.tsx
import React from "react";

type BreadcrumbItem = {
  title: string;
  link?: string;
};
type BreadcrumbsProps = {
  titles: BreadcrumbItem[];
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ titles }) => {
  return (
    <nav aria-label="breadcrumb" className="text-sm">
      <ol className="flex">
        {titles.map((item, index) => {
          const isLast = index === titles.length - 1;
          return (
            <li key={item.title} className={isLast ? "text-red-500" : ""}>
              {item.link && !isLast ? (
                <a
                  href={item.link}
                  className="text-black/30 hover:text-black/50 mr-2"
                >
                  {item.title}
                </a>
              ) : (
                <span className={isLast ? "text-black/80" : "text-black/30"}>
                  {item.title}
                </span>
              )}
              {!isLast && <span className="text-black/30 mx-2">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
