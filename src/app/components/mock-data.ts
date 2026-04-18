// Centralized mock data for the Student Progress Tracker

export const studentProfile = {
  name: "Patrick Bateman",
  id: "89012",
  studentId: "89012",
  program: "B.Sc. Computer Science",
  semester: "Spring 2026",
  year: 3,
  group: "GDX-301",
  specialisation: "Software Engineering",
  avatar: "https://images.unsplash.com/photo-1762438136720-137b802248d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjB1bml2ZXJzaXR5JTIweW91bmd8ZW58MXx8fHwxNzcxNTE1OTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  email: "gdx123456@student.gdansk.merito.pl",
  personalEmail: "patrickbateman1991@gmail.com",
  githubUsername: "alexdev47",
};

// Progress weights
export const progressWeights = {
  attendance: 0.2,
  grades: 0.3,
  classActivity: 0.2,
  githubActivity: 0.15,
  codeReview: 0.15,
};

// Scores (0-100)
export const progressScores = {
  attendance: 88,
  grades: 79,
  classActivity: 72,
  githubActivity: 85,
  codeReview: 68,
};

export const overallProgress = Math.round(
  progressScores.attendance * progressWeights.attendance +
  progressScores.grades * progressWeights.grades +
  progressScores.classActivity * progressWeights.classActivity +
  progressScores.githubActivity * progressWeights.githubActivity +
  progressScores.codeReview * progressWeights.codeReview
);

// Weekly progress data for chart
export const weeklyProgress = [
  { week: "W1", attendance: 100, grades: 72, activity: 60, github: 70, codeReview: 40, overall: 68 },
  { week: "W2", attendance: 90, grades: 74, activity: 65, github: 75, codeReview: 50, overall: 72 },
  { week: "W3", attendance: 100, grades: 76, activity: 68, github: 78, codeReview: 55, overall: 75 },
  { week: "W4", attendance: 80, grades: 75, activity: 70, github: 80, codeReview: 58, overall: 73 },
  { week: "W5", attendance: 90, grades: 78, activity: 72, github: 82, codeReview: 60, overall: 76 },
  { week: "W6", attendance: 100, grades: 77, activity: 75, github: 84, codeReview: 62, overall: 78 },
  { week: "W7", attendance: 90, grades: 79, activity: 70, github: 83, codeReview: 65, overall: 77 },
  { week: "W8", attendance: 80, grades: 80, activity: 74, github: 85, codeReview: 68, overall: 78 },
  { week: "W9", attendance: 100, grades: 78, activity: 72, github: 86, codeReview: 70, overall: 79 },
  { week: "W10", attendance: 90, grades: 79, activity: 73, github: 85, codeReview: 68, overall: 79 },
];

// Attendance data
export interface AttendanceDay {
  date: string;
  status: "present" | "absent" | "late" | "excused";
  subject: string;
}

export const attendanceRecords: AttendanceDay[] = [
  { date: "2026-02-02", status: "present", subject: "Data Structures" },
  { date: "2026-02-02", status: "present", subject: "Web Development" },
  { date: "2026-02-03", status: "present", subject: "Algorithms" },
  { date: "2026-02-03", status: "late", subject: "Database Systems" },
  { date: "2026-02-04", status: "present", subject: "Data Structures" },
  { date: "2026-02-05", status: "present", subject: "Software Engineering" },
  { date: "2026-02-05", status: "present", subject: "Web Development" },
  { date: "2026-02-06", status: "absent", subject: "Algorithms" },
  { date: "2026-02-09", status: "present", subject: "Data Structures" },
  { date: "2026-02-09", status: "present", subject: "Web Development" },
  { date: "2026-02-10", status: "present", subject: "Algorithms" },
  { date: "2026-02-10", status: "present", subject: "Database Systems" },
  { date: "2026-02-11", status: "present", subject: "Data Structures" },
  { date: "2026-02-12", status: "excused", subject: "Software Engineering" },
  { date: "2026-02-12", status: "excused", subject: "Web Development" },
  { date: "2026-02-13", status: "present", subject: "Algorithms" },
  { date: "2026-02-16", status: "present", subject: "Data Structures" },
  { date: "2026-02-16", status: "present", subject: "Web Development" },
  { date: "2026-02-17", status: "present", subject: "Algorithms" },
  { date: "2026-02-17", status: "late", subject: "Database Systems" },
  { date: "2026-02-18", status: "present", subject: "Data Structures" },
  { date: "2026-02-19", status: "present", subject: "Software Engineering" },
  { date: "2026-02-19", status: "present", subject: "Web Development" },
];

