import { useEffect, useState } from "react";
import { getInfo, getStats } from "../api/mypageApi";

export function useStats() {
    const [info, setInfo] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                const infoData = await getInfo();
                const statsData = await getStats();

                setInfo(infoData);
                setStats(statsData);

            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    return { 
        name: info?.nickname ?? "",
        email: info?.email ?? "",
        level: stats?.level ?? 0,
        readCount: stats?.readArticleCount ?? 0,
        saveVoca: stats?.savedVocabularyCount ?? 0,
        understood: stats?.understoodVocabularyCount ?? 0,
        notUnderstood: stats?.notUnderstoodVocabularyCount ?? 0,
        loading,
        error
    }
}