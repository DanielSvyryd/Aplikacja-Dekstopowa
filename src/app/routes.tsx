import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { LoginPage } from "./components/LoginPage";
import { DashboardPage } from "./components/DashboardPage";
import { AttendancePage } from "./components/AttendancePage";
import { HomeworkPage } from "./components/HomeworkPage";
import { GradesPage } from "./components/GradesPage";
import { ActivityPage } from "./components/ActivityPage";
import { GitHubPage } from "./components/GitHubPage";
import { CodeReviewPage } from "./components/CodeReviewPage";
import { ProfilePage } from "./components/ProfilePage";
import { FAQPage } from "./components/FAQPage";

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: DashboardPage },
      { path: "homework", Component: HomeworkPage },
      { path: "attendance", Component: AttendancePage },
      { path: "grades", Component: GradesPage },
      { path: "activity", Component: ActivityPage },
      { path: "github", Component: GitHubPage },
      { path: "code-review", Component: CodeReviewPage },
      { path: "profile", Component: ProfilePage },
      { path: "faq", Component: FAQPage },
      {
        path: "*",
        Component: () => (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Page not found</p>
          </div>
        ),
      },
    ],
  },
]);