export const attendanceStats = {
  totalClasses: 23,
  present: 18,
  late: 2,
  absent: 1,
  excused: 2,
  rate: 88,
};

export const attendanceBySubject = [
  { subject: "Data Structures", total: 6, present: 6, late: 0, absent: 0, rate: 100 },
  { subject: "Web Development", total: 5, present: 4, late: 0, absent: 0, rate: 80 },
  { subject: "Algorithms", total: 5, present: 4, late: 0, absent: 1, rate: 80 },
  { subject: "Database Systems", total: 3, present: 1, late: 2, absent: 0, rate: 100 },
  { subject: "Software Engineering", total: 2, present: 1, late: 0, absent: 0, rate: 50 },
];

// Grades data
export interface Grade {
  id: string;
  subject: string;
  assignment: string;
  type: "exam" | "project" | "homework" | "quiz" | "lab";
  score: number;
  maxScore: number;
  date: string;
  weight: number;
}

export const grades: Grade[] = [
  { id: "g1", subject: "Data Structures", assignment: "Midterm Exam", type: "exam", score: 82, maxScore: 100, date: "2026-02-10", weight: 30 },
  { id: "g2", subject: "Data Structures", assignment: "Binary Trees Lab", type: "lab", score: 95, maxScore: 100, date: "2026-02-05", weight: 10 },
  { id: "g3", subject: "Data Structures", assignment: "Homework 3", type: "homework", score: 88, maxScore: 100, date: "2026-02-12", weight: 5 },
  { id: "g4", subject: "Web Development", assignment: "React Project", type: "project", score: 91, maxScore: 100, date: "2026-02-14", weight: 25 },
  { id: "g5", subject: "Web Development", assignment: "CSS Quiz", type: "quiz", score: 75, maxScore: 100, date: "2026-02-07", weight: 5 },
  { id: "g6", subject: "Algorithms", assignment: "Quiz 2", type: "quiz", score: 68, maxScore: 100, date: "2026-02-11", weight: 10 },
  { id: "g7", subject: "Algorithms", assignment: "Dynamic Programming HW", type: "homework", score: 72, maxScore: 100, date: "2026-02-13", weight: 5 },
  { id: "g8", subject: "Database Systems", assignment: "SQL Lab", type: "lab", score: 90, maxScore: 100, date: "2026-02-06", weight: 10 },
  { id: "g9", subject: "Database Systems", assignment: "ER Diagram Project", type: "project", score: 85, maxScore: 100, date: "2026-02-15", weight: 20 },
  { id: "g10", subject: "Software Engineering", assignment: "Sprint Review", type: "project", score: 78, maxScore: 100, date: "2026-02-18", weight: 15 },
  { id: "g11", subject: "Software Engineering", assignment: "UML Quiz", type: "quiz", score: 65, maxScore: 100, date: "2026-02-09", weight: 5 },
];

export const subjectGPA = [
  { subject: "Data Structures", gpa: 3.5, trend: "up" as const },
  { subject: "Web Development", gpa: 3.4, trend: "up" as const },
  { subject: "Algorithms", gpa: 2.8, trend: "down" as const },
  { subject: "Database Systems", gpa: 3.6, trend: "up" as const },
  { subject: "Software Engineering", gpa: 3.0, trend: "stable" as const },
];

// Class activity data
export interface ClassActivity {
  id: string;
  date: string;
  type: "question" | "answer" | "discussion" | "presentation" | "peer-help";
  subject: string;
  description: string;
  points: number;
}

