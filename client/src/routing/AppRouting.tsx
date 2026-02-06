import { Navigate, Route, Routes } from "react-router-dom";
import AdminMonthConfiguration from "../app/pages/admin/AdminMonthConfiguration";
import Reports from "../app/pages/admin/Reports";
import EmployeeDashboard from "../app/pages/employee/Dashboard";
import MonthlySubscription from "../app/pages/employee/MonthlySubscription";
import TodaysToken from "../app/pages/employee/TodaysToken";

export default function AppRouting() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<EmployeeDashboard />} />
      <Route path="/monthly-subscription" element={<MonthlySubscription />} />
      <Route path="/todays-token" element={<TodaysToken />} />
      <Route
        path="/admin/month-configuration"
        element={<AdminMonthConfiguration />}
      />
      <Route path="/admin/reports" element={<Reports />} />
    </Routes>
  );
}
