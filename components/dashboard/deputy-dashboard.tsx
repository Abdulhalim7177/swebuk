import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { Users, FileText, Calendar, Settings, MessageSquare, EyeCheck, UserPlus, BookOpen } from "lucide-react";

interface DeputyDashboardProps {
  user: User;
}

export function DeputyDashboard({ user }: DeputyDashboardProps) {
  const deputyMetrics = {
    clusterMembers: 15,
    pendingApplications: 3,
    blogToReview: 2,
    assistedProjects: 4,
  };

  const quickActions = [
    {
      title: "Review Applications",
      description: "Help review membership applications",
      icon: UserPlus,
      href: "/clusters/applications",
      color: "bg-blue-500",
      badge: deputyMetrics.pendingApplications,
    },
    {
      title: "Review Blog Posts",
      description: "Review student-submitted blog posts",
      icon: BookOpen,
      href: "/blog/review",
      color: "bg-green-500",
      badge: deputyMetrics.blogToReview,
    },
    {
      title: "Assist Projects",
      description: "Help manage cluster projects",
      icon: FileText,
      href: "/projects/assist",
      color: "bg-purple-500",
    },
    {
      title: "Member Support",
      description: "Support cluster members",
      icon: MessageSquare,
      href: "/support",
      color: "bg-orange-500",
    },
  ];

  const pendingReviews = [
    {
      type: "Blog Post",
      title: "React Hooks Guide by John Doe",
      author: "John Doe",
      time: "2 hours ago",
      action: "Review",
    },
    {
      type: "Application",
      title: "Sarah Wilson - Web Development",
      author: "Sarah Wilson",
      time: "4 hours ago",
      action: "Review",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Deputy Lead Dashboard</h1>
            <p className="text-gray-600">Assistant Cluster Leadership • {user.email}</p>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Assistant Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cluster Members</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deputyMetrics.clusterMembers}</div>
            <p className="text-xs text-gray-600">Total members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <UserPlus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deputyMetrics.pendingApplications}</div>
            <p className="text-xs text-gray-600">Need review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Reviews</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deputyMetrics.blogToReview}</div>
            <p className="text-xs text-gray-600">To review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assisted Projects</CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deputyMetrics.assistedProjects}</div>
            <p className="text-xs text-gray-600">Active</p>
          </CardContent>
        </Card>
      </div>

      {/* Assistant Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Assistant Actions</CardTitle>
            <CardDescription>
              Help manage cluster activities and content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-4"
                  asChild
                >
                  <a href={action.href} className="relative">
                    <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mr-4`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm text-gray-600">{action.description}</div>
                    </div>
                    {action.badge && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {action.badge}
                      </span>
                    )}
                  </a>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Pending Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
            <CardDescription>
              Content and applications needing your review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReviews.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <EyeCheck className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.type} by {item.author} • {item.time}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    {item.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Support Activity</CardTitle>
            <CardDescription>
              Your recent assistance to cluster members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MessageSquare className="w-4 h-4 text-green-500" />
                <span>Helped Mike with React hooks issue</span>
                <span className="text-gray-500 ml-auto">2h ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <FileText className="w-4 h-4 text-blue-500" />
                <span>Reviewed project proposal</span>
                <span className="text-gray-500 ml-auto">5h ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Users className="w-4 h-4 text-purple-500" />
                <span>Welcomed 3 new members</span>
                <span className="text-gray-500 ml-auto">1d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cluster Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Tasks</CardTitle>
            <CardDescription>
              Tasks assigned by the Lead Student
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">Review 2 pending blog posts</span>
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">High</span>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">Help organize next workshop</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Medium</span>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">Update cluster documentation</span>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Low</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Collaboration Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Collaboration with Lead</CardTitle>
          <CardDescription>
            Work together with your Lead Student to manage the cluster
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message Lead
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Shared Notes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}