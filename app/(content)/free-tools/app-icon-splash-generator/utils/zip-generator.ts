import JSZip from "jszip";
import { GeneratedAsset } from "./icon-generator";

export interface ZipCreationOptions {
  includeReadme?: boolean;
  appName?: string;
}

export class ZipGenerator {
  private zip: JSZip;

  constructor() {
    this.zip = new JSZip();
  }

  addAssets(assets: GeneratedAsset[]): void {
    // Create folders for organization
    const iosIconsFolder = this.zip.folder("ios/icons");
    const iosSplashFolder = this.zip.folder("ios/splash");
    const androidIconsFolder = this.zip.folder("android/icons");
    const androidSplashFolder = this.zip.folder("android/splash");

    assets.forEach((asset) => {
      const { name, blob, size } = asset;

      if (size.platform === "ios") {
        if (size.purpose === "icon") {
          iosIconsFolder?.file(name, blob);
        } else {
          iosSplashFolder?.file(name, blob);
        }
      } else if (size.platform === "android") {
        if (size.purpose === "icon") {
          androidIconsFolder?.file(name, blob);
        } else {
          androidSplashFolder?.file(name, blob);
        }
      } else {
        // Both platforms
        if (size.purpose === "icon") {
          iosIconsFolder?.file(name, blob);
          androidIconsFolder?.file(name, blob);
        } else {
          iosSplashFolder?.file(name, blob);
          androidSplashFolder?.file(name, blob);
        }
      }
    });
  }

  addReadme(appName: string = "YourApp"): void {
    const readmeContent = `# ${appName} - Generated Icons and Splash Screens

This ZIP file contains all the required icon and splash screen assets for your mobile app.

## Folder Structure

### iOS Assets
- \`ios/icons/\` - App icons for iOS (various sizes for different devices and contexts)
- \`ios/splash/\` - Splash screens for iOS (various device sizes and orientations)

### Android Assets
- \`android/icons/\` - App icons for Android (various densities)
- \`android/splash/\` - Splash screens for Android (various screen sizes)

## Usage Instructions

### For iOS (Xcode)
1. Open your Xcode project
2. Navigate to your app target settings
3. Go to "App Icons and Launch Images"
4. Drag and drop the appropriate icon sizes from \`ios/icons/\` into the App Icon slots
5. For splash screens, add the images from \`ios/splash/\` to your project and configure them in your Launch Screen storyboard

### For Android (Android Studio)
1. Open your Android Studio project
2. Right-click on \`app/src/main/res\`
3. Select "New" > "Image Asset"
4. Choose "Launcher Icons (Adaptive and Legacy)" and import the icons from \`android/icons/\`
5. For splash screens, place the images from \`android/splash/\` in the appropriate drawable folders

### For Capacitor Projects
If you're using Capacitor (like NextNative), you can:
1. Place iOS icons in \`ios/App/App/Assets.xcassets/AppIcon.appiconset/\`
2. Place Android icons in \`android/app/src/main/res/drawable*/\`
3. Configure splash screens according to Capacitor's documentation

## File Naming Convention

### Icons
- iOS: \`ios-icon-{size}\` (e.g., ios-icon-1024.png)
- Android: \`android-icon-{size}\` (e.g., android-icon-512.png)

### Splash Screens
- iOS: \`ios-splash-{width}x{height}\` (e.g., ios-splash-2732x2732.png)
- Android: \`android-splash-{width}x{height}\` (e.g., android-splash-1920x1920.png)

## Generated with NextNative Tools
These assets were generated using the free app icon and splash screen generator:

- https://nextnative.dev/free-tools/app-icon-splash-generator

Optional credit (copy/paste into your README):

\`\`\`
[App icon & splash generator by NextNative](https://nextnative.dev/free-tools/app-icon-splash-generator)
\`\`\`

For more mobile app development tools and resources, visit:
- NextNative Documentation: https://nextnative.dev/docs
- Mobile App Templates: https://nextnative.dev/templates
- Development Blog: https://nextnative.dev/blog

Happy coding! 🚀
`;

    this.zip.file("README.md", readmeContent);
  }

  async generateZip(options: ZipCreationOptions = {}): Promise<Blob> {
    if (options.includeReadme) {
      this.addReadme(options.appName);
    }

    return await this.zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: {
        level: 6,
      },
    });
  }

  downloadZip(blob: Blob, filename: string = "app-assets.zip"): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  reset(): void {
    this.zip = new JSZip();
  }
}

export async function generateAndDownloadAssets(
  sourceImage: HTMLImageElement,
  options: ZipCreationOptions & {
    appName: string;
    backgroundColor: string;
    roundedCorners: boolean;
  },
  onProgress?: (current: number, total: number) => void,
): Promise<void> {
  // This function will be used in the hook
  const { IconGenerator } = await import("./icon-generator");

  const generator = new IconGenerator();
  const zipGenerator = new ZipGenerator();

  // Generate all assets
  const assets = await generator.generateAll(
    sourceImage,
    {
      appName: options.appName,
      backgroundColor: options.backgroundColor,
      roundedCorners: options.roundedCorners,
    },
    onProgress,
  );

  // Add assets to ZIP
  zipGenerator.addAssets(assets);

  // Generate and download ZIP
  const zipBlob = await zipGenerator.generateZip({
    includeReadme: true,
    appName: options.appName,
  });

  const filename = options.appName
    ? `${options.appName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-app-assets.zip`
    : "app-assets.zip";

  zipGenerator.downloadZip(zipBlob, filename);
}
