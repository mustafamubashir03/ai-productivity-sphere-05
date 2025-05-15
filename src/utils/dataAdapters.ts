// Utility functions to adapt between different data structures

// Convert API tool format (with id) to internal Tool format (with _id)
export function adaptToolToInternal(tool: any): any {
  if (!tool) return null;
  
  // Ensure _id is always present, with a fallback to id or generate a unique one
  return {
    ...tool,
    _id: tool._id || tool.id || `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    // Keep id for backward compatibility
    id: tool.id || tool._id || `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };
}

// Convert internal tool format back to API format if needed
export function adaptToolToApi(tool: any): any {
  if (!tool) return null;
  
  return {
    ...tool,
    id: tool._id || tool.id,
  };
}

// Batch convert tools array
export function adaptToolsToInternal(tools: any[]): any[] {
  if (!tools || !Array.isArray(tools)) return [];
  return tools.map(adaptToolToInternal);
}

// Helper function to get correct ID from a tool object regardless of format
export function getToolId(tool: any): string {
  return tool._id || tool.id || '';
}

// Helper function to format image URL with Cloudinary support
export function formatImageUrl(imagePath: string): string {
  if (!imagePath) return '/placeholder.svg';
  
  // If it's already a Cloudinary URL or another absolute URL, return it as is
  if (imagePath.startsWith('http') || imagePath.startsWith('https')) {
    return imagePath;
  }
  
  // If it's a relative path, prepend the API base URL
  return `${process.env.VITE_API_URL || 'https://topratedai.biovasurgicals.com'}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
}

// Function to enhance images with Cloudinary transformations if needed
export function optimizeImage(url: string, options: { width?: number, height?: number, quality?: number } = {}): string {
  // If not a Cloudinary URL, return as is
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }
  
  // Default optimization options
  const { width = 500, height, quality = 80 } = options;
  
  // Extract base URL and transformation segments
  const [baseUrl, transformations] = url.split('upload/');
  
  // Add our optimizations
  const optimizations = [
    'f_auto', // Auto format
    'q_auto:good', // Auto quality with good preset
    width ? `w_${width}` : '',
    height ? `h_${height}` : '',
    `q_${quality}`, // Specific quality if provided
  ].filter(Boolean).join(',');
  
  return `${baseUrl}upload/${optimizations}/${transformations || ''}`;
}
