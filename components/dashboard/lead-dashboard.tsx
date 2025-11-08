import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { Users, FileText, Calendar, Settings, MessageSquare, TrendingUp, UserCheck, AlertCircle } from "lucide-react";

interface LeadDashboardProps {
  user: User;
}

export function LeadDashboard({ user }: LeadDashboardProps) {
  const leadMetrics = {
    clusterMembers: 15,
    pendingApplications: 3,
    activeProjects: 4,
    upcomingEvents: 2,
  };

  const quickActions = [
    {
      title: "Manage Cluster",
      description: "Manage cluster members and settings",
      icon: Users,
      href: "/clusters/manage",
      color: "bg-blue-500",
    },
    {
      title: "Review Applications",
      description: "Review pending membership applications",
      icon: UserCheck,
      href: "/clusters/applications",
      color: "bg-green-500",
      badge: leadMetrics.pendingApplications,
    },
    {
      title: "Create Project",
      description: "Create new cluster-based projects",
      icon: FileText,
      href: "/projects/create",
      color: "bg-purple-500",
    },
    {
      title: "Announcements",
      description: "Send announcements to cluster members",
      icon: MessageSquare,
      href: "/announcements",
      color: "bg-orange-500",
    },
  ];

  const pendingItems = [
    {
      type: "Application",
      title: "John Doe - Web Development Cluster",
      time: "2 hours ago",
      action: "Review",
    },
    {
      type: "Project Proposal",
      title: "E-commerce Platform Project",
      time: "4 hours ago",
      action: "Approve",
    },
    {
      type: "Blog Post",
      title: "React Best Practices by Jane Smith",
      time: "1 day ago",
      action: "Review",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lead Student Dashboard</h1>
            <p className="text-gray-600">Cluster Leadership Portal • {user.email}</p>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Cluster Settings
          </Button>
        </div>
      </div>

      {/* Leadership Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cluster Members</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadMetrics.clusterMembers}</div>
            <p className="text-xs text-gray-600">Active members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadMetrics.pendingApplications}</div>
            <p className="text-xs text-gray-600">Need review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadMetrics.activeProjects}</div>
            <p className="text-xs text-gray-600">Ongoing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadMetrics.upcomingEvents}</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Priority Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Leadership Actions</CardTitle>
            <CardDescription>
              Quick access to cluster management tools
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
              Items requiring your attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.type} • {item.time}</p>
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

      {/* Cluster Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cluster Performance</CardTitle>
            <CardDescription>
              Track your cluster's activity and engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Member Engagement</span>
                </div>
                <span className="text-sm text-green-600">+12%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Weekly Active Members</span>
                <span className="font-medium">12/15</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Project Completion Rate</span>
                <span className="font-medium">85%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Cluster Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your cluster
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Users className="w-4 h-4 text-blue-500" />
                <span>New member joined: Alice Johnson</span>
                <span className="text-gray-500 ml-auto">1h ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <FileText className="w-4 h-4 text-green-500" />
                <span>Project completed: Mobile App</span>
                <span className="text-gray-500 ml-auto">3h ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MessageSquare className="w-4 h-4 text-purple-500" />
                <span>New blog post: Python Tips</span>
                <span className="text-gray-500 ml-auto">5h ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}