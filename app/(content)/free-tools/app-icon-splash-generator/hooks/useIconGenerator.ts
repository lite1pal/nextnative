"use client";

import { useState, useCallback } from "react";
import {
  IconGenerator,
  ICON_SIZES,
} from "@/app/(content)/free-tools/app-icon-splash-generator/utils/icon-generator";
import { generateAndDownloadAssets } from "@/app/(content)/free-tools/app-icon-splash-generator/utils/zip-generator";

export interface UseIconGeneratorOptions {
  appName: string;
  backgroundColor: string;
  roundedCorners: boolean;
}

export interface GenerationProgress {
  current: number;
  total: number;
  percentage: number;
}

export function useIconGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress>({
    current: 0,
    total: 0,
    percentage: 0,
  });
  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({});

  const generatePreviews = useCallback(
    async (sourceImage: HTMLImageElement, options: UseIconGeneratorOptions) => {
      const generator = new IconGenerator();
      const previewSizes = [
        ICON_SIZES.find((s) => s.name === "ios-icon-1024"),
        ICON_SIZES.find((s) => s.name === "ios-icon-512"),
        ICON_SIZES.find((s) => s.name === "ios-icon-256"),
        ICON_SIZES.find((s) => s.name === "ios-icon-128"),
        ICON_SIZES.find((s) => s.name === "ios-splash-2732x2732"),
        ICON_SIZES.find((s) => s.name === "ios-splash-1242x2688"),
      ].filter(Boolean);

      const newPreviewUrls: { [key: string]: string } = {};

      for (const size of previewSizes) {
        if (size) {
          try {
            const asset = await generator.generateIcon(
              sourceImage,
              size,
              options,
            );
            const url = URL.createObjectURL(asset.blob);
            newPreviewUrls[size.name] = url;
          } catch (error) {
            console.error(
              `Failed to generate preview for ${size.name}:`,
              error,
            );
          }
        }
      }

      // Clean up old URLs
      setPreviewUrls((oldUrls) => {
        Object.values(oldUrls).forEach((url) => URL.revokeObjectURL(url));
        return newPreviewUrls;
      });
    },
    [], // Remove previewUrls from dependencies to prevent infinite loop
  );

  const generateAndDownload = useCallback(
    async (sourceImage: HTMLImageElement, options: UseIconGeneratorOptions) => {
      setIsGenerating(true);
      setProgress({ current: 0, total: ICON_SIZES.length, percentage: 0 });

      try {
        await generateAndDownloadAssets(
          sourceImage,
          {
            appName: options.appName,
            backgroundColor: options.backgroundColor,
            roundedCorners: options.roundedCorners,
            includeReadme: true,
          },
          (current, total) => {
            const percentage = Math.round((current / total) * 100);
            setProgress({ current, total, percentage });
          },
        );
      } catch (error) {
        console.error("Failed to generate assets:", error);
        throw error;
      } finally {
        setIsGenerating(false);
        setProgress({ current: 0, total: 0, percentage: 0 });
      }
    },
    [],
  );

  const cleanupPreviews = useCallback(() => {
    setPreviewUrls((oldUrls) => {
      Object.values(oldUrls).forEach((url) => URL.revokeObjectURL(url));
      return {};
    });
  }, []); // Remove previewUrls from dependencies to prevent infinite loop

  return {
    isGenerating,
    progress,
    previewUrls,
    generatePreviews,
    generateAndDownload,
    cleanupPreviews,
  };
}
