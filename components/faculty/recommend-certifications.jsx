"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Star, Users, Clock, Send, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

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
  selectionBanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem",
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    borderRadius: "0.5rem",
  },
  grid: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  },
  certCard: {
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  certCardSelected: {
    boxShadow: "0 0 0 2px var(--primary)",
  },
  cardHeaderTop: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
  },
  badgeGroup: {
    display: "flex",
    gap: "0.5rem",
  },
  trendingBadge: {
    background: "linear-gradient(to right, rgb(168, 85, 247), rgb(236, 72, 153))",
    color: "white",
    border: "none",
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    fontSize: "0.875rem",
  },
  ratingItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
  durationRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.875rem",
    color: "var(--muted-foreground)",
  },
  badgeRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  emptyState: {
    padding: "3rem 0",
    textAlign: "center",
  },
  emptyIcon: {
    margin: "0 auto 1rem",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  selectedCertsList: {
    marginTop: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  selectedCertItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem",
    backgroundColor: "var(--muted)",
    borderRadius: "0.5rem",
  },
  certInfo: {
    display: "flex",
    flexDirection: "column",
  },
  certName: {
    fontWeight: "500",
  },
  certProvider: {
    fontSize: "0.875rem",
    color: "var(--muted-foreground)",
  },
  actionButtons: {
    display: "flex",
    gap: "0.75rem",
  },
}

const certifications = [
  {
    id: 1,
    name: "AWS Cloud Practitioner",
    provider: "Amazon Web Services",
    domain: "Cloud Computing",
    rating: 4.8,
    students: "120K",
    duration: "6 weeks",
    level: "Beginner",
    trending: true,
    facultyVerified: true,
  },
  {
    id: 2,
    name: "Google Data Analytics Professional",
    provider: "Google",
    domain: "Data Science",
    rating: 4.9,
    students: "95K",
    duration: "8 weeks",
    level: "Beginner",
    trending: true,
    facultyVerified: true,
  },
  {
    id: 3,
    name: "Meta Front-End Developer",
    provider: "Meta",
    domain: "Web Development",
    rating: 4.7,
    students: "80K",
    duration: "10 weeks",
    level: "Intermediate",
    trending: true,
    facultyVerified: true,
  },
  {
    id: 4,
    name: "IBM Data Science Professional",
    provider: "IBM",
    domain: "Data Science",
    rating: 4.6,
    students: "70K",
    duration: "12 weeks",
    level: "Intermediate",
    trending: true,
    facultyVerified: true,
  },
  {
    id: 5,
    name: "Microsoft Azure Fundamentals",
    provider: "Microsoft",
    domain: "Cloud Computing",
    rating: 4.7,
    students: "85K",
    duration: "4 weeks",
    level: "Beginner",
    trending: false,
    facultyVerified: true,
  },
  {
    id: 6,
    name: "Certified Kubernetes Administrator",
    provider: "CNCF",
    domain: "DevOps",
    rating: 4.8,
    students: "45K",
    duration: "8 weeks",
    level: "Advanced",
    trending: false,
    facultyVerified: true,
  },
  {
    id: 7,
    name: "TensorFlow Developer Certificate",
    provider: "Google",
    domain: "Machine Learning",
    rating: 4.9,
    students: "60K",
    duration: "10 weeks",
    level: "Advanced",
    trending: true,
    facultyVerified: true,
  },
  {
    id: 8,
    name: "Certified Ethical Hacker",
    provider: "EC-Council",
    domain: "Cybersecurity",
    rating: 4.6,
    students: "55K",
    duration: "12 weeks",
    level: "Advanced",
    trending: false,
    facultyVerified: true,
  },
  {
    id: 9,
    name: "Full Stack Web Development",
    provider: "Coursera",
    domain: "Web Development",
    rating: 4.5,
    students: "90K",
    duration: "16 weeks",
    level: "Intermediate",
    trending: false,
    facultyVerified: true,
  },
  {
    id: 10,
    name: "Python for Data Science",
    provider: "IBM",
    domain: "Data Science",
    rating: 4.7,
    students: "110K",
    duration: "6 weeks",
    level: "Beginner",
    trending: true,
    facultyVerified: true,
  },
]

