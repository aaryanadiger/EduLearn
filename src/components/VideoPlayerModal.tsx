"use client";

import { useState, useEffect, useRef } from "react";
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, ExternalLink } from "lucide-react";

interface VideoPlayerModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseName: string;
    youtubeId: string;
}

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

export default function VideoPlayerModal({
    isOpen,
    onClose,
    courseName,
    youtubeId
}: VideoPlayerModalProps) {
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen || !youtubeId) return;

        // Load YouTube API if not already loaded
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                initializePlayer();
            };
        } else {
            initializePlayer();
        }

        function initializePlayer() {
            playerRef.current = new window.YT.Player(`youtube-player-${youtubeId}`, {
                height: '100%',
                width: '100%',
                videoId: youtubeId,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    iv_load_policy: 3,
                },
                events: {
                    onReady: (event: any) => {
                        setIsPlayerReady(true);
                        event.target.playVideo();
                    },
                    onStateChange: (event: any) => {
                        // YT.PlayerState.PLAYING = 1, PAUSED = 2
                        setIsPlaying(event.data === 1);
                    }
                }
            });
        }

        // Visibility Change Listener
        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (playerRef.current && playerRef.current.pauseVideo) {
                    playerRef.current.pauseVideo();
                    console.log("Tab switched: Video paused");
                }
            } else {
                // Optional: Resume on return
                // if (playerRef.current && playerRef.current.playVideo) {
                //     playerRef.current.playVideo();
                // }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [isOpen, youtubeId]);

    if (!isOpen) return null;

    const togglePlay = () => {
        if (!playerRef.current) return;
        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    const restartVideo = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(0);
            playerRef.current.playVideo();
        }
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 p-4 md:p-10">
            <div className="relative w-full max-w-6xl aspect-video rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 group">
                
                {/* Header Controls */}
                <div className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-col">
                        <span className="text-accent text-[10px] uppercase font-black tracking-widest mb-1">Now Learning</span>
                        <h2 className="text-white font-bold text-xl drop-shadow-lg">{courseName}</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110 border border-white/10"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* The Player Container */}
                <div className="w-full h-full pointer-events-none">
                    <div id={`youtube-player-${youtubeId}`} className="w-full h-full" />
                </div>

                {/* Custom Overlay Controls */}
                <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
                    {!isPlayerReady && (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                            <p className="text-neutral-500 font-medium text-xs tracking-widest uppercase italic">Initializing Stream...</p>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between pointer-events-auto">
                        <div className="flex items-center gap-6">
                            <button 
                                onClick={togglePlay}
                                className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-xl"
                            >
                                {isPlaying ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black ml-1" />}
                            </button>
                            <button 
                                onClick={restartVideo}
                                className="p-3 text-white/70 hover:text-white transition-colors"
                            >
                                <RotateCcw className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <a 
                                href={`https://youtube.com/watch?v=${youtubeId}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs font-bold text-white/40 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 hover:bg-white/5"
                            >
                                Watch on YouTube <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
