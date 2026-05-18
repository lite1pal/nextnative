export interface IconSize {
  name: string;
  width: number;
  height: number;
  purpose: "icon" | "splash";
  platform: "ios" | "android" | "both";
}

export const ICON_SIZES: IconSize[] = [
  // iOS App Icons
  {
    name: "ios-icon-1024",
    width: 1024,
    height: 1024,
    purpose: "icon",
    platform: "ios",
  },
  {
    name: "ios-icon-512",
    width: 512,
    height: 512,
    purpose: "icon",
    platform: "ios",
  },
  {
    name: "ios-icon-256",
    width: 256,
    height: 256,
    purpose: "icon",
    platform: "ios",
  },
  {
    name: "ios-icon-180",
    width: 180,
    height: 180,
    purpose: "icon",
    platform: "ios",
  },
  {
    name: "ios-icon-152",
    width: 152,
    height: 152,
    purpose: "icon",
    platform: "ios",
  },
  {
    name: "ios-icon-144",
    width: 144,
    height: 144,
    purpose: "icon",
    platform: "ios",
  },
  {
    name: "ios-icon-128",
    width: 128,
    height: 128,
    purpose: "icon",
    platform: "ios",
  },
  {
    name: "ios-icon-120",
    width: 120,
    height: 120,
    purpose: "icon",
    platform: "ios",
  },
  {
    name: "ios-icon-114",
    width: 114,
    height: 114,
    purpose: "icon",
    platform: "ios",
  },
  {
    name: "ios-icon-76",
    width: 76,
    height: 76,
    purpose: "icon",
    platform: "ios",
  },
  {
    name: "ios-icon-72",
    width: 72,
    height: 72,
    purpose: "icon",
    platform: "ios",
  },
  {
    name: "ios-icon-64",
    width: 64,
    height: 64,
    purpose: "icon",
    platform: "ios",
  },
  {
    name: "ios-icon-60",
    width: 60,
    height: 60,
    purpose: "icon",
    platform: "ios",
  },
  {
    name: "ios-icon-57",
    width: 57,
    height: 57,
    purpose: "icon",
    platform: "ios",
  },
  {
    name: "ios-icon-40",
    width: 40,
    height: 40,
    purpose: "icon",
    platform: "ios",
  },
  {
    name: "ios-icon-29",
    width: 29,
    height: 29,
    purpose: "icon",
    platform: "ios",
  },
  {
    name: "ios-icon-20",
    width: 20,
    height: 20,
    purpose: "icon",
    platform: "ios",
  },

  // Android App Icons
  {
    name: "android-icon-512",
    width: 512,
    height: 512,
    purpose: "icon",
    platform: "android",
  },
  {
    name: "android-icon-192",
    width: 192,
    height: 192,
    purpose: "icon",
    platform: "android",
  },
  {
    name: "android-icon-144",
    width: 144,
    height: 144,
    purpose: "icon",
    platform: "android",
  },
  {
    name: "android-icon-96",
    width: 96,
    height: 96,
    purpose: "icon",
    platform: "android",
  },
  {
    name: "android-icon-72",
    width: 72,
    height: 72,
    purpose: "icon",
    platform: "android",
  },
  {
    name: "android-icon-48",
    width: 48,
    height: 48,
    purpose: "icon",
    platform: "android",
  },
  {
    name: "android-icon-36",
    width: 36,
    height: 36,
    purpose: "icon",
    platform: "android",
  },

  // iOS Splash Screens
  {
    name: "ios-splash-2732x2732",
    width: 2732,
    height: 2732,
    purpose: "splash",
    platform: "ios",
  },
  {
    name: "ios-splash-2688x1242",
    width: 2688,
    height: 1242,
    purpose: "splash",
    platform: "ios",
  },
  {
    name: "ios-splash-2208x1242",
    width: 2208,
    height: 1242,
    purpose: "splash",
    platform: "ios",
  },
  {
    name: "ios-splash-1536x2048",
    width: 1536,
    height: 2048,
    purpose: "splash",
    platform: "ios",
  },
  {
    name: "ios-splash-1242x2688",
    width: 1242,
    height: 2688,
    purpose: "splash",
    platform: "ios",
  },
  {
    name: "ios-splash-1242x2208",
    width: 1242,
    height: 2208,
    purpose: "splash",
    platform: "ios",
  },
  {
    name: "ios-splash-1125x2436",
    width: 1125,
    height: 2436,
    purpose: "splash",
    platform: "ios",
  },
  {
    name: "ios-splash-1024x1366",
    width: 1024,
    height: 1366,
    purpose: "splash",
    platform: "ios",
  },
  {
    name: "ios-splash-828x1792",
    width: 828,
    height: 1792,
    purpose: "splash",
    platform: "ios",
  },
  {
    name: "ios-splash-750x1334",
    width: 750,
    height: 1334,
    purpose: "splash",
    platform: "ios",
  },
  {
    name: "ios-splash-640x1136",
    width: 640,
    height: 1136,
    purpose: "splash",
    platform: "ios",
  },

  // Android Splash Screens
  {
    name: "android-splash-1920x1920",
    width: 1920,
    height: 1920,
    purpose: "splash",
    platform: "android",
  },
  {
    name: "android-splash-1440x2560",
    width: 1440,
    height: 2560,
    purpose: "splash",
    platform: "android",
  },
  {
    name: "android-splash-1080x1920",
    width: 1080,
    height: 1920,
    purpose: "splash",
    platform: "android",
  },
  {
    name: "android-splash-720x1280",
    width: 720,
    height: 1280,
    purpose: "splash",
    platform: "android",
  },
  {
    name: "android-splash-480x800",
    width: 480,
    height: 800,
    purpose: "splash",
    platform: "android",
  },
];

