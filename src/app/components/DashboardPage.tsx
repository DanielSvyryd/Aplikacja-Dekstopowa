import {
  CalendarCheck,
  GraduationCap,
  Github,
  MessageSquareCode,
  HandHelping,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  GitCommit,
  GitPullRequest,
  MessageSquare,
  CheckCircle,
  Award,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  overallProgress,
  progressScores,
  weeklyProgress,
  recentActivity,
  githubStats,
  codeReviewStats,
  attendanceStats,
} from "./mock-data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const metricCards = [
  {
    label: "Attendance",
    score: progressScores.attendance,
    icon: CalendarCheck,
    color: "text-success",
    bgColor: "bg-success/10",
    trend: "+2%",
    trendUp: true,
  },
  {
    label: "Grades",
    score: progressScores.grades,
    icon: GraduationCap,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    trend: "+5%",
    trendUp: true,
  },
  {
    label: "Class Activity",
    score: progressScores.classActivity,
    icon: HandHelping,
    color: "text-warning",
    bgColor: "bg-warning/10",
    trend: "-1%",
    trendUp: false,
  },
  {
    label: "GitHub Activity",
    score: progressScores.githubActivity,
    icon: Github,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
    trend: "+8%",
    trendUp: true,
  },
  {
    label: "Code Review",
    score: progressScores.codeReview,
    icon: MessageSquareCode,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    trend: "+12%",
    trendUp: true,
  },
];

function getActivityIcon(type: string) {
  switch (type) {
    case "github":
      return <GitCommit className="w-4 h-4" />;
    case "code-review":
      return <MessageSquare className="w-4 h-4" />;
    case "grade":
      return <Award className="w-4 h-4" />;
    case "attendance":
      return <CheckCircle className="w-4 h-4" />;
    case "class-activity":
      return <HandHelping className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
}

function getActivityColor(type: string) {
  switch (type) {
    case "github":
      return "bg-chart-5/10 text-chart-5";
    case "code-review":
      return "bg-chart-4/10 text-chart-4";
    case "grade":
      return "bg-chart-1/10 text-chart-1";
    case "attendance":
      return "bg-success/10 text-success";
    case "class-activity":
      return "bg-warning/10 text-warning";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Overall Progress Hero */}
      <Card className="bg-gradient-to-br from-primary/90 to-primary border-0">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-primary-foreground/70 text-sm mb-1">
                Overall Progress Score
              </p>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-5xl text-primary-foreground tracking-tight" style={{ fontWeight: 600 }}>
                  {overallProgress}
                </span>
                <span className="text-primary-foreground/60 text-lg">/100</span>
                <Badge className="bg-white/20 text-primary-foreground border-0 ml-2">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +4.2% this week
                </Badge>
              </div>
              <div className="w-72">
                <Progress
                  value={overallProgress}
                  className="h-2.5 bg-white/20 [&>div]:bg-white"
                />
              </div>
            </div>
            <div className="text-right text-primary-foreground/80 hidden lg:block">
              <p className="text-sm">Spring 2026 &middot; Week 10 of 16</p>
              <p className="text-xs mt-1 text-primary-foreground/50">
                Weighted: Attendance 20% &middot; Grades 30% &middot; Activity
                20% &middot; GitHub 15% &middot; Code Review 15%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metric Cards */}
      <div className="grid grid-cols-5 gap-4">
        {metricCards.map((card) => (
          <Card key={card.label} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center`}
                >
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <div
                  className={`flex items-center gap-0.5 text-xs ${
                    card.trendUp ? "text-success" : "text-destructive"
                  }`}
                >
                  {card.trendUp ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {card.trend}
                </div>
              </div>
              <p className="text-2xl text-foreground mb-0.5">{card.score}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Progress Trend Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Progress Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyProgress}>
                  <defs>
                    <linearGradient
                      id="overallGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                  />
                  <XAxis
                    dataKey="week"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[40, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="overall"
                    stroke="var(--chart-1)"
                    strokeWidth={2.5}
                    fill="url(#overallGrad)"
                    name="Overall"
                  />
                  <Area
                    type="monotone"
                    dataKey="attendance"
                    stroke="var(--success)"
                    strokeWidth={1.5}
                    fill="transparent"
                    strokeDasharray="4 4"
                    name="Attendance"
                  />
                  <Area
                    type="monotone"
                    dataKey="github"
                    stroke="var(--chart-5)"
                    strokeWidth={1.5}
                    fill="transparent"
                    strokeDasharray="4 4"
                    name="GitHub"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.slice(0, 6).map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getActivityColor(
                      item.type
                    )}`}
                  >
                    {getActivityIcon(item.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Attendance Quick */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <CalendarCheck className="w-4 h-4 text-success" />
              Attendance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl text-foreground">{attendanceStats.rate}%</span>
              <Badge variant="secondary" className="bg-success/10 text-success border-0">
                Good Standing
              </Badge>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-success/10 rounded-lg">
                <p className="text-sm text-success">{attendanceStats.present}</p>
                <p className="text-xs text-muted-foreground">Present</p>
              </div>
              <div className="p-2 bg-warning/10 rounded-lg">
                <p className="text-sm text-warning">{attendanceStats.late}</p>
                <p className="text-xs text-muted-foreground">Late</p>
              </div>
              <div className="p-2 bg-destructive/10 rounded-lg">
                <p className="text-sm text-destructive">{attendanceStats.absent}</p>
                <p className="text-xs text-muted-foreground">Absent</p>
              </div>
              <div className="p-2 bg-chart-5/10 rounded-lg">
                <p className="text-sm text-chart-5">{attendanceStats.excused}</p>
                <p className="text-xs text-muted-foreground">Excused</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GitHub Quick */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Github className="w-4 h-4 text-chart-5" />
              GitHub This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <GitCommit className="w-3.5 h-3.5 text-chart-5" />
                </div>
                <p className="text-xl text-foreground">{githubStats.totalCommits}</p>
                <p className="text-xs text-muted-foreground">Commits</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <GitPullRequest className="w-3.5 h-3.5 text-success" />
                </div>
                <p className="text-xl text-foreground">{githubStats.totalPRs}</p>
                <p className="text-xs text-muted-foreground">PRs</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <MessageSquare className="w-3.5 h-3.5 text-chart-4" />
                </div>
                <p className="text-xl text-foreground">{githubStats.totalReviews}</p>
                <p className="text-xs text-muted-foreground">Reviews</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-chart-5/5 rounded-lg p-2.5">
              <TrendingUp className="w-4 h-4 text-chart-5" />
              <span className="text-xs text-chart-5">
                {githubStats.streak}-day streak &middot; {githubStats.repositories} active repos
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Code Review Quick */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <MessageSquareCode className="w-4 h-4 text-chart-4" />
              Code Review Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl text-foreground">{codeReviewStats.interactionRate}%</span>
              <Badge variant="secondary" className="bg-chart-4/10 text-chart-4 border-0">
                Interaction Rate
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Applied</span>
                <span className="text-success">{codeReviewStats.applied}</span>
              </div>
              <Progress value={(codeReviewStats.applied / codeReviewStats.totalComments) * 100} className="h-1.5 [&>div]:bg-success" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Pending</span>
                <span className="text-warning">{codeReviewStats.pending}</span>
              </div>
              <Progress value={(codeReviewStats.pending / codeReviewStats.totalComments) * 100} className="h-1.5 [&>div]:bg-warning" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
