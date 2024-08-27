// lib/planner.js

export async function fetchPlannerPlans(accessToken) {
    const response = await fetch("https://graph.microsoft.com/v1.0/me/planner/plans", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch plans");
    }
  
    const data = await response.json();
    return data;
  }
  
  export async function fetchTasksForPlan(planId, accessToken) {
    const response = await fetch(`https://graph.microsoft.com/v1.0/planner/plans/${planId}/tasks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch tasks for the plan");
    }
  
    const data = await response.json();
    return data;
  }
  