/**
 * Content Helper Utilities
 *
 * Helper functions for working with Nuxt Content API and Markdown files.
 */

export interface Recipe {
  title: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  ingredients: string[];
  instructions: string[];
}

/**
 * Parse recipe frontmatter from Markdown content
 */
export function parseRecipeFrontmatter(markdown: string): Partial<Recipe> {
  const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return {};

  const frontmatter = frontmatterMatch[1];
  const lines = frontmatter.split('\n');

  const metadata: any = {};
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      metadata[key.trim()] = isNaN(Number(value)) ? value : Number(value);
    }
  }

  return metadata;
}

/**
 * Validate recipe has required fields
 */
export function validateRecipe(recipe: Partial<Recipe>): boolean {
  const requiredFields: (keyof Recipe)[] = ['title', 'servings', 'prepTime'];
  return requiredFields.every(field => recipe[field] !== undefined);
}
