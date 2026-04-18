import {
  HelpCircle,
  MessageCircle,
  MessagesSquare,
  Presentation,
  Users,
  TrendingUp,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { classActivities } from "./mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const activityTypeConfig: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; label: string }
> = {
  question: { icon: HelpCircle, color: "text-chart-5", bg: "bg-chart-5/10", label: "Question" },
  answer: { icon: MessageCircle, color: "text-success", bg: "bg-success/10", label: "Answer" },
  discussion: { icon: MessagesSquare, color: "text-chart-1", bg: "bg-chart-1/10", label: "Discussion" },
  presentation: { icon: Presentation, color: "text-chart-4", bg: "bg-chart-4/10", label: "Presentation" },
  "peer-help": { icon: Users, color: "text-warning", bg: "bg-warning/10", label: "Peer Help" },
};

// Calculate stats
const totalPoints = classActivities.reduce((sum, a) => sum + a.points, 0);
const activityBreakdown = Object.entries(activityTypeConfig).map(([type, config]) => {
  const items = classActivities.filter((a) => a.type === type);
  return {
    type: config.label,
    count: items.length,
    points: items.reduce((sum, a) => sum + a.points, 0),
  };
});

const pieColors = ["#0984e3", "#00b894", "#6c5ce7", "#e17055", "#fdcb6e"];

// Weekly activity data
const weeklyActivity = [
  { week: "W5", questions: 1, answers: 0, discussions: 1, presentations: 0, peerHelp: 1, total: 12 },
  { week: "W6", questions: 2, answers: 1, discussions: 0, presentations: 0, peerHelp: 0, total: 11 },
  { week: "W7", questions: 1, answers: 1, discussions: 1, presentations: 0, peerHelp: 1, total: 16 },
  { week: "W8", questions: 0, answers: 2, discussions: 1, presentations: 1, peerHelp: 0, total: 17 },
  { week: "W9", questions: 2, answers: 1, discussions: 0, presentations: 0, peerHelp: 1, total: 15 },
  { week: "W10", questions: 1, answers: 1, discussions: 1, presentations: 1, peerHelp: 1, total: 26 },
];

export function ActivityPage() {
  return (
    <div className="space-y-6">
      {/* Summary Row */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="col-span-1">
          <CardContent className="pt-5 pb-5 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-chart-1/10 flex items-center justify-center mb-2">
              <Star className="w-6 h-6 text-chart-1" />
            </div>
            <p className="text-3xl text-foreground">{totalPoints}</p>
            <p className="text-xs text-muted-foreground">Total Points</p>
          </CardContent>
        </Card>
        {Object.entries(activityTypeConfig).map(([type, config]) => {
          const items = classActivities.filter((a) => a.type === type);
          const Icon = config.icon;
          return (
            <Card key={type}>
              <CardContent className="pt-5 pb-5 flex flex-col items-center text-center">
                <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center mb-2`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <p className="text-2xl text-foreground">{items.length}</p>
                <p className="text-xs text-muted-foreground">{config.label}s</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Weekly Activity Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="week" fontSize={12} tickLine={false} axisLine={false} stroke="var(--muted-foreground)" />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="total" fill="var(--chart-1)" radius={[6, 6, 0, 0]} barSize={36} name="Total Points" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    dataKey="points"
                    nameKey="type"
                    strokeWidth={2}
                    stroke="var(--card)"
                  >
                    {activityBreakdown.map((_, idx) => (
                      <Cell key={idx} fill={pieColors[idx % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`${value} pts`, "Points"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {activityBreakdown.map((item, idx) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: pieColors[idx] }} />
                    <span className="text-xs text-foreground">{item.type}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.points} pts</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Activity Feed</CardTitle>
            <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-0">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15% this week
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {classActivities.map((activity) => {
              const config = activityTypeConfig[activity.type];
              const Icon = config.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-xl border border-border/50 hover:border-border hover:bg-muted/30 transition-all"
                >
                  <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className={`${config.bg} ${config.color} border-0 text-xs`}>
                        {config.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{activity.subject}</span>
                    </div>
                    <p className="text-sm text-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(activity.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm text-chart-1">+{activity.points}</span>
                    <p className="text-xs text-muted-foreground">pts</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
