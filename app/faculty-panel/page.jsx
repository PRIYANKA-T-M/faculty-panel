"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VerificationRequests from "@/components/faculty/verification-requests"
import RecommendCertifications from "@/components/faculty/recommend-certifications"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, TrendingUp } from "lucide-react"

const styles = {
  main: {
    minHeight: "100vh",
    padding: "2rem 1rem",
    backgroundColor: "var(--background)",
  },
  container: {
    maxWidth: "1280px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "2rem",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "0.75rem",
  },
  iconBox: {
    height: "3rem",
    width: "3rem",
    borderRadius: "0.75rem",
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "1.875rem",
    fontWeight: "bold",
    color: "var(--foreground)",
    margin: 0,
  },
  subtitle: {
    color: "var(--muted-foreground)",
    margin: 0,
  },
  tabsList: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    width: "100%",
    maxWidth: "28rem",
    marginBottom: "2rem",
  },
  tabTrigger: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}

export default function FacultyPanel() {
  const [pendingCount, setPendingCount] = useState(8)

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.iconBox}>
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 style={styles.title}>Faculty Panel</h1>
              <p style={styles.subtitle}>Verify and recommend certifications</p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="verification" className="w-full">
          <TabsList style={styles.tabsList}>
            <TabsTrigger value="verification" style={styles.tabTrigger}>
              Verification Requests
              {pendingCount > 0 && <Badge className="ml-2 bg-primary text-primary-foreground">{pendingCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="recommend">
              <TrendingUp className="h-4 w-4 mr-2" />
              Recommend
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verification" className="mt-0">
            <VerificationRequests onCountChange={setPendingCount} />
          </TabsContent>

          <TabsContent value="recommend" className="mt-0">
            <RecommendCertifications />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