export interface GenerationOptions {
  appName: string;
  backgroundColor: string;
  roundedCorners: boolean;
  cornerRadius?: number;
}

export interface GeneratedAsset {
  name: string;
  blob: Blob;
  size: IconSize;
}

export class IconGenerator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement("canvas");
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas 2D context not supported");
    }
    this.ctx = ctx;
  }

  async generateIcon(
    sourceImage: HTMLImageElement,
    size: IconSize,
    options: GenerationOptions,
  ): Promise<GeneratedAsset> {
    this.canvas.width = size.width;
    this.canvas.height = size.height;

    // Clear canvas
    this.ctx.clearRect(0, 0, size.width, size.height);

    if (size.purpose === "icon") {
      return this.generateAppIcon(sourceImage, size, options);
    } else {
      return this.generateSplashScreen(sourceImage, size, options);
    }
  }

  private async generateAppIcon(
    sourceImage: HTMLImageElement,
    size: IconSize,
    options: GenerationOptions,
  ): Promise<GeneratedAsset> {
    const { width, height } = size;

    // Apply rounded corners if enabled
    if (options.roundedCorners) {
      const radius = options.cornerRadius || Math.min(width, height) * 0.2;
      this.drawRoundedRect(0, 0, width, height, radius);
      this.ctx.clip();
    }

    // Calculate scaling to fit image within canvas while maintaining aspect ratio
    const scale = Math.min(
      width / sourceImage.width,
      height / sourceImage.height,
    );
    const scaledWidth = sourceImage.width * scale;
    const scaledHeight = sourceImage.height * scale;

    // Center the image
    const x = (width - scaledWidth) / 2;
    const y = (height - scaledHeight) / 2;

    this.ctx.drawImage(sourceImage, x, y, scaledWidth, scaledHeight);

    const blob = await this.canvasToBlob();
    return {
      name: `${size.name}.png`,
      blob,
      size,
    };
  }

  private async generateSplashScreen(
    sourceImage: HTMLImageElement,
    size: IconSize,
    options: GenerationOptions,
  ): Promise<GeneratedAsset> {
    const { width, height } = size;

    // Fill background color
    this.ctx.fillStyle = options.backgroundColor;
    this.ctx.fillRect(0, 0, width, height);

    // Calculate icon size (about 1/3 of screen height)
    const iconSize = Math.min(width, height) * 0.33;
    const scale = Math.min(
      iconSize / sourceImage.width,
      iconSize / sourceImage.height,
    );
    const scaledWidth = sourceImage.width * scale;
    const scaledHeight = sourceImage.height * scale;

    // Center the icon
    const x = (width - scaledWidth) / 2;
    const y = (height - scaledHeight) / 2;

    // Draw icon with optional rounded corners
    if (options.roundedCorners) {
      this.ctx.save();
      const radius = Math.min(scaledWidth, scaledHeight) * 0.2;
      this.drawRoundedRect(x, y, scaledWidth, scaledHeight, radius);
      this.ctx.clip();
      this.ctx.drawImage(sourceImage, x, y, scaledWidth, scaledHeight);
      this.ctx.restore();
    } else {
      this.ctx.drawImage(sourceImage, x, y, scaledWidth, scaledHeight);
    }

    // Add app name text if provided
    if (options.appName) {
      this.ctx.fillStyle = this.getContrastColor(options.backgroundColor);
      this.ctx.font = `${Math.floor(height * 0.03)}px system-ui, -apple-system, sans-serif`;
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        options.appName,
        width / 2,
        y + scaledHeight + height * 0.08,
      );
    }

    const blob = await this.canvasToBlob();
    return {
      name: `${size.name}.png`,
      blob,
      size,
    };
  }

  private drawRoundedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
  ) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height,
    );
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
  }

  private getContrastColor(backgroundColor: string): string {
    // Convert hex to RGB
    const hex = backgroundColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "#000000" : "#ffffff";
  }

  private async canvasToBlob(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      this.canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to create blob from canvas"));
          }
        },
        "image/png",
        1.0,
      );
    });
  }

  async generateAll(
    sourceImage: HTMLImageElement,
    options: GenerationOptions,
    onProgress?: (current: number, total: number) => void,
  ): Promise<GeneratedAsset[]> {
    const assets: GeneratedAsset[] = [];

    for (let i = 0; i < ICON_SIZES.length; i++) {
      const size = ICON_SIZES[i];
      onProgress?.(i + 1, ICON_SIZES.length);

      try {
        const asset = await this.generateIcon(sourceImage, size, options);
        assets.push(asset);
      } catch (error) {
        console.error(`Failed to generate ${size.name}:`, error);
      }
    }

    return assets;
  }
}
