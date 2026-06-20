import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import InterviewPlan from "./features/ai/pages/interviewPlan";
import ProtectedRoute from "./features/auth/components/protectedRoute";
import Report from "./features/ai/pages/report";
import Reports from "./features/ai/pages/reports";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <InterviewPlan />
      </ProtectedRoute>
    ),
  },
  {
    path: "/interview/:reportId",
    element: (
      <ProtectedRoute>
        <Report />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reports",
    element: (
      <ProtectedRoute>
        <Reports />
      </ProtectedRoute>
    ),
  }
]);
