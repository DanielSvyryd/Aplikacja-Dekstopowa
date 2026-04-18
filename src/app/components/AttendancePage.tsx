import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  attendanceRecords,
  attendanceStats,
  attendanceBySubject,
} from "./mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const statusConfig = {
  present: { icon: CheckCircle, color: "text-success", bg: "bg-success/10", label: "Present" },
  late: { icon: Clock, color: "text-warning", bg: "bg-warning/10", label: "Late" },
  absent: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Absent" },
  excused: { icon: AlertCircle, color: "text-chart-5", bg: "bg-chart-5/10", label: "Excused" },
};

const chartData = attendanceBySubject.map((s) => ({
  subject: s.subject.length > 12 ? s.subject.slice(0, 12) + "..." : s.subject,
  rate: s.rate,
}));

const barColors = ["#6c5ce7", "#00b894", "#0984e3", "#fdcb6e", "#e17055"];

export function AttendancePage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl text-foreground">{attendanceStats.rate}%</p>
                <p className="text-xs text-muted-foreground">Attendance Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-chart-1/10 flex items-center justify-center">
                <span className="text-xl text-chart-1">{attendanceStats.present}</span>
              </div>
              <div>
                <p className="text-2xl text-foreground">{attendanceStats.totalClasses}</p>
                <p className="text-xs text-muted-foreground">Total Classes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl text-foreground">{attendanceStats.late}</p>
                <p className="text-xs text-muted-foreground">Times Late</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl text-foreground">{attendanceStats.absent}</p>
                <p className="text-xs text-muted-foreground">Absences</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Subject Breakdown Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>By Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} fontSize={12} tickLine={false} axisLine={false} stroke="var(--muted-foreground)" />
                  <YAxis type="category" dataKey="subject" fontSize={11} tickLine={false} axisLine={false} width={110} stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Rate"]}
                  />
                  <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={20}>
                    {chartData.map((_, idx) => (
                      <Cell key={idx} fill={barColors[idx % barColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Subject stats */}
            <div className="space-y-3 mt-4">
              {attendanceBySubject.map((subj) => (
                <div key={subj.subject} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{subj.subject}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {subj.present + subj.late}/{subj.total} attended
                    </span>
                    <Progress value={subj.rate} className="w-20 h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Log */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Attendance Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {attendanceRecords
                .slice()
                .reverse()
                .map((record, idx) => {
                  const config = statusConfig[record.status];
                  const Icon = config.icon;
                  return (
                    <div
                      key={`${record.date}-${record.subject}-${idx}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`w-4 h-4 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{record.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(record.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`${config.bg} ${config.color} border-0 text-xs`}
                      >
                        {config.label}
                      </Badge>
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
