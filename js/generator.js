// Policy generation
async function generatePolicies(event) {
    event.preventDefault();
    
    const form = document.getElementById('policy-form');
    const formData = new FormData(form);
    const orgName = formData.get('org-name');
    
    // Count selected policies
    const selectedPolicies = [
        formData.get('policy-ethics') === 'on',
        formData.get('policy-risk') === 'on', 
        formData.get('policy-data') === 'on',
        formData.get('policy-security') === 'on',
        formData.get('policy-model') === 'on',
        formData.get('policy-vendor') === 'on',
        formData.get('policy-usecase') === 'on',
        formData.get('policy-human') === 'on',
        formData.get('policy-incident') === 'on',
        formData.get('policy-compliance') === 'on',
        formData.get('policy-deployment') === 'on',
        formData.get('policy-training') === 'on',
        formData.get('policy-governance') === 'on',
        formData.get('policy-transparency') === 'on'
        // The 7 additional policies from the Premium Package are not individually selectable
    ].filter(Boolean).length;
    
    // Collect all the form data to send to the backend
    const policyData = {
        orgName: formData.get('org-name'),
        industry: formData.get('industry'),
        size: formData.get('size'),
        geoOperations: {
            northAmerica: formData.get('geo-na') === 'on',
            europe: formData.get('geo-eu') === 'on',
            global: formData.get('geo-global') === 'on'
        },
        aiMaturity: formData.get('ai-maturity'),
        aiStrategy: formData.get('ai-strategy'),
        policies: {
            // Basic Package
            ethics: formData.get('policy-ethics') === 'on',
            risk: formData.get('policy-risk') === 'on',
            data: formData.get('policy-data') === 'on',
            
            // Professional Package
            security: formData.get('policy-security') === 'on',
            model: formData.get('policy-model') === 'on',
            human: formData.get('policy-human') === 'on',
            compliance: formData.get('policy-compliance') === 'on',
            usecase: formData.get('policy-usecase') === 'on',
            
            // Premium Package
            vendor: formData.get('policy-vendor') === 'on',
            deployment: formData.get('policy-deployment') === 'on',
            training: formData.get('policy-training') === 'on',
            incident: formData.get('policy-incident') === 'on',
            governance: formData.get('policy-governance') === 'on',
            transparency: formData.get('policy-transparency') === 'on'
            
            // Note: The 7 additional Premium policies are not individually selectable
            // but would be included in the Premium package automatically
        },
        ethics: {
            fairness: formData.get('ethics-fairness') === 'on',
            transparency: formData.get('ethics-transparency') === 'on',
            privacy: formData.get('ethics-privacy') === 'on',
            safety: formData.get('ethics-safety') === 'on'
        },
        risks: {
            technical: formData.get('risk-technical') === 'on',
            ethical: formData.get('risk-ethical') === 'on',
            legal: formData.get('risk-legal') === 'on',
            reputation: formData.get('risk-reputation') === 'on'
        },
        additionalRequirements: formData.get('additional-requirements')
    };

    // All policies require a paid package
    showPaymentOptions(policyData, selectedPolicies);
}

