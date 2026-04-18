import {
  codeReviews,
  type CodeReview,
  type CodeReviewComment,
} from "./mock-data";
import { useState } from "react";
import {
  MessageSquareCode,
  CheckCircle2,
  Eye,
  MessageCircle,
  Clock,
  X,
  Shield,
  Lightbulb,
  BookOpen,
  Bug,
  Lock,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Info,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

const categoryConfig: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; label: string }
> = {
  improvement: { icon: Lightbulb, color: "text-chart-5", bg: "bg-chart-5/10", label: "Improvement" },
  mentoring: { icon: BookOpen, color: "text-chart-1", bg: "bg-chart-1/10", label: "Mentoring" },
  "best-practice": { icon: Shield, color: "text-success", bg: "bg-success/10", label: "Best Practice" },
  bug: { icon: Bug, color: "text-destructive", bg: "bg-destructive/10", label: "Bug" },
  security: { icon: Lock, color: "text-chart-4", bg: "bg-chart-4/10", label: "Security" },
};

const severityConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; label: string }> = {
  info: { icon: Info, color: "text-chart-5", label: "Info" },
  suggestion: { icon: Lightbulb, color: "text-chart-1", label: "Suggestion" },
  warning: { icon: AlertTriangle, color: "text-warning", label: "Warning" },
  critical: { icon: AlertCircle, color: "text-destructive", label: "Critical" },
};

const statusConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; label: string }> = {
  pending: { icon: Clock, color: "text-warning", bg: "bg-warning/10", label: "Pending" },
  acknowledged: { icon: Eye, color: "text-chart-5", bg: "bg-chart-5/10", label: "Acknowledged" },
  applied: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10", label: "Applied" },
  discussed: { icon: MessageCircle, color: "text-chart-1", bg: "bg-chart-1/10", label: "Discussed" },
  dismissed: { icon: X, color: "text-muted-foreground", bg: "bg-muted", label: "Dismissed" },
};

