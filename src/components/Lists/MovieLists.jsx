import React, { useEffect, useState, useRef, useCallback } from "react";
import "./movie-list.css";
import Card from "../Card/Card";
import apiClient from "../../api/apiClient";
import { useParams } from "react-router-dom";

export default function MovieLists({ mediaType, category}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const inFlightRef = useRef(false); 
  const abortRef = useRef(null); 

  const fetchData = useCallback(async () => {
    if (inFlightRef.current) return; 
    inFlightRef.current = true;
    setLoading(true);

    abortRef.current?.abort?.();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      let res;
      if (mediaType === "movie") {
        res = await apiClient.getMoviesList(category, { params: { page }, signal: controller.signal });
      } else if (mediaType === "tv") {
        res = await apiClient.getTvList(category, { params: { page }, signal: controller.signal });
      } else {
        res = await apiClient.getTrending("all", "day", { params: { page }, signal: controller.signal });
      }

      const data = res.data.results.map((item) => ({
        ...item,
        media_type: item?.media_type || mediaType,
      }));

      setItems((prev) => (page === 1 ? data : [...prev, ...data])); 
      setHasMore(data.length > 0);
    } catch (err) {
      if (err.name !== "CanceledError" && err.name !== "AbortError") {
        console.error("Error fetching list data:", err);
      }
    } finally {
      setLoading(false);
      inFlightRef.current = false;
    }
  }, [mediaType, category, page]);

  // Reset when category or mediaType changes
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [mediaType, category]);

  useEffect(() => {
    fetchData();
    return () => {
    };
  }, [fetchData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first.isIntersecting) return;
        if (!loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "300px 0px", 
        threshold: 0.1,
      }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <section className="list-page">
      <div className="container">
        <h2 className="list-title">
          {mediaType === "movie" ? "Movies" : mediaType === "tv" ? "TV Series" : "Trending"}
        </h2>

        <div className="list-grid">
          {items.map((item) => (
            <Card key={item.id + "-" + item.media_type} movie={item} />
          ))}
        </div>

        {loading && <p className="loading-text">Loading...</p>}

        <div ref={loaderRef} className="load-more-trigger" />

        {!hasMore && !loading && <p className="end-text">🎬 You’ve reached the end!</p>}
      </div>
    </section>
  );
}
