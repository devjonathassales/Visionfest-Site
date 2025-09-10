import React from "react";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-gray-600 grid md:grid-cols-2 items-center">
        <div>
          © <span id="y" /> VisionWare • Visionfest
        </div>
        <div className="md:text-right">CNPJ • Contato • Redes</div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.getElementById('y').textContent = new Date().getFullYear();`,
        }}
      />
    </footer>
  );
}