// Show payment options based on number of policies selected
function showPaymentOptions(policyData, selectedPolicies) {
    // Hide the form
    document.getElementById('policy-form').parentElement.parentElement.classList.add('hidden');
    
    // Show payment section
    const resultsSection = document.getElementById('results-section');
    resultsSection.classList.remove('hidden');
    
    const generatedPolicies = document.getElementById('generated-policies');
    
    // Determine required package based on selected policies
    let requiredPackage = 'basic_plan'; // Default to Basic
    
    // Check for Premium package policies
    const hasPremiumPolicies = document.querySelectorAll('.policy-checkbox[data-package="premium"]:checked').length > 0;
    
    // Check for Professional package policies
    const hasProfessionalPolicies = document.querySelectorAll('.policy-checkbox[data-package="professional"]:checked').length > 0;
    
    // Determine package based on selected policies
    if (hasPremiumPolicies) {
        requiredPackage = 'premium_suite';
    } else if (hasProfessionalPolicies) {
        requiredPackage = 'professional_package';
    }
    
    // Pricing information
    const packages = {
        basic_plan: { name: 'Basic Package', price: '900', policyCount: 3 },
        professional_package: { name: 'Professional Package', price: '1,500', policyCount: 8 },
        premium_suite: { name: 'Premium Package', price: '5,000', policyCount: 19 }
    };
    
    // Get the required package details
    const requiredPkg = packages[requiredPackage];
    
    // Display payment UI with only the required package
    generatedPolicies.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Payment Required</h3>
            <p class="text-gray-700 mb-4">
                Based on your policy selections, you need the ${requiredPkg.name}.
            </p>
            
            <div class="border rounded-lg p-4 border-indigo-500 bg-indigo-50 mx-auto max-w-xl">
                <div class="flex justify-between items-start">
                    <h4 class="text-lg font-semibold">${requiredPkg.name}</h4>
                    <span class="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">Required</span>
                </div>
                <p class="text-2xl font-bold my-2">$${requiredPkg.price}</p>
                <p class="text-sm text-gray-600 mb-4">Includes ${requiredPkg.policyCount} policy templates</p>
                <button 
                    type="button" 
                    class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onclick="startPaymentProcess('${requiredPackage}', '${policyData.orgName}')"
                >
                    Proceed to Payment
                </button>
            </div>
            
            <div class="mt-4 flex justify-between">
                <button 
                    type="button" 
                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onclick="backToForm()"
                >
                    <i class="fas fa-arrow-left mr-2"></i> Back
                </button>
                
                <!-- Removed free tier button as all packages require payment -->
            </div>
        </div>
    `;
    
    // Store policy data in sessionStorage to retrieve after payment
    sessionStorage.setItem('pendingPolicyData', JSON.stringify(policyData));
    sessionStorage.setItem('selectedPolicyCount', selectedPolicies);
}

// Go back to the questionnaire form
function backToForm() {
    // Hide results section
    document.getElementById('results-section').classList.add('hidden');
    
    // Show the form again
    document.getElementById('policy-form').parentElement.parentElement.classList.remove('hidden');
}

// Start the payment process
function startPaymentProcess(productId, customerEmail) {
    // Create a payment element container
    const generatedPolicies = document.getElementById('generated-policies');
    generatedPolicies.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Complete Your Purchase</h3>
            
            <div id="payment-element-container" class="mb-6">
                <div id="payment-element"></div>
                <div id="card-errors" class="text-red-500 text-sm mt-2"></div>
            </div>
            
            <div class="mt-4 flex justify-between">
                <button 
                    type="button" 
                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onclick="showPaymentOptions(JSON.parse(sessionStorage.getItem('pendingPolicyData')), sessionStorage.getItem('selectedPolicyCount'))"
                >
                    <i class="fas fa-arrow-left mr-2"></i> Back
                </button>
                
                <button 
                    id="payment-submit-button"
                    type="button" 
                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled
                >
                    <span id="button-text">Processing...</span>
                </button>
            </div>
        </div>
    `;
    
    // Initialize Stripe payment
    initializePayment(productId, customerEmail);
}

// This function has been removed as all policies now require payment

