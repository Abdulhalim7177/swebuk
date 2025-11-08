import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StudentDashboard } from "@/components/dashboard/student-dashboard";

export default async function StudentDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const userRole = user.user_metadata?.role || "student";

  // Redirect if user is not a student
  if (userRole.toLowerCase() !== "student") {
    redirect(`/dashboard/${userRole.toLowerCase()}`);
  }

  return (
    <div className="min-h-screen">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StudentDashboard user={user} />
        </div>
      </div>
    </div>
  );
}