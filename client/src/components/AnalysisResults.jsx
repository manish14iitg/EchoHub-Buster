import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { PerspectiveCard } from "./PerspectiveCard";
import { Building2, Factory, Lightbulb, FileText } from "lucide-react";

export function AnalysisResults({ result }) {
  const { originalAnalysis, divergentPerspectives } = result;

  return (
    <div className="space-y-8 px-10 mx-5">
      {/* Original Analysis */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-2xl text-slate-800">
              Original Analysis
            </CardTitle>
          </div>
          <CardDescription>
            AI-powered breakdown of the article's key elements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-lg">
            <h4 className="font-semibold text-slate-800 mb-2">Summary</h4>
            <p className="text-slate-700 leading-relaxed">
              {originalAnalysis.summary}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-green-600" />
                <h4 className="font-semibold text-slate-800">Companies</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {originalAnalysis.companies.length > 0 ? (
                  originalAnalysis.companies.map((company, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      {company}
                    </Badge>
                  ))
                ) : (
                  <span className="text-slate-500 text-sm">
                    None identified
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Factory className="h-4 w-4 text-orange-600" />
                <h4 className="font-semibold text-slate-800">Industries</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {originalAnalysis.industries.length > 0 ? (
                  originalAnalysis.industries.map((industry, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-orange-100 text-orange-800"
                    >
                      {industry}
                    </Badge>
                  ))
                ) : (
                  <span className="text-slate-500 text-sm">
                    None identified
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-purple-600" />
                <h4 className="font-semibold text-slate-800">Themes</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {originalAnalysis.themes.length > 0 ? (
                  originalAnalysis.themes.map((theme, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-purple-100 text-purple-800"
                    >
                      {theme}
                    </Badge>
                  ))
                ) : (
                  <span className="text-slate-500 text-sm">
                    None identified
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Divergent Perspectives */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-800">
            Divergent Perspectives
          </CardTitle>
          <CardDescription>
            Alternative viewpoints and contrasting analyses from other sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          {divergentPerspectives && divergentPerspectives.length > 0 ? (
            <div className="grid gap-4">
              {divergentPerspectives.map((perspective, index) => (
                <PerspectiveCard
                  key={index}
                  perspective={perspective}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-slate-600 text-lg">
                No significantly divergent perspectives found
              </p>
              <p className="text-slate-500 text-sm mt-2">
                This could indicate consensus in reporting or limited
                alternative coverage
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
