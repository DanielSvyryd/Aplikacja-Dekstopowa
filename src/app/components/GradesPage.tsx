import { TrendingUp, TrendingDown, Minus, Award, BookOpen, FileText, FlaskConical, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { grades, subjectGPA } from "./mock-data";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const typeConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
  exam: { icon: Award, color: "text-chart-4", bg: "bg-chart-4/10" },
  project: { icon: BookOpen, color: "text-chart-1", bg: "bg-chart-1/10" },
  homework: { icon: FileText, color: "text-success", bg: "bg-success/10" },
  quiz: { icon: HelpCircle, color: "text-warning", bg: "bg-warning/10" },
  lab: { icon: FlaskConical, color: "text-chart-5", bg: "bg-chart-5/10" },
};

function getLetterGrade(score: number): string {
  if (score >= 93) return "A";
  if (score >= 90) return "A-";
  if (score >= 87) return "B+";
  if (score >= 83) return "B";
  if (score >= 80) return "B-";
  if (score >= 77) return "C+";
  if (score >= 73) return "C";
  if (score >= 70) return "C-";
  if (score >= 67) return "D+";
  if (score >= 60) return "D";
  return "F";
}

function getGradeColor(score: number): string {
  if (score >= 90) return "text-success";
  if (score >= 80) return "text-chart-5";
  if (score >= 70) return "text-warning";
  return "text-destructive";
}

const radarData = subjectGPA.map((s) => ({
  subject: s.subject.length > 10 ? s.subject.split(" ").map(w => w[0]).join("") : s.subject,
  fullName: s.subject,
  gpa: s.gpa,
  max: 4.0,
}));

const overallGPA =
  Math.round(
    (subjectGPA.reduce((acc, s) => acc + s.gpa, 0) / subjectGPA.length) * 100
  ) / 100;

export function GradesPage() {
  return (
    <div className="space-y-6">
      {/* GPA Overview */}
      <div className="grid grid-cols-6 gap-4">
        <Card className="col-span-2">
          <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center">
            <p className="text-xs text-muted-foreground mb-1">Semester GPA</p>
            <p className="text-5xl text-foreground mb-1">{overallGPA.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">out of 4.00</p>
            <Badge className="mt-3 bg-chart-5/10 text-chart-5 border-0">
              <TrendingUp className="w-3 h-3 mr-1" />
              +0.15 from last semester
            </Badge>
          </CardContent>
        </Card>

        {subjectGPA.map((subj) => (
          <Card key={subj.subject} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground truncate pr-2">{subj.subject}</p>
                {subj.trend === "up" && <TrendingUp className="w-3.5 h-3.5 text-success flex-shrink-0" />}
                {subj.trend === "down" && <TrendingDown className="w-3.5 h-3.5 text-destructive flex-shrink-0" />}
                {subj.trend === "stable" && <Minus className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
              </div>
              <p className="text-2xl text-foreground">{subj.gpa.toFixed(1)}</p>
              <div className="mt-2 w-full bg-muted rounded-full h-1.5">
                <div
                  className="h-full rounded-full bg-chart-1 transition-all"
                  style={{ width: `${(subj.gpa / 4) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="subject" fontSize={11} stroke="var(--muted-foreground)" />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 4]}
                    fontSize={10}
                    stroke="var(--muted-foreground)"
                    tickCount={5}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [value.toFixed(1), "GPA"]}
                    labelFormatter={(label: string) => {
                      const item = radarData.find((d) => d.subject === label);
                      return item?.fullName || label;
                    }}
                  />
                  <Radar
                    name="GPA"
                    dataKey="gpa"
                    stroke="var(--chart-1)"
                    fill="var(--chart-1)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Grades List */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1">
              {/* Table header */}
              <div className="grid grid-cols-[2fr_1.5fr_1fr_0.8fr_0.5fr] gap-3 px-3 py-2 text-xs text-muted-foreground border-b border-border">
                <span>Assignment</span>
                <span>Subject</span>
                <span>Type</span>
                <span className="text-right">Score</span>
                <span className="text-right">Grade</span>
              </div>
              {grades
                .slice()
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((grade) => {
                  const config = typeConfig[grade.type];
                  const Icon = config.icon;
                  const pct = Math.round((grade.score / grade.maxScore) * 100);
                  return (
                    <div
                      key={grade.id}
                      className="grid grid-cols-[2fr_1.5fr_1fr_0.8fr_0.5fr] gap-3 px-3 py-3 rounded-lg hover:bg-muted/50 transition-colors items-center"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`w-7 h-7 rounded ${config.bg} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-foreground truncate">{grade.assignment}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(grade.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground truncate">{grade.subject}</span>
                      <Badge variant="secondary" className={`${config.bg} ${config.color} border-0 text-xs capitalize`}>
                        {grade.type}
                      </Badge>
                      <span className={`text-sm text-right ${getGradeColor(pct)}`}>
                        {grade.score}/{grade.maxScore}
                      </span>
                      <span className={`text-sm text-right ${getGradeColor(pct)}`}>
                        {getLetterGrade(pct)}
                      </span>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