export const classActivities: ClassActivity[] = [
  { id: "ca1", date: "2026-02-19", type: "question", subject: "Data Structures", description: "Asked about AVL tree rotations in edge cases", points: 3 },
  { id: "ca2", date: "2026-02-18", type: "answer", subject: "Web Development", description: "Answered classmate's question on React hooks lifecycle", points: 5 },
  { id: "ca3", date: "2026-02-17", type: "discussion", subject: "Algorithms", description: "Participated in discussion on NP-completeness", points: 4 },
  { id: "ca4", date: "2026-02-16", type: "presentation", subject: "Software Engineering", description: "Presented sprint retrospective findings", points: 8 },
  { id: "ca5", date: "2026-02-14", type: "peer-help", subject: "Database Systems", description: "Helped 2 peers debug SQL join queries", points: 6 },
  { id: "ca6", date: "2026-02-13", type: "question", subject: "Algorithms", description: "Asked about time complexity of Dijkstra's with Fibonacci heaps", points: 3 },
  { id: "ca7", date: "2026-02-12", type: "answer", subject: "Data Structures", description: "Explained hash collision resolution strategies", points: 5 },
  { id: "ca8", date: "2026-02-11", type: "discussion", subject: "Web Development", description: "Debated SSR vs CSR trade-offs", points: 4 },
  { id: "ca9", date: "2026-02-10", type: "peer-help", subject: "Data Structures", description: "Tutored peer on linked list implementations", points: 6 },
  { id: "ca10", date: "2026-02-09", type: "question", subject: "Software Engineering", description: "Asked about CI/CD pipeline best practices", points: 3 },
];

// GitHub activity
export interface GitHubEvent {
  id: string;
  type: "commit" | "pr" | "review" | "issue" | "star";
  repo: string;
  message: string;
  date: string;
  additions?: number;
  deletions?: number;
}

export const githubEvents: GitHubEvent[] = [
  { id: "gh1", type: "commit", repo: "web-dev-project", message: "feat: implement user authentication with JWT", date: "2026-02-19", additions: 245, deletions: 12 },
  { id: "gh2", type: "pr", repo: "web-dev-project", message: "Add dashboard components and routing", date: "2026-02-19", additions: 520, deletions: 45 },
  { id: "gh3", type: "commit", repo: "algorithms-practice", message: "Add dynamic programming solutions for LCS", date: "2026-02-18", additions: 180, deletions: 0 },
  { id: "gh4", type: "review", repo: "team-project-se", message: "Reviewed teammate's API endpoints implementation", date: "2026-02-17", additions: 0, deletions: 0 },
  { id: "gh5", type: "commit", repo: "data-structures-lab", message: "Implement Red-Black tree with tests", date: "2026-02-16", additions: 340, deletions: 20 },
  { id: "gh6", type: "issue", repo: "team-project-se", message: "Document REST API endpoint specifications", date: "2026-02-15" },
  { id: "gh7", type: "commit", repo: "web-dev-project", message: "refactor: extract reusable form components", date: "2026-02-14", additions: 156, deletions: 230 },
  { id: "gh8", type: "pr", repo: "algorithms-practice", message: "Graph traversal implementations (BFS/DFS)", date: "2026-02-13", additions: 290, deletions: 10 },
  { id: "gh9", type: "commit", repo: "database-project", message: "Add migration scripts for schema v2", date: "2026-02-12", additions: 88, deletions: 15 },
  { id: "gh10", type: "review", repo: "team-project-se", message: "Reviewed authentication middleware PR", date: "2026-02-11", additions: 0, deletions: 0 },
];

export const githubContributions = [
  { day: "Mon", commits: 4 },
  { day: "Tue", commits: 2 },
  { day: "Wed", commits: 6 },
  { day: "Thu", commits: 3 },
  { day: "Fri", commits: 5 },
  { day: "Sat", commits: 1 },
  { day: "Sun", commits: 0 },
];

export const githubStats = {
  totalCommits: 47,
  totalPRs: 8,
  totalReviews: 5,
  totalIssues: 3,
  streak: 12,
  repositories: 5,
};

// Code Review data
export interface CodeReviewComment {
  id: string;
  lineStart: number;
  lineEnd: number;
  category: "improvement" | "mentoring" | "best-practice" | "bug" | "security";
  severity: "info" | "suggestion" | "warning" | "critical";
  reviewer: string;
  comment: string;
  date: string;
  status: "pending" | "acknowledged" | "applied" | "discussed" | "dismissed";
}

export interface CodeReview {
  id: string;
  title: string;
  file: string;
  language: string;
  repo: string;
  date: string;
  code: string;
  comments: CodeReviewComment[];
  interactionScore: number;
}

