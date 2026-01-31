import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
   CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import {
   User,
   Envelope,
   Phone,
   MapPin,
   GraduationCap,
   Calendar,
   MagnifyingGlass,
   X,
   CheckCircle,
   Clock,
   Bell,
   SignIn,
   PaperPlaneTilt,
   WhatsappLogo,
   Plus,
   Newspaper,
   UserList,
   Trash,
   PencilSimple,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { NotificationSettings } from "@/components/NotificationSettings";
import { NotificationHistory } from "@/components/NotificationHistory";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { LoginDialog } from "./LoginDialog";

export function AdminDashboard() {
   const [consultations, setConsultations] = useState<any[]>([]);
   const [searches, setSearches] = useState<any[]>([]);
   const [newsletters, setNewsletters] = useState<any[]>([]);
   const [subscribers, setSubscribers] = useState<any[]>([]);
   const [isOwner, setIsOwner] = useState(false);
   const [refreshTrigger, setRefreshTrigger] = useState(0);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   // Newsletter form state
   const [showNewsletterDialog, setShowNewsletterDialog] = useState(false);
   const [newsletterForm, setNewsletterForm] = useState({
      title: "",
      excerpt: "",
      content: "",
      published: false,
   });
   const [editingNewsletter, setEditingNewsletter] = useState<any>(null);
   const [alertMessage, setAlertMessage] = useState<{
      type: "success" | "error";
      message: string;
   } | null>(null);
   const [adminOpen, setAdminOpen] = useState(false);
   const [loginOpen, setLoginOpen] = useState(false);

   useEffect(() => {
      const checkOwner = async () => {
         try {
            const token = localStorage.getItem("auth_token");
            const user = localStorage.getItem("user");

            if (token && user) {
               const userData = JSON.parse(user);
               setIsOwner(userData.isAdmin || userData.isOwner || false);
            } else {
               setIsOwner(false);
            }
         } catch (error) {
            setIsOwner(false);
         }
      };
      checkOwner();

      const handleKeyPress = (e: KeyboardEvent) => {
         if (e.ctrlKey && e.shiftKey && e.key === "A") {
            e.preventDefault();
            setAdminOpen(true);
         }
      };

      const handleOpenLoginDialog = () => {
         setLoginOpen(true);
      };

      window.addEventListener("keydown", handleKeyPress);
      window.addEventListener("open-login-dialog", handleOpenLoginDialog);
      return () => {
         window.removeEventListener("keydown", handleKeyPress);
         window.removeEventListener("open-login-dialog", handleOpenLoginDialog);
      };
   }, []);

   useEffect(() => {
      if (isOwner) {
         loadData();
         setRefreshTrigger((prev) => prev + 1);
      }
   }, [isOwner]);

   const loadData = async () => {
      setLoading(true);
      try {
         const [consultationsRes, searchesRes, newslettersRes, subscribersRes] =
            await Promise.all([
               api.get("/consultations"),
               api.get("/searches"),
               api.get("/newsletters/admin/all"),
               api.get("/subscribers"),
            ]);

         setConsultations(consultationsRes.data.data || []);
         setSearches(searchesRes.data.data || []);
         setNewsletters(newslettersRes.data.data || []);
         setSubscribers(subscribersRes.data.data || []);
      } catch (error) {
         console.error("Failed to load admin data:", error);
         setConsultations([]);
         setSearches([]);
         setNewsletters([]);
         setSubscribers([]);
      } finally {
         setLoading(false);
      }
   };

   const handleContactClient = async (
      consultation: any,
      method: "email" | "phone" | "whatsapp",
   ) => {
      try {
         await api.patch(
            `/consultations/${consultation._id || consultation.id}`,
            {
               status: "contacted",
               contactMethod: method,
            },
         );

         // Open email client or phone dialer
         if (method === "email") {
            window.location.href = `mailto:${consultation.email}?subject=Re: Your Consultation Request&body=Dear ${consultation.firstName},`;
         } else if (method === "phone") {
            window.location.href = `tel:${consultation.phone}`;
         } else if (method === "whatsapp") {
            const phone = consultation.phone.replace(/\D/g, "");
            window.open(`https://wa.me/${phone}`, "_blank");
         }

         await loadData();
         showAlert("success", `Contact marked as contacted via ${method}`);
      } catch (error) {
         console.error("Failed to mark as contacted:", error);
         showAlert("error", "Failed to update contact status");
      }
   };

   const showAlert = (type: "success" | "error", message: string) => {
      setAlertMessage({ type, message });
      setTimeout(() => setAlertMessage(null), 5000);
   };

   const handleCreateNewsletter = async () => {
      try {
         if (
            !newsletterForm.title ||
            !newsletterForm.content ||
            !newsletterForm.excerpt
         ) {
            showAlert("error", "Please fill in all fields");
            return;
         }

         if (editingNewsletter) {
            await api.patch(
               `/newsletters/${editingNewsletter._id}`,
               newsletterForm,
            );
            showAlert("success", "Newsletter updated successfully");
         } else {
            await api.post("/newsletters", newsletterForm);
            showAlert("success", "Newsletter created successfully");
         }

         setShowNewsletterDialog(false);
         setNewsletterForm({
            title: "",
            excerpt: "",
            content: "",
            published: false,
         });
         setEditingNewsletter(null);
         await loadData();
      } catch (error) {
         console.error("Failed to save newsletter:", error);
         showAlert("error", "Failed to save newsletter");
      }
   };

   const handleSendNewsletter = async (newsletter: any) => {
      if (
         !confirm(
            `Send this newsletter to ${subscribers.filter((s: any) => s.isActive).length} subscribers?`,
         )
      ) {
         return;
      }

      try {
         await api.post(`/newsletters/${newsletter._id}/send`);
         showAlert("success", "Newsletter sent successfully");
         await loadData();
      } catch (error) {
         console.error("Failed to send newsletter:", error);
         showAlert("error", "Failed to send newsletter");
      }
   };

   const handleDeleteNewsletter = async (id: string) => {
      if (!confirm("Are you sure you want to delete this newsletter?")) {
         return;
      }

      try {
         await api.delete(`/newsletters/${id}`);
         showAlert("success", "Newsletter deleted successfully");
         await loadData();
      } catch (error) {
         console.error("Failed to delete newsletter:", error);
         showAlert("error", "Failed to delete newsletter");
      }
   };

   const openNewsletterDialog = (newsletter?: any) => {
      if (newsletter) {
         setEditingNewsletter(newsletter);
         setNewsletterForm({
            title: newsletter.title,
            excerpt: newsletter.excerpt,
            content: newsletter.content,
            published: newsletter.published,
         });
      } else {
         setEditingNewsletter(null);
         setNewsletterForm({
            title: "",
            excerpt: "",
            content: "",
            published: false,
         });
      }
      setShowNewsletterDialog(true);
   };

   if (!isOwner) {
      return (
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
         >
            <div className="max-w-md w-full mx-4">
               <Card className="p-6">
                  <CardHeader className="text-center">
                     <CardTitle className="text-2xl font-bold">
                        Admin Access Required
                     </CardTitle>
                     <CardDescription>
                        Please login with your admin credentials to access the
                        dashboard
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex items-center justify-center p-4 bg-primary/10 rounded-lg">
                        <User
                           size={64}
                           weight="duotone"
                           className="text-primary"
                        />
                     </div>
                     <p className="text-center text-muted-foreground">
                        You need to be logged in as an administrator to view
                        this dashboard.
                     </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                     <Button
                        size="lg"
                        onClick={() => {
                           const event = new CustomEvent("open-login-dialog");
                           const dispatch = window.dispatchEvent(event);
                        }}
                        className="w-full"
                     >
                        <SignIn size={20} className="mr-2" />
                        Login to Admin Dashboard
                     </Button>
                  </CardFooter>
               </Card>

               <LoginDialog
                  open={loginOpen}
                  onOpenChange={setLoginOpen}
                  onLoginSuccess={() => {
                     // Refresh isOwner state after successful login
                     const token = localStorage.getItem("auth_token");
                     const user = localStorage.getItem("user");
                     if (token && user) {
                        const userData = JSON.parse(user);
                        setIsOwner(
                           userData.isAdmin || userData.isOwner || false,
                        );
                        // Open admin dashboard immediately after login
                        setAdminOpen(true);
                     }
                  }}
               />
            </div>
         </motion.div>
      );
   }

   const sortedConsultations = [...(consultations || [])].sort(
      (a, b) =>
         new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
   );

   const pendingConsultations = consultations.filter(
      (c: any) => c.status === "pending",
   );
   const contactedConsultations = consultations.filter(
      (c: any) => c.status === "contacted" || c.status === "completed",
   );
   const activeSubscribers = subscribers.filter((s: any) => s.isActive).length;

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-auto"
      >
         <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">
                     Professional Admin Dashboard
                  </h1>
                  <p className="text-muted-foreground">
                     Manage clients, newsletters, and track engagement
                  </p>
               </div>
               <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/")}
                  className="h-12 w-12"
               >
                  <X size={24} weight="bold" />
               </Button>
            </div>

            {alertMessage && (
               <Alert
                  className={`mb-4 ${alertMessage.type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
               >
                  <AlertDescription>{alertMessage.message}</AlertDescription>
               </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
                  <CardHeader className="pb-3">
                     <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100 flex items-center gap-2">
                        <User size={16} weight="duotone" />
                        Total Clients
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {consultations.length}
                     </div>
                  </CardContent>
               </Card>

               <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
                  <CardHeader className="pb-3">
                     <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100 flex items-center gap-2">
                        <Clock size={16} weight="duotone" />
                        Pending Contact
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {pendingConsultations.length}
                     </div>
                  </CardContent>
               </Card>

               <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
                  <CardHeader className="pb-3">
                     <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100 flex items-center gap-2">
                        <CheckCircle size={16} weight="duotone" />
                        Contacted
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {contactedConsultations.length}
                     </div>
                  </CardContent>
               </Card>

               <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
                  <CardHeader className="pb-3">
                     <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100 flex items-center gap-2">
                        <UserList size={16} weight="duotone" />
                        Subscribers
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {activeSubscribers}
                     </div>
                  </CardContent>
               </Card>
            </div>

            <Tabs defaultValue="clients" className="w-full">
               <TabsList className="grid w-full max-w-4xl grid-cols-6 mb-6">
                  <TabsTrigger
                     value="clients"
                     className="flex items-center gap-2"
                  >
                     <User size={16} />
                     <span className="hidden sm:inline">Clients</span>
                  </TabsTrigger>
                  <TabsTrigger
                     value="newsletters"
                     className="flex items-center gap-2"
                  >
                     <Newspaper size={16} />
                     <span className="hidden sm:inline">News</span>
                  </TabsTrigger>
                  <TabsTrigger
                     value="subscribers"
                     className="flex items-center gap-2"
                  >
                     <UserList size={16} />
                     <span className="hidden sm:inline">Subscribers</span>
                  </TabsTrigger>
                  <TabsTrigger
                     value="searches"
                     className="flex items-center gap-2"
                  >
                     <MagnifyingGlass size={16} />
                     <span className="hidden sm:inline">Searches</span>
                  </TabsTrigger>
                  <TabsTrigger
                     value="notifications"
                     className="flex items-center gap-2"
                  >
                     <Bell size={16} />
                     <span className="hidden sm:inline">Alerts</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
               </TabsList>

               <TabsContent value="clients" className="mt-6">
                  <Card className="mb-4">
                     <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                           <span>Client Management</span>
                           <div className="flex gap-2">
                              <Badge variant="outline">
                                 {pendingConsultations.length} Pending
                              </Badge>
                              <Badge variant="outline">
                                 {contactedConsultations.length} Contacted
                              </Badge>
                           </div>
                        </CardTitle>
                        <CardDescription>
                           Track and manage your client consultations
                        </CardDescription>
                     </CardHeader>
                  </Card>

                  <ScrollArea className="h-[600px]">
                     <div className="space-y-4">
                        {sortedConsultations.length === 0 ? (
                           <Card>
                              <CardContent className="py-12 text-center">
                                 <User
                                    size={48}
                                    weight="duotone"
                                    className="mx-auto mb-4 text-muted-foreground"
                                 />
                                 <p className="text-muted-foreground">
                                    No client consultations yet
                                 </p>
                              </CardContent>
                           </Card>
                        ) : (
                           sortedConsultations.map((consultation: any) => (
                              <Card
                                 key={consultation._id || consultation.id}
                                 className="overflow-hidden hover:shadow-lg transition-shadow"
                              >
                                 <div
                                    className={`h-1 ${consultation.status === "contacted" || consultation.status === "completed" ? "bg-green-500" : "bg-orange-500"}`}
                                 />
                                 <CardHeader>
                                    <div className="flex items-start justify-between">
                                       <div className="flex-1">
                                          <CardTitle className="text-xl mb-1">
                                             {consultation.firstName}{" "}
                                             {consultation.lastName}
                                          </CardTitle>
                                          <CardDescription className="flex items-center gap-2">
                                             <Calendar size={14} />
                                             {new Date(
                                                consultation.submittedAt,
                                             ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                             })}
                                          </CardDescription>
                                       </div>
                                       <div className="flex flex-col items-end gap-2">
                                          <Badge
                                             className={
                                                consultation.status ===
                                                   "contacted" ||
                                                consultation.status ===
                                                   "completed"
                                                   ? "bg-green-600 text-white"
                                                   : consultation.status ===
                                                       "pending"
                                                     ? "bg-orange-500 text-white"
                                                     : "bg-blue-500 text-white"
                                             }
                                          >
                                             {consultation.status ===
                                                "contacted" ||
                                             consultation.status ===
                                                "completed" ? (
                                                <>
                                                   <CheckCircle
                                                      size={14}
                                                      className="mr-1"
                                                   />
                                                   Contacted
                                                </>
                                             ) : (
                                                <>
                                                   <Clock
                                                      size={14}
                                                      className="mr-1"
                                                   />
                                                   Pending
                                                </>
                                             )}
                                          </Badge>
                                          {consultation.contactMethod && (
                                             <Badge
                                                variant="outline"
                                                className="text-xs"
                                             >
                                                via {consultation.contactMethod}
                                             </Badge>
                                          )}
                                       </div>
                                    </div>
                                 </CardHeader>
                                 <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                       <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                             <Envelope
                                                size={18}
                                                weight="duotone"
                                                className="text-primary"
                                             />
                                          </div>
                                          <div>
                                             <p className="text-xs text-muted-foreground">
                                                Email
                                             </p>
                                             <p className="text-sm font-medium">
                                                {consultation.email}
                                             </p>
                                          </div>
                                       </div>

                                       <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                             <Phone
                                                size={18}
                                                weight="duotone"
                                                className="text-primary"
                                             />
                                          </div>
                                          <div>
                                             <p className="text-xs text-muted-foreground">
                                                Phone
                                             </p>
                                             <p className="text-sm font-medium">
                                                {consultation.phone}
                                             </p>
                                          </div>
                                       </div>

                                       {consultation.country && (
                                          <div className="flex items-center gap-3">
                                             <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                <MapPin
                                                   size={18}
                                                   weight="duotone"
                                                   className="text-primary"
                                                />
                                             </div>
                                             <div>
                                                <p className="text-xs text-muted-foreground">
                                                   Current Country
                                                </p>
                                                <p className="text-sm font-medium">
                                                   {consultation.country}
                                                </p>
                                             </div>
                                          </div>
                                       )}

                                       {consultation.destination && (
                                          <div className="flex items-center gap-3">
                                             <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                <GraduationCap
                                                   size={18}
                                                   weight="duotone"
                                                   className="text-primary"
                                                />
                                             </div>
                                             <div>
                                                <p className="text-xs text-muted-foreground">
                                                   Destination
                                                </p>
                                                <p className="text-sm font-medium capitalize">
                                                   {consultation.destination}
                                                </p>
                                             </div>
                                          </div>
                                       )}
                                    </div>

                                    {consultation.service && (
                                       <div>
                                          <p className="text-xs text-muted-foreground mb-1">
                                             Service Interest
                                          </p>
                                          <Badge variant="secondary">
                                             {consultation.service}
                                          </Badge>
                                       </div>
                                    )}

                                    {consultation.message && (
                                       <div>
                                          <p className="text-xs text-muted-foreground mb-2">
                                             Message
                                          </p>
                                          <p className="text-sm bg-secondary/30 p-3 rounded-lg border border-border/50">
                                             {consultation.message}
                                          </p>
                                       </div>
                                    )}

                                    <div className="flex flex-wrap gap-2 pt-4 border-t">
                                       <Button
                                          size="sm"
                                          onClick={() =>
                                             handleContactClient(
                                                consultation,
                                                "email",
                                             )
                                          }
                                          className="flex items-center gap-2"
                                       >
                                          <Envelope size={16} />
                                          Email Client
                                       </Button>
                                       <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() =>
                                             handleContactClient(
                                                consultation,
                                                "phone",
                                             )
                                          }
                                          className="flex items-center gap-2"
                                       >
                                          <Phone size={16} />
                                          Call Client
                                       </Button>
                                       <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() =>
                                             handleContactClient(
                                                consultation,
                                                "whatsapp",
                                             )
                                          }
                                          className="flex items-center gap-2 bg-green-50 hover:bg-green-100"
                                       >
                                          <WhatsappLogo size={16} />
                                          WhatsApp
                                       </Button>
                                    </div>

                                    {consultation.contactedAt && (
                                       <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
                                          ✓ Contacted on{" "}
                                          {new Date(
                                             consultation.contactedAt,
                                          ).toLocaleDateString()}
                                       </div>
                                    )}
                                 </CardContent>
                              </Card>
                           ))
                        )}
                     </div>
                  </ScrollArea>
               </TabsContent>

               <TabsContent value="newsletters" className="mt-6">
                  <Card className="mb-4">
                     <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                           <span>Newsletter Management</span>
                           <Button
                              onClick={() => openNewsletterDialog()}
                              className="flex items-center gap-2"
                           >
                              <Plus size={16} />
                              Create Newsletter
                           </Button>
                        </CardTitle>
                        <CardDescription>
                           Create and manage newsletters for your website
                        </CardDescription>
                     </CardHeader>
                  </Card>

                  <ScrollArea className="h-[600px]">
                     <div className="grid grid-cols-1 gap-4">
                        {newsletters.length === 0 ? (
                           <Card>
                              <CardContent className="py-12 text-center">
                                 <Newspaper
                                    size={48}
                                    weight="duotone"
                                    className="mx-auto mb-4 text-muted-foreground"
                                 />
                                 <p className="text-muted-foreground mb-4">
                                    No newsletters yet
                                 </p>
                                 <Button onClick={() => openNewsletterDialog()}>
                                    <Plus size={16} className="mr-2" />
                                    Create Your First Newsletter
                                 </Button>
                              </CardContent>
                           </Card>
                        ) : (
                           newsletters.map((newsletter: any) => (
                              <Card
                                 key={newsletter._id}
                                 className="hover:shadow-lg transition-shadow"
                              >
                                 <CardHeader>
                                    <div className="flex items-start justify-between">
                                       <div className="flex-1">
                                          <CardTitle className="text-lg mb-2">
                                             {newsletter.title}
                                          </CardTitle>
                                          <CardDescription>
                                             {newsletter.excerpt}
                                          </CardDescription>
                                       </div>
                                       <div className="flex flex-col gap-2">
                                          <Badge
                                             className={
                                                newsletter.published
                                                   ? "bg-green-600"
                                                   : "bg-gray-400"
                                             }
                                          >
                                             {newsletter.published
                                                ? "Published"
                                                : "Draft"}
                                          </Badge>
                                          {newsletter.sentToSubscribers && (
                                             <Badge
                                                variant="outline"
                                                className="text-xs"
                                             >
                                                Sent to{" "}
                                                {newsletter.recipientCount}
                                             </Badge>
                                          )}
                                       </div>
                                    </div>
                                 </CardHeader>
                                 <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                       <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() =>
                                             openNewsletterDialog(newsletter)
                                          }
                                       >
                                          <PencilSimple
                                             size={16}
                                             className="mr-2"
                                          />
                                          Edit
                                       </Button>
                                       {newsletter.published &&
                                          !newsletter.sentToSubscribers && (
                                             <Button
                                                size="sm"
                                                onClick={() =>
                                                   handleSendNewsletter(
                                                      newsletter,
                                                   )
                                                }
                                             >
                                                <PaperPlaneTilt
                                                   size={16}
                                                   className="mr-2"
                                                />
                                                Send to Subscribers
                                             </Button>
                                          )}
                                       <Button
                                          size="sm"
                                          variant="destructive"
                                          onClick={() =>
                                             handleDeleteNewsletter(
                                                newsletter._id,
                                             )
                                          }
                                       >
                                          <Trash size={16} className="mr-2" />
                                          Delete
                                       </Button>
                                    </div>
                                    <div className="mt-4 text-xs text-muted-foreground">
                                       Created:{" "}
                                       {new Date(
                                          newsletter.createdAt,
                                       ).toLocaleDateString()}
                                       {newsletter.publishedAt &&
                                          ` | Published: ${new Date(newsletter.publishedAt).toLocaleDateString()}`}
                                    </div>
                                 </CardContent>
                              </Card>
                           ))
                        )}
                     </div>
                  </ScrollArea>
               </TabsContent>

               <TabsContent value="subscribers" className="mt-6">
                  <Card className="mb-4">
                     <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                           <span>Newsletter Subscribers</span>
                           <Badge variant="outline">
                              {activeSubscribers} Active
                           </Badge>
                        </CardTitle>
                        <CardDescription>
                           Manage your newsletter subscribers
                        </CardDescription>
                     </CardHeader>
                  </Card>

                  <ScrollArea className="h-[600px]">
                     <div className="space-y-2">
                        {subscribers.length === 0 ? (
                           <Card>
                              <CardContent className="py-12 text-center">
                                 <UserList
                                    size={48}
                                    weight="duotone"
                                    className="mx-auto mb-4 text-muted-foreground"
                                 />
                                 <p className="text-muted-foreground">
                                    No subscribers yet
                                 </p>
                              </CardContent>
                           </Card>
                        ) : (
                           subscribers.map((subscriber: any) => (
                              <Card key={subscriber._id} className="p-4">
                                 <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                       <div
                                          className={`w-10 h-10 rounded-full flex items-center justify-center ${subscriber.isActive ? "bg-green-100" : "bg-gray-100"}`}
                                       >
                                          <Envelope
                                             size={18}
                                             className={
                                                subscriber.isActive
                                                   ? "text-green-600"
                                                   : "text-gray-400"
                                             }
                                          />
                                       </div>
                                       <div>
                                          <p className="font-medium">
                                             {subscriber.email}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                             {subscriber.isActive
                                                ? "Active"
                                                : "Unsubscribed"}{" "}
                                             • Joined{" "}
                                             {new Date(
                                                subscriber.subscribedAt,
                                             ).toLocaleDateString()}
                                          </p>
                                       </div>
                                    </div>
                                    <Badge
                                       variant={
                                          subscriber.isActive
                                             ? "default"
                                             : "outline"
                                       }
                                    >
                                       {subscriber.isActive
                                          ? "Active"
                                          : "Inactive"}
                                    </Badge>
                                 </div>
                              </Card>
                           ))
                        )}
                     </div>
                  </ScrollArea>
               </TabsContent>

               <TabsContent value="searches" className="mt-6">
                  <Card className="mb-4">
                     <CardHeader>
                        <CardTitle>User Searches</CardTitle>
                        <CardDescription>
                           Track what users are searching for
                        </CardDescription>
                     </CardHeader>
                  </Card>

                  <ScrollArea className="h-[600px]">
                     <div className="space-y-4">
                        {searches.length === 0 ? (
                           <Card>
                              <CardContent className="py-12 text-center">
                                 <MagnifyingGlass
                                    size={48}
                                    weight="duotone"
                                    className="mx-auto mb-4 text-muted-foreground"
                                 />
                                 <p className="text-muted-foreground">
                                    No searches yet
                                 </p>
                              </CardContent>
                           </Card>
                        ) : (
                           searches
                              .sort(
                                 (a: any, b: any) =>
                                    new Date(b.searchedAt).getTime() -
                                    new Date(a.searchedAt).getTime(),
                              )
                              .map((search: any) => (
                                 <Card key={search._id || search.id}>
                                    <CardContent className="py-4">
                                       <div className="flex items-start gap-3">
                                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                                             <MagnifyingGlass
                                                size={18}
                                                weight="duotone"
                                                className="text-accent"
                                             />
                                          </div>
                                          <div className="flex-1">
                                             <div className="flex flex-wrap gap-2 mb-2">
                                                {search.level && (
                                                   <Badge variant="secondary">
                                                      Level: {search.level}
                                                   </Badge>
                                                )}
                                                {search.destination && (
                                                   <Badge variant="secondary">
                                                      Destination:{" "}
                                                      {search.destination}
                                                   </Badge>
                                                )}
                                                {search.field && (
                                                   <Badge variant="secondary">
                                                      Field: {search.field}
                                                   </Badge>
                                                )}
                                             </div>
                                             <p className="text-xs text-muted-foreground">
                                                {new Date(
                                                   search.searchedAt,
                                                ).toLocaleDateString("en-US", {
                                                   year: "numeric",
                                                   month: "short",
                                                   day: "numeric",
                                                   hour: "2-digit",
                                                   minute: "2-digit",
                                                })}
                                             </p>
                                          </div>
                                       </div>
                                    </CardContent>
                                 </Card>
                              ))
                        )}
                     </div>
                  </ScrollArea>
               </TabsContent>

               <TabsContent value="notifications" className="mt-6">
                  <NotificationHistory refreshTrigger={refreshTrigger} />
               </TabsContent>

               <TabsContent value="settings" className="mt-6">
                  <NotificationSettings />
               </TabsContent>
            </Tabs>
         </div>

         {/* Newsletter Dialog */}
         <Dialog
            open={showNewsletterDialog}
            onOpenChange={setShowNewsletterDialog}
         >
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
               <DialogHeader>
                  <DialogTitle>
                     {editingNewsletter
                        ? "Edit Newsletter"
                        : "Create New Newsletter"}
                  </DialogTitle>
                  <DialogDescription>
                     Create engaging newsletters for your website and
                     subscribers
                  </DialogDescription>
               </DialogHeader>
               <div className="space-y-4 py-4">
                  <div>
                     <Label htmlFor="title">Title</Label>
                     <Input
                        id="title"
                        placeholder="Enter newsletter title..."
                        value={newsletterForm.title}
                        onChange={(e) =>
                           setNewsletterForm({
                              ...newsletterForm,
                              title: e.target.value,
                           })
                        }
                     />
                  </div>
                  <div>
                     <Label htmlFor="excerpt">Excerpt (Short Summary)</Label>
                     <Textarea
                        id="excerpt"
                        placeholder="Brief summary of the newsletter..."
                        value={newsletterForm.excerpt}
                        onChange={(e) =>
                           setNewsletterForm({
                              ...newsletterForm,
                              excerpt: e.target.value,
                           })
                        }
                        rows={2}
                     />
                  </div>
                  <div>
                     <Label htmlFor="content">Content (HTML supported)</Label>
                     <Textarea
                        id="content"
                        placeholder="Write your newsletter content here. You can use HTML tags for formatting..."
                        value={newsletterForm.content}
                        onChange={(e) =>
                           setNewsletterForm({
                              ...newsletterForm,
                              content: e.target.value,
                           })
                        }
                        rows={10}
                     />
                     <p className="text-xs text-muted-foreground mt-1">
                        You can use HTML tags like &lt;h2&gt;, &lt;p&gt;,
                        &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt; for formatting
                     </p>
                  </div>
                  <div className="flex items-center gap-2">
                     <input
                        type="checkbox"
                        id="published"
                        checked={newsletterForm.published}
                        onChange={(e) =>
                           setNewsletterForm({
                              ...newsletterForm,
                              published: e.target.checked,
                           })
                        }
                        className="w-4 h-4"
                     />
                     <Label htmlFor="published" className="cursor-pointer">
                        Publish immediately (visible on website)
                     </Label>
                  </div>
               </div>
               <DialogFooter>
                  <Button
                     variant="outline"
                     onClick={() => setShowNewsletterDialog(false)}
                  >
                     Cancel
                  </Button>
                  <Button onClick={handleCreateNewsletter}>
                     {editingNewsletter ? "Update" : "Create"} Newsletter
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </motion.div>
   );
}