export default function RecommendCertifications() {
  const [filterDomain, setFilterDomain] = useState("all")
  const [filterLevel, setFilterLevel] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCerts, setSelectedCerts] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [recommendationMessage, setRecommendationMessage] = useState("")
  const [targetStudents, setTargetStudents] = useState("all")

  const domains = ["all", ...new Set(certifications.map((c) => c.domain))]
  const levels = ["all", "Beginner", "Intermediate", "Advanced"]

  const filteredCertifications = certifications.filter((cert) => {
    const matchesDomain = filterDomain === "all" || cert.domain === filterDomain
    const matchesLevel = filterLevel === "all" || cert.level === filterLevel
    const matchesSearch =
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.provider.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDomain && matchesLevel && matchesSearch
  })

  const handleRecommend = (certId) => {
    setSelectedCerts([certId])
    setDialogOpen(true)
  }

  const handleBulkRecommend = () => {
    if (selectedCerts.length > 0) {
      setDialogOpen(true)
    }
  }

  const sendRecommendation = () => {
    console.log("Sending recommendation:", {
      certifications: selectedCerts,
      message: recommendationMessage,
      target: targetStudents,
    })
    setDialogOpen(false)
    setSelectedCerts([])
    setRecommendationMessage("")
    setTargetStudents("all")
  }

  const toggleCertSelection = (certId) => {
    setSelectedCerts((prev) => (prev.includes(certId) ? prev.filter((id) => id !== certId) : [...prev, certId]))
  }

  return (
    <div style={styles.container}>
      {/* Filters and Actions */}
      <Card>
        <CardContent style={styles.filterCard}>
          <div style={styles.filterContainer}>
            <div style={styles.filterRow}>
              <div style={styles.searchWrapper}>
                <div style={styles.searchIcon}>
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  placeholder="Search certifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterDomain} onValueChange={setFilterDomain}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain === "all" ? "All Domains" : domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level === "all" ? "All Levels" : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedCerts.length > 0 && (
              <div style={styles.selectionBanner}>
                <span className="text-sm font-medium">
                  {selectedCerts.length} certification{selectedCerts.length > 1 ? "s" : ""} selected
                </span>
                <Button onClick={handleBulkRecommend} size="sm">
                  <Send className="h-4 w-4 mr-2" />
                  Recommend Selected
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Certifications Grid */}
      <div style={styles.grid}>
        {filteredCertifications.map((cert) => (
          <Card
            key={cert.id}
            style={{
              ...styles.certCard,
              ...(selectedCerts.includes(cert.id) ? styles.certCardSelected : {}),
            }}
            className="hover:shadow-lg"
          >
            <CardHeader>
              <div style={styles.cardHeaderTop}>
                <div style={styles.badgeGroup}>
                  {cert.facultyVerified && (
                    <Badge className="bg-primary text-primary-foreground">Faculty Verified</Badge>
                  )}
                  {cert.trending && (
                    <Badge style={styles.trendingBadge}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                <Checkbox
                  checked={selectedCerts.includes(cert.id)}
                  onCheckedChange={() => toggleCertSelection(cert.id)}
                />
              </div>
              <CardTitle className="text-lg leading-tight">{cert.name}</CardTitle>
              <CardDescription>{cert.provider}</CardDescription>
            </CardHeader>
            <CardContent style={styles.cardBody}>
              <div style={styles.ratingRow}>
                <div style={styles.ratingItem}>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{cert.rating}</span>
                </div>
                <div style={styles.ratingItem} className="text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{cert.students} students</span>
                </div>
              </div>
              <div style={styles.durationRow}>
                <Clock className="h-4 w-4" />
                <span>{cert.duration}</span>
              </div>
              <div style={styles.badgeRow}>
                <Badge variant="outline" className="bg-accent">
                  {cert.domain}
                </Badge>
                <Badge variant="outline">{cert.level}</Badge>
              </div>
              <Button className="w-full" onClick={() => handleRecommend(cert.id)}>
                <Send className="h-4 w-4 mr-2" />
                Recommend
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCertifications.length === 0 && (
        <Card>
          <CardContent style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No certifications found matching your filters</p>
          </CardContent>
        </Card>
      )}

      {/* Recommendation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Recommend Certifications</DialogTitle>
            <DialogDescription>
              Send certification recommendations to students based on their domain or expertise
            </DialogDescription>
          </DialogHeader>
          <div style={styles.dialogContent}>
            <div>
              <Label>Selected Certifications</Label>
              <div style={styles.selectedCertsList}>
                {selectedCerts.map((certId) => {
                  const cert = certifications.find((c) => c.id === certId)
                  return (
                    <div key={certId} style={styles.selectedCertItem}>
                      <div style={styles.certInfo}>
                        <p style={styles.certName}>{cert.name}</p>
                        <p style={styles.certProvider}>{cert.provider}</p>
                      </div>
                      <Badge>{cert.domain}</Badge>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <Label htmlFor="target">Target Students</Label>
              <Select value={targetStudents} onValueChange={setTargetStudents}>
                <SelectTrigger id="target" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="domain">Students in Same Domain</SelectItem>
                  <SelectItem value="year">Students in Specific Year</SelectItem>
                  <SelectItem value="custom">Custom Selection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Recommendation Message</Label>
              <Textarea
                id="message"
                placeholder="Add a personalized message explaining why you recommend these certifications..."
                value={recommendationMessage}
                onChange={(e) => setRecommendationMessage(e.target.value)}
                className="mt-2 min-h-[120px]"
              />
            </div>

            <div style={styles.actionButtons}>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={sendRecommendation}>
                <Send className="h-4 w-4 mr-2" />
                Send Recommendation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
