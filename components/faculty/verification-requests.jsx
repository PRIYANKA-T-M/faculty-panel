"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle2, XCircle, Clock, ExternalLink, FileText, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  filterCard: {
    padding: "1.5rem",
  },
  filterContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  filterRow: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    flexWrap: "wrap",
  },
  searchWrapper: {
    flex: 1,
    position: "relative",
    minWidth: "250px",
  },
  searchIcon: {
    position: "absolute",
    left: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
  },
  sectionHeader: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  grid: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  },
  cardHover: {
    transition: "box-shadow 0.3s ease",
  },
  cardHeaderContent: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  studentInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  certTitle: {
    fontWeight: "600",
    color: "var(--foreground)",
    marginBottom: "0.25rem",
  },
  certProvider: {
    fontSize: "0.875rem",
    color: "var(--muted-foreground)",
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  buttonRow: {
    display: "flex",
    gap: "0.5rem",
  },
  emptyState: {
    padding: "3rem 0",
    textAlign: "center",
  },
  emptyIcon: {
    margin: "0 auto 1rem",
  },
  processedList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  processedItem: {
    padding: "1rem",
  },
  processedContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  processedLeft: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  dialogHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  dialogGrid: {
    display: "grid",
    gap: "1rem",
  },
  dialogRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "var(--muted-foreground)",
  },
  value: {
    fontSize: "1rem",
    marginTop: "0.25rem",
  },
  certificatePreview: {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    padding: "1rem",
    borderRadius: "0.5rem",
  },
  certificateHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
  },
  certificateImage: {
    width: "100%",
    borderRadius: "0.25rem",
    border: "1px solid var(--border)",
  },
  actionButtons: {
    display: "flex",
    gap: "0.75rem",
  },
  approveButton: {
    flex: 1,
    backgroundColor: "var(--success)",
    color: "white",
  },
  rejectButton: {
    flex: 1,
  },
}

const initialRequests = [
  {
    id: 1,
    studentName: "Sarah Johnson",
    studentEmail: "sarah.j@university.edu",
    certificateName: "AWS Cloud Practitioner",
    provider: "Amazon Web Services",
    domain: "Cloud Computing",
    submittedDate: "2025-10-01",
    certificateUrl: "#",
    status: "pending",
    credentialId: "AWS-CP-2024-12345",
  },
  {
    id: 2,
    studentName: "Michael Chen",
    studentEmail: "michael.c@university.edu",
    certificateName: "Google Data Analytics Professional",
    provider: "Google",
    domain: "Data Science",
    submittedDate: "2025-10-02",
    certificateUrl: "#",
    status: "pending",
    credentialId: "GOOGLE-DA-2024-67890",
  },
  {
    id: 3,
    studentName: "Emily Rodriguez",
    studentEmail: "emily.r@university.edu",
    certificateName: "Meta Front-End Developer",
    provider: "Meta",
    domain: "Web Development",
    submittedDate: "2025-10-03",
    certificateUrl: "#",
    status: "pending",
    credentialId: "META-FE-2024-11223",
  },
  {
    id: 4,
    studentName: "David Kim",
    studentEmail: "david.k@university.edu",
    certificateName: "IBM Data Science Professional",
    provider: "IBM",
    domain: "Data Science",
    submittedDate: "2025-10-03",
    certificateUrl: "#",
    status: "pending",
    credentialId: "IBM-DS-2024-44556",
  },
  {
    id: 5,
    studentName: "Jessica Martinez",
    studentEmail: "jessica.m@university.edu",
    certificateName: "Microsoft Azure Fundamentals",
    provider: "Microsoft",
    domain: "Cloud Computing",
    submittedDate: "2025-10-04",
    certificateUrl: "#",
    status: "pending",
    credentialId: "MS-AZ-2024-77889",
  },
  {
    id: 6,
    studentName: "Alex Thompson",
    studentEmail: "alex.t@university.edu",
    certificateName: "Certified Kubernetes Administrator",
    provider: "CNCF",
    domain: "DevOps",
    submittedDate: "2025-10-04",
    certificateUrl: "#",
    status: "pending",
    credentialId: "CKA-2024-99001",
  },
  {
    id: 7,
    studentName: "Priya Patel",
    studentEmail: "priya.p@university.edu",
    certificateName: "TensorFlow Developer Certificate",
    provider: "Google",
    domain: "Machine Learning",
    submittedDate: "2025-10-05",
    certificateUrl: "#",
    status: "pending",
    credentialId: "TF-DEV-2024-22334",
  },
  {
    id: 8,
    studentName: "James Wilson",
    studentEmail: "james.w@university.edu",
    certificateName: "Certified Ethical Hacker",
    provider: "EC-Council",
    domain: "Cybersecurity",
    submittedDate: "2025-10-05",
    certificateUrl: "#",
    status: "pending",
    credentialId: "CEH-2024-55667",
  },
]

