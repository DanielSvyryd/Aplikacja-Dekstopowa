import {
  GitCommit,
  GitPullRequest,
  Eye,
  CircleDot,
  Flame,
  FolderGit2,
  Plus,
  Minus,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  githubEvents,
  githubContributions,
  githubStats,
  studentProfile,
} from "./mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const eventTypeConfig: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; label: string }
> = {
  commit: { icon: GitCommit, color: "text-success", bg: "bg-success/10", label: "Commit" },
  pr: { icon: GitPullRequest, color: "text-chart-1", bg: "bg-chart-1/10", label: "Pull Request" },
  review: { icon: Eye, color: "text-chart-5", bg: "bg-chart-5/10", label: "Code Review" },
  issue: { icon: CircleDot, color: "text-chart-4", bg: "bg-chart-4/10", label: "Issue" },
  star: { icon: Flame, color: "text-warning", bg: "bg-warning/10", label: "Star" },
};

// Generate a contribution heatmap (last 7 weeks)
const heatmapWeeks = 10;
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function generateHeatmap() {
  const data: number[][] = [];
  for (let w = 0; w < heatmapWeeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      // Generate realistic-looking data
      if (d >= 5) {
        week.push(Math.random() > 0.6 ? Math.floor(Math.random() * 3) : 0);
      } else {
        week.push(Math.floor(Math.random() * 6));
      }
    }
    data.push(week);
  }
  return data;
}

const heatmapData = generateHeatmap();

function getHeatmapColor(count: number): string {
  if (count === 0) return "bg-muted";
  if (count <= 1) return "bg-chart-1/20";
  if (count <= 2) return "bg-chart-1/40";
  if (count <= 3) return "bg-chart-1/60";
  return "bg-chart-1/80";
}

export function GitHubPage() {
  return (
    <div className="space-y-6">
      {/* GitHub Stats Overview */}
      <div className="grid grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-5 pb-5 text-center">
            <GitCommit className="w-5 h-5 text-success mx-auto mb-1" />
            <p className="text-2xl text-foreground">{githubStats.totalCommits}</p>
            <p className="text-xs text-muted-foreground">Commits</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5 text-center">
            <GitPullRequest className="w-5 h-5 text-chart-1 mx-auto mb-1" />
            <p className="text-2xl text-foreground">{githubStats.totalPRs}</p>
            <p className="text-xs text-muted-foreground">Pull Requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5 text-center">
            <Eye className="w-5 h-5 text-chart-5 mx-auto mb-1" />
            <p className="text-2xl text-foreground">{githubStats.totalReviews}</p>
            <p className="text-xs text-muted-foreground">Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5 text-center">
            <CircleDot className="w-5 h-5 text-chart-4 mx-auto mb-1" />
            <p className="text-2xl text-foreground">{githubStats.totalIssues}</p>
            <p className="text-xs text-muted-foreground">Issues</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5 text-center">
            <Flame className="w-5 h-5 text-warning mx-auto mb-1" />
            <p className="text-2xl text-foreground">{githubStats.streak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5 text-center">
            <FolderGit2 className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
            <p className="text-2xl text-foreground">{githubStats.repositories}</p>
            <p className="text-xs text-muted-foreground">Repositories</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Contribution Heatmap */}
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Contribution Heatmap</CardTitle>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${getHeatmapColor(level)}`}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-1.5">
              <div className="flex flex-col gap-1.5 mr-1">
                {daysOfWeek.map((day) => (
                  <div key={day} className="h-4 flex items-center">
                    <span className="text-xs text-muted-foreground w-7">{day.slice(0, 2)}</span>
                  </div>
                ))}
              </div>
              {heatmapData.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((count, dIdx) => (
                    <div
                      key={`${wIdx}-${dIdx}`}
                      className={`w-4 h-4 rounded-sm ${getHeatmapColor(count)} transition-colors`}
                      title={`${count} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Commits Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>This Week's Commits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={githubContributions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" fontSize={11} tickLine={false} axisLine={false} stroke="var(--muted-foreground)" />
                  <YAxis fontSize={11} tickLine={false} axisLine={false} stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="commits" fill="var(--chart-1)" radius={[4, 4, 0, 0]} barSize={24} name="Commits" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 mt-3 bg-success/5 rounded-lg p-2.5">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-xs text-success">21 commits this week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* GitHub Profile + Event Feed */}
      <div className="grid grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card>
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-sidebar flex items-center justify-center text-sidebar-foreground text-lg">
                {studentProfile.name.charAt(0)}
              </div>
              <div>
                <p className="text-foreground">{studentProfile.githubUsername}</p>
                <p className="text-xs text-muted-foreground">{studentProfile.name}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Repositories</span>
                <span className="text-sm text-foreground">{githubStats.repositories}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Languages</span>
                <div className="flex items-center gap-1.5">
                  <Badge variant="secondary" className="bg-chart-5/10 text-chart-5 border-0 text-xs">TS</Badge>
                  <Badge variant="secondary" className="bg-warning/10 text-warning border-0 text-xs">JS</Badge>
                  <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-0 text-xs">Python</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Current Streak</span>
                <div className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-warning" />
                  <span className="text-sm text-foreground">{githubStats.streak} days</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Event Feed */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {githubEvents.map((event) => {
                const config = eventTypeConfig[event.type];
                const Icon = config.icon;
                return (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 p-3 rounded-xl border border-border/50 hover:border-border hover:bg-muted/30 transition-all"
                  >
                    <div className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge variant="secondary" className={`${config.bg} ${config.color} border-0 text-xs`}>
                          {config.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono">{event.repo}</span>
                      </div>
                      <p className="text-sm text-foreground">{event.message}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        {event.additions !== undefined && event.additions > 0 && (
                          <span className="text-xs text-success flex items-center gap-0.5">
                            <Plus className="w-3 h-3" />
                            {event.additions}
                          </span>
                        )}
                        {event.deletions !== undefined && event.deletions > 0 && (
                          <span className="text-xs text-destructive flex items-center gap-0.5">
                            <Minus className="w-3 h-3" />
                            {event.deletions}
                          </span>
                        )}
                      </div>
                    </div>
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
