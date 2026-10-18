import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

// Camera se QR scan karta hai. Camera ke liye HTTPS (ya localhost) zaroori hai.
export default function QrScanner({ onCode, onError }) {
  const cb = useRef(onCode);
  cb.current = onCode;
  const last = useRef({ code: "", t: 0 });

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    let cancelled = false, started = false;
    scanner
      .start({ facingMode: "environment" }, { fps: 10, qrbox: 220 }, (text) => {
        const now = Date.now();
        if (text === last.current.code && now - last.current.t < 3000) return; // same QR dobara foran scan na ho
        last.current = { code: text, t: now };
        cb.current(text);
      }, () => {})
      .then(() => { started = true; if (cancelled) scanner.stop().catch(() => {}); })
      .catch(() => onError("Camera nahi khula. Camera permission allow karo (HTTPS ya localhost chahiye)."));
    return () => {
      cancelled = true;
      if (started) scanner.stop().then(() => scanner.clear()).catch(() => {});
    };
  }, []);

  return <div id="qr-reader" className="w-full max-w-sm mx-auto rounded-lg overflow-hidden" />;
}