export const codeReviews: CodeReview[] = [
  {
    id: "cr1",
    title: "JWT Authentication Middleware",
    file: "src/middleware/auth.ts",
    language: "typescript",
    repo: "web-dev-project",
    date: "2026-02-18",
    code: `import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET = 'my-secret-key';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

export function generateToken(userId: string) {
  return jwt.sign({ userId }, SECRET, { expiresIn: '24h' });
}`,
    comments: [
      {
        id: "c1",
        lineStart: 4,
        lineEnd: 4,
        category: "security",
        severity: "critical",
        reviewer: "Prof. Miroslav",
        comment: "Hardcoded secrets are a serious security vulnerability. Use environment variables (process.env.JWT_SECRET) and never commit secrets to version control. Consider using a .env file with dotenv package.",
        date: "2026-02-18",
        status: "applied",
      },
      {
        id: "c2",
        lineStart: 7,
        lineEnd: 7,
        category: "best-practice",
        severity: "suggestion",
        reviewer: "Prof. Miroslav",
        comment: "Extract the token from the 'Bearer' prefix. Standard practice is: const token = req.headers.authorization?.split(' ')[1]. This follows the Bearer token scheme from RFC 6750.",
        date: "2026-02-18",
        status: "acknowledged",
      },
      {
        id: "c3",
        lineStart: 14,
        lineEnd: 16,
        category: "improvement",
        severity: "suggestion",
        reviewer: "TA Sarah",
        comment: "Consider adding type safety here. Create an interface for your decoded token payload and use type assertion: const decoded = jwt.verify(token, SECRET) as TokenPayload. This will give you autocomplete and catch errors.",
        date: "2026-02-18",
        status: "applied",
      },
      {
        id: "c4",
        lineStart: 17,
        lineEnd: 17,
        category: "mentoring",
        severity: "info",
        reviewer: "TA Sarah",
        comment: "Good error handling pattern! As a next step, consider differentiating between expired tokens (TokenExpiredError) and malformed tokens (JsonWebTokenError). This helps the client know whether to refresh or re-authenticate.",
        date: "2026-02-18",
        status: "discussed",
      },
      {
        id: "c5",
        lineStart: 22,
        lineEnd: 22,
        category: "improvement",
        severity: "warning",
        reviewer: "Prof. Miroslav",
        comment: "24-hour token expiry is quite long. For learning: shorter-lived access tokens (15min-1hr) with refresh tokens provide better security. Would you like to discuss the refresh token pattern in office hours?",
        date: "2026-02-18",
        status: "pending",
      },
    ],
    interactionScore: 72,
  },
  {
    id: "cr2",
    title: "Binary Search Tree Implementation",
    file: "src/trees/bst.ts",
    language: "typescript",
    repo: "data-structures-lab",
    date: "2026-02-15",
    code: `class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  
  constructor(value: T) {
    this.value = value;
  }
}

class BST<T> {
  root: TreeNode<T> | null = null;

  insert(value: T): void {
    const node = new TreeNode(value);
    if (!this.root) {
      this.root = node;
      return;
    }
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = node;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = node;
          return;
        }
        current = current.right;
      }
    }
  }

  find(value: T): boolean {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  inorder(): T[] {
    const result: T[] = [];
    function traverse(node: TreeNode<T> | null) {
      if (!node) return;
      traverse(node.left);
      result.push(node.value);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }
}`,
    comments: [
      {
        id: "c6",
        lineStart: 12,
        lineEnd: 12,
        category: "best-practice",
        severity: "suggestion",
        reviewer: "Prof. Miroslav",
        comment: "Consider making 'root' private and exposing it through a getter. Encapsulation prevents external code from directly mutating the tree structure, which could break BST invariants.",
        date: "2026-02-15",
        status: "applied",
      },
      {
        id: "c7",
        lineStart: 21,
        lineEnd: 21,
        category: "mentoring",
        severity: "info",
        reviewer: "TA Sarah",
        comment: "Nice iterative implementation! Most students default to recursion here. The iterative approach uses O(1) extra space vs O(h) for recursive. Great instinct for optimization. Have you thought about what happens with duplicate values?",
        date: "2026-02-15",
        status: "discussed",
      },
      {
        id: "c8",
        lineStart: 27,
        lineEnd: 29,
        category: "improvement",
        severity: "suggestion",
        reviewer: "Prof. Miroslav",
        comment: "Duplicates silently go to the right subtree. Document this behavior or add a comparator parameter. In production BSTs, you'd typically want to handle duplicates explicitly (reject, count, or allow).",
        date: "2026-02-15",
        status: "acknowledged",
      },
      {
        id: "c9",
        lineStart: 36,
        lineEnd: 43,
        category: "improvement",
        severity: "suggestion",
        reviewer: "TA Sarah",
        comment: "Your find method is clean and efficient! Consider also implementing a delete method - it's the trickiest BST operation and great practice for handling the three cases (leaf, one child, two children).",
        date: "2026-02-15",
        status: "pending",
      },
    ],
    interactionScore: 65,
  },
  {
    id: "cr3",
    title: "React Dashboard Component",
    file: "src/components/Dashboard.tsx",
    language: "tsx",
    repo: "web-dev-project",
    date: "2026-02-12",
    code: `import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {data.map((item, index) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;`,
    comments: [
      {
        id: "c10",
        lineStart: 4,
        lineEnd: 4,
        category: "best-practice",
        severity: "suggestion",
        reviewer: "Prof. Miroslav",
        comment: "Add proper TypeScript typing: useState<DashboardItem[]>([]). Avoid 'any' types - define an interface for your dashboard data shape. This catches bugs at compile time.",
        date: "2026-02-12",
        status: "applied",
      },
      {
        id: "c11",
        lineStart: 7,
        lineEnd: 13,
        category: "improvement",
        severity: "warning",
        reviewer: "TA Sarah",
        comment: "Missing error handling! If the fetch fails, loading stays true forever. Add a .catch() block and an error state. Also consider using AbortController for cleanup when the component unmounts.",
        date: "2026-02-12",
        status: "applied",
      },
      {
        id: "c12",
        lineStart: 22,
        lineEnd: 22,
        category: "best-practice",
        severity: "warning",
        reviewer: "Prof. Miroslav",
        comment: "Using array index as key is an anti-pattern when the list can change. Use a unique identifier from your data (item.id). Index keys cause issues with reordering and component state preservation.",
        date: "2026-02-12",
        status: "acknowledged",
      },
      {
        id: "c13",
        lineStart: 16,
        lineEnd: 16,
        category: "mentoring",
        severity: "info",
        reviewer: "TA Sarah",
        comment: "Consider using a Skeleton loader instead of text 'Loading...'. It provides better UX by showing the expected layout shape. Libraries like react-loading-skeleton make this easy.",
        date: "2026-02-12",
        status: "pending",
      },
    ],
    interactionScore: 62,
  },
];

