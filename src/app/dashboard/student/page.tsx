"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    BookOpen, Award, Clock, CheckCircle2, TrendingUp,
    PlayCircle, ArrowRight, Calendar, AlertCircle, LogOut, Loader2,
    Sparkles, GraduationCap, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { getUserPurchases, getUserProgress } from "@/lib/db";
import { courses as staticCoursesData } from "@/data/courses";
import VideoPlayerModal from "@/components/VideoPlayerModal";

export default function StudentDashboard() {
    const { user, profile, loading, logout } = useAuth();
    const router = useRouter();

    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
    const [stats, setStats] = useState({
        enrolledCount: 0,
        certificatesCount: 0,
        hoursLearned: 0,
        assignmentsDone: 0
    });
    const [isDataLoading, setIsDataLoading] = useState(true);
    
    // Video Player State
    const [selectedVideo, setSelectedVideo] = useState<{ id: string; name: string } | null>(null);

    useEffect(() => {
        if (!loading && (!user || profile?.role !== 'student')) {
            router.push('/login');
        }
    }, [user, profile, loading, router]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user) return;

            try {
                // Fetch basic enrollment data
                const purchases = await getUserPurchases(user.uid);
                const progressData = await getUserProgress(user.uid);

                // Map purchases to full course details
                const enrichedCourses = purchases.map((purchase: any) => {
                    const courseInfo = staticCoursesData.find(c => c.id === purchase.courseId);
                    const courseProgress = progressData.find((p: any) => p.courseId === purchase.courseId);
                    
                    const completedModules = courseProgress?.completedModules?.length || 0;
                    const totalModules = courseInfo?.modules?.length || 1;
                    const progressPercent = Math.min(100, Math.round((completedModules / totalModules) * 100));

                    return {
                        ...courseInfo,
                        purchaseDate: purchase.purchasedAt,
                        progress: progressPercent,
                        completedCount: completedModules,
                        totalCount: totalModules,
                        color: progressPercent === 100 ? "bg-emerald-500" : progressPercent > 50 ? "bg-blue-500" : "bg-amber-500"
                    };
                }).filter(c => c.id); // Filter out any undefined mappings

                setEnrolledCourses(enrichedCourses);

                // Calculate stats
                const completedCourses = enrichedCourses.filter(c => c.progress === 100).length;
                const totalHours = enrichedCourses.reduce((acc, c) => {
                    const durationVal = parseInt(c.duration || "0") || 0;
                    return acc + (durationVal * (c.progress / 100));
                }, 0);

                setStats({
                    enrolledCount: enrichedCourses.length,
                    certificatesCount: completedCourses,
                    hoursLearned: Math.round(totalHours),
                    assignmentsDone: enrichedCourses.reduce((acc, c) => acc + c.completedCount, 0)
                });

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setIsDataLoading(false);
            }
        };

        if (user && !loading) {
            fetchDashboardData();
        }
    }, [user, loading]);

    if (loading || isDataLoading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
                <div className="relative">
                    <div className="w-20 h-20 border-t-2 border-b-2 border-accent rounded-full animate-spin"></div>
                    <GraduationCap className="w-8 h-8 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-neutral-500 animate-pulse font-medium tracking-widest text-xs uppercase">Preparing your learning space...</p>
            </div>
        );
    }

    const StatCard = ({ icon: Icon, value, label, color, delay }: any) => (
        <div 
            className="bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 rounded-[32px] p-8 text-center hover:border-accent/30 transition-all hover:bg-neutral-900/60 group"
        >
            <div className={`p-4 rounded-2xl bg-neutral-950 border border-neutral-800 w-fit mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-7 h-7 ${color}`} />
            </div>
            <h4 className={`text-4xl font-black mb-2 tracking-tighter sm:text-5xl ${color}`}>{value}</h4>
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">{label}</p>
        </div>
    );

    return (
        <main className="min-h-screen bg-black text-white selection:bg-accent selection:text-black pb-32">
            {/* Video Player Modal */}
            {selectedVideo && (
                <VideoPlayerModal 
                    isOpen={!!selectedVideo} 
                    onClose={() => setSelectedVideo(null)} 
                    courseName={selectedVideo.name}
                    youtubeId={selectedVideo.id}
                />
            )}

            {/* Premium Header */}
            <section className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
                <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />
                
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-10">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em]">
                                Student Workspace
                            </span>
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-[0.9]" style={{ fontFamily: 'var(--font-syncopate)' }}>
                            Welcome back,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">{profile?.name?.split(' ')[0] || 'Learner'}</span>
                        </h1>
                        <p className="text-neutral-400 text-lg md:text-xl font-light max-w-xl">
                            You have <span className="text-white font-bold">{enrolledCourses.length} active courses</span> in your curriculum. Ready to push your boundaries?
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                        <Link href="/courses" className="flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-neutral-200 transition-all rounded-full font-bold uppercase tracking-widest text-xs shadow-xl shadow-white/5">
                            Browse Catalog <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                            onClick={async () => {
                                await logout();
                                router.push('/');
                            }}
                            className="flex items-center gap-2 px-6 py-4 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors rounded-full text-white/50 hover:text-white shrink-0 font-bold uppercase tracking-widest text-xs"
                        >
                            <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6">
                {/* Modern Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    <StatCard icon={BookOpen} value={stats.enrolledCount} label="Courses Enrolled" color="text-accent" />
                    <StatCard icon={Award} value={stats.certificatesCount} label="Certificates Earned" color="text-emerald-500" />
                    <StatCard icon={Clock} value={stats.hoursLearned} label="Hours Learned" color="text-blue-500" />
                    <StatCard icon={CheckCircle2} value={stats.assignmentsDone} label="Modules Finished" color="text-amber-500" />
                </div>

                {enrolledCourses.length === 0 ? (
                    <div className="bg-neutral-900/40 border border-dashed border-neutral-800 rounded-[48px] p-20 text-center flex flex-col items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-neutral-950 flex items-center justify-center mb-10 border border-neutral-800 shadow-2xl">
                            <Sparkles className="w-10 h-10 text-neutral-700" />
                        </div>
                        <h3 className="text-3xl font-black mb-4 tracking-tight">Your curriculum is clear.</h3>
                        <p className="text-neutral-500 max-w-md mx-auto mb-10 text-lg">Every expert was once a beginner. Start your first specialization today and unlock your potential.</p>
                        <Link href="/courses" className="bg-accent hover:bg-accent-light text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-accent/20 transition-all hover:scale-105">
                            Browse Specializations
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Active Learning Section */}
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <div className="flex items-center justify-between mb-10 px-2">
                                    <h3 className="text-2xl font-black uppercase tracking-widest flex items-center gap-4 py-2 border-b-2 border-accent">
                                        Active Curriculum <BookOpen className="w-6 h-6 text-accent" />
                                    </h3>
                                    <Link href="/courses" className="text-xs font-bold text-neutral-500 hover:text-white transition-colors uppercase tracking-[0.2em]">
                                        View All Specializations
                                    </Link>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-8">
                                    {enrolledCourses.map((course, idx) => (
                                        <div key={idx} className="group bg-neutral-900/30 border border-white/5 p-8 rounded-[40px] hover:border-white/10 transition-all hover:bg-neutral-900/50 flex flex-col h-full relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[60px] rounded-full group-hover:bg-accent/10 transition-colors" />
                                            
                                            <div className="flex justify-between items-start mb-10">
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-[10px] uppercase font-black tracking-widest text-accent/80">{course.category}</span>
                                                    <h4 className="font-bold text-xl text-white group-hover:text-accent transition-colors line-clamp-2 leading-tight pr-4">{course.name}</h4>
                                                </div>
                                                <button 
                                                    onClick={() => course.youtubeId && setSelectedVideo({ id: course.youtubeId, name: course.name })}
                                                    className="p-3 rounded-2xl bg-black border border-neutral-800 group-hover:border-accent/40 transition-all"
                                                >
                                                    <PlayCircle className="w-5 h-5 text-white/40 group-hover:text-accent" />
                                                </button>
                                            </div>

                                            <div className="mt-auto">
                                                <div className="flex justify-between items-end mb-4">
                                                    <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                                                        {course.completedCount} / {course.totalCount} Modules Complete
                                                    </span>
                                                    <span className="text-xl font-black text-white italic">{course.progress}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-neutral-950 rounded-full overflow-hidden border border-white/5 mb-10">
                                                    <div
                                                        className={`h-full ${course.color} rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(255,100,0,0.2)]`}
                                                        style={{ width: `${course.progress}%` }}
                                                    />
                                                </div>

                                                <button 
                                                    onClick={() => course.youtubeId ? setSelectedVideo({ id: course.youtubeId, name: course.name }) : router.push(`/courses/${course.id}`)}
                                                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${course.progress === 100
                                                    ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 shadow-lg shadow-emerald-500/10'
                                                    : 'bg-white text-black hover:bg-neutral-200 shadow-xl'
                                                    }`}>
                                                    {course.progress === 100 ? (
                                                        <span className="flex items-center justify-center gap-2 italic">Certificate Unlocked <Award className="w-4 h-4" /></span>
                                                    ) : 'Resume Learning'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity & Pathway */}
                        <div className="space-y-12">
                            <div className="bg-neutral-900 shadow-2xl rounded-[48px] p-10 border border-neutral-800/50">
                                <h3 className="text-xl font-black uppercase tracking-widest mb-10 flex items-center gap-3">
                                    Learning Hub <TrendingUp className="w-5 h-5 text-accent" />
                                </h3>

                                <div className="space-y-8">
                                    <div className="flex gap-5 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <Calendar className="w-5 h-5 text-accent" />
                                        </div>
                                        <div className="pt-1">
                                            <h5 className="font-bold text-sm text-white mb-1">Upcoming Module</h5>
                                            <p className="text-xs text-neutral-500 line-clamp-1">Refer to curriculum for session data.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-5 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <Clock className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div className="pt-1">
                                            <h5 className="font-bold text-sm text-white mb-1">Time Spent Today</h5>
                                            <p className="text-xs text-neutral-500">2h 45m focused session</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-5 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <Award className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <div className="pt-1">
                                            <h5 className="font-bold text-sm text-white mb-1">Next Milestone</h5>
                                            <p className="text-xs text-neutral-500">Complete one more course to level up!</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 p-6 rounded-3xl bg-neutral-950/50 border border-white/5">
                                    <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-4">Current Reputation</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-black text-white text-xs">A+</div>
                                        <div>
                                            <h6 className="text-[13px] font-bold text-white">Advanced Scholar</h6>
                                            <div className="flex items-center gap-1 mt-1">
                                                {[1,2,3,4,5].map(i => <div key={i} className="w-3 h-1 bg-accent rounded-full" />)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
