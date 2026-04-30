import { useState, useMemo, useEffect} from "react";
import { Book, CheckCircle, Clock, Upload } from "lucide-react";
import { formatDistanceToNow, isPast } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useApp } from "@/app/contexts/AppContext";
import { translations } from "@/app/utils/translations";

type HomeworkStatus = "Pending" | "Submitted" | "Overdue";

interface Homework {
  id: string;
  subjectName: string;
  title: string;
  deadline: Date;
  submissionDate: Date | null;
  status: HomeworkStatus;
}

const initialHomeworkData: Homework[] = [
  {
    id: "1",
    subjectName: "Mathematics",
    title: "Calculus Assignment 3",
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    submissionDate: null,
    status: "Pending",
  },
  {
    id: "2",
    subjectName: "Physics",
    title: "Quantum Mechanics Lab Report",
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    submissionDate: null,
    status: "Overdue",
  },
  {
    id: "3",
    subjectName: "Computer Science",
    title: "React Web App",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    submissionDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "Submitted",
  },
];

export function HomeworkPage() {
  const { language } = useApp();
  const t = translations[language];

  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [submissionLink, setSubmissionLink] = useState("");

useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await (window as any).electron.ipcRenderer.invoke('get-students');
        const mappedData = data.map((s: any) => {
      console.log("Processing student:", s); 
      return {
        id: s._id ? String(s._id) : Math.random().toString(),
        subjectName: "General Progress",
        title: s.name ? `Student: ${s.name}` : "Unknown Student",
        deadline: new Date(),
        submissionDate: s.githubStats?.lastCommit ? new Date() : null,
        status: (s.progress && s.progress > 50) ? "Submitted" : "Pending",
      };
    });
        setHomeworks(mappedData);
      } catch (err) {
        console.error("Atlas error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleSubmitWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedHomework) {
      setHomeworks((prev) =>
        prev.map((hw) =>
          hw.id === selectedHomework.id
            ? { ...hw, status: "Submitted", submissionDate: new Date() }
            : hw
        )
      );
      setIsSubmitOpen(false);
      setSubmissionLink("");
    }
  };

  const displayedHomeworks = useMemo(() => {
    return homeworks.map(hw => {
      if (hw.status === "Pending" && isPast(hw.deadline)) {
        return { ...hw, status: "Overdue" as HomeworkStatus };
      }
      return hw;
    });
  }, [homeworks]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "Submitted":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "Overdue":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-3.5 h-3.5 mr-1" />;
      case "Submitted":
        return <CheckCircle className="w-3.5 h-3.5 mr-1" />;
      case "Overdue":
        return <Clock className="w-3.5 h-3.5 mr-1" />;
      default:
        return null;
    }
  };

  if (loading) {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t.homework || "Homework"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your upcoming assignments.
          </p>
        </div>
        <Button variant="default" className="gap-2">
          <Book className="w-4 h-4" />
          View Syllabus
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {displayedHomeworks.map((hw) => (
          <Card key={hw.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className={getStatusColor(hw.status)}>
                  {getStatusIcon(hw.status)}
                  {hw.status}
                </Badge>
                <div className="text-sm font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md border border-border/50">
                  Due: {hw.deadline.toLocaleDateString(language === "pl" ? "pl-PL" : "en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
              </div>
              <CardTitle className="text-xl leading-tight line-clamp-2">{hw.title}</CardTitle>
              <CardDescription className="text-sm font-medium text-primary mt-1">
                {hw.subjectName}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className={isPast(hw.deadline) && hw.status !== "Submitted" ? "text-red-500 font-medium" : "text-muted-foreground"}>
                    {hw.status === "Submitted"
                      ? "Deadline passed"
                      : isPast(hw.deadline)
                      ? `Overdue by ${formatDistanceToNow(hw.deadline)}`
                      : `${formatDistanceToNow(hw.deadline)} left`}
                  </span>
                </div>
                {hw.status === "Submitted" && hw.submissionDate && (
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />
                    <span className="text-muted-foreground">
                      Submitted on {hw.submissionDate.toLocaleDateString(language === "pl" ? "pl-PL" : "en-US")}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-border mt-auto">
                {hw.status !== "Submitted" ? (
                  <Dialog open={isSubmitOpen && selectedHomework?.id === hw.id} onOpenChange={(open: any) => {
                    setIsSubmitOpen(open);
                    if (open) setSelectedHomework(hw);
                    else setSelectedHomework(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="default">
                        <Upload className="w-4 h-4 mr-2" />
                        Submit Work
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Submit Assignment</DialogTitle>
                        <DialogDescription>
                          Upload your work or provide a GitHub repository link for "{hw.title}".
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmitWork} className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="link">GitHub Link or File URL</Label>
                          <Input
                            id="link"
                            placeholder="https://github.com/username/repo"
                            value={submissionLink}
                            onChange={(e: any) => setSubmissionLink(e.target.value)}
                            required
                          />
                        </div>
                        <DialogFooter>
                          <Button type="submit">Submit</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button className="w-full" variant="secondary">
                    View Submission
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
}