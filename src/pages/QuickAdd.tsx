import React from "react";
import { useNavigate } from "react-router-dom";
import QuickAddProject from "@/app/showcase/QuickAddProject";
import { UnifiedLayout } from "../components/UnifiedLayout";

const QuickAdd: React.FC = () => {
  const navigate = useNavigate();

  const handleSave = (project: any) => {
    // Save to localStorage
    const existingProjects = JSON.parse(
      localStorage.getItem("showcase-projects") || "[]",
    );
    const updatedProjects = [...existingProjects, project];
    localStorage.setItem("showcase-projects", JSON.stringify(updatedProjects));

    // Show success message
    console.log("Project saved as draft");
  };

  const handlePublish = async (project: any) => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

      // Prepare project payload for backend API
      const projectPayload = {
        title: project.title || project.name,
        description: project.description || project.tagline || '',
        technologies: project.techTags || [],
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        image: project.mediaPreview || project.imageUrl || '',
        featured: false,
        status: 'pending_review', // Set status to pending review
        visibility: project.visibility || 'public',
        category: project.category || 'Web Development',
        tags: project.techTags || [],
      };

      console.log("📤 Publishing project to backend:", projectPayload);

      // Save to backend API
      const response = await fetch(`${apiBaseUrl}/api/portfolio/projects`, {
        method: 'POST',
        credentials: 'include', // Include cookies for session-based auth
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: Failed to publish project`);
      }

      const data = await response.json();

      if (data.success) {
        console.log("✅ Project published successfully:", data);

        // Also save to localStorage as backup
        const existingProjects = JSON.parse(
          localStorage.getItem("showcase-projects") || "[]",
        );
        const updatedProjects = [...existingProjects, { ...project, ...data.project }];
        localStorage.setItem("showcase-projects", JSON.stringify(updatedProjects));

        // Show success message
        alert('Project published successfully! Redirecting to showcase...');

        // Navigate to showcase
        navigate("/showcase");
      } else {
        throw new Error(data.message || 'Failed to publish project');
      }
    } catch (error) {
      console.error("❌ Error publishing project:", error);
      alert(`Failed to publish project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <UnifiedLayout activePage="showcase">
      <div className="flex-1 overflow-y-auto p-6">
        <QuickAddProject onSave={handleSave} onPublish={handlePublish} />
      </div>
    </UnifiedLayout>
  );
};

export default QuickAdd;
