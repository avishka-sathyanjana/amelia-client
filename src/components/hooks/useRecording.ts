import { useState, useRef, useEffect } from 'react';
import RecordRTC from 'recordrtc';

const useRecording = () => {
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);
  const webcamRef = useRef<any>(null);

  const startRecording = () => {
    if (webcamRef.current) {
      const stream = webcamRef.current.video.srcObject;
      const recorder = new RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/mp4', // Record in MP4 format
        timeSlice: 1000, // Optional: Save chunks every second
        recorderType: RecordRTC.MediaStreamRecorder,
      });
      recorder.startRecording();
      setRecorder(recorder);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        saveRecording(blob);
        setRecorder(null);
      });
    }
  };

  const saveRecording = (blob: Blob) => {
    const url = window.location.pathname; // e.g., /tasks/happy/test1
    const fileName = `task_${url.split('/').join('_')}_${new Date().toISOString()}.mp4`;
    const file = new File([blob], fileName, { type: 'video/mp4' });

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    webcamRef,
    startRecording,
    stopRecording,
  };
};

export default useRecording;