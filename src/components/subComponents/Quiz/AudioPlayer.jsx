import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';


const AudioPlayer = ({
    src,
    muted = false,
    title = 'untitled',
    barWidth = 2,  // Reduced bar width
    barGap = 0.5,  // Reduced gap between bars
    bufferPercentage = 75,
    handleDeleteAudio,
    handleSendAudioButton
}) => {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.4);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const audioCtxRef = useRef(null);
    const gainNodeRef = useRef(null);
    const analyserNodeRef = useRef(null);
    const trackRef = useRef(null);
    const dataArrayRef = useRef(null);
    const bufferLengthRef = useRef(null);

    useEffect(() => {
        initializeAudio();
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const canvasCtx = canvas.getContext('2d');
            const scale = window.devicePixelRatio || 1;
            canvas.width = canvas.clientWidth * scale;
            canvas.height = canvas.clientHeight * scale;
            canvasCtx.scale(scale, scale);
            updateBars(); // Draw bars when canvas is ready
        }
    }, [currentTime, playing]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('loadedmetadata', () => {
                setCurrentTime(audioRef.current.currentTime);
                updateBars(); // Draw bars when metadata is loaded
            });
        }
    }, [src]);

    const initializeAudio = () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            gainNodeRef.current = audioCtxRef.current.createGain();
            analyserNodeRef.current = audioCtxRef.current.createAnalyser();
            trackRef.current = audioCtxRef.current.createMediaElementSource(audioRef.current);

            analyserNodeRef.current.fftSize = 2048;
            bufferLengthRef.current = analyserNodeRef.current.frequencyBinCount;
            dataArrayRef.current = new Uint8Array(bufferLengthRef.current);

            trackRef.current
                .connect(gainNodeRef.current)
                .connect(analyserNodeRef.current)
                .connect(audioCtxRef.current.destination);

            changeVolume(volume);
        }
    };

    const updateBars = () => {
        if (!canvasRef.current || !analyserNodeRef.current) return;

        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');

        if (!canvasCtx) return; // Safeguard in case getContext fails

        analyserNodeRef.current.getByteFrequencyData(dataArrayRef.current);

        const barCount = Math.floor(canvas.width / (barWidth + barGap));
        const bufferSize = (bufferLengthRef.current * bufferPercentage) / 100;

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < barCount; i++) {
            const index = Math.floor((i * bufferSize) / barCount);
            const frequency = dataArrayRef.current[index];
            const barHeight = (frequency * canvas.height) / 255;
            const x = i * (barWidth + barGap);

            canvasCtx.fillStyle = `rgba(255, 105, 180, 0.7)`; // Pink color
            canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        }

        if (audioRef.current && audioRef.current.duration > 0) {
            const duration = audioRef.current.duration;
            const percent = (currentTime / duration) * 100;
            const lineX = (canvas.width * percent) / 100;

            canvasCtx.strokeStyle = '#ff0000'; // Red line for playback position
            canvasCtx.lineWidth = 1; // Reduced line width
            canvasCtx.beginPath();
            canvasCtx.moveTo(lineX, 0);
            canvasCtx.lineTo(lineX, canvas.height);
            canvasCtx.stroke();
        }
    };

    const togglePlay = async () => {
        if (audioCtxRef.current.state === 'suspended') {
            await audioCtxRef.current.resume();
        }

        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setPlaying(!playing);
    };

    const changeVolume = (newVolume) => {
        setVolume(newVolume);
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.value = newVolume;
        }
    };

    return (
        <div className="audio-player">
            {/* <div className="audio-name">{src ? title : 'No Audio Source Provided'}</div> */}
            <audio
                ref={audioRef}
                src={src}
                muted={muted}
                onLoadedMetadata={() => {
                    setCurrentTime(audioRef.current.currentTime); // Set initial time
                    updateBars(); // Draw bars when metadata is loaded
                }}
                onError={() => {
                    // handle error
                }}
                onTimeUpdate={() => {
                    setCurrentTime(audioRef.current.currentTime);
                }}
                onPlay={() => {
                    setPlaying(true);
                }}
                onPause={() => {
                    setPlaying(false);
                }}
            />
            {
                src !== null ?
                    <React.Fragment>

                        <button className={`play-btn ${playing ? 'playing' : ''}`} onClick={togglePlay}>
                            {playing ? <FaPause /> : <FaPlay />}
                        </button>
                        <canvas ref={canvasRef} style={{ width: '100%', height: '60px', backgroundColor: '#fff' }} /> {/* Smaller canvas height */}
                        <div className="d-flex align-items-center justify-content-around w-100">
                            <div>
                                <button className='btn btn-secondary rounded-3 p-2' title='cancel recording' onClick={handleDeleteAudio} >Cancel</button>
                            </div>
                            <div>
                                <button className=' brand-Back-color rounded-3 p-2' title='send recording' onClick={handleSendAudioButton}>Continue</button>
                            </div>

                        </div>
                    </React.Fragment>
                    :
                    null
            }
        </div>
    );
};

export default AudioPlayer;
