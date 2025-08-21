// Test Supabase connection and table existence
// Run this in browser console to debug connection issues

async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase Connection...');
  
  // Check environment variables
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  console.log('Environment Variables:');
  console.log('URL:', url);
  console.log('Key:', key ? '✅ Present' : '❌ Missing');
  
  if (!url || !key || url.includes('your-project-url') || key.includes('your-anon-key')) {
    console.error('❌ Supabase not properly configured!');
    return;
  }
  
  // Test connection
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(url, key);
    
    console.log('✅ Supabase client created');
    
    // Test table existence by trying to select from contacts
    try {
      const { data, error, count } = await supabase
        .from('contacts')
        .select('id', { count: 'exact', head: true });
      
      if (error) {
        console.error('❌ Error accessing contacts table:', error.message);
        if (error.message.includes('does not exist')) {
          console.log('💡 Solution: You need to create the database tables!');
          console.log('📝 Run the SQL from database_setup.sql in your Supabase dashboard');
        }
      } else {
        console.log('✅ contacts table exists, count:', count);
      }
    } catch (tableError) {
      console.error('❌ Table test failed:', tableError);
    }
    
    // Test insert capability
    try {
      const testData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        inquiry_type: 'General',
        subject: 'Test',
        message: 'Test message'
      };
      
      const { data, error } = await supabase
        .from('contacts')
        .insert([testData])
        .select();
      
      if (error) {
        console.error('❌ Test insert failed:', error.message);
      } else {
        console.log('✅ Test insert successful:', data);
        
        // Clean up test data
        if (data && data[0]) {
          await supabase.from('contacts').delete().eq('id', data[0].id);
          console.log('🧹 Test data cleaned up');
        }
      }
    } catch (insertError) {
      console.error('❌ Insert test failed:', insertError);
    }
    
  } catch (clientError) {
    console.error('❌ Failed to create Supabase client:', clientError);
  }
}

// Auto-run the test
testSupabaseConnection().then(() => {
  console.log('🔍 Supabase test completed');
}).catch(console.error);
