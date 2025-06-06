import React from "react";
import "./DocumentCards.css";
import DOMPurify from "dompurify";
import noFoto from "../../assets/Images/resultsImage/noFoto.png";

export default function DocumentCard({ doc }) {
  if (!doc) return <p>Документ не найден</p>;

  const publicationType = doc.attributes?.isTechNews
    ? "Технические новости"
    : doc.attributes?.isAnnouncement
    ? "Анонс / календарь событий"
    : doc.attributes?.isDigest
    ? "Дайджест новостей"
    : "Обычная публикация";

  const rawContent = doc.content?.markup || "";

  const sanitizeAndExtractText = (html) => {
    const purified = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
    const parser = new DOMParser();
    const doc = parser.parseFromString(purified, "text/html");
    return doc.body.textContent
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const cleanText = sanitizeAndExtractText(rawContent);

  return (
    <div className="document-card">
      <div className="document-card-header">
        <p className="document-card-date">
          {doc.issueDate
            ? new Date(doc.issueDate).toLocaleDateString("ru-RU")
            : "Дата не указана"}
        </p>
        <a
          className="document-card-source"
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {doc.source?.name || "Источник неизвестен"}
        </a>
      </div>
      <a
        className="document-card-title"
        href={doc.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {doc.title?.text || "Без заголовка"}
      </a>

      <p className="document-card-teg">{publicationType}</p>
      <div className="document-card-image">
        {doc.image || (
          <img className="nofoto-image" src={noFoto} alt="Нет фото" />
        )}
      </div>

      <p className="document-card-text">{cleanText}</p>
      <div className="document-card-footer">
        <div className="document-card-button">
          <a
            className="document-card-link"
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Читать в источнике
          </a>
        </div>
        <p className="document-card-wordcount">
          Cлов: {doc.attributes?.wordCount || "Не указано"}
        </p>
      </div>
    </div>
  );
}

