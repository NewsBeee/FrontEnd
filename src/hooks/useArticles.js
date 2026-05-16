import { useCallback, useState, useRef } from "react";
import { getArticles } from "../api/articleApi";

export function useArticles() {
    const [list, setList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const pageRef = useRef(0);
    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);

    const size = 16;

    const reset = useCallback(() => {
        setList([]);
        setHasMore(true);
        hasMoreRef.current = true;
        pageRef.current = 0;
        loadingRef.current = false;
    }, []);

    const loadMore = useCallback(async () => {
        if (loadingRef.current || !hasMoreRef.current) return;

        loadingRef.current = true;
        setLoading(true);

        try {
            const newList = await getArticles(pageRef.current, size);

            console.log("현재 page:", pageRef.current);
            console.log("받아온 데이터:", newList);

            if (!newList || newList.length === 0) {
                setHasMore(false);
                hasMoreRef.current = false;
                return;
            }

            setList(prev => [...prev, ...newList]);

            if (newList.length < size) {
                setHasMore(false);
                hasMoreRef.current = false;
            } else {
                pageRef.current += 1;
            }

        } catch (e) {
            console.error(e);
            setHasMore(false);
            hasMoreRef.current = false;
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, []);

    return { list, loadMore, hasMore, loading, reset };
}