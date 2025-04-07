"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function Home() {
  const [manualCode, setManualCode] = useState("");
  const router = useRouter();

  const handleScanSuccess = (decodedText) => {
    router.push(`/product/${decodedText}`); // Navigate to the product page with the scanned QR code
  };

  const handleScanError = (error) => {
    console.error("QR Code scan error:", error); 
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10, // Frames per second
      qrbox: { width: 250, height: 250 }, 
    });

    scanner.render(handleScanSuccess, handleScanError);

    return () => {
      scanner.clear(); // Cleanup the scanner when the component unmounts
    };
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (manualCode) router.push(`/product/${manualCode}`); // Navigate to the product page with the manually entered QR code
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">PureVerify &reg;</h1>

      {/* QR Code Scanner */}
      <div id="qr-reader" className="w-80 h-80 border mb-4 "></div>

      {/* Manual Input */}
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-1">
        <input
          type="text"
          placeholder="Enter QR Code"
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button type="submit" className="m-2 bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}