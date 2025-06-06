import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import LoadMoreButton from "../../components/Button/LoadMoreButton";
import resultsImage from "../../assets/Images/resultsImage/resultsImage.png";
import ResultsPageSlider from "../../components/ResultsSlider/ResultsPageSlider";
import ResultsLoader from "../../components/ResultsLoader/ResultsLoader";
import DocumentCards from "../../components/DocumentCards/DocumentCards";
import "./ResultsPage.css";
import "../global.css";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isDocsLoading, setIsDocsLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [documentIds, setDocumentIds] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const hasFetchedInitialDocs = useRef(false);

  const authData = useMemo(
    () => JSON.parse(localStorage.getItem("auth")) || {},
    []
  );
  const accessToken = authData.accessToken || "";
  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${accessToken}`,
    }),
    [accessToken]
  );

  // ✅ Функция для запроса ID документов (useCallback)
  const fetchDocumentIds = useCallback(
    async (searchParams) => {
      try {
        const response = await axios.post(
          "https://gateway.scan-interfax.ru/api/v1/objectsearch",
          searchParams,
          { headers }
        );

        const ids = response.data.items.map((item) => item.encodedId);
        setDocumentIds(ids);
        setStartIndex(10);
      } catch (err) {
        console.error(
          "Ошибка загрузки ID документов:",
          err.response?.data || err.message
        );
      }
    },
    [headers]
  );

  // ✅ Функция для загрузки документов по ID (useCallback)
  const fetchDocuments = useCallback(
    async (ids) => {
      try {
        const response = await axios.post(
          "https://gateway.scan-interfax.ru/api/v1/documents",
          { ids },
          { headers }
        );
        const newDocs = response.data.map((doc) => doc.ok);
        setDocuments((prevDocs) => [...prevDocs, ...newDocs]);
      } catch (err) {
        console.error(
          "Ошибка загрузки документов:",
          err.response?.data || err.message
        );
      }
    },
    [headers]
  );

  // ✅ Получение результатов (useEffect)
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const searchParams =
          JSON.parse(localStorage.getItem("searchParams")) || {};
        if (!searchParams || !accessToken) {
          setIsDataLoading(false);
          return;
        }

        const response = await axios.post(
          "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms",
          searchParams,
          { headers }
        );
        setResults(response.data.data || []);
        setTimeout(() => setIsDataLoading(false), 2000);
        fetchDocumentIds(searchParams);
      } catch (err) {
        console.error("Ошибка запроса:", err.response?.data || err.message);
      }
    };

    fetchResults();
  }, [accessToken, fetchDocumentIds, headers]);

  // ✅ Загружаем первые 10 документов только один раз (useEffect)
  useEffect(() => {
    if (
      accessToken &&
      documentIds.length > 0 &&
      documents.length === 0 &&
      !hasFetchedInitialDocs.current
    ) {
      setIsDocsLoading(true);
      fetchDocuments(documentIds.slice(0, 10)).then(() => {
        setIsDocsLoading(false);
        setTimeout(() => {
          setShowButton(true);
        }, 3000);
      });
      hasFetchedInitialDocs.current = true;
    }
  }, [accessToken, fetchDocuments, documentIds, documents.length]);

  // ✅ Функция загрузки дополнительных документов
  const loadMoreDocuments = async () => {
    const nextBatchIds = documentIds.slice(startIndex, startIndex + 10);
    if (nextBatchIds.length > 0) {
      fetchDocuments(nextBatchIds);
      setStartIndex((prevIndex) => prevIndex + 10);
    }
  };

  return (
    <>
      <Layout>
        <main className="page-main">
          <div className="results_content-first">
            <div className="text-box">
              <h3 className="page-h3 results_h3">
                Ищем. Скоро будут результаты
              </h3>
              <p className="page-p results_p">
                Поиск может занять некоторое время, просим сохранять терпение.
              </p>
            </div>
            <div className="results_img_box">
              <img className="results_img" src={resultsImage} alt="foto" />
            </div>
          </div>
          <div className="results_content-second">
            <h4 className="results_h4">Общая сводка</h4>
            <h5 className="results_h5">
              Найдено {documentIds.length} вариантов
            </h5>

            <div className="results-page-box">
              <div className="results-page-card-slider-title-box">
                <p className="results-page-card-slider-title">Период</p>
                <p className="results-page-card-slider-title">Всего</p>
                <p className="results-page-card-slider-title">Риски</p>
              </div>
              {isDataLoading && isDocsLoading ? (
                <ResultsLoader />
              ) : documentIds.length === 0 ? (
                <div className="no-results-message">Документы не найдены</div>
              ) : (
                <ResultsPageSlider results={results} />
              )}
            </div>
          </div>
          <div className="results_content-third">
            <h3 className="results_h4">Список документов</h3>
            {isDataLoading && isDocsLoading ? (
              <ResultsLoader />
            ) : (
              <DocumentCards documents={documents} />
            )}

            {showButton && startIndex < documentIds.length && (
              <LoadMoreButton onClick={loadMoreDocuments} />
            )}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default ResultsPage;