// Core policy generation function (called after any payment considerations)
async function generatePoliciesForUser(policyData) {
    const orgName = policyData.orgName;
    
    // Hide the form or payment UI
    document.getElementById('policy-form').parentElement.parentElement.classList.add('hidden');
    
    // Show loading state in results section
    const resultsSection = document.getElementById('results-section');
    resultsSection.classList.remove('hidden');
    
    const generatedPolicies = document.getElementById('generated-policies');
    generatedPolicies.innerHTML = `
        <div class="flex justify-center items-center py-10">
            <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            <p class="ml-4 text-lg text-gray-700">Generating custom policies for ${orgName}...</p>
        </div>
    `;
    
    try {
        // Call API to generate policies using Claude
        const response = await fetch('/api/generate-policies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(policyData)
        });
        
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        
        const generatedPolicyData = await response.json();
        
        // Clear loading state
        generatedPolicies.innerHTML = '';
        
        // Populate with actual generated policies
        
        // Basic Package
        if (policyData.policies.ethics) {
            generatedPolicies.innerHTML += createPolicyPreview('AI Ethics Policy', orgName, generatedPolicyData.ethics);
        }
        
        if (policyData.policies.risk) {
            generatedPolicies.innerHTML += createPolicyPreview('AI Risk Management Policy', orgName, generatedPolicyData.risk);
        }
        
        if (policyData.policies.data) {
            generatedPolicies.innerHTML += createPolicyPreview('AI Data Governance Policy', orgName, generatedPolicyData.data);
        }
        
        // Professional Package
        if (policyData.policies.security) {
            generatedPolicies.innerHTML += createPolicyPreview('AI Security Policy', orgName, generatedPolicyData.security);
        }
        
        if (policyData.policies.model) {
            generatedPolicies.innerHTML += createPolicyPreview('AI Model Management Policy', orgName, generatedPolicyData.model);
        }
        
        if (policyData.policies.human) {
            generatedPolicies.innerHTML += createPolicyPreview('Human Oversight Policy', orgName, generatedPolicyData.human);
        }
        
        if (policyData.policies.compliance) {
            generatedPolicies.innerHTML += createPolicyPreview('AI Compliance Policy', orgName, generatedPolicyData.compliance);
        }
        
        if (policyData.policies.usecase) {
            generatedPolicies.innerHTML += createPolicyPreview('AI Use Case Evaluation Policy', orgName, generatedPolicyData.usecase);
        }
        
        // Premium Package
        if (policyData.policies.vendor) {
            generatedPolicies.innerHTML += createPolicyPreview('AI Procurement & Vendor Management Policy', orgName, generatedPolicyData.vendor);
        }
        
        if (policyData.policies.deployment) {
            generatedPolicies.innerHTML += createPolicyPreview('Responsible AI Deployment Policy', orgName, generatedPolicyData.deployment);
        }
        
        if (policyData.policies.training) {
            generatedPolicies.innerHTML += createPolicyPreview('AI Training & Capability Development Policy', orgName, generatedPolicyData.training);
        }
        
        if (policyData.policies.incident) {
            generatedPolicies.innerHTML += createPolicyPreview('AI Incident Response Policy', orgName, generatedPolicyData.incident);
        }
        
        if (policyData.policies.governance) {
            generatedPolicies.innerHTML += createPolicyPreview('AI Governance Committee Policy', orgName, generatedPolicyData.governance);
        }
        
        if (policyData.policies.transparency) {
            generatedPolicies.innerHTML += createPolicyPreview('AI Transparency Policy', orgName, generatedPolicyData.transparency);
        }
        
        // Clear storage
        sessionStorage.removeItem('pendingPolicyData');
        sessionStorage.removeItem('selectedPolicyCount');
    } catch (error) {
        console.error('Error generating policies:', error);
        generatedPolicies.innerHTML = `
            <div class="bg-red-50 border-l-4 border-red-400 p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-red-700">
                            Error generating policies. Please try again later.
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Add download handlers
    document.getElementById('download-policies').addEventListener('click', function() {
        alert('Downloading all policies as a zip file...');
        // In a real implementation, this would download all generated policies as a zip file or PDF
        fetch('/api/download-policies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orgName })
        })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${orgName.replace(/\s+/g, '-')}-AI-Policies.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error downloading policies:', error);
            alert('Error downloading policies. Please try again later.');
        });
    });
}

function createPolicyPreview(policyName, orgName, policyContent = null) {
    // Extract first few lines of the policy for preview
    let previewContent = '... [Policy content loading] ...';
    let policyNumber = `${policyName.replace(/\s/g, '-').toUpperCase()}-001`;
    let effectiveDate = new Date().toLocaleDateString();
    
    if (policyContent) {
        // Extract policy number if present
        const policyNumberMatch = policyContent.match(/Policy Number:\s*([^\n]+)/);
        if (policyNumberMatch) {
            policyNumber = policyNumberMatch[1].trim();
        }
        
        // Extract effective date if present
        const effectiveDateMatch = policyContent.match(/Effective Date:\s*([^\n]+)/);
        if (effectiveDateMatch && effectiveDateMatch[1].trim() !== '[Insert Date]') {
            effectiveDate = effectiveDateMatch[1].trim();
        }
        
        // Extract purpose and scope for preview
        const purposeMatch = policyContent.match(/Purpose and Scope[^\n]*\n+([^\n#]+)/);
        if (purposeMatch) {
            previewContent = purposeMatch[1].trim();
        }
    }
    
    // Create unique ID for this policy preview for expanding/collapsing
    const policyId = `policy-${policyName.toLowerCase().replace(/\s+/g, '-')}`;
    
    return `
    <div class="bg-gray-50 rounded-lg p-4 shadow-sm mb-6">
        <div class="flex justify-between items-start">
            <h3 class="text-lg font-medium text-gray-900">${policyName}</h3>
            <div class="ml-4 flex-shrink-0 flex">
                <button type="button" onclick="togglePolicyView('${policyId}')" class="ml-3 bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-1">
                    <span class="sr-only">View</span>
                    <i class="fas fa-eye"></i>
                </button>
                <button type="button" onclick="downloadPolicy('${policyId}', '${policyName}', '${orgName}')" class="ml-3 bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-1">
                    <span class="sr-only">Download</span>
                    <i class="fas fa-download"></i>
                </button>
            </div>
        </div>
        <p class="mt-1 text-sm text-gray-600">Policy generated for ${orgName}.</p>
        <div class="mt-2 text-sm text-gray-500">
            <div class="bg-white p-3 rounded border border-gray-200 text-xs overflow-hidden policy-preview" style="max-height: 100px;">
                <p><strong>Policy Number:</strong> ${policyNumber}</p>
                <p><strong>Effective Date:</strong> ${effectiveDate}</p>
                <p><strong>Purpose and Scope:</strong> ${previewContent}</p>
            </div>
            
            <div id="${policyId}" class="hidden mt-4 bg-white p-4 rounded border border-gray-200 text-xs policy-full-content">
                <div class="flex justify-between mb-2">
                    <h4 class="font-bold text-sm">Full Policy Content</h4>
                    <button type="button" onclick="togglePolicyView('${policyId}')" class="text-gray-400 hover:text-gray-500">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="policy-markdown prose prose-sm max-w-none">
                    ${policyContent ? marked.parse(policyContent) : 'Policy content loading...'}
                </div>
            </div>
        </div>
        <div class="mt-3">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-700">
                <i class="fas fa-file-alt mr-1"></i> Generated for ${orgName}
            </span>
        </div>
    </div>
    `;
}

// Toggle visibility of full policy view
function togglePolicyView(policyId) {
    const policyElement = document.getElementById(policyId);
    if (policyElement.classList.contains('hidden')) {
        policyElement.classList.remove('hidden');
    } else {
        policyElement.classList.add('hidden');
    }
}

// Download individual policy
function downloadPolicy(policyId, policyName, orgName) {
    const policyContent = document.querySelector(`#${policyId} .policy-markdown`).textContent;
    
    // Create blob and download
    const blob = new Blob([policyContent], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${orgName.replace(/\s+/g, '-')}-${policyName.replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

function resetForm() {
    // Hide results section
    document.getElementById('results-section').classList.add('hidden');
    
    // Show the form again
    document.getElementById('policy-form').parentElement.parentElement.classList.remove('hidden');
    
    // Reset the form fields
    document.getElementById('policy-form').reset();
}

// Update selected policy count
function updatePolicyCount() {
    const checkboxes = document.querySelectorAll('.policy-checkbox:checked');
    const selectedCount = checkboxes.length;
    const countDisplay = document.getElementById('selected-count');
    const premiumNotice = document.getElementById('premium-notice');
    
    if (countDisplay) {
        countDisplay.textContent = selectedCount;
    }
    
    // Always show the premium notice when policies are selected as all require payment
    if (premiumNotice) {
        if (selectedCount > 0) {
            premiumNotice.classList.remove('hidden');
        } else {
            premiumNotice.classList.add('hidden');
        }
    }
    
    // Helper function to determine what package will be required
    function getRequiredPackage() {
        const basicPolicies = document.querySelectorAll('.policy-checkbox[data-package="basic"]:checked').length;
        const professionalPolicies = document.querySelectorAll('.policy-checkbox[data-package="professional"]:checked').length;
        const premiumPolicies = document.querySelectorAll('.policy-checkbox[data-package="premium"]:checked').length;
        
        if (premiumPolicies > 0) {
            return "Premium";
        } else if (professionalPolicies > 0) {
            return "Professional";
        } else if (basicPolicies > 0) {
            return "Basic";
        }
        return null;
    }
    
    // Update premium notice to highlight the required package
    const requiredPackage = getRequiredPackage();
    if (requiredPackage) {
        const packageItems = document.querySelectorAll('#premium-notice ul li');
        packageItems.forEach(item => {
            if (item.textContent.includes(requiredPackage)) {
                item.classList.add('font-bold', 'text-yellow-800');
            } else {
                item.classList.remove('font-bold', 'text-yellow-800');
            }
        });
    }
}

// Initialize policy checkboxes
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has authenticated/paid
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    const purchasedPackage = localStorage.getItem('purchased_package');
    
    // If accessing generator page directly without payment, redirect to pricing
    if (!isAuthenticated && window.location.pathname.includes('generator.html')) {
        // Add a message to localStorage to show after redirect
        localStorage.setItem('pricing_message', 'Please select a pricing package before accessing the generator.');
        
        // Redirect to pricing page
        window.location.href = 'pricing.html';
        return;
    }
    
    // Initial count update
    updatePolicyCount();
    
    // Add event listeners to all policy checkboxes
    const checkboxes = document.querySelectorAll('.policy-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePolicyCount);
    });
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generatePolicies,
        createPolicyPreview,
        resetForm,
        updatePolicyCount
    };
}