export const codeReviewStats = {
  totalReviews: 3,
  totalComments: 13,
  applied: 5,
  acknowledged: 3,
  discussed: 2,
  pending: 3,
  dismissed: 0,
  interactionRate: 68,
};

// Recent activity feed for dashboard
export interface ActivityFeedItem {
  id: string;
  type: "attendance" | "grade" | "github" | "code-review" | "class-activity";
  title: string;
  description: string;
  date: string;
  icon: string;
}

export const recentActivity: ActivityFeedItem[] = [
  { id: "a1", type: "code-review", title: "Code Review Feedback", description: "Applied 2 suggestions on auth middleware", date: "2026-02-19", icon: "code" },
  { id: "a2", type: "github", title: "New Commit", description: "feat: implement user authentication with JWT", date: "2026-02-19", icon: "git-commit" },
  { id: "a3", type: "class-activity", title: "Class Participation", description: "Asked about AVL tree rotations", date: "2026-02-19", icon: "hand" },
  { id: "a4", type: "grade", title: "Grade Posted", description: "Software Engineering: Sprint Review - 78/100", date: "2026-02-18", icon: "award" },
  { id: "a5", type: "attendance", title: "Attendance Recorded", description: "Present - Data Structures, Web Development", date: "2026-02-19", icon: "check-circle" },
  { id: "a6", type: "github", title: "Pull Request Merged", description: "Add dashboard components and routing", date: "2026-02-19", icon: "git-merge" },
  { id: "a7", type: "code-review", title: "New Review Comments", description: "3 new comments on BST implementation", date: "2026-02-15", icon: "message-square" },
  { id: "a8", type: "grade", title: "Grade Posted", description: "Database Systems: ER Diagram Project - 85/100", date: "2026-02-15", icon: "award" },
];

// Messages data
export interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  content: string;
  date: string;
  read: boolean;
  type: "instructor" | "system" | "peer";
}

