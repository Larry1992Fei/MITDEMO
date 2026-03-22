// Simple verification script to test APM notice functionality
// This can be run in browser console

function testAPMNotice() {
    console.log('=== APM Notice Functionality Test ===');
    
    // Check if APM notice element exists
    const apmNotice = document.getElementById('apm-special-notice');
    if (!apmNotice) {
        console.error('❌ APM notice element not found!');
        return false;
    }
    console.log('✅ APM notice element found');
    
    // Check if payment method radios exist
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    if (paymentRadios.length === 0) {
        console.error('❌ Payment method radios not found!');
        return false;
    }
    console.log('✅ Payment method radios found:', paymentRadios.length);
    
    // Test initial state (should be hidden since CARD is default)
    const initialDisplay = window.getComputedStyle(apmNotice).display;
    if (initialDisplay === 'none') {
        console.log('✅ Initial state correct: APM notice is hidden');
    } else {
        console.warn('⚠️ Initial state: APM notice is visible (display:', initialDisplay, ')');
    }
    
    // Test switching to APM
    const apmRadio = document.querySelector('input[name="payment"][value="apm"]');
    if (apmRadio) {
        console.log('📝 Testing APM selection...');
        apmRadio.checked = true;
        apmRadio.dispatchEvent(new Event('change'));
        
        setTimeout(() => {
            const apmDisplay = window.getComputedStyle(apmNotice).display;
            if (apmDisplay !== 'none') {
                console.log('✅ APM notice shown when APM selected');
            } else {
                console.error('❌ APM notice not shown when APM selected');
            }
            
            // Test switching back to CARD
            const cardRadio = document.querySelector('input[name="payment"][value="card"]');
            if (cardRadio) {
                console.log('📝 Testing CARD selection...');
                cardRadio.checked = true;
                cardRadio.dispatchEvent(new Event('change'));
                
                setTimeout(() => {
                    const cardDisplay = window.getComputedStyle(apmNotice).display;
                    if (cardDisplay === 'none') {
                        console.log('✅ APM notice hidden when CARD selected');
                        console.log('🎉 All tests passed!');
                    } else {
                        console.error('❌ APM notice not hidden when CARD selected');
                    }
                }, 100);
            }
        }, 100);
    }
    
    return true;
}

// Auto-run test when script loads
if (typeof window !== 'undefined') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', testAPMNotice);
    } else {
        testAPMNotice();
    }
}