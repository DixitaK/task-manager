"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { io } from "socket.io-client";

async function fetchTasks() {
  const res = await apiFetch("http://localhost:3000/tasks");
  return res.json();
}

export default function DashboardPage() {
  const { data: tasks, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("task.created", () => {
      refetch();
    });

    socket.on("task.updated", () => {
      refetch();
    });

    return () => {
      socket.disconnect();
    };
  }, [refetch]);

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      {!tasks && <p>Loading...</p>}

      {tasks?.map((task: any) => (
        <div key={task.id} style={{ marginBottom: 10 }}>
          <strong>{task.title}</strong> — {task.status}
        </div>
      ))}
    </div>
  );
}
