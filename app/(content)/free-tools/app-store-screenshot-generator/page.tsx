"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import HighlightedSpan from "@/components/HighlightedSpan";

type Preset = {
  id: string;
  label: string;
  w: number;
  h: number;
  store: "ios" | "ipad" | "play" | "custom";
  orientation: "portrait" | "landscape";
};

// Updated presets based on 2025 App Store and Google Play requirements
// Resolutions selected as the highest for each common display size
// Sources: Apple Developer documentation and Google Play Console Help
const PRESETS: Preset[] = [
  {
    id: "ios-69",
    label: "iOS 6.9″ (1320×2868 portrait)",
    w: 1320,
    h: 2868,
    store: "ios",
    orientation: "portrait",
  },
  {
    id: "ios-65",
    label: "iOS 6.5″ (1284×2778 portrait)",
    w: 1284,
    h: 2778,
    store: "ios",
    orientation: "portrait",
  },
  {
    id: "ios-55",
    label: "iOS 5.5″ (1242×2208 portrait)",
    w: 1242,
    h: 2208,
    store: "ios",
    orientation: "portrait",
  },
  {
    id: "ipad-13",
    label: "iPad 13″ (2064×2752 portrait)",
    w: 2064,
    h: 2752,
    store: "ipad",
    orientation: "portrait",
  },
  {
    id: "play-phone",
    label: "Google Play Phone (1080×1920 portrait)",
    w: 1080,
    h: 1920,
    store: "play",
    orientation: "portrait",
  },
  {
    id: "play-tablet",
    label: "Google Play Tablet (1920×1200 landscape)",
    w: 1920,
    h: 1200,
    store: "play",
    orientation: "landscape",
  },
  {
    id: "custom",
    label: "Custom",
    w: 1320,
    h: 2868,
    store: "custom",
    orientation: "portrait",
  },
];

type ColorTheme = {
  id: string;
  name: string;
  bg1: string;
  bg2: string;
  textColor: string;
  bgMode: "solid" | "gradient";
  gradientDirection?: "diagonal" | "vertical" | "horizontal";
};

const COLOR_THEMES: ColorTheme[] = [
  {
    id: "teal-green",
    name: "Teal & Green",
    bg1: "#0ea5a3",
    bg2: "#16a34a",
    textColor: "#ffffff",
    bgMode: "gradient",
    gradientDirection: "diagonal",
  },
  {
    id: "purple-pink",
    name: "Purple & Pink",
    bg1: "#9333ea",
    bg2: "#ec4899",
    textColor: "#ffffff",
    bgMode: "gradient",
    gradientDirection: "diagonal",
  },
  {
    id: "blue-cyan",
    name: "Blue & Cyan",
    bg1: "#0284c7",
    bg2: "#06b6d4",
    textColor: "#ffffff",
    bgMode: "gradient",
    gradientDirection: "diagonal",
  },
  {
    id: "orange-red",
    name: "Orange & Red",
    bg1: "#f97316",
    bg2: "#ef4444",
    textColor: "#ffffff",
    bgMode: "gradient",
    gradientDirection: "diagonal",
  },
  {
    id: "dark",
    name: "Dark",
    bg1: "#1f2937",
    bg2: "#111827",
    textColor: "#ffffff",
    bgMode: "gradient",
    gradientDirection: "vertical",
  },
  {
    id: "light",
    name: "Light",
    bg1: "#f9fafb",
    bg2: "#e5e7eb",
    textColor: "#111827",
    bgMode: "gradient",
    gradientDirection: "vertical",
  },
  {
    id: "black",
    name: "Pure Black",
    bg1: "#000000",
    bg2: "#000000",
    textColor: "#ffffff",
    bgMode: "solid",
  },
  {
    id: "white",
    name: "Pure White",
    bg1: "#ffffff",
    bg2: "#ffffff",
    textColor: "#000000",
    bgMode: "solid",
  },
  {
    id: "indigo-purple",
    name: "Indigo & Purple",
    bg1: "#6366f1",
    bg2: "#a855f7",
    textColor: "#ffffff",
    bgMode: "gradient",
    gradientDirection: "diagonal",
  },
  {
    id: "emerald-teal",
    name: "Emerald & Teal",
    bg1: "#10b981",
    bg2: "#14b8a6",
    textColor: "#ffffff",
    bgMode: "gradient",
    gradientDirection: "diagonal",
  },
];

type Uploaded = { id: string; src: string; name: string };