export const messages: Message[] = [
  {
    id: "m1",
    sender: "Prof. Miroslav",
    subject: "Code Review Feedback Ready",
    preview: "Your JWT authentication code has been reviewed. Please check the comments...",
    content: "Hi Patrick,\n\nI've completed the review of your JWT authentication middleware. Overall good work! I've left 5 comments on your code, including one critical security issue about hardcoded secrets that needs immediate attention.\n\nPlease review the comments and let me know if you have any questions during office hours.\n\nBest regards,\nProf. Miroslav",
    date: "2026-03-05T10:30:00",
    read: false,
    type: "instructor"
  },
  {
    id: "m2",
    sender: "TA Sarah",
    subject: "Lab Session Rescheduled",
    preview: "The Data Structures lab scheduled for tomorrow has been moved to Friday...",
    content: "Hello Patrick,\n\nDue to a scheduling conflict, the Data Structures lab session originally planned for Thursday, March 6th has been rescheduled to Friday, March 7th at 2:00 PM in Room A-204.\n\nPlease make sure to complete the pre-lab assignment before the session.\n\nSee you there!\nSarah",
    date: "2026-03-05T09:15:00",
    read: false,
    type: "instructor"
  },
  {
    id: "m3",
    sender: "System",
    subject: "New Grade Posted - Database Systems",
    preview: "Your grade for 'ER Diagram Project' has been posted: 85/100",
    content: "A new grade has been posted to your account.\n\nCourse: Database Systems\nAssignment: ER Diagram Project\nGrade: 85/100\nWeight: 20%\n\nView detailed feedback in the Grades section.",
    date: "2026-03-04T16:45:00",
    read: true,
    type: "system"
  },
  {
    id: "m4",
    sender: "Michael Chen",
    subject: "Team Project Meeting",
    preview: "Hey Patrick, can we schedule our Software Engineering sprint planning for...",
    content: "Hey Patrick,\n\nCan we schedule our Software Engineering sprint planning meeting for this week? I'm thinking Wednesday evening around 6 PM. We need to finalize the API specifications before our presentation.\n\nLet me know if that works for you!\n\nMichael",
    date: "2026-03-04T14:20:00",
    read: true,
    type: "peer"
  },
  {
    id: "m5",
    sender: "System",
    subject: "Attendance Reminder",
    preview: "You have missed 1 class in the last 2 weeks. Please review the attendance policy...",
    content: "Attendance Notification\n\nThis is a reminder that you have been marked absent for 1 class session in the last 2 weeks:\n\n- Algorithms (February 6, 2026)\n\nPlease review the university attendance policy and contact your instructor if you have any concerns.\n\nCurrent attendance rate: 88%",
    date: "2026-03-03T08:00:00",
    read: true,
    type: "system"
  },
  {
    id: "m6",
    sender: "Prof. Anderson",
    subject: "Office Hours Update",
    preview: "My office hours for next week will be adjusted due to a conference...",
    content: "Dear students,\n\nMy office hours for the week of March 10-14 will be adjusted as follows due to my attendance at the International Software Engineering Conference:\n\nMonday: 2-4 PM (instead of 3-5 PM)\nWednesday: CANCELLED\nFriday: 1-3 PM (instead of 2-4 PM)\n\nPlease plan accordingly.\n\nBest,\nProf. Anderson",
    date: "2026-03-02T11:00:00",
    read: true,
    type: "instructor"
  },
  {
    id: "m7",
    sender: "Emma Rodriguez",
    subject: "Study Group for Algorithms Midterm",
    preview: "Hi! I'm organizing a study group for the upcoming algorithms midterm...",
    content: "Hi Patrick,\n\nI'm organizing a study group for the upcoming Algorithms midterm exam. We're planning to meet this Saturday at the library from 10 AM to 2 PM.\n\nWe'll be covering dynamic programming, graph algorithms, and complexity analysis. Let me know if you'd like to join!\n\nEmma",
    date: "2026-03-01T19:30:00",
    read: true,
    type: "peer"
  }
];

// FAQ data
export interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "grades" | "attendance" | "technical" | "code-review";
}

