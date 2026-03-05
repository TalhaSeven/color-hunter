"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const PREF_KEY = "color_hunter_sound_enabled";

function createRainNode(ctx: AudioContext): { start: () => void; stop: () => void } {
    // Pink noise buffer
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.5);

    // Low-pass filter for rain effect
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2000;

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    return {
        start: () => source.start(),
        stop: () => {
            gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
            setTimeout(() => {
                try { source.stop(); } catch { /* already stopped */ }
            }, 1100);
        },
    };
}

function createCalmToneNode(ctx: AudioContext): { start: () => void; stop: () => void } {
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2);

    const frequencies = [110, 165, 220, 330]; // harmonic series — ney-like
    const oscillators = frequencies.map((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;

        const oscGain = ctx.createGain();
        oscGain.gain.value = 1 / (i + 1); // diminishing harmonics

        osc.connect(oscGain);
        oscGain.connect(gainNode);
        return osc;
    });

    gainNode.connect(ctx.destination);

    return {
        start: () => oscillators.forEach((o) => o.start()),
        stop: () => {
            gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
            setTimeout(() => oscillators.forEach((o) => { try { o.stop(); } catch { /* ok */ } }), 1600);
        },
    };
}

export type SoundMode = "rain" | "tone" | "off";

export function useAmbientSound(mode: SoundMode = "rain") {
    const ctxRef = useRef<AudioContext | null>(null);
    const nodeRef = useRef<{ start: () => void; stop: () => void } | null>(null);
    const [enabled, setEnabled] = useState(false);

    // Load stored preference
    useEffect(() => {
        const stored = localStorage.getItem(PREF_KEY);
        if (stored === "true") setEnabled(true);
    }, []);

    const stop = useCallback(() => {
        nodeRef.current?.stop();
        nodeRef.current = null;
    }, []);

    const start = useCallback(() => {
        try {
            if (!ctxRef.current) {
                ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            }
            const ctx = ctxRef.current;
            if (ctx.state === "suspended") ctx.resume();

            stop();

            const node = mode === "rain"
                ? createRainNode(ctx)
                : createCalmToneNode(ctx);
            nodeRef.current = node;
            node.start();
        } catch {
            /* AudioContext not available */
        }
    }, [mode, stop]);

    const toggle = useCallback(() => {
        const next = !enabled;
        setEnabled(next);
        localStorage.setItem(PREF_KEY, String(next));
        if (next) {
            start();
        } else {
            stop();
        }
    }, [enabled, start, stop]);

    // Clean up on unmount
    useEffect(() => {
        return () => { stop(); };
    }, [stop]);

    return { enabled, toggle };
}
