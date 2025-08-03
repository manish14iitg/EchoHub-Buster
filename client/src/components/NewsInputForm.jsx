import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Loader2, FileText, Link2, Zap } from "lucide-react";

export function NewsInputForm({ onAnalyze, loading }) {
  const [newsInput, setNewsInput] = useState("");
  const [inputType, setInputType] = useState("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newsInput.trim()) {
      onAnalyze(newsInput.trim(), inputType);
    }
  };

  return (
    <div className="px-10 mx-5">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm ">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-semibold text-slate-800">
            Analyze Financial News
          </CardTitle>
          <CardDescription className="text-base text-slate-600">
            Choose your input method and let AI uncover diverse perspectives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium text-slate-700">
                Input Method
              </Label>
              <RadioGroup
                value={inputType}
                onValueChange={setInputType}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="text" id="text" />
                  <Label
                    htmlFor="text"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="h-4 w-4 text-blue-600" />
                    Paste Article Text
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="url" id="url" />
                  <Label
                    htmlFor="url"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Link2 className="h-4 w-4 text-green-600" />
                    Enter Article URL
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="news-input"
                className="text-base font-medium text-slate-700"
              >
                {inputType === "text" ? "Article Content" : "Article URL"}
              </Label>
              {inputType === "text" ? (
                <Textarea
                  id="news-input"
                  placeholder="Paste your financial news article text here..."
                  value={newsInput}
                  onChange={(e) => setNewsInput(e.target.value)}
                  rows={8}
                  required
                  className="resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <Input
                  id="news-input"
                  type="url"
                  placeholder="https://www.reuters.com/business/..."
                  value={newsInput}
                  onChange={(e) => setNewsInput(e.target.value)}
                  required
                  className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            </div>

            <Button
              type="submit"
              disabled={loading || !newsInput.trim()}
              className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Bust the Echo Chamber
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