export const faqItems: FAQItem[] = [
  {
    question: "How is my overall progress score calculated?",
    answer: "Your overall progress score is calculated using a weighted algorithm: Attendance (20%), Grades (30%), Class Activity (20%), GitHub Activity (15%), and Code Review Interactions (15%). Each component is scored from 0-100, and the weighted average gives your final score.",
    category: "general"
  },
  {
    question: "What counts as code review interaction?",
    answer: "Code review interactions include marking reviewer comments as Applied, Acknowledged, Discussed, or Dismissed. Higher engagement with code review feedback positively impacts your progress score. Applying suggestions and discussing improvements shows the most engagement.",
    category: "code-review"
  },
  {
    question: "Can I dispute a grade or attendance record?",
    answer: "Yes. If you believe there's an error in your grade or attendance record, contact your instructor within 7 days of the posting. Use the 'Report Issue' button next to the specific record or send a message through the platform.",
    category: "grades"
  },
  {
    question: "How do I connect my GitHub account?",
    answer: "Go to Settings → Integrations → GitHub. Click 'Connect GitHub Account' and authorize the application. Your public repository activity will be automatically tracked and contribute to your GitHub Activity score.",
    category: "technical"
  },
  {
    question: "What is the attendance policy?",
    answer: "Students must maintain at least 75% attendance rate. Being late is counted as 0.5 absence. Excused absences (with documentation) don't count against your rate. If you fall below 75%, you may be required to meet with your academic advisor.",
    category: "attendance"
  },
  {
    question: "How often is my progress updated?",
    answer: "Your progress scores are updated in real-time as new data is recorded. Attendance is updated immediately after each class, grades within 24-48 hours of submission, GitHub activity syncs every 6 hours, and code review interactions update instantly.",
    category: "general"
  },
  {
    question: "What browsers are supported?",
    answer: "ProgressTrack supports the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using Chrome or Firefox with JavaScript enabled and cookies allowed.",
    category: "technical"
  },
  {
    question: "How do I reset my password?",
    answer: "Click 'Forgot Password' on the login page. Enter your university email address, and you'll receive a password reset link. The link expires after 1 hour. If you don't receive the email, check your spam folder or contact IT support.",
    category: "technical"
  },
  {
    question: "Can I export my progress data?",
    answer: "Yes. Go to Settings → Data Export. You can download your complete progress report as PDF or export raw data as CSV. Reports include all metrics: attendance, grades, activities, GitHub stats, and code reviews.",
    category: "general"
  },
  {
    question: "What should I do if I disagree with a code review comment?",
    answer: "You can mark the comment as 'Discussed' and schedule time during office hours to talk with the reviewer. Constructive discussion about code review feedback is encouraged and positively impacts your interaction score.",
    category: "code-review"
  }
];

// Homework data
export interface HomeworkItem {
  id: string;
  title: string;
  subject: string;
  description: string;
  status: "Pending" | "Submitted" | "Graded";
  dueDate: string;
  teacher: {
    name: string;
    photo: string;
    email: string;
  };
}

export const homeworkData: HomeworkItem[] = [
  {
    id: "hw-1",
    title: "React Component Library",
    subject: "Web Development",
    description: "Create a reusable component library in React using Tailwind CSS. Include Button, Input, and Modal components with variants.",
    status: "Pending",
    dueDate: "2026-03-10",
    teacher: {
      name: "Dr. Sarah Jenkins",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyfGVufDB8fHx8MTc3MTUxNTkxMHww&ixlib=rb-4.1.0&q=80&w=400",
      email: "s.jenkins@university.edu"
    }
  },
  {
    id: "hw-2",
    title: "SQL Database Optimization",
    subject: "Database Systems",
    description: "Optimize the provided database schema and write queries that run under 50ms. Submit the execution plans.",
    status: "Submitted",
    dueDate: "2026-03-01",
    teacher: {
      name: "Prof. Alan Turing",
      photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx0ZWFjaGVyfGVufDB8fHx8MTc3MTUxNTkxMHww&ixlib=rb-4.1.0&q=80&w=400",
      email: "a.turing@university.edu"
    }
  },
  {
    id: "hw-3",
    title: "Algorithm Complexity Analysis",
    subject: "Algorithms",
    description: "Analyze the time and space complexity of the algorithms discussed in class. Provide a written report.",
    status: "Graded",
    dueDate: "2026-02-15",
    teacher: {
      name: "Dr. Elena Rossi",
      photo: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx0ZWFjaGVyfGVufDB8fHx8MTc3MTUxNTkxMHww&ixlib=rb-4.1.0&q=80&w=400",
      email: "e.rossi@university.edu"
    }
  }
];
