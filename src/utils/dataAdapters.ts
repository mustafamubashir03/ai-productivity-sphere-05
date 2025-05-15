
// Utility functions to adapt between different data structures

// Convert API tool format (with id) to internal Tool format (with _id)
export function adaptToolToInternal(tool: any): any {
  if (!tool) return null;
  
  return {
    ...tool,
    _id: tool.id || tool._id || '', // Ensure _id is always present with a fallback
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

// Helper function to format image URL
export function formatImageUrl(imagePath: string): string {
  if (!imagePath) return '/placeholder.svg';
  return imagePath.startsWith('/') && !imagePath.startsWith('http') 
    ? `${process.env.API_BASE_URL || 'https://topratedai.biovasurgicals.com'}${imagePath}` 
    : imagePath;
}
