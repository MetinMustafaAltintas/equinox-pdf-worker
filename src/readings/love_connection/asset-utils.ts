import { readFileSync, existsSync } from 'fs';
import * as path from 'path';

// Utility function to import assets as base64 data URIs
export function importAsset(assetPath: string, mimeType: string): string {
  let resolvedPath: string;
  
  if (assetPath.startsWith('../assets/')) {
    // Check if it's a font file (fonts are in shared assets directory)
    if (assetPath.includes('/fonts/') || assetPath.match(/\.(ttf|woff|woff2|eot|otf)$/)) {
      // Fonts are in the shared assets directory, so use the original path
      resolvedPath = path.resolve(__dirname, assetPath);
    } else {
      // Images are in the local assets directory, so convert ../assets/ to ./assets/
      const relativePath = assetPath.replace('../assets/', './assets/');
      resolvedPath = path.resolve(__dirname, relativePath);
    }
  } else {
    resolvedPath = path.resolve(__dirname, assetPath);
  }
  
  try {
    // Check if file exists before trying to read it
    if (!existsSync(resolvedPath)) {
      console.warn(`Asset file not found: ${resolvedPath}`);
      // Return a placeholder or empty data URI to prevent crashes
      return `data:${mimeType};base64,`;
    }
    
    const base64 = readFileSync(resolvedPath, 'base64');
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.warn(`Error loading asset ${assetPath}:`, error);
    // Return a placeholder to prevent crashes
    return `data:${mimeType};base64,`;
  }
}

// Convenience functions for common asset types
export function importImage(assetPath: string): string {
  const ext = path.extname(assetPath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp'
  };
  const mimeType = mimeTypes[ext] || 'image/png';
  
  const result = importAsset(assetPath, mimeType);
  
  // If the asset failed to load (empty base64), return a transparent 1x1 PNG
  if (result === `data:${mimeType};base64,`) {
    console.warn(`Image not found: ${assetPath}, using transparent placeholder`);
    // Transparent 1x1 PNG in base64
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  }
  
  return result;
}

export function importFont(assetPath: string): string {
  const ext = path.extname(assetPath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'font/otf'
  };
  const mimeType = mimeTypes[ext] || 'font/ttf';
  return importAsset(assetPath, mimeType);
}
