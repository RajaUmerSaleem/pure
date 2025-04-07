"use client";
import { useState } from "react";
import {QRCode} from "react-qr-code";
import Image from 'next/image';

export default function Admin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [qrCodes, setQrCodes] = useState([]);

  const handleGenerate = () => {
    const products = JSON.parse(localStorage.getItem("products")) || {};
    let newQRCodes = [];

    for (let i = 0; i < quantity; i++) {
      const qrId = `${name}-${Date.now()}-${i}`;
      products[qrId] = { name, description, image };
      newQRCodes.push(qrId);
    }

    localStorage.setItem("products", JSON.stringify(products));
    setQrCodes(newQRCodes);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-700">Admin Portal</h1>

      {/* Input Fields */}
        <input className="border p-2 m-2" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border p-2 m-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        
        
        {/* Image Selection Grid */}
          <div className=" flex justify-center items-center gap-4 p-4  w-full md:w-1/2 lg:w-1/3 overflow-scroll  overflow-y-hidden">
            {[
              '/halfliter.jpg',
              '/onehalf.jpg',
            // Add more image paths as needed
            ].map((img, index) => (
            <div 
              key={index} 
              className={`cursor-pointer border-2 p-2 min-w-[128px] flex-shrink-0 ${image === img ? 'border-blue-500' : 'border-gray-200'}`}
              onClick={() => setImage(img)}
            >
              <Image 
              src={img} 
              alt={`Option ${index + 1}`}
              width={128}
              height={128}
              className="w-32 h-32 object-cover"
              />
            </div>
            ))}
          </div>

          <input type="number" className="border p-2 m-2" value={quantity || ''} onChange={(e) => setQuantity(e.target.value ? parseInt(e.target.value) : 1)} />
          <button className="bg-green-500 text-white p-2 rounded" onClick={handleGenerate}>Generate QR Codes</button>
          {/* QR Code Display */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {qrCodes.map((code, index) => (
          <div key={index} className="bg-white p-4 border rounded">
            <QRCode value={code} size={100} />
            <p className="text-xs mt-2">{code}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
