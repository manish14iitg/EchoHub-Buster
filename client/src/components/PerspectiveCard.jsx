import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Eye } from "lucide-react";

export function PerspectiveCard({ perspective, index }) {
  const colors = [
    "border-l-blue-500 bg-blue-50/50",
    "border-l-green-500 bg-green-50/50",
    "border-l-purple-500 bg-purple-50/50",
    "border-l-orange-500 bg-orange-50/50",
    "border-l-red-500 bg-red-50/50",
  ];

  return (
    <Card
      className={`border-l-4 ${
        colors[index % colors.length]
      } hover:shadow-md transition-shadow`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-600">
                Alternative Perspective #{index + 1}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 leading-tight">
              {perspective.title}
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {perspective.summary}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 hover:bg-slate-50 bg-transparent"
          >
            <a
              href={perspective.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-inherit no-underline"
            >
              <ExternalLink className="h-4 w-4" />
              Read More
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