function CommentInline({
  comment,
  onStatusChange,
}: {
  comment: CodeReviewComment;
  onStatusChange: (id: string, status: CodeReviewComment["status"]) => void;
}) {
  const category = categoryConfig[comment.category];
  const severity = severityConfig[comment.severity];
  const status = statusConfig[comment.status];
  const CategoryIcon = category.icon;
  const StatusIcon = status.icon;

  return (
    <div className={`ml-8 mr-4 my-2 rounded-lg border border-border/80 overflow-hidden ${
      comment.severity === "critical" ? "border-destructive/30" : ""
    }`}>
      {/* Comment Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border/50">
        <CategoryIcon className={`w-3.5 h-3.5 ${category.color}`} />
        <Badge variant="secondary" className={`${category.bg} ${category.color} border-0 text-xs`}>
          {category.label}
        </Badge>
        <Badge variant="secondary" className={`bg-muted ${severity.color} border-0 text-xs`}>
          {severity.label}
        </Badge>
        <span className="text-xs text-muted-foreground flex-1">
          by <span className="text-foreground">{comment.reviewer}</span> &middot;{" "}
          {comment.lineStart === comment.lineEnd
            ? `Line ${comment.lineStart}`
            : `Lines ${comment.lineStart}-${comment.lineEnd}`}
        </span>
        <Badge variant="secondary" className={`${status.bg} ${status.color} border-0 text-xs`}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {status.label}
        </Badge>
      </div>

      {/* Comment Body */}
      <div className="px-4 py-3">
        <p className="text-sm text-foreground/90 leading-relaxed">{comment.comment}</p>
      </div>

      {/* Action Buttons */}
      {comment.status === "pending" && (
        <div className="px-4 py-2 border-t border-border/50 bg-muted/30 flex items-center gap-2">
          <span className="text-xs text-muted-foreground mr-2">Respond:</span>
          <button
            onClick={() => onStatusChange(comment.id, "applied")}
            className="text-xs px-2.5 py-1 rounded-md bg-success/10 text-success hover:bg-success/20 transition-colors flex items-center gap-1"
          >
            <CheckCircle2 className="w-3 h-3" />
            Apply
          </button>
          <button
            onClick={() => onStatusChange(comment.id, "acknowledged")}
            className="text-xs px-2.5 py-1 rounded-md bg-chart-5/10 text-chart-5 hover:bg-chart-5/20 transition-colors flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            Acknowledge
          </button>
          <button
            onClick={() => onStatusChange(comment.id, "discussed")}
            className="text-xs px-2.5 py-1 rounded-md bg-chart-1/10 text-chart-1 hover:bg-chart-1/20 transition-colors flex items-center gap-1"
          >
            <MessageCircle className="w-3 h-3" />
            Discuss
          </button>
          <button
            onClick={() => onStatusChange(comment.id, "dismissed")}
            className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground hover:bg-accent transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

function CodeReviewPanel({
  review,
  onCommentStatusChange,
}: {
  review: CodeReview;
  onCommentStatusChange: (reviewId: string, commentId: string, status: CodeReviewComment["status"]) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const lines = review.code.split("\n");

  // Group comments by line
  const commentsByLine = new Map<number, CodeReviewComment[]>();
  review.comments.forEach((c) => {
    const existing = commentsByLine.get(c.lineEnd) || [];
    existing.push(c);
    commentsByLine.set(c.lineEnd, existing);
  });

  // Lines that have comments
  const commentedLines = new Set<number>();
  review.comments.forEach((c) => {
    for (let i = c.lineStart; i <= c.lineEnd; i++) {
      commentedLines.add(i);
    }
  });

  const appliedCount = review.comments.filter(
    (c) => c.status === "applied" || c.status === "discussed" || c.status === "acknowledged"
  ).length;
  const totalCount = review.comments.length;

  return (
    <Card className="overflow-hidden">
      {/* Review Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
        <MessageSquareCode className="w-5 h-5 text-chart-1" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm text-foreground">{review.title}</h3>
            <span className="text-xs text-muted-foreground font-mono">{review.file}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {review.repo} &middot;{" "}
            {new Date(review.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right mr-2">
            <p className="text-xs text-muted-foreground">Interaction</p>
            <p className="text-sm text-foreground">{review.interactionScore}%</p>
          </div>
          <div className="w-20">
            <Progress value={review.interactionScore} className="h-1.5" />
          </div>
          <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-0 text-xs">
            {appliedCount}/{totalCount} resolved
          </Badge>
        </div>
      </div>

      {/* Code + Comments */}
      {expanded && (
        <div className="border-t border-border">
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {lines.map((line, idx) => {
                const lineNum = idx + 1;
                const hasComment = commentedLines.has(lineNum);
                const lineComments = commentsByLine.get(lineNum) || [];

                return (
                  <div key={lineNum}>
                    <div
                      className={`flex font-mono text-[13px] leading-6 ${
                        hasComment
                          ? "bg-chart-1/5 border-l-2 border-chart-1/40"
                          : "hover:bg-muted/30 border-l-2 border-transparent"
                      }`}
                    >
                      <span className="w-12 flex-shrink-0 text-right pr-3 text-muted-foreground/60 select-none bg-muted/20">
                        {lineNum}
                      </span>
                      <pre className="pl-4 pr-4 flex-1 whitespace-pre overflow-hidden">
                        <code>{line || " "}</code>
                      </pre>
                    </div>
                    {/* Render comments after the line they reference */}
                    {lineComments.map((comment) => (
                      <CommentInline
                        key={comment.id}
                        comment={comment}
                        onStatusChange={(cId, status) =>
                          onCommentStatusChange(review.id, cId, status)
                        }
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export function CodeReviewPage() {
  const [reviews, setReviews] = useState<CodeReview[]>(codeReviews);

  const handleCommentStatusChange = (
    reviewId: string,
    commentId: string,
    status: CodeReviewComment["status"]
  ) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== reviewId) return r;
        const updatedComments = r.comments.map((c) =>
          c.id === commentId ? { ...c, status } : c
        );
        // Recalculate interaction score
        const interacted = updatedComments.filter(
          (c) => c.status !== "pending"
        ).length;
        const interactionScore = Math.round(
          (interacted / updatedComments.length) * 100
        );
        return { ...r, comments: updatedComments, interactionScore };
      })
    );
  };

  // Recalculate global stats
  const allComments = reviews.flatMap((r) => r.comments);
  const stats = {
    totalReviews: reviews.length,
    totalComments: allComments.length,
    applied: allComments.filter((c) => c.status === "applied").length,
    acknowledged: allComments.filter((c) => c.status === "acknowledged").length,
    discussed: allComments.filter((c) => c.status === "discussed").length,
    pending: allComments.filter((c) => c.status === "pending").length,
    dismissed: allComments.filter((c) => c.status === "dismissed").length,
    interactionRate: Math.round(
      (allComments.filter((c) => c.status !== "pending").length /
        allComments.length) *
        100
    ),
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-6 gap-4">
        <Card className="col-span-2 bg-gradient-to-br from-chart-1/10 to-chart-1/5 border-chart-1/20">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground">Interaction Rate</p>
              <Badge className="bg-chart-1/20 text-chart-1 border-0">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% this week
              </Badge>
            </div>
            <p className="text-4xl text-foreground mb-2">{stats.interactionRate}%</p>
            <Progress
              value={stats.interactionRate}
              className="h-2 bg-chart-1/10 [&>div]:bg-chart-1"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Higher interaction improves your progress score. Engage with all
              comments for maximum impact.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 pb-5 text-center">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <p className="text-2xl text-foreground">{stats.applied}</p>
            <p className="text-xs text-muted-foreground">Applied</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5 text-center">
            <div className="w-10 h-10 rounded-lg bg-chart-5/10 flex items-center justify-center mx-auto mb-2">
              <Eye className="w-5 h-5 text-chart-5" />
            </div>
            <p className="text-2xl text-foreground">{stats.acknowledged}</p>
            <p className="text-xs text-muted-foreground">Acknowledged</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5 text-center">
            <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center mx-auto mb-2">
              <MessageCircle className="w-5 h-5 text-chart-1" />
            </div>
            <p className="text-2xl text-foreground">{stats.discussed}</p>
            <p className="text-xs text-muted-foreground">Discussed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5 text-center">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <p className="text-2xl text-foreground">{stats.pending}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-chart-1/5 border border-chart-1/10">
        <Info className="w-5 h-5 text-chart-1 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-foreground">
            Code reviews are part of your progress score (15% weight).
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Engaging with reviewer comments demonstrates learning and growth. Mark comments as
            <span className="text-success"> Applied</span> when you've implemented the suggestion,
            <span className="text-chart-5"> Acknowledged</span> when you've read and understood it,
            or <span className="text-chart-1"> Discussed</span> when you want to talk about it in class.
          </p>
        </div>
      </div>

      {/* Code Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <CodeReviewPanel
            key={review.id}
            review={review}
            onCommentStatusChange={handleCommentStatusChange}
          />
        ))}
      </div>
    </div>
  );
}