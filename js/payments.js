// Initialize Stripe - this key should match STRIPE_PUBLISHABLE_KEY in your .env file
const stripe = typeof Stripe !== 'undefined' ? Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx') : null;
const elements = stripe ? stripe.elements() : null;

// Create the payment modal elements when needed
let card;

// Product prices - aligned with pricing.html
const PRODUCTS = {
    'basic_plan': {
        name: 'Basic Plan',
        price: 900,
        description: '3 core policy templates with simple customization'
    },
    'professional_package': {
        name: 'Professional Package',
        price: 1500,
        description: '8 essential policy templates with standard customization'
    },
    'premium_suite': {
        name: 'Premium Suite',
        price: 5000,
        description: 'Full suite of 19 policy templates with advanced customization'
    }
};

// Open payment modal with product selection
function checkout(productId) {
    if (!PRODUCTS[productId]) {
        console.error(`Product ID ${productId} not found`);
        return;
    }
    
    const modal = document.getElementById('payment-modal');
    modal.classList.remove('hidden');
    
    // Set product details in modal
    document.getElementById('payment-modal-title').textContent = `Complete Purchase: ${PRODUCTS[productId].name}`;
    document.getElementById('product-name').textContent = PRODUCTS[productId].name;
    document.getElementById('product-price').textContent = `$${PRODUCTS[productId].price.toFixed(2)}`;
    
    // Create card element if it doesn't exist
    if (!card) {
        const style = {
            base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };
        
        card = elements.create('card', {style: style});
        card.mount('#card-element');
        
        // Handle validation errors
        card.addEventListener('change', function(event) {
            const displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });
    }
    
    // Handle form submission
    const submitButton = document.getElementById('submit-payment');
    const form = document.getElementById('payment-form');
    
    // Remove previous event listeners
    const newSubmitButton = submitButton.cloneNode(true);
    submitButton.parentNode.replaceChild(newSubmitButton, submitButton);
    
    // Add new event listener
    newSubmitButton.addEventListener('click', function() {
        processPayment(productId);
    });
}

// Close payment modal
function closePaymentModal() {
    document.getElementById('payment-modal').classList.add('hidden');
    // Reset errors
    document.getElementById('card-errors').textContent = '';
    // Reset button
    document.getElementById('submit-payment').disabled = false;
    document.getElementById('submit-payment').textContent = 'Pay Now';
}

// Process the payment with Stripe
async function processPayment(productId) {
    const email = document.getElementById('customer-email').value;
    
    if (!email) {
        document.getElementById('card-errors').textContent = 'Please enter your email address.';
        return;
    }
    
    const submitButton = document.getElementById('submit-payment');
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';
    
    try {
        // Step 1: Make an API call to the server to create a PaymentIntent
        // Toggle between production and simulation mode
        const USE_REAL_PAYMENT_API = false; // Set to true to use real Stripe API
        
        let clientSecret;
        let result;
        
        if (USE_REAL_PAYMENT_API) {
            // Make actual API call to backend
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    productId: productId,
                    email: email 
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create payment intent');
            }
            
            const paymentData = await response.json();
            clientSecret = paymentData.clientSecret;
            
            // Step 2: Confirm the card payment with the client secret
            result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { 
                    card: card, 
                    billing_details: { email: email } 
                }
            });
        } else {
            // Simulation mode for testing without backend
            console.log('Processing payment for:', productId, 'with email:', email);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate successful payment
            result = { paymentIntent: { status: 'succeeded' } };
        }
        
        if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
            // Payment successful
            console.log('Payment successful!');
            
            // Set authentication flag in localStorage
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('purchased_package', productId);
            
            // Close payment modal
            closePaymentModal();
            
            // Show success modal
            document.getElementById('success-modal').classList.remove('hidden');
        } else {
            // Payment failed
            throw new Error('Payment failed');
        }
    } catch (error) {
        // Show error in the payment form
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message || 'An error occurred while processing your payment.';
        
        // Re-enable the submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Pay Now';
    }
}

// Initialize Stripe payment for the policy generator
async function initializePayment(productId, email) {
    if (!PRODUCTS[productId]) {
        console.error(`Product ID ${productId} not found`);
        return;
    }
    
    // Create card element
    if (!card && stripe) {
        const style = {
            base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };
        
        card = elements.create('card', {style: style});
        card.mount('#payment-element');
        
        // Handle validation errors
        card.addEventListener('change', function(event) {
            const displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
            
            // Enable the submit button if the card is valid
            const submitButton = document.getElementById('payment-submit-button');
            submitButton.disabled = event.empty || event.error;
            
            if (!event.empty && !event.error) {
                submitButton.innerHTML = `Pay $${PRODUCTS[productId].price}`;
            } else {
                submitButton.innerHTML = 'Please complete payment details';
            }
        });
    }
    
    // Handle form submission
    const submitButton = document.getElementById('payment-submit-button');
    
    // Remove previous event listeners
    const newSubmitButton = submitButton.cloneNode(true);
    submitButton.parentNode.replaceChild(newSubmitButton, submitButton);
    
    // Add new event listener
    newSubmitButton.addEventListener('click', function() {
        completePaymentAndGeneratePolicies(productId, email);
    });
}

// Process payment and generate policies
async function completePaymentAndGeneratePolicies(productId, email) {
    if (!email) {
        email = 'customer@example.com'; // Default if not provided
    }
    
    const submitButton = document.getElementById('payment-submit-button');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
    
    try {
        // Step 1: Make an API call to the server to create a PaymentIntent
        // Toggle between production and simulation mode
        const USE_REAL_PAYMENT_API = false; // Set to true to use real Stripe API
        
        let clientSecret;
        let result;
        
        if (USE_REAL_PAYMENT_API) {
            // Make actual API call to backend
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    productId: productId,
                    email: email 
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create payment intent');
            }
            
            const paymentData = await response.json();
            clientSecret = paymentData.clientSecret;
            
            // Step 2: Confirm the card payment with the client secret
            result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { 
                    card: card, 
                    billing_details: { email: email } 
                }
            });
        } else {
            // Simulation mode for testing without backend
            console.log('Processing payment for:', productId, 'with email:', email);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate successful payment
            result = { paymentIntent: { status: 'succeeded' } };
        }
        
        if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
            // Payment successful
            console.log('Payment successful!');
            
            // Set authentication flag in localStorage
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('purchased_package', productId);
            
            // Get the pending policy data and generate
            const policyData = JSON.parse(sessionStorage.getItem('pendingPolicyData'));
            
            // Generate policies
            generatePoliciesForUser(policyData);
        } else {
            // Payment failed
            throw new Error('Payment failed or was canceled');
        }
    } catch (error) {
        // Show error in the payment form
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message || 'An error occurred while processing your payment.';
        
        // Re-enable the submit button
        submitButton.disabled = false;
        submitButton.innerHTML = `Pay $${PRODUCTS[productId].price}`;
    }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PRODUCTS,
        checkout,
        closePaymentModal,
        processPayment,
        initializePayment,
        completePaymentAndGeneratePolicies
    };
}