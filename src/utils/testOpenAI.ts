/**
 * Test script to verify OpenAI API key is working
 * 
 * Usage in browser console:
 * import { testOpenAIKey } from '@/utils/testOpenAI';
 * await testOpenAIKey();
 * 
 * Or in a component:
 * import { testOpenAIKey } from '@/utils/testOpenAI';
 * useEffect(() => { testOpenAIKey(); }, []);
 */

import { PortfolioAIService } from '../services/portfolio-ai-service';

/**
 * Test the OpenAI API connection
 * This function will attempt to list available models to verify the API key works
 */
export async function testOpenAIKey(): Promise<boolean> {
  try {
    console.log('🧪 Testing OpenAI API Key...');
    
    // Initialize the service - it will automatically load from environment variables
    const aiService = new PortfolioAIService();
    
    // Test the connection
    const result = await aiService.testConnection();
    
    if (result) {
      console.log('✅ OpenAI API Key is valid and working!');
      return true;
    } else {
      console.error('❌ OpenAI API Key test failed');
      return false;
    }
  } catch (error: any) {
    console.error('❌ Error testing OpenAI API Key:', error?.message || error);
    console.error('💡 Make sure:');
    console.error('   1. OPENAI_API_KEY is set in env.development');
    console.error('   2. You have restarted the dev server after adding the key');
    console.error('   3. The key is valid at https://platform.openai.com/account/api-keys');
    return false;
  }
}

/**
 * Quick test that can be run directly
 * Call: testOpenAIKey();
 */
if (typeof window !== 'undefined') {
  // Expose to window for easy browser console access
  (window as any).testOpenAIKey = testOpenAIKey;
  console.log('💡 Test OpenAI: Run testOpenAIKey() in the console');
}

