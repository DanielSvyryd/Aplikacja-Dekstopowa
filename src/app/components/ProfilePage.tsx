import { User, Mail, Hash, Users, BookOpen, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { studentProfile } from "./mock-data";
import { useApp } from "../contexts/AppContext";
import { translations } from "../utils/translations";

export function ProfilePage() {
  const { language } = useApp();
  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={studentProfile.avatar} alt={studentProfile.name} />
              <AvatarFallback className="text-2xl">
                {studentProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl text-foreground mb-1">{studentProfile.name}</h2>
              <p className="text-muted-foreground mb-4">{studentProfile.program}</p>
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">{t.semester}: </span>
                  <span className="text-foreground">{studentProfile.semester}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t.studentId}: </span>
                  <span className="text-foreground">{studentProfile.studentId}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {t.personalInfo}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student ID */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Hash className="w-4 h-4" />
                {t.studentId}
              </div>
              <p className="text-foreground pl-6">{studentProfile.studentId}</p>
            </div>

            {/* Group */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                {t.group}
              </div>
              <p className="text-foreground pl-6">{studentProfile.group}</p>
            </div>

            {/* Personal Email */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {t.personalEmail}
              </div>
              <p className="text-foreground pl-6">{studentProfile.personalEmail}</p>
            </div>

            {/* University Email */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {t.universityEmail}
              </div>
              <p className="text-foreground pl-6">{studentProfile.email}</p>
            </div>

            {/* Specialisation */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                {t.specialisation}
              </div>
              <p className="text-foreground pl-6">{studentProfile.specialisation}</p>
            </div>

            {/* Program */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {t.program}
              </div>
              <p className="text-foreground pl-6">{studentProfile.program}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>GitHub</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Username</p>
              <a
                href={`https://github.com/${studentProfile.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @{studentProfile.githubUsername}
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Year</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Current Year</p>
              <p className="text-foreground">Year {studentProfile.year}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
