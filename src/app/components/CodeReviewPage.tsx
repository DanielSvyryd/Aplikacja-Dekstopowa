import {
  reviewTasks,
  type ReviewTask,
} from "./mock-data";
import { useState } from "react";
import {
  GitPullRequest,
  MessageSquare,
  CheckCircle,
  ExternalLink,
  Clock,
  User,
  Code2,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type TaskStatus = ReviewTask["status"];

const statusConfig: Record<TaskStatus, { color: string; label: string }> = {
  Pending: { color: "bg-warning/10 text-warning", label: "Pending" },
  "In Review": { color: "bg-chart-1/10 text-chart-1", label: "In Review" },
  Completed: { color: "bg-success/10 text-success", label: "Completed" },
};

function TaskCard({
  task,
  isSelected,
  onClick,
}: {
  task: ReviewTask;
  isSelected: boolean;
  onClick: () => void;
}) {
  const status = statusConfig[task.status];

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-chart-1 bg-chart-1/5 shadow-sm"
          : "border-border/60 hover:border-border hover:bg-muted/30"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <GitPullRequest className="w-4 h-4 text-chart-1" />
            <h4 className="text-sm font-medium text-foreground truncate">
              {task.assignmentName}
            </h4>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Avatar className="w-5 h-5">
              <AvatarImage src={task.studentAvatar} />
              <AvatarFallback className="text-[10px]">
                {task.studentName.split(" ").map((n: string) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <span>{task.studentName}</span>
            <span>·</span>
            <span>{new Date(task.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </div>
        </div>
        <Badge className={`${status.color} border-0 text-xs shrink-0`}>
          {status.label}
        </Badge>
      </div>
    </div>
  );
}

function CodePreview({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const lines = code.split("\n");

  return (
    <div className="rounded-lg border border-border/80 overflow-hidden bg-[#1e1e2e]">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#2a2a3e] border-b border-border/50">
        <Code2 className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-mono">{language}</span>
      </div>
      <ScrollArea className="h-[400px]">
        <pre className="p-4 font-mono text-[13px] leading-6">
          {lines.map((line, idx) => (
            <div key={idx} className="flex hover:bg-white/5">
              <span className="w-8 flex-shrink-0 text-right pr-3 text-white/30 select-none">
                {idx + 1}
              </span>
              <code className="text-white/80 whitespace-pre">{line || " "}</code>
            </div>
          ))}
        </pre>
      </ScrollArea>
    </div>
  );
}

function CommentsSection({
  comments,
}: {
  comments: ReviewTask["comments"];
}) {
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <MessageSquare className="w-8 h-8 text-muted-foreground/50 mb-2" />
        <p className="text-sm text-muted-foreground">No comments yet</p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Add your feedback below
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment: ReviewTask["comments"][number]) => (
        <div
          key={comment.id}
          className="p-3 rounded-lg border border-border/60 bg-muted/30"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-chart-1 bg-chart-1/10 px-1.5 py-0.5 rounded">
              Line {comment.line}
            </span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{comment.author}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <p className="text-sm text-foreground/90">{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export function CodeReviewPage() {
  const [tasks, setTasks] = useState<ReviewTask[]>(reviewTasks);
  const [selectedTaskId, setSelectedTaskId] = useState<string>(tasks[0]?.id || "");

  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  const handleStatusChange = (taskId: string, newStatus: ReviewTask["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleApprove = () => {
    if (selectedTask) {
      handleStatusChange(selectedTask.id, "Completed");
    }
  };

  const handleRequestChanges = () => {
    if (selectedTask) {
      handleStatusChange(selectedTask.id, "Pending");
    }
  };

  const pendingTasks = tasks.filter((t) => t.status === "Pending");
  const inReviewTasks = tasks.filter((t) => t.status === "In Review");
  const completedTasks = tasks.filter((t) => t.status === "Completed");

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-chart-1/10 to-chart-1/5 border-chart-1/20">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <GitPullRequest className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl text-foreground">{tasks.length}</p>
                <p className="text-xs text-muted-foreground">Total Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl text-foreground">{pendingTasks.length}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <User className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl text-foreground">{inReviewTasks.length}</p>
                <p className="text-xs text-muted-foreground">In Review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl text-foreground">{completedTasks.length}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-5 gap-6">
        {/* Left Panel - Task List */}
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ScrollArea className="h-[500px] pr-4">
                {pendingTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertCircle className="w-8 h-8 text-muted-foreground/50 mb-2" />
                    <p className="text-sm text-muted-foreground">No pending reviews</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {pendingTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        isSelected={selectedTaskId === task.id}
                        onClick={() => setSelectedTaskId(task.id)}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">In Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ScrollArea className="h-[200px] pr-4">
                {inReviewTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <User className="w-6 h-6 text-muted-foreground/50 mb-2" />
                    <p className="text-sm text-muted-foreground">No reviews in progress</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {inReviewTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        isSelected={selectedTaskId === task.id}
                        onClick={() => setSelectedTaskId(task.id)}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Detailed View */}
        <div className="col-span-3">
          {selectedTask ? (
            <Card className="h-full">
              <CardHeader className="border-b border-border/60">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <GitPullRequest className="w-5 h-5 text-chart-1" />
                      <CardTitle className="text-lg">
                        {selectedTask.assignmentName}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={selectedTask.studentAvatar} />
                          <AvatarFallback className="text-[10px]">
                            {selectedTask.studentName.split(" ").map((n: string) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{selectedTask.studentName}</span>
                      </div>
                      <span>·</span>
                      <span>
                        {new Date(selectedTask.submittedAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <Badge
                    className={`${
                      statusConfig[selectedTask.status].color
                    } border-0`}
                  >
                    {statusConfig[selectedTask.status].label}
                  </Badge>
                </div>
                <a
                  href={selectedTask.repositoryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-chart-1 hover:underline mt-2"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Repository
                </a>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {/* Code Preview */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">
                    Code Preview
                  </h3>
                  <CodePreview
                    code={selectedTask.code}
                    language={selectedTask.language}
                  />
                </div>

                {/* Comments Section */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">
                    Comments ({selectedTask.comments.length})
                  </h3>
                  <CommentsSection comments={selectedTask.comments} />
                </div>

                {/* Action Buttons */}
                {selectedTask.status !== "Completed" && (
                  <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                    <Button
                      onClick={handleApprove}
                      className="bg-success hover:bg-success/90 text-success-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={handleRequestChanges}
                      variant="outline"
                      className="border-warning/50 text-warning hover:bg-warning/10"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Request Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center">
                <GitPullRequest className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Select a review task to view details
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}