import { useCallback, useEffect, useState, useRef } from "react";
import { getArticles } from "../api/articleApi";

export function useArticles() {
    const [list, setList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const pageRef = useRef(0);
    const loadingRef = useRef(false);

    const size = 16;

    const reset = useCallback(() => {
        setList([]);
        setHasMore(true);
        pageRef.current = 0;
        loadingRef.current = false;
    }, []);

    const loadMore = useCallback(async () => {
        if (loadingRef.current || !hasMore) return;

        loadingRef.current = true;
        setLoading(true);

        try {
            const { list: newList, hasMore: nextHasMore } = 
                await getArticles(pageRef.current, size);

            console.log("현재 page:", pageRef.current);
            console.log("받아온 데이터:", newList);
            console.log("next:", nextHasMore);

            setList(prev => [...prev, ...newList]);

            if (nextHasMore) {
                pageRef.current += 1;
            } else {
                setHasMore(false);
            }

        } catch (e) {
            console.error(e);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, [hasMore]);

    return { list, loadMore, hasMore, loading, reset };
}