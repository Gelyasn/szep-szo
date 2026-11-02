"""Сгенерировать MP3 по audio-manifest.json, используя локальную модель Piper.

Пример: python scripts/generate-audio.py /tmp/opencode/audio-manifest.json /tmp/opencode/hu_HU-anna-medium.onnx
Нужны pip install piper-tts и системный ffmpeg. Модель берётся с rhasspy/piper-voices.
"""

import json
import subprocess
import sys
import tempfile
import wave
from pathlib import Path

from piper.config import SynthesisConfig
from piper.voice import PiperVoice

manifest_path = Path(sys.argv[1])
model_path = Path(sys.argv[2])
root = Path(__file__).resolve().parents[1]
voice = PiperVoice.load(model_path)
manifest = json.loads(manifest_path.read_text(encoding="utf-8"))

for index, (text, file) in enumerate(manifest.items(), start=1):
    output = root / file
    output.parent.mkdir(parents=True, exist_ok=True)
    if output.exists() and output.stat().st_size > 0:
        continue
    with tempfile.TemporaryDirectory() as temporary:
        wav_path = Path(temporary) / "phrase.wav"
        with wave.open(str(wav_path), "wb") as wave_file:
            # Короткие слова произносим заметно медленнее длинных фраз.
            pace = 1.45 if len(text) <= 15 else 1.25
            voice.synthesize_wav(text.replace(" · ", ". "), wave_file, SynthesisConfig(length_scale=pace))
        subprocess.run(
            ["ffmpeg", "-v", "error", "-i", str(wav_path), "-af", "adelay=180:all=1,apad=pad_dur=0.18", "-codec:a", "libmp3lame", "-q:a", "5", "-y", str(output)],
            check=True,
        )
    if index % 20 == 0 or index == len(manifest):
        print(f"{index}/{len(manifest)}", flush=True)
