import { useState } from "react";
import { BookOpen, CheckCircle, Clock, FileText, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { homeworkData } from "./mock-data";
import { useApp } from "../contexts/AppContext";
import { translations } from "../utils/translations";

export function HomeworkPage() {
  const { language } = useApp();
  const t = translations[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "Submitted":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "Graded":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-3.5 h-3.5 mr-1" />;
      case "Submitted":
        return <FileText className="w-3.5 h-3.5 mr-1" />;
      case "Graded":
        return <CheckCircle className="w-3.5 h-3.5 mr-1" />;
      default:
        return null;
    }
  };

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
          <BookOpen className="w-4 h-4" />
          View Syllabus
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {homeworkData.map((hw) => (
          <Card key={hw.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className={getStatusColor(hw.status)}>
                  {getStatusIcon(hw.status)}
                  {hw.status}
                </Badge>
                <div className="text-sm font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md border border-border/50">
                  Due: {new Date(hw.dueDate).toLocaleDateString(language === "pl" ? "pl-PL" : "en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
              </div>
              <CardTitle className="text-xl leading-tight line-clamp-2">{hw.title}</CardTitle>
              <CardDescription className="text-sm font-medium text-primary mt-1">
                {hw.subject}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                {hw.description}
              </p>
              
              <div className="pt-4 border-t border-border mt-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarImage src={hw.teacher.photo} alt={hw.teacher.name} />
                      <AvatarFallback>{hw.teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-none">{hw.teacher.name}</span>
                      <a 
                        href={`mailto:${hw.teacher.email}`} 
                        className="text-xs text-muted-foreground hover:text-primary hover:underline flex items-center gap-1 mt-1"
                      >
                        <Mail className="w-3 h-3" />
                        {hw.teacher.email}
                      </a>
                    </div>
                  </div>
                </div>
                
                {hw.status === "Pending" && (
                  <Button className="w-full mt-4" variant="default">
                    Submit Assignment
                  </Button>
                )}
                {hw.status === "Submitted" && (
                  <Button className="w-full mt-4" variant="secondary">
                    View Submission
                  </Button>
                )}
                {hw.status === "Graded" && (
                  <Button className="w-full mt-4" variant="outline">
                    View Grade
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
