/**
 * Web Audio Procedural Sound Synthesizer
 * Generates hypersonic sonic booms, atmospheric whooshes, and impact rumbles
 * purely using Web Audio API nodes with zero external audio assets.
 */

export class CosmicAudioEngine {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx && typeof window !== "undefined") {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
    }

    playSonicBoom() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.8);

        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.2);
    }

    playImpactRumble() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.linearRampToValueAtTime(20, now + 2.5);

        gain.gain.setValueAtTime(0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 2.5);
    }
}
