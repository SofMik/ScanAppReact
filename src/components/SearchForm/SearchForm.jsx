import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchFormButton from "../Button/SearchFormButton";
import "./SearchForm.css";

export default function SearchForm() {
  const navigate = useNavigate();

  const [companyInn, setCompanyInn] = useState("");
  const [innError, setInnError] = useState("");
  const [documentCount, setDocumentCount] = useState(0);
  const [documentCountError, setdocumentCountError] = useState("");
  const [searchTone, setSearchTone] = useState("any"); // По умолчанию "Любая"
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [selectedDescriptions, setSelectedDescriptions] = useState([]);
  const [isSearchFormValid, setIsSearchFormValid] = useState(false);


  useEffect(() => {
    const savedDescriptions =
      JSON.parse(localStorage.getItem("selectedDescriptions")) || [];
    setSelectedDescriptions(savedDescriptions); 
  }, []);

  
  useEffect(() => {
    localStorage.setItem(
      "selectedDescriptions",
      JSON.stringify(selectedDescriptions)
    );
  }, [selectedDescriptions]);

  
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedDescriptions((prev) =>
      checked
        ? [...prev, name.trim()]
        : prev.filter((desc) => desc !== name.trim())
    );
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      issueDateInterval: {
        startDate: startDate ? startDate + "T00:00:00+03:00" : null,
        endDate: endDate ? endDate + "T23:59:59+03:00" : null,
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            {
              type: "company",
              sparkId: null,
              entityId: null,
              inn: companyInn,
              maxFullness: selectedDescriptions.includes("maxFullness"),
              inBusinessNews: selectedDescriptions.includes("inBusinessNews")
                ? true
                : null,
            },
          ],
          onlyMainRole: selectedDescriptions.includes("onlyMainRole"),
          tonality: searchTone,
          onlyWithRiskFactors: selectedDescriptions.includes(
            "onlyWithRiskFactors"
          ),
          riskFactors: { and: [], or: [], not: [] },
        },
        themesFilter: { and: [], or: [], not: [] },
      },
      searchArea: {
        includedSources: [],
        excludedSources: [],
        includedSourceGroups: [],
        excludedSourceGroups: [],
      },
      attributeFilters: {
        excludeTechNews: selectedDescriptions.includes("excludeTechNews"),
        excludeAnnouncements: selectedDescriptions.includes(
          "excludeAnnouncements"
        ),
        excludeDigests: selectedDescriptions.includes("excludeDigests"),
      },
      similarMode: "duplicates",
      limit: Number(documentCount) || 1000,
      sortType: "sourceInfluence",
      sortDirectionType: "desc",
      intervalType: "month",
      histogramTypes: ["totalDocuments", "riskFactors"],
    };
    localStorage.setItem("searchParams", JSON.stringify(requestData));
    navigate("/results");
  };

  const validateInn = (inn) => {
    if (!/^\d{10}$/.test(inn)) return "Введите корректные данные";

    const checkDigit = (inn, coef) =>
      (coef.reduce(
        (sum, coef, index) => sum + coef * parseInt(inn[index], 10),
        0
      ) %
        11) %
      10;

    return checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]) ===
      parseInt(inn[9], 10)
      ? ""
      : "Введите корректные данные";
  };

  const validateDocumentCount = (value) => {
    if (!value) {
      setdocumentCountError("Обязательное поле");
    } else if (isNaN(value)) {
      setdocumentCountError("Введите только цифры!");
    } else if (value < 1 || value > 1000) {
      setdocumentCountError("Введите число от 1 до 1000");
    } else {
      setdocumentCountError("");
    }
  };

  const validateDates = (start, end) => {
    const today = new Date().toISOString().split("T")[0];
    if (start > today || end > today) {
      setDateError("Введите корректные данные");
    } else if (start && end && start > end) {
      setDateError("Введите корректные данные");
    } else {
      setDateError("");
    }
  };

  useEffect(() => {
    const formValid =
      companyInn.length === 10 &&
      documentCount !== null &&
      documentCount > 0 &&
      startDate.length > 0 &&
      endDate.length > 0 &&
      !innError &&
      !documentCountError &&
      !dateError;

    setIsSearchFormValid(formValid);
  }, [
    companyInn,
    documentCount,
    startDate,
    endDate,
    innError,
    documentCountError,
    dateError,
  ]);

  return (
    <>
      <form className="search-form">
        <div className="main-group">
          <label htmlFor="companyInn" className="search-form-label">
            ИНН компании
            <span className={innError ? "error_sign" : ""}> *</span>
          </label>
          <div className="search-form-group">
            <input
              className={innError ? "error-input" : "search-form-input"}
              name="companyInn"
              type="number"
              id="companyInn"
              placeholder="10 цифр"
              value={companyInn}
              onChange={(e) => {
                setCompanyInn(e.target.value);
                setInnError("");
              }}
              onBlur={() => setInnError(validateInn(companyInn))}
            />
            {innError && <div className="error-text">{innError}</div>}
          </div>

          <label htmlFor="documentCount" className="search-form-label">
            Тональность
          </label>
          <div className="search-form-group">
            <select
              className="search-form-input"
              id="searchTone"
              name="searchTone"
              value={searchTone}
              onChange={(e) => setSearchTone(e.target.value)}
            >
              <option value="any">Любая</option>
              <option value="positive">Позитивная</option>
              <option value="negative">Негативная</option>
            </select>
          </div>

          <label htmlFor="documentCount" className="search-form-label">
            Количество документов в выдаче
            <span className={documentCountError ? "error_sign" : ""}> *</span>
          </label>
          <div className="search-form-group">
            <input
              className={
                documentCountError ? "error-input" : "search-form-input"
              }
              name="documentCount"
              type="number"
              id="documentCount"
              placeholder="От 1 до 1000"
              value={documentCount === 0 ? "" : documentCount}
              onChange={(e) => {
                setDocumentCount(e.target.value);
                validateDocumentCount(e.target.value);
              }}
            />
            {documentCountError && (
              <div className="error-text">{documentCountError}</div>
            )}
          </div>
          <label htmlFor="documentCount" className="search-form-label">
            Диапазон поиска
            <span className={dateError ? "error_sign" : ""}> *</span>
          </label>
          <div className="search-form-group">
            <div className="search-form-group-date">
              <input
                className={
                  dateError ? "error-input-date" : "search-form-input-date"
                }
                type="text"
                id="startDate"
                name="startDate"
                placeholder="Дата начала"
                value={startDate}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  validateDates(e.target.value, endDate);
                }}
              />

              <input
                className={
                  dateError ? "error-input-date" : "search-form-input-date"
                }
                type="text"
                id="endDate"
                name="endDate"
                placeholder="Дата конца"
                value={endDate}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  validateDates(startDate, e.target.value);
                }}
              />
              {dateError && <div className="error-text">{dateError}</div>}
            </div>
          </div>
        </div>

        <div className="right_group">
          <div className="list_section">
            <div className="list">
              <input
                className="checkbox"
                type="checkbox"
                name="maxFullness"
                id="maxFullness"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="maxFullness" className="checkbox-label">
                Признак максимальной полноты
              </label>
            </div>
            <div className="list">
              <input
                className="checkbox"
                type="checkbox"
                name="inBusinessNews"
                id="inBusinessNews"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="inBusinessNews" className="checkbox-label">
                Упоминания в бизнес-контексте
              </label>
            </div>
            <div className="list">
              <input
                className="checkbox"
                type="checkbox"
                name="onlyMainRole"
                id="onlyMainRole"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="onlyMainRole" className="checkbox-label">
                Главная роль в публикации
              </label>
            </div>

            <div className="list">
              <input
                className="checkbox"
                type="checkbox"
                name="onlyWithRiskFactors"
                id="onlyWithRiskFactors"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="onlyWithRiskFactors" className="checkbox-label">
                Публикации только с риск-факторами
              </label>
            </div>
            <div className="list">
              <input
                className="checkbox"
                type="checkbox"
                name="excludeTechNews"
                id="excludeTechNews"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="excludeTechNews" className="checkbox-label">
                Включать технические новости рынков
              </label>
            </div>
            <div className="list">
              <input
                className="checkbox"
                type="checkbox"
                name="excludeAnnouncements"
                id="excludeAnnouncements"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="excludeAnnouncements" className="checkbox-label">
                Включать анонсы и календари
              </label>
            </div>
            <div className="list">
              <input
                className="checkbox"
                type="checkbox"
                name="excludeDigests"
                id="excludeDigests"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="excludeDigests" className="checkbox-label">
                Включать сводки новостей
              </label>
            </div>
          </div>
          <SearchFormButton
            isSearchFormValid={isSearchFormValid}
            handleSubmit={handleSubmit}
          />

          <p className="search-form-label">* Обязательные к заполнению поля</p>
        </div>
      </form>
    </>
  );
}

