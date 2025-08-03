import { TrendingUp, Eye } from "lucide-react";

export function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-blue-600 rounded-full">
          <Eye className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          EchoHub Buster
        </h1>
      </div>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Break free from echo chambers. Discover diverse perspectives in
        financial news and uncover the full story.
      </p>
      <div className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-500">
        <TrendingUp className="h-4 w-4" />
        <span>Powered by AI-driven analysis</span>
      </div>
    </div>
  );
}