export default function AppStoreScreenshotGenerator() {
  const [uploads, setUploads] = useState<Uploaded[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<Preset>(PRESETS[0]);
  const [customW, setCustomW] = useState(1320);
  const [customH, setCustomH] = useState(2868);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait",
  );

  const [title, setTitle] = useState("Ship faster with NextNative");
  const [subtitle, setSubtitle] = useState(
    "Turn your website into an iOS & Android app",
  );

  const [padding, setPadding] = useState(80); // inner padding around content
  const [bgMode, setBgMode] = useState<"solid" | "gradient" | "image">("solid");
  const [bg1, setBg1] = useState("#0ea5a3"); // teal-ish
  const [bg2, setBg2] = useState("#16a34a"); // green
  const [bgImage, setBgImage] = useState<Uploaded | null>(null);
  const [gradientDirection, setGradientDirection] = useState<
    "diagonal" | "vertical" | "horizontal"
  >("diagonal");
  const [textColor, setTextColor] = useState("#ffffff");
  const [imageScale, setImageScale] = useState(100); // %
  const [cornerRadius, setCornerRadius] = useState(48);
  const [textYOffset, setTextYOffset] = useState(0); // adjustable text block position
  const [previewIndex, setPreviewIndex] = useState(0); // which upload to preview

  // Enhanced text controls
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "left",
  );
  const [textVAlign, setTextVAlign] = useState<"top" | "middle" | "bottom">(
    "top",
  );
  const [titleFontSize, setTitleFontSize] = useState(62); // base: 62 per 1000px width
  const [subtitleFontSize, setSubtitleFontSize] = useState(35);
  const [titleWeight, setTitleWeight] = useState<"700" | "800" | "900">("700");
  const [subtitleWeight, setSubtitleWeight] = useState<"400" | "500" | "600">(
    "500",
  );

  // Text effects
  const [textShadow, setTextShadow] = useState(false);
  const [textStroke, setTextStroke] = useState(false);
  const [textStrokeColor, setTextStrokeColor] = useState("#000000");

  // Device frame
  const [deviceFrame, setDeviceFrame] = useState<
    "none" | "iphone" | "ipad" | "android"
  >("none");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  // Active size, considering orientation
  const size = useMemo(() => {
    let w =
      selectedPreset.id !== "custom"
        ? selectedPreset.w
        : Math.max(500, Math.floor(customW));
    let h =
      selectedPreset.id !== "custom"
        ? selectedPreset.h
        : Math.max(900, Math.floor(customH));
    if (orientation === "landscape") {
      [w, h] = [h, w];
    }
    return { w, h };
  }, [selectedPreset, customW, customH, orientation]);

  const onUpload = (files: FileList | null) => {
    if (!files?.length) return;
    Array.from(files).forEach((f) => {
      const reader = new FileReader();
      reader.onload = () => {
        setUploads((u) => [
          ...u,
          { id: crypto.randomUUID(), src: String(reader.result), name: f.name },
        ]);
      };
      reader.readAsDataURL(f);
    });
  };

  const onBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setBgImage({
        id: crypto.randomUUID(),
        src: String(reader.result),
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
    e.currentTarget.value = "";
  };

  const removeUpload = (id: string) =>
    setUploads((u) => u.filter((x) => x.id !== id));

  const applyTheme = (theme: ColorTheme) => {
    setBgMode(theme.bgMode);
    setBg1(theme.bg1);
    setBg2(theme.bg2);
    setTextColor(theme.textColor);
    if (theme.gradientDirection) {
      setGradientDirection(theme.gradientDirection);
    }
  };

  const saveConfig = () => {
    const config = {
      title,
      subtitle,
      padding,
      bgMode,
      bg1,
      bg2,
      gradientDirection,
      textColor,
      imageScale,
      cornerRadius,
      textYOffset,
      textAlign,
      textVAlign,
      titleFontSize,
      subtitleFontSize,
      titleWeight,
      subtitleWeight,
      textShadow,
      textStroke,
      textStrokeColor,
      deviceFrame,
    };
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "screenshot-config.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const config = JSON.parse(String(reader.result));
        if (config.title !== undefined) setTitle(config.title);
        if (config.subtitle !== undefined) setSubtitle(config.subtitle);
        if (config.padding !== undefined) setPadding(config.padding);
        if (config.bgMode !== undefined) setBgMode(config.bgMode);
        if (config.bg1 !== undefined) setBg1(config.bg1);
        if (config.bg2 !== undefined) setBg2(config.bg2);
        if (config.gradientDirection !== undefined)
          setGradientDirection(config.gradientDirection);
        if (config.textColor !== undefined) setTextColor(config.textColor);
        if (config.imageScale !== undefined) setImageScale(config.imageScale);
        if (config.cornerRadius !== undefined)
          setCornerRadius(config.cornerRadius);
        if (config.textYOffset !== undefined)
          setTextYOffset(config.textYOffset);
        if (config.textAlign !== undefined) setTextAlign(config.textAlign);
        if (config.textVAlign !== undefined) setTextVAlign(config.textVAlign);
        if (config.titleFontSize !== undefined)
          setTitleFontSize(config.titleFontSize);
        if (config.subtitleFontSize !== undefined)
          setSubtitleFontSize(config.subtitleFontSize);
        if (config.titleWeight !== undefined)
          setTitleWeight(config.titleWeight);
        if (config.subtitleWeight !== undefined)
          setSubtitleWeight(config.subtitleWeight);
        if (config.textShadow !== undefined) setTextShadow(config.textShadow);
        if (config.textStroke !== undefined) setTextStroke(config.textStroke);
        if (config.textStrokeColor !== undefined)
          setTextStrokeColor(config.textStrokeColor);
        if (config.deviceFrame !== undefined)
          setDeviceFrame(config.deviceFrame);
      } catch (err) {
        alert("Failed to load configuration file");
      }
    };
    reader.readAsText(file);
    e.currentTarget.value = "";
  };

  const downloadAllPresets = () => {
    const presetsToExport = PRESETS.filter((p) => p.id !== "custom");
    uploads.forEach((u, uIdx) => {
      presetsToExport.forEach((p, pIdx) => {
        setTimeout(
          () => downloadOne(u, p),
          (uIdx * presetsToExport.length + pIdx) * 500,
        );
      });
    });
  };

  const resetToDefaults = () => {
    if (!confirm("Reset all settings to default values?")) return;
    setTitle("Ship faster with NextNative");
    setSubtitle("Turn your website into an iOS & Android app");
    setPadding(80);
    setBgMode("solid");
    setBg1("#0ea5a3");
    setBg2("#16a34a");
    setGradientDirection("diagonal");
    setTextColor("#ffffff");
    setImageScale(100);
    setCornerRadius(48);
    setTextYOffset(0);
    setTextAlign("left");
    setTextVAlign("top");
    setTitleFontSize(62);
    setSubtitleFontSize(35);
    setTitleWeight("700");
    setSubtitleWeight("500");
    setTextShadow(false);
    setTextStroke(false);
    setTextStrokeColor("#000000");
    setDeviceFrame("none");
    setBgImage(null);
  };

  const draw = async (imgSrc?: string, targetSize = size) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const { w, h } = targetSize;

    canvas.width = w;
    canvas.height = h;

    // background
    if (bgMode === "solid") {
      ctx.fillStyle = bg1;
      ctx.fillRect(0, 0, w, h);
    } else if (bgMode === "gradient") {
      let g;
      if (gradientDirection === "vertical") {
        g = ctx.createLinearGradient(0, 0, 0, h);
      } else if (gradientDirection === "horizontal") {
        g = ctx.createLinearGradient(0, 0, w, 0);
      } else {
        g = ctx.createLinearGradient(0, 0, w, h);
      }
      g.addColorStop(0, bg1);
      g.addColorStop(1, bg2);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    } else if (bgMode === "image" && bgImage) {
      const bgImg = await loadImage(bgImage.src);
      // cover fill
      const ratio = Math.max(w / bgImg.width, h / bgImg.height);
      const drawW = Math.floor(bgImg.width * ratio);
      const drawH = Math.floor(bgImg.height * ratio);
      const x = Math.floor((w - drawW) / 2);
      const y = Math.floor((h - drawH) / 2);
      ctx.drawImage(bgImg, x, y, drawW, drawH);
    }

    // rounded rect mask
    if (cornerRadius > 0) {
      ctx.save();
      roundedRectPath(ctx, 0, 0, w, h, cornerRadius);
      ctx.clip();
    }

    const innerW = w - padding * 2;
    const innerHTop = Math.floor(h * 0.33) + textYOffset; // adjustable text block
    const innerHBottom = h - padding * 2 - innerHTop;

    // Title/Sub with enhanced controls
    ctx.fillStyle = textColor;
    ctx.textAlign = textAlign;

    // Calculate text x position based on alignment
    let textX = padding;
    if (textAlign === "center") textX = w / 2;
    if (textAlign === "right") textX = w - padding;

    // Calculate vertical position
    let textY = padding;
    if (textVAlign === "middle") {
      textY = (h - 200) / 2; // rough estimate, will adjust
    } else if (textVAlign === "bottom") {
      textY = h - padding - 200;
    }
    textY += textYOffset;

    ctx.textBaseline = "top";

    // Apply text effects
    if (textShadow) {
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = Math.max(8, Math.floor(w * 0.012));
      ctx.shadowOffsetY = Math.max(4, Math.floor(h * 0.006));
    }

    // Title
    const titleSize = Math.round((w / 1000) * titleFontSize);
    ctx.font = `${titleWeight} ${titleSize}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;

    if (textStroke) {
      ctx.strokeStyle = textStrokeColor;
      ctx.lineWidth = Math.max(2, Math.floor(w * 0.003));
    }

    const titleLines = wrapTextEnhanced(
      ctx,
      title,
      textX,
      textY,
      innerW,
      Math.round(titleSize * 1.2),
      textAlign,
      textStroke,
    );

    // Subtitle below title
    const subtitleSize = Math.round((w / 1000) * subtitleFontSize);
    ctx.font = `${subtitleWeight} ${subtitleSize}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
    wrapTextEnhanced(
      ctx,
      subtitle,
      textX,
      textY + titleLines * Math.round(titleSize * 1.2),
      innerW,
      Math.round(subtitleSize * 1.4),
      textAlign,
      textStroke,
    );

    // Reset shadow
    if (textShadow) {
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
    }

    // Main image (contain)
    if (imgSrc) {
      const img = await loadImage(imgSrc);
      const scale = (imageScale || 100) / 100;

      const maxW = innerW;
      const maxH = innerHBottom;

      const ratio = Math.min(maxW / img.width, maxH / img.height) * scale;
      const drawW = Math.floor(img.width * ratio);
      const drawH = Math.floor(img.height * ratio);

      const x = Math.floor((w - drawW) / 2);
      const y = Math.floor(h - padding - drawH);

      // subtle drop shadow
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.25)";
      ctx.shadowBlur = Math.max(6, Math.floor(w * 0.01));
      ctx.shadowOffsetY = Math.max(3, Math.floor(h * 0.004));
      ctx.drawImage(img, x, y, drawW, drawH);
      ctx.restore();
    }

    if (cornerRadius > 0) {
      ctx.restore();
    }
  };

  // live preview
  useEffect(() => {
    draw(uploads[previewIndex]?.src);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    uploads,
    previewIndex,
    size.w,
    size.h,
    orientation,
    padding,
    bgMode,
    bg1,
    bg2,
    bgImage,
    gradientDirection,
    textColor,
    title,
    subtitle,
    imageScale,
    cornerRadius,
    textYOffset,
    textAlign,
    textVAlign,
    titleFontSize,
    subtitleFontSize,
    titleWeight,
    subtitleWeight,
    textShadow,
    textStroke,
    textStrokeColor,
    deviceFrame,
  ]);

  const downloadOne = async (img: Uploaded, p: Preset | null = null) => {
    let targetPreset = p;
    if (targetPreset && targetPreset.id === "custom") targetPreset = null;
    let targetSize = targetPreset
      ? { w: targetPreset.w, h: targetPreset.h }
      : size;
    let targetOrientation = targetPreset
      ? targetPreset.orientation
      : orientation;
    if (targetOrientation === "landscape") {
      targetSize = { w: targetSize.h, h: targetSize.w };
    }
    const canvas = canvasRef.current!;
    const prev = { w: canvas.width, h: canvas.height };
    await draw(img.src, targetSize);
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    const label = targetPreset
      ? targetPreset.label.replace(/[^\dx×]+/g, "").replace(/×/g, "x")
      : `${targetSize.w}x${targetSize.h}`;
    const base = img.name.replace(/\.[^.]+$/, "");
    a.download = `${base}-${label}.png`;
    a.click();
    // restore
    canvas.width = prev.w;
    canvas.height = prev.h;
    draw(uploads[previewIndex]?.src);
  };

  const downloadAllForPreset = (p: Preset | null = null) => {
    uploads.forEach((u, i) => {
      setTimeout(() => downloadOne(u, p), i * 500); // stagger to avoid browser limits
    });
  };

  // Drag and drop setup
  useEffect(() => {
    const dropArea = dropRef.current;
    if (!dropArea) return;

    const prevent = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      prevent(e);
      const files = e.dataTransfer?.files;
      onUpload(files || null);
    };

    dropArea.addEventListener("dragenter", prevent);
    dropArea.addEventListener("dragover", prevent);
    dropArea.addEventListener("dragleave", prevent);
    dropArea.addEventListener("drop", handleDrop);

    return () => {
      dropArea.removeEventListener("dragenter", prevent);
      dropArea.removeEventListener("dragover", prevent);
      dropArea.removeEventListener("dragleave", prevent);
      dropArea.removeEventListener("drop", handleDrop);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + S to save config
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        saveConfig();
      }
      // Cmd/Ctrl + D to download all current size
      if ((e.metaKey || e.ctrlKey) && e.key === "d") {
        e.preventDefault();
        if (uploads.length) downloadAllForPreset();
      }
      // Arrow keys to navigate images
      if (e.key === "ArrowLeft" && previewIndex > 0) {
        setPreviewIndex(previewIndex - 1);
      }
      if (e.key === "ArrowRight" && previewIndex < uploads.length - 1) {
        setPreviewIndex(previewIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [uploads.length, previewIndex, saveConfig, downloadAllForPreset]);

  return (
    <div className="mx-auto w-full max-w-[962px] py-12 xl:max-w-[1260px]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            App Store Screenshot <HighlightedSpan>Generator</HighlightedSpan> 📸
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600">
            Create beautiful App Store and Google Play screenshots with device
            frames, text overlays, and custom backgrounds.
          </p>

          {/* Social proof / usage stats */}
          <div className="mx-auto flex flex-wrap items-center justify-center gap-6 text-base text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                📸
              </span>
              <span>
                <strong className="text-gray-900">Device</strong> frames
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                🎨
              </span>
              <span>
                <strong className="text-gray-900">Custom</strong> backgrounds
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-3xl" aria-hidden="true">
                ⚡
              </span>
              <span>
                <strong className="text-gray-900">Export all</strong> sizes
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Controls */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left: upload + list */}
            <section
              ref={dropRef}
              className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-5 shadow-sm transition-colors hover:border-green-500"
            >
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                1) 📤 Upload Screenshots
              </h3>
              <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => onUpload(e.target.files)}
                    className="hidden"
                  />
                  <div className="mb-2 text-4xl">📸</div>
                  <div className="font-medium text-gray-700">
                    Click to upload or drag & drop
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    PNG, JPG, WebP (Multiple files supported)
                  </div>
                </label>
              </div>
              <ul className="space-y-2 text-sm">
                {uploads.map((u, i) => (
                  <li
                    key={u.id}
                    className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors ${i === previewIndex ? "bg-green-100 ring-2 ring-green-500" : "bg-gray-50 hover:bg-gray-100"}`}
                    onClick={() => setPreviewIndex(i)}
                  >
                    <span className="truncate font-medium">{u.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeUpload(u.id);
                        if (previewIndex >= uploads.length - 1)
                          setPreviewIndex(0);
                      }}
                      className="ml-2 text-xs text-red-500 hover:text-red-700 hover:underline"
                    >
                      ✕
                    </button>
                  </li>
                ))}
                {!uploads.length && (
                  <li className="py-8 text-center text-gray-400">
                    <div className="mb-2 text-4xl">🖼️</div>
                    <div className="text-sm">No files yet</div>
                  </li>
                )}
              </ul>

              {uploads.length > 0 && (
                <div className="mt-4 rounded-lg bg-blue-50 p-3">
                  <p className="text-xs text-blue-800">
                    <strong>⌨️ Shortcuts:</strong> Use ← → arrows to navigate
                    images
                  </p>
                </div>
              )}
            </section>

            {/* Middle: settings */}
            <section className="max-h-[800px] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                2) Settings
              </h3>

              {/* Color Themes */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">
                  🎨 Color Themes
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {COLOR_THEMES.slice(0, 6).map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => applyTheme(theme)}
                      className="rounded-lg border border-gray-300 bg-white p-2 text-xs font-medium transition-colors hover:border-green-500"
                      style={{
                        background:
                          theme.bgMode === "gradient"
                            ? `linear-gradient(to ${theme.gradientDirection === "vertical" ? "bottom" : theme.gradientDirection === "horizontal" ? "right" : "bottom right"}, ${theme.bg1}, ${theme.bg2})`
                            : theme.bg1,
                        color: theme.textColor,
                      }}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Presets */}
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  📱 Device Preset
                </label>
                <select
                  value={selectedPreset.id}
                  onChange={(e) => {
                    const p = PRESETS.find((x) => x.id === e.target.value)!;
                    setSelectedPreset(p);
                    setOrientation(p.orientation);
                  }}
                  className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900"
                >
                  {PRESETS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>

                {selectedPreset.id === "custom" && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      min={300}
                      value={customW}
                      onChange={(e) => setCustomW(+e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white p-2"
                      placeholder="Width"
                    />
                    <input
                      type="number"
                      min={600}
                      value={customH}
                      onChange={(e) => setCustomH(+e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white p-2"
                      placeholder="Height"
                    />
                  </div>
                )}
              </div>

              {/* Orientation */}
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  🔄 Orientation
                </label>
                <select
                  value={orientation}
                  onChange={(e) =>
                    setOrientation(e.target.value as "portrait" | "landscape")
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>

              {/* Text Content */}
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  📝 Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white p-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  📄 Subtitle
                </label>
                <input
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white p-2"
                />
              </div>

              {/* Text Alignment */}
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Text Align
                  </label>
                  <select
                    value={textAlign}
                    onChange={(e) => setTextAlign(e.target.value as any)}
                    className="w-full rounded-lg border border-gray-300 bg-white p-2"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Vertical Pos.
                  </label>
                  <select
                    value={textVAlign}
                    onChange={(e) => setTextVAlign(e.target.value as any)}
                    className="w-full rounded-lg border border-gray-300 bg-white p-2"
                  >
                    <option value="top">Top</option>
                    <option value="middle">Middle</option>
                    <option value="bottom">Bottom</option>
                  </select>
                </div>
              </div>

              {/* Font Controls */}
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Title Weight
                  </label>
                  <select
                    value={titleWeight}
                    onChange={(e) => setTitleWeight(e.target.value as any)}
                    className="w-full rounded-lg border border-gray-300 bg-white p-2"
                  >
                    <option value="700">Bold</option>
                    <option value="800">Extra Bold</option>
                    <option value="900">Black</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Subtitle Weight
                  </label>
                  <select
                    value={subtitleWeight}
                    onChange={(e) => setSubtitleWeight(e.target.value as any)}
                    className="w-full rounded-lg border border-gray-300 bg-white p-2"
                  >
                    <option value="400">Regular</option>
                    <option value="500">Medium</option>
                    <option value="600">Semibold</option>
                  </select>
                </div>
              </div>

              {/* Text Effects */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">
                  ✨ Text Effects
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={textShadow}
                      onChange={(e) => setTextShadow(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Drop Shadow</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={textStroke}
                      onChange={(e) => setTextStroke(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Text Outline</span>
                  </label>
                  {textStroke && (
                    <div className="ml-6">
                      <label className="mb-1 block text-xs">
                        Outline Color
                      </label>
                      <input
                        type="color"
                        value={textStrokeColor}
                        onChange={(e) => setTextStrokeColor(e.target.value)}
                        className="h-8 w-full cursor-pointer rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Background */}
              <div className="mb-3">
                <label className="mb-1 block text-sm font-medium">
                  🎨 Background
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setBgMode("solid")}
                    className={`rounded-lg border p-2 text-xs font-medium ${bgMode === "solid" ? "border-green-500 bg-green-50" : "border-gray-300"}`}
                  >
                    Solid
                  </button>
                  <button
                    onClick={() => setBgMode("gradient")}
                    className={`rounded-lg border p-2 text-xs font-medium ${bgMode === "gradient" ? "border-green-500 bg-green-50" : "border-gray-300"}`}
                  >
                    Gradient
                  </button>
                  <button
                    onClick={() => setBgMode("image")}
                    className={`rounded-lg border p-2 text-xs font-medium ${bgMode === "image" ? "border-green-500 bg-green-50" : "border-gray-300"}`}
                  >
                    Image
                  </button>
                </div>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Text color
                  </label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="h-10 w-full cursor-pointer rounded-lg border border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Color A
                  </label>
                  <input
                    type="color"
                    value={bg1}
                    onChange={(e) => setBg1(e.target.value)}
                    disabled={bgMode === "image"}
                    className="h-10 w-full cursor-pointer rounded-lg border border-gray-300 bg-white disabled:opacity-40"
                  />
                </div>
                <div className="col-span-2">
                  <label className="mb-1 block text-sm font-medium">
                    {bgMode === "gradient" ? "Color B" : "—"}
                  </label>
                  <input
                    type="color"
                    value={bg2}
                    onChange={(e) => setBg2(e.target.value)}
                    disabled={bgMode !== "gradient"}
                    className="h-10 w-full cursor-pointer rounded-lg border border-gray-300 bg-white disabled:opacity-40"
                  />
                </div>
              </div>

              {bgMode === "gradient" && (
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium">
                    Gradient Direction
                  </label>
                  <select
                    value={gradientDirection}
                    onChange={(e) =>
                      setGradientDirection(e.target.value as any)
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white p-2"
                  >
                    <option value="diagonal">Diagonal</option>
                    <option value="vertical">Vertical</option>
                    <option value="horizontal">Horizontal</option>
                  </select>
                </div>
              )}

              {bgMode === "image" && (
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium">
                    Upload Background Image
                  </label>
                  <input type="file" accept="image/*" onChange={onBgUpload} />
                  {bgImage && (
                    <div className="mt-2 flex items-center">
                      <span className="truncate text-sm text-gray-500">
                        {bgImage.name}
                      </span>
                      <button
                        onClick={() => setBgImage(null)}
                        className="ml-2 text-xs text-red-500 hover:underline"
                      >
                        remove
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Sliders */}
              <div className="space-y-3">
                <Range
                  label="📏 Padding"
                  value={padding}
                  setValue={setPadding}
                  min={40}
                  max={160}
                />
                <Range
                  label="🔍 Image scale %"
                  value={imageScale}
                  setValue={setImageScale}
                  min={60}
                  max={140}
                />
                <Range
                  label="⬜ Corner radius"
                  value={cornerRadius}
                  setValue={setCornerRadius}
                  min={0}
                  max={100}
                />
                <Range
                  label="↕️ Text Y offset"
                  value={textYOffset}
                  setValue={setTextYOffset}
                  min={-200}
                  max={200}
                />
                <Range
                  label="📏 Title size"
                  value={titleFontSize}
                  setValue={setTitleFontSize}
                  min={30}
                  max={100}
                />
                <Range
                  label="📏 Subtitle size"
                  value={subtitleFontSize}
                  setValue={setSubtitleFontSize}
                  min={20}
                  max={60}
                />
              </div>

              {/* Save/Load Config */}
              <div className="mt-4 border-t border-gray-200 pt-4">
                <label className="mb-2 block text-sm font-medium">
                  💾 Configuration
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={saveConfig}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium hover:bg-gray-50"
                  >
                    💾 Save
                  </button>
                  <label className="cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-xs font-medium hover:bg-gray-50">
                    📂 Load
                    <input
                      type="file"
                      accept=".json"
                      onChange={loadConfig}
                      className="hidden"
                    />
                  </label>
                </div>
                <button
                  onClick={resetToDefaults}
                  className="mt-2 w-full rounded-lg border border-red-300 bg-white px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                >
                  🔄 Reset to Defaults
                </button>
              </div>
            </section>

            {/* Right: preview & export */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  3) 🎨 Preview & Export
                </h3>
                {uploads.length > 0 && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    {previewIndex + 1} / {uploads.length}
                  </span>
                )}
              </div>

              {/* Image Navigation */}
              {uploads.length > 1 && (
                <div className="mb-3 flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      setPreviewIndex(Math.max(0, previewIndex - 1))
                    }
                    disabled={previewIndex === 0}
                    className="rounded-lg border border-gray-300 px-3 py-1 text-sm font-medium hover:bg-gray-50 disabled:opacity-30"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() =>
                      setPreviewIndex(
                        Math.min(uploads.length - 1, previewIndex + 1),
                      )
                    }
                    disabled={previewIndex === uploads.length - 1}
                    className="rounded-lg border border-gray-300 px-3 py-1 text-sm font-medium hover:bg-gray-50 disabled:opacity-30"
                  >
                    Next →
                  </button>
                </div>
              )}

              <canvas
                ref={canvasRef}
                className="mx-auto block w-full max-w-sm rounded-xl border border-gray-200 bg-white shadow-lg transition-all"
              />

              {!uploads.length && (
                <div className="mt-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                  <div className="mb-3 text-5xl">🎬</div>
                  <p className="font-medium text-gray-700">
                    Upload images to get started
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Your preview will appear here
                  </p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-4 space-y-2">
                <button
                  disabled={!uploads.length}
                  onClick={() => downloadAllForPreset()}
                  className="w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                >
                  ⬇️ Download All ({size.w}×{size.h})
                </button>

                <button
                  disabled={!uploads.length}
                  onClick={downloadAllPresets}
                  className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 font-semibold text-white transition-colors hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                >
                  🚀 Export All Presets (Bulk)
                </button>
              </div>

              {/* Individual Preset Exports */}
              <div className="mt-4">
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Quick Export by Preset:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    disabled={!uploads.length}
                    onClick={() => downloadAllForPreset(PRESETS[0])}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium transition-colors hover:bg-gray-50 disabled:opacity-50"
                  >
                    iOS 6.9″
                  </button>
                  <button
                    disabled={!uploads.length}
                    onClick={() => downloadAllForPreset(PRESETS[1])}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium transition-colors hover:bg-gray-50 disabled:opacity-50"
                  >
                    iOS 6.5″
                  </button>
                  <button
                    disabled={!uploads.length}
                    onClick={() => downloadAllForPreset(PRESETS[3])}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium transition-colors hover:bg-gray-50 disabled:opacity-50"
                  >
                    iPad 13″
                  </button>
                  <button
                    disabled={!uploads.length}
                    onClick={() => downloadAllForPreset(PRESETS[4])}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium transition-colors hover:bg-gray-50 disabled:opacity-50"
                  >
                    Play Phone
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-blue-50 p-3">
                <p className="text-xs text-blue-800">
                  <strong>💡 Pro Tip:</strong> "Export All Presets" generates
                  screenshots for all devices at once. Downloads are staggered
                  to avoid browser limits. Perfect for App Store & Google Play
                  submissions!
                </p>
              </div>
            </section>
          </div>

          {/* Keyboard Shortcuts Help */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              ⌨️ Keyboard Shortcuts
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <kbd className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 font-mono text-sm shadow-sm">
                  ⌘/Ctrl + S
                </kbd>
                <span className="text-sm text-gray-600">
                  Save configuration
                </span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 font-mono text-sm shadow-sm">
                  ⌘/Ctrl + D
                </kbd>
                <span className="text-sm text-gray-600">Download all</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 font-mono text-sm shadow-sm">
                  ← →
                </kbd>
                <span className="text-sm text-gray-600">Navigate images</span>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 font-semibold text-gray-900">
              🛠️ Related Free Tools
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                • Check{" "}
                <a
                  href="/free-tools/app-store-screenshot-sizes"
                  className="font-semibold text-green-600 underline"
                >
                  Required Screenshot Sizes
                </a>{" "}
                for all devices
              </li>
              <li>
                • Generate metadata with our{" "}
                <a
                  href="/free-tools/app-store-metadata-generator"
                  className="font-semibold text-green-600 underline"
                >
                  App Store Metadata Generator
                </a>
              </li>
              <li>
                • Research keywords with{" "}
                <a
                  href="/free-tools/app-store-keyword-research"
                  className="font-semibold text-green-600 underline"
                >
                  ASO Keyword Tool
                </a>
              </li>
            </ul>
          </div>

          <p className="mt-10 text-center text-gray-500">
            Built with ❤️ by{" "}
            <a
              href="https://nextnative.dev"
              className="font-semibold text-green-600 underline hover:text-green-700"
            >
              NextNative.dev
            </a>{" "}
            team.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- small UI helpers ---------- */
function Range({
  label,
  value,
  setValue,
  min,
  max,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  min: number;
  max: number;
}) {
  return (
    <label className="flex flex-col">
      <span className="mb-1 text-sm font-medium">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(+e.target.value)}
        className="accent-green-600"
      />
      <span className="mt-1 text-xs text-gray-500">{value}</span>
    </label>
  );
}

function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const words = text.split(/\s+/);
  let line = "";
  let yy = y;
  let lines = 0;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const { width } = ctx.measureText(testLine);
    if (width > maxWidth && n > 0) {
      ctx.fillText(line.trimEnd(), x, yy);
      line = words[n] + " ";
      yy += lineHeight;
      lines++;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trimEnd(), x, yy);
  return lines + 1; // return line count for positioning
}

function wrapTextEnhanced(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  align: "left" | "center" | "right",
  stroke: boolean,
): number {
  const words = text.split(/\s+/);
  let line = "";
  let yy = y;
  let lines = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const { width } = ctx.measureText(testLine);
    if (width > maxWidth && n > 0) {
      const finalLine = line.trimEnd();
      if (stroke) ctx.strokeText(finalLine, x, yy);
      ctx.fillText(finalLine, x, yy);
      line = words[n] + " ";
      yy += lineHeight;
      lines++;
    } else {
      line = testLine;
    }
  }
  const finalLine = line.trimEnd();
  if (stroke) ctx.strokeText(finalLine, x, yy);
  ctx.fillText(finalLine, x, yy);
  return lines + 1;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
