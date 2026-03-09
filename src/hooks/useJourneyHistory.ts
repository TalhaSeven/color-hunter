"use client";

import { useState, useCallback } from "react";

export interface JourneyRecord {
    id: string;
    mood: string;
    moodEmoji: string;
    moodName: string;
    esmaName: string;
    esmaArabic: string;
    esmaNumber: number;
    color: string;
    date: string; // ISO string
}

const STORAGE_KEY = "color_hunter_journeys";
const MAX_RECORDS = 10;

function loadRecords(): JourneyRecord[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as JourneyRecord[]) : [];
    } catch {
        return [];
    }
}

function saveRecords(records: JourneyRecord[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch {
        /* quota exceeded or private mode */
    }
}

export function useJourneyHistory() {
    const [journeys, setJourneys] = useState<JourneyRecord[]>(() => loadRecords());

    const saveJourney = useCallback((record: Omit<JourneyRecord, "id" | "date">) => {
        const newRecord: JourneyRecord = {
            ...record,
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            date: new Date().toISOString(),
        };
        setJourneys((prev) => {
            const updated = [newRecord, ...prev].slice(0, MAX_RECORDS);
            saveRecords(updated);
            return updated;
        });
    }, []);

    const clearHistory = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setJourneys([]);
    }, []);

    return { journeys, saveJourney, clearHistory };
}
