/**
 * Synthesizes relaxing ambient sounds and gentle feedback tones using Web Audio API.
 * 100% offline, zero external dependencies or broken URL risks.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private currentSource: AudioNode | null = null;
  private currentGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentMode: 'rain' | 'waves' | 'stream' | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft singing bowl / chime bell tone
  playChime(freq = 440) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      // Soft overtone
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 1.5, this.ctx.currentTime);

      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc2.start();
      osc.stop(this.ctx.currentTime + 2.6);
      osc2.stop(this.ctx.currentTime + 2.6);
    } catch {
      // Audio might be blocked by browser policy until user interacts
    }
  }

  // Continuous calming sounds: Rain, Waves, Stream
  startAmbient(type: 'rain' | 'waves' | 'stream', volume = 0.2) {
    try {
      this.stopAmbient();
      this.initContext();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Pink/Brown noise generator
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11; // scale down
        b6 = white * 0.115926;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter to shape into rain or waves
      const filter = this.ctx.createBiquadFilter();
      if (type === 'rain') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      } else if (type === 'waves') {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(450, this.ctx.currentTime);
        filter.Q.setValueAtTime(1.5, this.ctx.currentTime);
      } else {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      }

      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(volume, this.ctx.currentTime);

      // If waves, modulate gain with an LFO
      if (type === 'waves') {
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8 sec ocean wave cycle
        lfoGain.gain.setValueAtTime(volume * 0.6, this.ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(masterGain.gain);
        lfo.start();
      }

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      whiteNoise.start();
      this.currentSource = whiteNoise;
      this.currentGain = masterGain;
      this.isPlaying = true;
      this.currentMode = type;
    } catch {
      // Audio error
    }
  }

  stopAmbient() {
    if (this.currentSource) {
      try {
        (this.currentSource as AudioBufferSourceNode).stop();
        this.currentSource.disconnect();
      } catch {
        // already stopped
      }
      this.currentSource = null;
    }
    this.isPlaying = false;
    this.currentMode = null;
  }

  getPlayingMode(): 'rain' | 'waves' | 'stream' | null {
    return this.isPlaying ? this.currentMode : null;
  }
}

export const soundEngine = new SoundEngine();
