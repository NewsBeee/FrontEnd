import { useEffect, useState, useCallback, useRef } from "react";
import { getVoca } from "../api/wordApi";

export function useWord() {
    const [list, setList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const pageRef = useRef(0);
    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);

    const size = 20;

    const loadMore = useCallback(async () => {
        if (loadingRef.current || !hasMoreRef.current) return;

        loadingRef.current = true;

        setLoading(true);

        try {
            const newList = await getVoca(pageRef.current, size);

            console.log("현재 page:", pageRef.current);
            console.log("받아온 데이터:", newList);

            setList(prev => {
                const merged = [...prev, ...newList];

                return merged.filter(
                    (item, index, self) =>
                        index === self.findIndex(v => v.vocaId === item.vocaId)
                )
            
            });

            if (newList.length < size) {
                setHasMore(false);
                hasMoreRef.current = false;
            } else {
                pageRef.current += 1;
            }

        } catch (e) {
            console.error(e);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadMore();
    }, [loadMore]);

    return {
        list,
        setList,
        loadMore,
        hasMore,
        loading
    }
}