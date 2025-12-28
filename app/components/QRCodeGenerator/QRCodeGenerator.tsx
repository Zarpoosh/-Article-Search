"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeGeneratorProps {
  articleLink: string;
  articleTitle: string;
}

export default function QRCodeGenerator({
  articleLink,
}: // articleTitle,
QRCodeGeneratorProps) {
  const [showQR, setShowQR] = useState(true); // تغییر: پیش‌فرض نمایش QR Code

  // const downloadQRCode = () => {
  //   const svg = document.getElementById("qr-code");
  //   if (svg) {
  //     const svgData = new XMLSerializer().serializeToString(svg);
  //     const blob = new Blob([svgData], { type: "image/svg+xml" });
  //     const url = URL.createObjectURL(blob);

  //     const downloadLink = document.createElement("a");
  //     downloadLink.href = url;
  //     downloadLink.download = `qrcode-${articleTitle.replace(/\s+/g, "-")}.svg`;
  //     document.body.appendChild(downloadLink);
  //     downloadLink.click();
  //     document.body.removeChild(downloadLink);
  //     URL.revokeObjectURL(url);
  //   }
  // };

  return (
    <div className="text-center rounded-xl shadow-lg p- mt-6">
      <h2 className="text-lg font-semibold  text-gray-900 dark:text-white">
        Article QR Code
      </h2>

      {showQR && (
        <div className="mt-6 text-center">
          <div className="inline-block  bg-white rounded-lg shadow-lg">
            <QRCodeSVG
              id="qr-code"
              value={articleLink}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>

          {/* <button
            onClick={downloadQRCode}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            دانلود QR Code (SVG)
          </button> */}
        </div>
      )}
      <a
        href={articleLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-fuchsia-500 flex items-center justify-center gap-2 hover:text-fuchsia-700 break-all"
      >
   
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
        articleLink
      </a>
    </div>
  );
}
