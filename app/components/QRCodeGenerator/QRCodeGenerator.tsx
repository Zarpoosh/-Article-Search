"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeGeneratorProps {
  articleLink: string;
  articleTitle: string;
}

export default function QRCodeGenerator({
  articleLink,
  articleTitle,
}: QRCodeGeneratorProps) {
  const [showQR, setShowQR] = useState(true); // تغییر: پیش‌فرض نمایش QR Code

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `qrcode-${articleTitle.replace(/\s+/g, "-")}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="text-center rounded-xl shadow-lg p- mt-6">
      <h2 className="text-xl font-semibold  text-gray-900 dark:text-white">
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
        className="text-blue-500 hover:text-blue-600 underline break-all"
      >
        articleLink
      </a>
    </div>
  );
}