export default function VerificationRequests({ onCountChange }) {
  const [requests, setRequests] = useState(initialRequests)
  const [filterDomain, setFilterDomain] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleVerify = (id, approved) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: approved ? "approved" : "rejected" } : req)),
    )
    const newPendingCount = requests.filter((r) => r.status === "pending" && r.id !== id).length
    onCountChange(newPendingCount)
    setDialogOpen(false)
  }

  const viewDetails = (request) => {
    setSelectedRequest(request)
    setDialogOpen(true)
  }

  const domains = ["all", ...new Set(requests.map((r) => r.domain))]

  const filteredRequests = requests.filter((req) => {
    const matchesDomain = filterDomain === "all" || req.domain === filterDomain
    const matchesSearch =
      req.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.certificateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.provider.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDomain && matchesSearch
  })

  const pendingRequests = filteredRequests.filter((r) => r.status === "pending")
  const processedRequests = filteredRequests.filter((r) => r.status !== "pending")

  return (
    <div style={styles.container}>
      {/* Filters */}
      <Card>
        <CardContent style={styles.filterCard}>
          <div style={styles.filterContainer}>
            <div style={styles.filterRow}>
              <div style={styles.searchWrapper}>
                <div style={styles.searchIcon}>
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  placeholder="Search by student, certificate, or provider..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterDomain} onValueChange={setFilterDomain}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain === "all" ? "All Domains" : domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Requests */}
      <div>
        <h2 style={styles.sectionHeader}>
          <Clock className="h-5 w-5 text-warning" />
          Pending Verification
          <Badge variant="secondary">{pendingRequests.length}</Badge>
        </h2>
        <div style={styles.grid}>
          {pendingRequests.map((request) => (
            <Card key={request.id} style={styles.cardHover} className="hover:shadow-lg">
              <CardHeader>
                <div style={styles.cardHeaderContent}>
                  <div style={styles.studentInfo}>
                    <Avatar>
                      <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                      <AvatarFallback>
                        {request.studentName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{request.studentName}</CardTitle>
                      <CardDescription className="text-sm">{request.studentEmail}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent style={styles.cardBody}>
                <div>
                  <h3 style={styles.certTitle}>{request.certificateName}</h3>
                  <p style={styles.certProvider}>{request.provider}</p>
                </div>
                <div style={styles.metaRow}>
                  <Badge className="bg-primary/10 text-primary border-primary/20">{request.domain}</Badge>
                  <span className="text-xs text-muted-foreground">
                    Submitted: {new Date(request.submittedDate).toLocaleDateString()}
                  </span>
                </div>
                <div style={styles.buttonRow}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => viewDetails(request)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" style={styles.approveButton} onClick={() => handleVerify(request.id, true)}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleVerify(request.id, false)}>
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {pendingRequests.length === 0 && (
          <Card>
            <CardContent style={styles.emptyState}>
              <div style={styles.emptyIcon}>
                <CheckCircle2 className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No pending verification requests</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Processed Requests */}
      {processedRequests.length > 0 && (
        <div>
          <h2 style={styles.sectionHeader}>Recently Processed</h2>
          <div style={styles.processedList}>
            {processedRequests.slice(0, 5).map((request) => (
              <Card key={request.id}>
                <CardContent style={styles.processedItem}>
                  <div style={styles.processedContent}>
                    <div style={styles.processedLeft}>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                        <AvatarFallback>
                          {request.studentName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{request.studentName}</p>
                        <p className="text-sm text-muted-foreground">{request.certificateName}</p>
                      </div>
                    </div>
                    <Badge
                      className={
                        request.status === "approved"
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }
                    >
                      {request.status === "approved" ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Approved
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" />
                          Rejected
                        </>
                      )}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Certificate Verification Details</DialogTitle>
            <DialogDescription>Review the certificate information before verification</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div style={styles.dialogContent}>
              <div style={styles.dialogHeader}>
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`/placeholder_64px.png?height=64&width=64`} />
                  <AvatarFallback className="text-lg">
                    {selectedRequest.studentName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedRequest.studentName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedRequest.studentEmail}</p>
                </div>
              </div>

              <div style={styles.dialogGrid}>
                <div>
                  <label style={styles.label}>Certificate Name</label>
                  <p style={styles.value} className="font-semibold">
                    {selectedRequest.certificateName}
                  </p>
                </div>
                <div style={styles.dialogRow}>
                  <div>
                    <label style={styles.label}>Provider</label>
                    <p style={styles.value}>{selectedRequest.provider}</p>
                  </div>
                  <div>
                    <label style={styles.label}>Domain</label>
                    <p style={styles.value}>
                      <Badge className="bg-primary/10 text-primary border-primary/20">{selectedRequest.domain}</Badge>
                    </p>
                  </div>
                </div>
                <div>
                  <label style={styles.label}>Credential ID</label>
                  <p style={styles.value} className="font-mono">
                    {selectedRequest.credentialId}
                  </p>
                </div>
                <div>
                  <label style={styles.label}>Submission Date</label>
                  <p style={styles.value}>
                    {new Date(selectedRequest.submittedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div style={styles.certificatePreview}>
                <div style={styles.certificateHeader}>
                  <span className="text-sm font-medium">Certificate Document</span>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Certificate
                  </Button>
                </div>
                <img
                  src="/images/certificate-placeholder.jpg"
                  alt="Certificate preview"
                  style={styles.certificateImage}
                />
              </div>

              {selectedRequest.status === "pending" && (
                <div style={styles.actionButtons}>
                  <Button style={styles.approveButton} onClick={() => handleVerify(selectedRequest.id, true)}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Approve Certificate
                  </Button>
                  <Button
                    style={styles.rejectButton}
                    variant="destructive"
                    onClick={() => handleVerify(selectedRequest.id, false)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Certificate
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
