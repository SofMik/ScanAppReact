import React from "react";
import DocumentCard from "../DocumentCards/DocumentCard";
import "./DocumentCards.css";

export default function DocumentCards({ documents, isLoading, isDocsLoading }) {
  if (isLoading || isDocsLoading) {
    return (
      <div className="results-loader">
        <div className="results-loader-element"></div>
        <p className="results-loader-p">Загружаем документы...</p>
      </div>
    );
  }

  return (
    <div className="document-cards">
      {documents.map((doc, idx) => (
        <DocumentCard key={idx} doc={doc} />
      ))}
    </div>
  );
}
